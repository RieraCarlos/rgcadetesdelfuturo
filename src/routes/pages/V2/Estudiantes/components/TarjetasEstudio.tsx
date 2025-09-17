import React, { useState } from 'react';
import { Brain, Loader, ChevronLeft, CheckCircle, XCircle, Trophy, RotateCcw, Plus, Play, BookOpen, Star, Award } from 'lucide-react';

// Interfaces
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
  cardNumber: number; // Número de tarjeta (1-5)
  pointsPerQuestion: number; // Valor en puntos de cada pregunta
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

export default function TarjetasEstudioIA() {
  const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;

  const [showGenerator, setShowGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [newTopic, setNewTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);

  const [studyCards, setStudyCards] = useState<StudyCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardAnswers, setCardAnswers] = useState<Map<string, CardAnswer>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [studyingTopic, setStudyingTopic] = useState<string | null>(null);

      // ---------- Generación de 5 tarjetas de estudio con preguntas únicas ----------
    const generateAICards = async (topic: string, questionsPerCard: number): Promise<StudyCard[]> => {
      const difficulties: ('básico' | 'intermedio' | 'avanzado')[] = ['básico', 'intermedio', 'avanzado'];
      const totalQuestions = questionsPerCard * 5; // 5 tarjetas

      const prompt = `Genera ${totalQuestions} preguntas de opción múltiple sobre "${topic}" con dificultad variada.
    RESPONDE SOLO CON JSON EXACTO:
    [
      {
        "question": "Pregunta sobre ${topic}",
        "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
        "correctAnswer": 0,
        "explanation": "Explicación breve sin saltos de línea ni comillas internas"
      }
    ]

    REGLAS:
    - Solo JSON válido
    - Cada pregunta debe ser única
    - Exactamente ${totalQuestions} preguntas
    - Mezcla preguntas fáciles, intermedias y difíciles`;

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 4000, candidateCount: 1 },
          }),
        });

        if (!response.ok) throw new Error(`Error de API ${response.status}: ${response.statusText}`);
        const data = await response.json();
        let content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!content) throw new Error('Respuesta de API inválida');

        // Limpiar texto y extraer JSON
        content = content.replace(/```json\s*|```/gi, '').replace(/^[^[{]*/, '').replace(/[^}\]]*$/, '');
        const questions: Question[] = JSON.parse(content);

        if (!Array.isArray(questions) || questions.length < totalQuestions) 
          throw new Error('No se generaron suficientes preguntas únicas');

        // Mezclar preguntas
        const shuffled = questions.sort(() => Math.random() - 0.5);

        // Distribuir en 5 tarjetas sin repetir
        const pointsPerQuestion = Math.round((100 / totalQuestions) * 100) / 100;
        const cards: StudyCard[] = [];

        for (let i = 0; i < 5; i++) {
          const cardQuestions = shuffled.slice(i * questionsPerCard, (i + 1) * questionsPerCard);
          const cardDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

          cards.push({
            id: `${Date.now()}-${Math.random()}-${i}`,
            topic,
            questions: cardQuestions,
            difficulty: cardDifficulty,
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
      const newCards = await generateAICards(newTopic, numQuestions);
      setStudyCards([...studyCards, ...newCards]);
      setGenerationProgress(100);
      
      const totalQuestions = newCards.reduce((sum, card) => sum + card.questions.length, 0);
      setTimeout(() => {
        alert(`¡Éxito! Se generaron 5 tarjetas sobre: ${newTopic} con ${totalQuestions} preguntas distribuidas (${Math.round((100/totalQuestions)*100)/100} puntos por pregunta)`);
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

  const startStudySession = () => {
    if (studyCards.length === 0) return alert('Primero genera algunas tarjetas de estudio');
    setIsStudying(true);
    setStudyingTopic(null);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setCardAnswers(new Map());
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
    setCardAnswers(new Map());
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    const currentCards = studyingTopic 
      ? studyCards.filter(card => card.topic === studyingTopic)
      : studyCards;
    const currentCard = currentCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];
    
    if (cardAnswers.has(`${currentCard.id}-${currentQuestionIndex}`) || selectedOption !== null) return;

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

    const newCardAnswers = new Map(cardAnswers);
    newCardAnswers.set(`${currentCard.id}-${currentQuestionIndex}`, newAnswer);
    setCardAnswers(newCardAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const currentCards = studyingTopic 
      ? studyCards.filter(card => card.topic === studyingTopic)
      : studyCards;
    const currentCard = currentCards[currentCardIndex];
      
    if (currentQuestionIndex + 1 < currentCard.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else if (currentCardIndex + 1 < currentCards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const restartStudy = () => {
    setIsStudying(false);
    setStudyingTopic(null);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setCardAnswers(new Map());
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const deleteTopicCards = (topic: string) => {
    setStudyCards(studyCards.filter(card => card.topic !== topic));
  };

  // Agrupar tarjetas por tema
  const groupedCards = studyCards.reduce((acc, card) => {
    if (!acc[card.topic]) {
      acc[card.topic] = [];
    }
    acc[card.topic].push(card);
    return acc;
  }, {} as Record<string, StudyCard[]>);

  // Calcular progreso por tema
  const getTopicProgress = (topic: string): number => {
    const topicCards = groupedCards[topic];
    const totalQuestions = topicCards.reduce((sum, card) => sum + card.questions.length, 0);
    const answeredQuestions = topicCards.reduce((sum, card) => {
      return sum + card.questions.filter((_, index) => 
        cardAnswers.has(`${card.id}-${index}`)
      ).length;
    }, 0);
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Calcular calificación por tema
  const getTopicGrade = (topic: string) => {
    const topicCards = groupedCards[topic];
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
      correct: correctAnswers
    };
  };

  // Calcular estadísticas detalladas de una tarjeta
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
      isComplete: answeredQuestions === card.questions.length
    };
  };

  // Función para obtener el color según la calificación
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Función para obtener letra de calificación
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  // ---------- Vista de resultados ----------
  if (showResults) {
    const currentCards = studyingTopic 
      ? studyCards.filter(card => card.topic === studyingTopic)
      : studyCards;
    
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
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
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
                Calificación Final:{" "}
                <span className="font-bold text-yellow-600">{finalGrade} puntos</span>
              </p>
              <p className="text-lg text-black">
                {correctAnswers} de {totalQuestions} respuestas correctas ({percentage}%)
              </p>
              <p className="text-sm text-gray-700">
                Cada pregunta correcta valía {currentCards[0]?.pointsPerQuestion || 0} puntos
              </p>
            </div>
            
            {/* Desglose por tarjeta */}
            <div className="border-t-2 border-black pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3 text-black">Desglose por Tarjeta:</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentCards.map((card) => {
                  const stats = getCardStats(card);
                  return (
                    <div 
                      key={card.id} 
                      className="p-3 bg-white border-2 border-black rounded-lg text-center"
                    >
                      <div className="text-sm font-bold text-black">Tarjeta #{card.cardNumber}</div>
                      <div className="text-2xl font-bold text-yellow-600 mt-1">
                        {stats.gradePercentage}%
                      </div>
                      <div className="text-xs text-gray-700 mt-1">
                        {stats.correctAnswers}/{stats.totalQuestions} correctas
                      </div>
                      <div className="text-xs font-bold text-yellow-600">
                        {stats.earnedPoints}/{stats.totalPoints} pts
                      </div>
                      {stats.isComplete && (
                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={restartStudy}
                className="bg-yellow-400 border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Volver al Inicio
              </button>
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
            </div>
          </div>
        </div>
      </div>
    );
  }


    // ---------- Vista del generador ----------
  if (showGenerator) {
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
                Agrega <code className="bg-yellow-100 px-1 rounded">REACT_APP_GOOGLE_AI_API_KEY</code> a tu archivo .env y reinicia el servidor.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Tema específico</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Ej: Revolución Francesa, Mitosis, React Hooks..."
                className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                disabled={isGenerating || !apiKey}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Número de preguntas</label>
                <select
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  disabled={isGenerating}
                >
                  {[5, 10, 15, 20, 25, 30].map(num => (
                    <option key={num} value={num}>{num} preguntas</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-yellow-50 border border-black rounded-lg p-3">
              <p className="text-yellow-700 text-sm mb-2">
                <strong>Se generarán siempre 5 tarjetas</strong> con las {numQuestions} preguntas distribuidas entre ellas 
                ({Math.floor(numQuestions/5)} - {Math.ceil(numQuestions/5)} preguntas por tarjeta).
              </p>
              <p className="text-yellow-600 text-xs font-medium">
                📊 Cada pregunta correcta valdrá {Math.round((100 / numQuestions) * 100) / 100} puntos para una calificación total de 100.
                <br />
                🎲 Las dificultades (básico, intermedio, avanzado) se asignarán automáticamente a cada tarjeta.
              </p>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-black">
                  <span>Generando 5 tarjetas con {numQuestions} preguntas sobre {newTopic}...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${generationProgress}%` }}
                  ></div>
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
                  <Brain className="h-5 w-5" /> Generar 5 Tarjetas con {numQuestions} Preguntas
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Vista de estudio ----------
  if (isStudying && !showResults) {
    const topicCards = studyingTopic
      ? studyCards.filter(card => card.topic === studyingTopic)
      : [];
    const currentCard = topicCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];

    // Calcular progreso total
    const totalQuestionsStudied =
      topicCards.slice(0, currentCardIndex).reduce((sum, card) => sum + card.questions.length, 0) +
      currentQuestionIndex + 1;
    const totalQuestions = topicCards.reduce((sum, card) => sum + card.questions.length, 0);
    const progress = (totalQuestionsStudied / totalQuestions) * 100;

    // Calcular calificación actual
    let earnedPoints = 0;
    topicCards.forEach(card => {
      card.questions.forEach((_, index) => {
        const answer = cardAnswers.get(`${card.id}-${index}`);
        if (answer) {
          earnedPoints += answer.pointsEarned;
        }
      });
    });

    // Calcular estadísticas de la tarjeta actual
    const currentCardStats = getCardStats(currentCard);

    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white border-2 border-black rounded-xl">
        <div className="flex justify-between items-center">
          <button
            onClick={restartStudy}
            className="flex items-center gap-2 text-black border border-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" /> Salir
          </button>

          <div className="text-right">
            <div className="text-sm text-black">
              Tarjeta {currentCardIndex + 1} de {topicCards.length} - Pregunta{" "}
              {currentQuestionIndex + 1} de {currentCard.questions.length}
            </div>
            <div className="text-sm font-bold text-yellow-600">
              Calificación: {Math.round(earnedPoints * 100) / 100}/100 pts
            </div>
            {studyingTopic && (
              <div className="text-xs text-gray-500">{studyingTopic}</div>
            )}
          </div>
        </div>

        {/* Selector de tarjetas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">
            Selecciona tarjeta
          </label>
          <select
            className="w-full border-2 border-black rounded-lg p-2 bg-white"
            value={currentCardIndex}
            onChange={(e) => {
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

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 border border-black rounded-full h-2 mb-6">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Indicador de progreso de tarjeta actual */}
        <div className="bg-yellow-50 border-2 border-black rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-black">
                Tarjeta #{currentCard.cardNumber}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-bold border border-black`}
              >
                {currentCardStats.gradePercentage}%
              </span>
            </div>
            <div className="text-sm text-black">
              {currentCardStats.correctAnswers}/{currentCardStats.answeredQuestions} correctas •{" "}
              <span className="font-bold text-yellow-600 ml-1">
                {currentCardStats.earnedPoints}/{currentCardStats.totalPoints} pts
              </span>
            </div>
          </div>
        </div>

        {/* Contenedor principal */}
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
            <h3 className="text-xl font-semibold text-black mb-6">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass =
                "w-full text-left p-4 border-2 border-black rounded-lg transition-all";
              if (selectedOption !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " bg-green-200 text-black";
                } else if (
                  index === selectedOption &&
                  index !== currentQuestion.correctAnswer
                ) {
                  buttonClass += " bg-red-200 text-black";
                } else {
                  buttonClass += " bg-gray-100 text-black";
                }
              } else {
                buttonClass += " hover:bg-yellow-100";
              }
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={buttonClass}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-yellow-50 border-2 border-black rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-black mb-2">Explicación:</h4>
              <p className="text-black">{currentQuestion.explanation}</p>
              {selectedOption === currentQuestion.correctAnswer ? (
                <div className="mt-3">
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-200 border border-black rounded">
                    <CheckCircle className="h-5 w-5 text-green-800" />
                    <span className="font-bold text-black">
                      ¡Correcto! +{currentCard.pointsPerQuestion} puntos
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="flex items-center justify-center gap-2 p-3 bg-red-200 border border-black rounded">
                    <XCircle className="h-5 w-5 text-red-800" />
                    <span className="font-bold text-black">Incorrecto. 0 puntos</span>
                  </div>
                </div>
              )}
              <button
                onClick={nextQuestion}
                className="mt-4 w-full bg-yellow-400 border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-bold"
              >
                {currentQuestionIndex + 1 >= currentCard.questions.length &&
                currentCardIndex + 1 >= topicCards.length
                  ? "Ver Resultados Finales"
                  : "Siguiente Pregunta →"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }


  // ---------- Vista principal ----------
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          🧠 Tarjetas de Estudio con IA
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Crea exactamente 5 tarjetas de estudio con IA por tema. Las preguntas se distribuyen equitativamente entre las 5 tarjetas.
          <span className="block mt-2 text-yellow-500 font-medium">
            🎯 Sistema de calificación: Cada pregunta correcta suma puntos para llegar a 100%.
          </span>
          <span className="block mt-1 text-gray-500 text-sm">
            🎲 Las dificultades se asignan automáticamente a cada tarjeta: básico, intermedio o avanzado.
          </span>
        </p>
      </div>

      <div className="grid justify-center gap-6">
        {/* Card Crear */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-black border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-6 w-6 text-yellow-500" /> Crear Tarjetas
          </h2>
          <p className="text-gray-600 mb-4">
            Genera siempre 5 tarjetas de estudio sobre cualquier tema. Las dificultades se asignan aleatoriamente y cada pregunta correcta suma puntos.
          </p>
          <button 
            onClick={() => setShowGenerator(true)} 
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all"
          >
            <Brain className="h-5 w-5" /> Generar 5 Tarjetas
          </button>
        </div>
      </div>

      {/* Tabla de progreso por temas */}
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
                {Object.keys(groupedCards).map((topic) => {
                  const progress = getTopicProgress(topic);
                  const grade = getTopicGrade(topic);
                  return (
                    <tr key={topic} className="border-b border-black">
                      <td className="px-4 py-2 font-medium text-black border-r border-black">{topic}</td>
                      <td className="px-4 py-2 text-center text-black border-r border-black">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{progress}%</span>
                      </td>
                      <td className="px-4 py-2 text-center text-black border-r border-black">
                        {grade.correct}/{grade.totalQuestions}
                      </td>
                      <td className="px-4 py-2 text-center border-r border-black">
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${getGradeColor(
                            grade.percentage
                          )}`}
                        >
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