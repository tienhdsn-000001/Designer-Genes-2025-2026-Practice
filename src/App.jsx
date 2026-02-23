import React, { useState, useEffect, useMemo } from 'react';
import questionsData from './data/questions.json';
import QuestionCard from './components/QuestionCard';
import PracticeControls from './components/PracticeControls';
import StatsDisplay from './components/StatsDisplay';

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [history, setHistory] = useState([]);
    const [weights, setWeights] = useState({ MCQ: 40, TF: 20, SA: 40 });
    const [types, setTypes] = useState({ MCQ: true, TF: true, SA: true });
    const [darkMode, setDarkMode] = useState(true);

    // Initialize first question
    useEffect(() => {
        pickNextQuestion();
    }, []);

    // Update theme
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const filteredQuestions = useMemo(() => {
        return questionsData.filter(q => types[q.type]);
    }, [types]);

    const pickNextQuestion = () => {
        if (filteredQuestions.length === 0) return;

        // Weight-based selection
        const activeTypes = Object.keys(types).filter(t => types[t]);
        const totalWeight = activeTypes.reduce((acc, t) => acc + weights[t], 0);

        let random = Math.random() * totalWeight;
        let selectedType = activeTypes[0];

        for (const type of activeTypes) {
            if (random < weights[type]) {
                selectedType = type;
                break;
            }
            random -= weights[type];
        }

        const pool = filteredQuestions.filter(q => q.type === selectedType);
        if (pool.length === 0) {
            // Fallback if no questions of selected type
            setCurrentQuestion(filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]);
        } else {
            setCurrentQuestion(pool[Math.floor(Math.random() * pool.length)]);
        }
    };

    const handleAnswer = (isCorrect) => {
        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));

        // Auto-advance after delay
        setTimeout(() => {
            pickNextQuestion();
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Header/Stats - 3 columns on LG */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Designer Genes
                        </h1>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:scale-110 transition-transform"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>

                    <StatsDisplay score={score} />
                    <PracticeControls
                        weights={weights}
                        setWeights={setWeights}
                        types={types}
                        setTypes={setTypes}
                    />
                </aside>

                {/* Main Content - 9 columns on LG */}
                <main className="lg:col-span-9 flex flex-col items-center justify-center min-h-[60vh]">
                    {currentQuestion ? (
                        <QuestionCard
                            question={currentQuestion}
                            onAnswer={handleAnswer}
                        />
                    ) : (
                        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl shadow-xl">
                            <p className="text-xl text-slate-500">No questions found matching your filters.</p>
                        </div>
                    )}
                </main>

            </div>

            <footer className="fixed bottom-4 right-4 text-xs text-slate-400 dark:text-slate-600">
                v1.0.0-mvp
            </footer>
        </div>
    );
}

export default App;
