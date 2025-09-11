import React, { useState } from 'react';
import { Brain, Loader, ChevronLeft, CheckCircle, XCircle, Trophy, RotateCcw, Plus, Play } from 'lucide-react';

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
  generatedByAI: boolean;
}

interface CardAnswer {
  cardId: string;
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent?: number;
}

export default function TarjetasEstudioIA() {
  const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;

  const [showGenerator, setShowGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [newTopic, setNewTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'básico' | 'intermedio' | 'avanzado'>('intermedio');
  const [numQuestions, setNumQuestions] = useState(5);

  const [studyCards, setStudyCards] = useState<StudyCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardAnswers, setCardAnswers] = useState<Map<string, CardAnswer>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Generar tarjeta con Google AI API
  const generateAICard = async (topic: string, difficulty: string, numQuestions: number): Promise<StudyCard> => {
    const prompt = `Responde ÚNICAMENTE con un objeto JSON válido. Genera ${numQuestions} preguntas sobre "${topic}" nivel ${difficulty}.

Formato exacto requerido:
[
  {
    "question": "Pregunta sobre ${topic}?",
    "options": ["Respuesta correcta", "Opción incorrecta 1", "Opción incorrecta 2", "Opción incorrecta 3"],
    "correctAnswer": 0,
    "explanation": "Explicación clara de por qué la primera opción es correcta"
  }
]

IMPORTANTE: 
- Responde SOLO con JSON, sin texto antes o después
- Cada pregunta debe tener 4 opciones
- La posición de la respuesta correcta debe estar indicada en correctAnswer
- No uses saltos de línea dentro de las cadenas de texto
- Genera preguntas únicas y diferentes`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Error de API ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Respuesta de API inválida: estructura inesperada');
      }

      let content = data.candidates[0].content.parts[0].text;
      content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No se encontró JSON válido en la respuesta');

      let questions: Question[];
      try {
        questions = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('Error al parsear JSON:', parseError);
        throw new Error(`Error al parsear JSON: ${parseError.message}`);
      }

      // Validar cada pregunta
      questions.forEach(q => {
        if (!q.question || !q.options || q.options.length !== 4 || typeof q.correctAnswer !== 'number' || !q.explanation) {
          throw new Error('Estructura de pregunta inválida');
        }
      });

      return {
        id: `${Date.now()}-${Math.random()}`,
        topic,
        questions,
        difficulty: difficulty as 'básico' | 'intermedio' | 'avanzado',
        generatedByAI: true,
      };
    } catch (error) {
      console.error('Error completo en generateAICard:', error);
      throw error;
    }
  };

  const handleGenerateCards = async () => {
    if (!apiKey) return alert('Error: REACT_APP_GOOGLE_AI_API_KEY no configurada');
    if (!newTopic.trim()) return alert('Por favor ingresa un tema');

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const newCard = await generateAICard(newTopic, difficulty, numQuestions);
      setStudyCards([...studyCards, newCard]);
      alert(`¡Éxito! Se generaron ${newCard.questions.length} preguntas en una tarjeta sobre: ${newTopic}`);
      setNewTopic('');
      setShowGenerator(false);
    } catch (error: any) {
      console.error(error);
      alert('Error al generar la tarjeta: ' + error.message);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const startStudySession = () => {
    if (studyCards.length === 0) return alert('Primero genera algunas preguntas de estudio');
    setIsStudying(true);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setCardAnswers(new Map());
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    const currentCard = studyCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];
    if (cardAnswers.has(`${currentCard.id}-${currentQuestionIndex}`) || selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    const newAnswer: CardAnswer = {
      cardId: currentCard.id,
      questionIndex: currentQuestionIndex,
      selectedOption: optionIndex,
      isCorrect,
    };

    const newCardAnswers = new Map(cardAnswers);
    newCardAnswers.set(`${currentCard.id}-${currentQuestionIndex}`, newAnswer);
    setCardAnswers(newCardAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const currentCard = studyCards[currentCardIndex];
    if (currentQuestionIndex + 1 < currentCard.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else if (currentCardIndex + 1 < studyCards.length) {
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
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setCardAnswers(new Map());
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const deleteCard = (cardId: string) => {
    setStudyCards(studyCards.filter(card => card.id !== cardId));
  };

  // Calcular porcentaje de progreso de una tarjeta
  const getCardProgress = (card: StudyCard): number => {
    const answeredQuestions = card.questions.filter((_, index) => 
      cardAnswers.has(`${card.id}-${index}`)
    ).length;
    return Math.round((answeredQuestions / card.questions.length) * 100);
  };

  // Iniciar estudio de una tarjeta específica
  const startSpecificCardStudy = (cardIndex: number) => {
    setIsStudying(true);
    setCurrentCardIndex(cardIndex);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // ------------------ Vistas ------------------

  if (showGenerator) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6">
        <button onClick={() => setShowGenerator(false)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ChevronLeft className="h-5 w-5" /> Volver
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-600">
            <Brain className="h-7 w-7" /> Generar Preguntas del Tema
          </h2>

          {!apiKey && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-semibold">⚠️ Configuración requerida</p>
              <p className="text-sm mt-1">
                Agrega <code className="bg-red-100 px-1 rounded">REACT_APP_GOOGLE_AI_API_KEY</code> a tu archivo .env y reinicia el servidor.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tema específico</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Ej: Revolución Francesa, Mitosis, React Hooks..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                disabled={isGenerating || !apiKey}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de dificultad</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'básico' | 'intermedio' | 'avanzado')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isGenerating}
                >
                  <option value="básico">Básico</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de preguntas</label>
                <select
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isGenerating}
                >
                  {[5, 10, 15, 20].map(num => (
                    <option key={num} value={num}>{num} preguntas</option>
                  ))}
                </select>
              </div>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Generando preguntas sobre {newTopic}...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: `${generationProgress}%` }}></div>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateCards}
              disabled={!newTopic.trim() || !apiKey || isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" /> Generando {numQuestions} preguntas...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" /> Generar {numQuestions} Preguntas
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
    const currentCard = studyCards[currentCardIndex];
    const currentQuestion = currentCard.questions[currentQuestionIndex];
    const progress = ((currentCardIndex + currentQuestionIndex / currentCard.questions.length + 1) / studyCards.reduce((sum, c) => sum + c.questions.length, 0)) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6">
        <div className="flex justify-between items-center">
          <button onClick={restartStudy} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronLeft className="h-5 w-5" /> Salir
          </button>
          <span className="text-sm text-gray-500">
            Pregunta {currentQuestionIndex + 1} de {currentCard.questions.length} (Tarjeta {currentCardIndex + 1} de {studyCards.length})
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {currentCard.topic} • {currentCard.difficulty}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 border-2 rounded-lg transition-all hover:border-purple-300";
              if (selectedOption !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " border-green-500 bg-green-50 text-green-700";
                } else if (index === selectedOption && index !== currentQuestion.correctAnswer) {
                  buttonClass += " border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                buttonClass += " border-gray-200 hover:bg-purple-50";
              }
              return (
                <button key={index} onClick={() => handleOptionSelect(index)} disabled={selectedOption !== null} className={buttonClass}>
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">Explicación:</h4>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
              <button onClick={nextQuestion} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                {currentQuestionIndex + 1 >= currentCard.questions.length && currentCardIndex + 1 >= studyCards.length ? 'Ver Resultados' : 'Siguiente Pregunta'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------- Vista principal ----------
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🧠 Tarjetas de Estudio con IA
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Crea tarjetas de estudio personalizadas con IA. Cada tarjeta puede tener entre 5 y 20 preguntas sobre cualquier tema con explicaciones detalladas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-6 w-6 text-purple-500" /> Crear Preguntas
          </h2>
          <p className="text-gray-600 mb-4">
            Genera varias preguntas dentro de una sola tarjeta usando IA sobre cualquier tema.
          </p>
          <button onClick={() => setShowGenerator(true)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all">
            <Brain className="h-5 w-5" /> Generar con IA
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="h-6 w-6 text-blue-500" /> Estudiar
          </h2>
          <p className="text-gray-600 mb-4">Practica con tus tarjetas generadas y obtén estadísticas de tu rendimiento.</p>
          <button onClick={startStudySession} disabled={studyCards.length === 0} className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors">
            <Play className="h-5 w-5" /> Empezar Estudio ({studyCards.length} tarjetas)
          </button>
        </div>
      </div>

      {studyCards.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tus Tarjetas de Estudio ({studyCards.length})</h3>
          <div className="grid gap-4">
            {studyCards.map((card, index) => {
              const progress = getCardProgress(card);
              const answeredCount = card.questions.filter((_, qIndex) => 
                cardAnswers.has(`${card.id}-${qIndex}`)
              ).length;
              
              return (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">{card.topic}</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{card.difficulty}</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          progress === 100 ? 'bg-green-100 text-green-800' : 
                          progress > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {progress}% completado
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-700 font-medium">
                          Preguntas: {answeredCount}/{card.questions.length}
                        </p>
                        {progress === 100 && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteCard(card.id)} 
                      className="text-red-500 hover:text-red-700 transition-colors ml-4"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Botón para estudiar esta tarjeta específica */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startSpecificCardStudy(index)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      {progress === 0 ? 'Comenzar' : progress === 100 ? 'Repasar' : 'Continuar'}
                    </button>
                    {progress > 0 && progress < 100 && (
                      <button
                        onClick={() => {
                          // Reiniciar progreso de esta tarjeta específica
                          const newCardAnswers = new Map(cardAnswers);
                          card.questions.forEach((_, qIndex) => {
                            newCardAnswers.delete(`${card.id}-${qIndex}`);
                          });
                          setCardAnswers(newCardAnswers);
                        }}
                        className="bg-gray-500 text-white py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors"
                        title="Reiniciar progreso de esta tarjeta"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}