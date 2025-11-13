import React, { useEffect, useState } from 'react';
import { Brain, Loader, ChevronLeft, CheckCircle, XCircle, Trophy, Plus, Play, Star, Award } from 'lucide-react';

// --- Interfaces ---
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
interface StudyCard {
  id: string;
  topic: string;
  questions: Question[];
  difficulty: 'básico' | 'intermedio' | 'avanzado';
  cardNumber: number;
  pointsPerQuestion: number;
  generatedByAI: boolean;
}
interface CardAnswer {
  cardId: string;
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent?: number;
}

// --- Constantes ---
const CARDS_COUNT = 5;
const QUESTIONS_PER_CARD = 5;
const TOTAL_QUESTIONS = CARDS_COUNT * QUESTIONS_PER_CARD; // 25

// localStorage keys
const LS_CARDS = 'tei_studyCards_v1';
const LS_ANSWERS = 'tei_cardAnswers_v1';

// --- Helpers ---
function repairJsonArray(raw: string): string {
  let s = raw ?? '';
  const start = s.indexOf('[');
  const end = s.lastIndexOf(']');
  if (start !== -1 && end !== -1 && end > start) s = s.slice(start, end + 1);
  s = s.replace(/```json\s*|```/gi, '').trim();
  s = s.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  s = s.replace(/}\s*{/g, '},{');
  s = s.replace(/}\s*\n+\s*{/g, '},{');
  s = s.replace(/,\s*(\}|\])/g, '$1');
  return s;
}
function sanitizeTopic(topic: string): string {
  return topic
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

export default function TarjetasEstudioIA() {
  const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;

  const [showGenerator, setShowGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [newTopic, setNewTopic] = useState('');

  const [studyCards, setStudyCards] = useState<StudyCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardAnswers, setCardAnswers] = useState<Map<string, CardAnswer>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [studyingTopic, setStudyingTopic] = useState<string | null>(null);

  // --- Persistencia: cargar al montar ---
  useEffect(() => {
    try {
      const savedCards = localStorage.getItem(LS_CARDS);
      if (savedCards) {
        const parsed: StudyCard[] = JSON.parse(savedCards);
        if (Array.isArray(parsed)) setStudyCards(parsed);
      }
    } catch {}
    try {
      const savedAnswers = localStorage.getItem(LS_ANSWERS);
      if (savedAnswers) {
        const entries: [string, CardAnswer][] = JSON.parse(savedAnswers);
        if (Array.isArray(entries)) setCardAnswers(new Map(entries));
      }
    } catch {}
  }, []);

  // --- Persistencia: red de seguridad (mantener) ---
  useEffect(() => {
    try {
      localStorage.setItem(LS_CARDS, JSON.stringify(studyCards));
    } catch {}
  }, [studyCards]);
  useEffect(() => {
    try {
      localStorage.setItem(LS_ANSWERS, JSON.stringify(Array.from(cardAnswers.entries())));
    } catch {}
  }, [cardAnswers]);

  // --- Generación de 5 tarjetas con 5 preguntas ---
  const generateAICards = async (topic: string): Promise<StudyCard[]> => {
    const difficulties: ('básico' | 'intermedio' | 'avanzado')[] = ['básico', 'intermedio', 'avanzado'];
    const safeTopic = sanitizeTopic(topic);

    const prompt = `Genera ${TOTAL_QUESTIONS} preguntas de opción múltiple sobre "${safeTopic}" con dificultad variada.
RESPONDE SOLO CON JSON EXACTO:
[
  {
    "question": "Pregunta sobre ${safeTopic}",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correctAnswer": 0,
    "explanation": "Explicación breve sin saltos de línea ni comillas internas"
  }
]

REGLAS:
- Solo JSON válido
- Sin markdown ni comentarios
- Usa comillas rectas (")
- Cada pregunta debe ser única
- Exactamente ${TOTAL_QUESTIONS} preguntas
- Sin comas finales antes de ] o }
- Mezcla preguntas fáciles, intermedias y difíciles`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 4000, candidateCount: 1 },
          }),
        }
      );

      if (!response.ok) throw new Error(`Error de API ${response.status}: ${response.statusText}`);
      const data = await response.json();
      let content: string = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!content) throw new Error('Respuesta de API inválida');

      let questions: Question[] | null = null;
      try {
        questions = JSON.parse(repairJsonArray(content));
      } catch (e1) {
        const repaired = repairJsonArray(content)
          .replace(/}\s*\n\s*{/g, '},{')
          .replace(/,\s*(\}|\])/g, '$1');
        try {
          questions = JSON.parse(repaired);
        } catch (e2) {
          console.error('Parse fail 1:', e1);
          console.error('Parse fail 2:', e2);
          throw new Error('La API devolvió JSON malformado. Intenta de nuevo.');
        }
      }

      if (!Array.isArray(questions) || questions.length < TOTAL_QUESTIONS) {
        throw new Error(
          `No se generaron suficientes preguntas únicas (esperadas: ${TOTAL_QUESTIONS}, recibidas: ${questions?.length ?? 0})`
        );
      }

      const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
      const pointsPerQuestion = Math.round((100 / TOTAL_QUESTIONS) * 100) / 100;

      const cards: StudyCard[] = [];
      for (let i = 0; i < CARDS_COUNT; i++) {
        const startIdx = i * QUESTIONS_PER_CARD;
        const endIdx = startIdx + QUESTIONS_PER_CARD;
        const cardQuestions = shuffled.slice(startIdx, endIdx);

        cards.push({
          id: `${Date.now()}-${Math.random()}-${i}`,
          topic: safeTopic,
          questions: cardQuestions,
          difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
          cardNumber: i + 1,
          pointsPerQuestion,
          generatedByAI: true,
        });
      }
      return cards;
    } catch (error) {
      console.error('Error en generateAICards:', error);
      throw error;
    }
  };

  const handleGenerateCards = async () => {
    if (!apiKey) return alert('Error: REACT_APP_GOOGLE_AI_API_KEY no configurada');
    if (!newTopic.trim()) return alert('Por favor ingresa un tema');

    setIsGenerating(true);
    setGenerationProgress(0);

    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const normalizedTopic = newTopic.replace(/\s+/g, ' ').trim();
      const newCards = await generateAICards(normalizedTopic);

      // ✅ Guardado inmediato de tarjetas
      setStudyCards(prev => {
        const merged = [...prev, ...newCards];
        try { localStorage.setItem(LS_CARDS, JSON.stringify(merged)); } catch {}
        return merged;
      });

      setGenerationProgress(100);

      const totalQuestions = newCards.reduce((sum, card) => sum + card.questions.length, 0);
      setTimeout(() => {
        alert(
          `¡Éxito! Se generaron 5 tarjetas sobre: ${normalizedTopic} con ${totalQuestions} preguntas (5 por tarjeta). Cada pregunta vale ${Math.round(
            (100 / totalQuestions) * 100
          ) / 100} puntos.`
        );
        setNewTopic('');
        setShowGenerator(false);
        clearInterval(progressInterval);
      }, 500);
    } catch (error: any) {
      console.error(error);
      alert('Error al generar las tarjetas: ' + error.message);
      clearInterval(progressInterval);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 1000);
    }
  };

  // --- Estudio ---
  const startStudySession = () => {
    if (studyCards.length === 0) return alert('Primero genera algunas tarjetas de estudio');
    setIsStudying(true);
    setStudyingTopic(null);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const startTopicStudy = (topic: string) => {
    const topicCards = studyCards.filter(card => card.topic === topic);
    if (topicCards.length === 0) return;

    setIsStudying(true);
    setStudyingTopic(topic);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // Mostrar estado de respuesta guardada al navegar
  useEffect(() => {
    if (!isStudying) return;
    const currentCards = studyingTopic ? studyCards.filter(c => c.topic === studyingTopic) : studyCards;
    const card = currentCards[currentCardIndex];
    if (!card) return;

    const key = `${card.id}-${currentQuestionIndex}`;
    const existing = cardAnswers.get(key);

    if (existing) {
      setSelectedOption(existing.selectedOption);
      setShowExplanation(true);
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudying, studyingTopic, currentCardIndex, currentQuestionIndex, studyCards]);

  const handleOptionSelect = (optionIndex: number) => {
    const currentCards = studyingTopic ? studyCards.filter(card => card.topic === studyingTopic) : studyCards;
    const currentCard = currentCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];

    const key = `${currentCard.id}-${currentQuestionIndex}`;
    if (cardAnswers.has(key) || selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const pointsEarned = isCorrect ? currentCard.pointsPerQuestion : 0;

    const newAnswer: CardAnswer = {
      cardId: currentCard.id,
      questionIndex: currentQuestionIndex,
      selectedOption: optionIndex,
      isCorrect,
      pointsEarned,
    };

    const newMap = new Map(cardAnswers);
    newMap.set(key, newAnswer);
    setCardAnswers(newMap);

    // ✅ Persistencia inmediata de respuestas
    try { localStorage.setItem(LS_ANSWERS, JSON.stringify(Array.from(newMap.entries()))); } catch {}

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const currentCards = studyingTopic ? studyCards.filter(card => card.topic === studyingTopic) : studyCards;
    const currentCard = currentCards[currentCardIndex];

    if (currentQuestionIndex + 1 < currentCard.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCardIndex + 1 < currentCards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const changeAnswer = () => {
    const currentCards = studyingTopic ? studyCards.filter(card => card.topic === studyingTopic) : studyCards;
    const currentCard = currentCards[currentCardIndex];
    const key = `${currentCard.id}-${currentQuestionIndex}`;
    const newMap = new Map(cardAnswers);
    newMap.delete(key);
    setCardAnswers(newMap);

    // ✅ Persistencia inmediata al cambiar respuesta
    try { localStorage.setItem(LS_ANSWERS, JSON.stringify(Array.from(newMap.entries()))); } catch {}

    setSelectedOption(null);
    setShowExplanation(false);
  };

  // --- SALIR sin borrar & RESETEAR solo progreso ---
  const exitToHome = () => {
    setIsStudying(false);
    setStudyingTopic(null);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const resetProgress = () => {
    setCardAnswers(new Map());
    try { localStorage.removeItem(LS_ANSWERS); } catch {}
    setIsStudying(false);
    setStudyingTopic(null);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // --- Eliminar por tema con persistencia inmediata ---
  const deleteTopicCards = (topic: string) => {
    setStudyCards(prev => {
      const filtered = prev.filter(card => card.topic !== topic);
      try { localStorage.setItem(LS_CARDS, JSON.stringify(filtered)); } catch {}
      return filtered;
    });

    setCardAnswers(prev => {
      const next = new Map(prev);
      // elimina respuestas de tarjetas del tema borrado
      for (const [key, ans] of next.entries()) {
        const card = studyCards.find(c => c.id === ans.cardId);
        if (card && card.topic === topic) next.delete(key);
      }
      try { localStorage.setItem(LS_ANSWERS, JSON.stringify(Array.from(next.entries()))); } catch {}
      return next;
    });
  };

  // --- Agrupar y métricas ---
  const groupedCards = studyCards.reduce((acc, card) => {
    if (!acc[card.topic]) acc[card.topic] = [];
    acc[card.topic].push(card);
    return acc;
  }, {} as Record<string, StudyCard[]>);

  const getTopicProgress = (topic: string): number => {
    const topicCards = groupedCards[topic] || [];
    const totalQuestions = topicCards.reduce((sum, card) => sum + card.questions.length, 0);
    const answeredQuestions = topicCards.reduce((sum, card) => {
      return sum + card.questions.filter((_, index) => cardAnswers.has(`${card.id}-${index}`)).length;
    }, 0);
    if (totalQuestions === 0) return 0;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getTopicGrade = (topic: string) => {
    const topicCards = groupedCards[topic] || [];
    let totalPoints = 0;
    let earnedPoints = 0;
    let answeredQuestions = 0;
    let correctAnswers = 0;

    topicCards.forEach(card => {
      card.questions.forEach((_, index) => {
        totalPoints += card.pointsPerQuestion;
        const answer = cardAnswers.get(`${card.id}-${index}`);
        if (answer) {
          answeredQuestions++;
          earnedPoints += answer.pointsEarned;
          if (answer.isCorrect) correctAnswers++;
        }
      });
    });

    return {
      current: Math.round(earnedPoints * 100) / 100,
      total: Math.round(totalPoints * 100) / 100,
      percentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0,
      answered: answeredQuestions,
      totalQuestions: topicCards.reduce((sum, card) => sum + card.questions.length, 0),
      correct: correctAnswers,
    };
  };

  const getCardStats = (card: StudyCard) => {
    let earnedPoints = 0;
    let totalPoints = 0;
    let answeredQuestions = 0;
    let correctAnswers = 0;

    card.questions.forEach((_, index) => {
      totalPoints += card.pointsPerQuestion;
      const answer = cardAnswers.get(`${card.id}-${index}`);
      if (answer) {
        answeredQuestions++;
        earnedPoints += answer.pointsEarned;
        if (answer.isCorrect) correctAnswers++;
      }
    });

    const completionPercentage = Math.round((answeredQuestions / card.questions.length) * 100);
    const gradePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    return {
      earnedPoints: Math.round(earnedPoints * 100) / 100,
      totalPoints: Math.round(totalPoints * 100) / 100,
      answeredQuestions,
      totalQuestions: card.questions.length,
      correctAnswers,
      completionPercentage,
      gradePercentage,
      isComplete: answeredQuestions === card.questions.length,
    };
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  // --- Vistas ---
  if (showResults) {
    const currentCards = studyingTopic ? studyCards.filter(card => card.topic === studyingTopic) : studyCards;

    let totalPoints = 0;
    let earnedPoints = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;

    currentCards.forEach(card => {
      card.questions.forEach((_, index) => {
        totalQuestions++;
        totalPoints += card.pointsPerQuestion;
        const answer = cardAnswers.get(`${card.id}-${index}`);
        if (answer) {
          earnedPoints += answer.pointsEarned;
          if (answer.isCorrect) correctAnswers++;
        }
      });
    });

    const finalGrade = Math.round(earnedPoints * 100) / 100;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const letterGrade = getLetterGrade(percentage);

    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white border-2 border-black rounded-xl">
        <div className="text-center space-y-4">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
          <h2 className="text-3xl font-bold text-black">
            {studyingTopic ? `Resultados: ${studyingTopic}` : 'Sesión Completada'}
          </h2>

          <div className="bg-white border-2 border-black rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-6xl font-bold text-yellow-600">{finalGrade}/100</div>
              <div className="text-5xl font-bold px-6 py-3 rounded-lg bg-yellow-300 border-2 border-black text-black">
                {letterGrade}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xl text-black">
                Calificación Final: <span className="font-bold text-yellow-600">{finalGrade} puntos</span>
              </p>
              <p className="text-lg text-black">
                {correctAnswers} de {totalQuestions} respuestas correctas ({percentage}%)
              </p>
              <p className="text-sm text-gray-700">
                Cada pregunta correcta valía {currentCards[0]?.pointsPerQuestion || 0} puntos
              </p>
            </div>

            <div className="border-t-2 border-black pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3 text-black">Desglose por Tarjeta:</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentCards.map(card => {
                  const stats = getCardStats(card);
                  return (
                    <div key={card.id} className="p-3 bg-white border-2 border-black rounded-lg text-center">
                      <div className="text-sm font-bold text-black">Tarjeta #{card.cardNumber}</div>
                      <div className="text-2xl font-bold text-yellow-600 mt-1">{stats.gradePercentage}%</div>
                      <div className="text-xs text-gray-700 mt-1">
                        {stats.correctAnswers}/{stats.totalQuestions} correctas
                      </div>
                      <div className="text-xs font-bold text-yellow-600">
                        {stats.earnedPoints}/{stats.totalPoints} pts
                      </div>
                      {stats.isComplete && <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentCardIndex(0);
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setShowExplanation(false);
                }}
                className="bg-white border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
              >
                Estudiar de Nuevo
              </button>

              <button
                onClick={exitToHome}
                className="bg-yellow-400 border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Volver al Inicio
              </button>

              <button
                onClick={resetProgress}
                className="bg-white border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                title="Borra todas las respuestas, pero mantiene las tarjetas"
              >
                Reiniciar progreso
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generador
  if (showGenerator) {
    const pointsPerQuestionPreview = Math.round((100 / TOTAL_QUESTIONS) * 100) / 100;

    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white">
        <button
          onClick={() => setShowGenerator(false)}
          className="flex items-center gap-2 text-black hover:text-yellow-600 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" /> Volver
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border-black border">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-yellow-500">
            <Brain className="h-7 w-7" /> Generar 5 Tarjetas de Estudio
          </h2>

          {!apiKey && (
            <div className="bg-yellow-50 border border-black rounded-lg p-4 text-yellow-800">
              <p className="font-semibold">⚠️ Configuración requerida</p>
              <p className="text-sm mt-1">
                Agrega <code className="bg-yellow-100 px-1 rounded">REACT_APP_GOOGLE_AI_API_KEY</code> a tu archivo
                .env y reinicia el servidor.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Tema específico</label>
              <input
                type="text"
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                placeholder="Ej: Revolución Francesa, Mitosis, React Hooks..."
                className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                disabled={isGenerating || !apiKey}
              />
            </div>

            <div className="bg-yellow-50 border border-black rounded-lg p-3">
              <p className="text-yellow-700 text-sm mb-2">
                <strong>Se generarán siempre 5 tarjetas</strong> con <strong>5 preguntas por tarjeta</strong> (=
                <strong> {TOTAL_QUESTIONS}</strong> preguntas en total).
              </p>
              <p className="text-yellow-600 text-xs font-medium">
                📊 Cada pregunta correcta valdrá {pointsPerQuestionPreview} puntos (total 100).
                <br />
                🎲 Las dificultades (básico, intermedio, avanzado) se asignarán automáticamente a cada tarjeta.
              </p>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-black">
                  <span>Generando 5 tarjetas con 5 preguntas por tarjeta sobre {newTopic}...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateCards}
              disabled={!newTopic.trim() || !apiKey || isGenerating}
              className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" /> Generando 5 Tarjetas...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" /> Generar 5 Tarjetas (5 preguntas c/u)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Estudio
  if (isStudying && !showResults) {
    const topicCards = studyingTopic ? studyCards.filter(card => card.topic === studyingTopic) : studyCards;

    if (topicCards.length === 0) {
      return (
        <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white">
          <button
            onClick={exitToHome}
            className="flex items-center gap-2 text-black border border-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" /> Volver
          </button>
          <p className="text-center text-black">No hay tarjetas para estudiar.</p>
        </div>
      );
    }

    const currentCard = topicCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];

    const totalQuestionsStudied =
      topicCards.slice(0, currentCardIndex).reduce((sum, card) => sum + card.questions.length, 0) +
      currentQuestionIndex +
      1;
    const totalQuestions = topicCards.reduce((sum, card) => sum + card.questions.length, 0);
    const progress = totalQuestions > 0 ? (totalQuestionsStudied / totalQuestions) * 100 : 0;

    let earnedPoints = 0;
    topicCards.forEach(card => {
      card.questions.forEach((_, index) => {
        const answer = cardAnswers.get(`${card.id}-${index}`);
        if (answer) earnedPoints += answer.pointsEarned;
      });
    });

    const currentCardStats = getCardStats(currentCard);

    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white border-2 border-black rounded-xl">
        <div className="flex justify-between items-center">
          <button
            onClick={exitToHome}
            className="flex items-center gap-2 text-black border border-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" /> Salir
          </button>

          <div className="text-right">
            <div className="text-sm text-black">
              Tarjeta {currentCardIndex + 1} de {topicCards.length} - Pregunta {currentQuestionIndex + 1} de{' '}
              {currentCard.questions.length}
            </div>
            <div className="text-sm font-bold text-yellow-600">Calificación: {Math.round(earnedPoints * 100) / 100}/100 pts</div>
            {studyingTopic && <div className="text-xs text-gray-500">{studyingTopic}</div>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Selecciona tarjeta</label>
          <select
            className="w-full border-2 border-black rounded-lg p-2 bg-white"
            value={currentCardIndex}
            onChange={e => {
              setCurrentCardIndex(parseInt(e.target.value));
              setCurrentQuestionIndex(0);
            }}
          >
            {topicCards.map((card, idx) => (
              <option key={card.id} value={idx}>
                Tarjeta #{card.cardNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full bg-gray-2 00 border border-black rounded-full h-2 mb-6">
          <div className="bg-yellow-400 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="bg-yellow-50 border-2 border-black rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-black">Tarjeta #{currentCard.cardNumber}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold border border-black`}>{currentCardStats.gradePercentage}%</span>
            </div>
            <div className="text-sm text-black">
              {currentCardStats.correctAnswers}/{currentCardStats.answeredQuestions} correctas •{' '}
              <span className="font-bold text-yellow-600 ml-1">
                {currentCardStats.earnedPoints}/{currentCardStats.totalPoints} pts
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-yellow-100 text-black border border-black px-3 py-1 rounded-full text-sm font-medium">
                {currentCard.topic}
              </span>
              <span className="bg-gray-100 text-black border border-black px-2 py-1 rounded-full text-sm">
                Tarjeta #{currentCard.cardNumber}
              </span>
              <span className="bg-yellow-200 text-black border border-black px-2 py-1 rounded-full text-sm">
                {currentCard.difficulty}
              </span>
              <span className="bg-yellow-300 text-black border border-black px-2 py-1 rounded-full text-xs font-bold">
                Vale {currentCard.pointsPerQuestion} pts
              </span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-6">{currentQuestion?.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              let buttonClass = 'w-full text-left p-4 border-2 border-black rounded-lg transition-all';
              if (selectedOption !== null) {
                if (index === currentCard.questions[currentQuestionIndex].correctAnswer) {
                  buttonClass += ' bg-green-200 text-black';
                } else if (index === selectedOption && index !== currentCard.questions[currentQuestionIndex].correctAnswer) {
                  buttonClass += ' bg-red-200 text-black';
                } else {
                  buttonClass += ' bg-gray-100 text-black';
                }
              } else {
                buttonClass += ' hover:bg-yellow-100';
              }
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={buttonClass}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-yellow-50 border-2 border-black rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-black mb-2">Explicación:</h4>
              <p className="text-black">{currentQuestion?.explanation}</p>

              <div className="mt-3 flex flex-col gap-2">
                {selectedOption === currentQuestion?.correctAnswer ? (
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-200 border border-black rounded">
                    <CheckCircle className="h-5 w-5 text-green-800" />
                    <span className="font-bold text-black">¡Correcto! +{currentCard.pointsPerQuestion} puntos</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 p-3 bg-red-200 border border-black rounded">
                    <XCircle className="h-5 w-5 text-red-800" />
                    <span className="font-bold text-black">Incorrecto. 0 puntos</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={nextQuestion}
                    className="flex-1 bg-yellow-400 border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-bold"
                  >
                    {currentQuestionIndex + 1 >= currentCard.questions.length && currentCardIndex + 1 >= topicCards.length
                      ? 'Ver Resultados Finales'
                      : 'Siguiente Pregunta →'}
                  </button>

                  <button
                    onClick={changeAnswer}
                    className="bg-white border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-yellow-100 transition-colors font-semibold"
                  >
                    Cambiar respuesta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inicio
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white rounded-2xl">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          🧠 Tarjetas de Estudio con IA
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Crea exactamente 5 tarjetas de estudio con IA por tema. Cada tarjeta trae 5 preguntas (total 25).
          <span className="block mt-2 text-yellow-500 font-medium">🎯 Cada pregunta correcta suma puntos hasta llegar a 100.</span>
          <span className="block mt-1 text-gray-500 text-sm">
            🎲 Las dificultades se asignan automáticamente a cada tarjeta: básico, intermedio o avanzado.
          </span>
        </p>
      </div>

      <div className="grid justify-center gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-black border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-6 w-6 text-yellow-500" /> Crear / Estudiar
          </h2>
          <p className="text-gray-600 mb-4">Genera siempre 5 tarjetas de estudio sobre cualquier tema (5 preguntas por tarjeta).</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowGenerator(true)}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all"
            >
              <Brain className="h-5 w-5" /> Generar 5 Tarjetas
            </button>
            <button
              onClick={startStudySession}
              className="flex-1 min-w-[200px] bg-white border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-100 transition-all"
            >
              Estudiar todo
            </button>
            <button
              onClick={resetProgress}
              className="flex-1 min-w-[200px] bg-white border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-all"
              title="Borra solo respuestas, mantiene tarjetas"
            >
              Reiniciar progreso
            </button>
          </div>
        </div>
      </div>

      {Object.keys(groupedCards).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-black border md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" /> Progreso por Tema
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-black rounded-lg overflow-hidden">
              <thead className="bg-yellow-100 border-b-2 border-black">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-bold text-black border-r-2 border-black">Tema</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-black border-r-2 border-black">Progreso</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-black border-r-2 border-black">Correctas</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-black border-r-2 border-black">Calificación</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-black">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedCards).map(topic => {
                  const progress = getTopicProgress(topic);
                  const grade = getTopicGrade(topic);
                  return (
                    <tr key={topic} className="border-b border-black">
                      <td className="px-4 py-2 font-medium text-black border-r border-black">{topic}</td>
                      <td className="px-4 py-2 text-center text-black border-r border-black">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-600">{progress}%</span>
                      </td>
                      <td className="px-4 py-2 text-center text-black border-r border-black">
                        {grade.correct}/{grade.totalQuestions}
                      </td>
                      <td className="px-4 py-2 text-center border-r border-black">
                        <span className={`px-2 py-1 rounded text-sm font-bold ${getGradeColor(grade.percentage)}`}>
                          {grade.percentage}% ({getLetterGrade(grade.percentage)})
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center flex justify-center gap-2">
                        <button
                          onClick={() => startTopicStudy(topic)}
                          className="bg-yellow-400 border-2 border-black text-black px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
                        >
                          <Play className="h-4 w-4 inline-block mr-1" /> Estudiar
                        </button>
                        <button
                          onClick={() => deleteTopicCards(topic)}
                          className="bg-red-400 border-2 border-black text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-500 transition"
                        >
                          <XCircle className="h-4 w-4 inline-block mr-1" /> Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
