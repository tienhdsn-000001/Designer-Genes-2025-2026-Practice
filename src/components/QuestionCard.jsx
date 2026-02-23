import React, { useState, useEffect } from 'react';

function QuestionCard({ question, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [saValue, setSaValue] = useState("");

    useEffect(() => {
        setSelectedOption(null);
        setShowAnswer(false);
        setSaValue("");
    }, [question]);

    const handleSelect = (label) => {
        if (showAnswer) return;
        setSelectedOption(label);
        setShowAnswer(true);
        onAnswer(label === question.answer);
    };

    const handleSaSubmit = (e) => {
        e.preventDefault();
        if (showAnswer) return;
        setShowAnswer(true);
        // SA is manual self-grading in Science Olympiad apps usually, 
        // but we'll count it as total growth for now.
        onAnswer(null); // special case
    };

    const renderMCQ = () => (
        <div className="grid grid-cols-1 gap-4 w-full mt-6">
            {question.options.map((opt) => {
                const isCorrect = opt.label === question.answer;
                const isSelected = opt.label === selectedOption;

                let bgColor = "bg-white dark:bg-slate-800 hover:border-indigo-500";
                if (showAnswer) {
                    if (isCorrect) bgColor = "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                    else if (isSelected) bgColor = "bg-rose-100 dark:bg-rose-900/40 border-rose-500 text-rose-700 dark:text-rose-400";
                    else bgColor = "bg-white dark:bg-slate-800 opacity-50";
                }

                return (
                    <button
                        key={opt.label}
                        onClick={() => handleSelect(opt.label)}
                        disabled={showAnswer}
                        className={`flex items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${bgColor}`}
                    >
                        <span className="font-bold mr-4 uppercase">{opt.label}.</span>
                        <span>{opt.text}</span>
                    </button>
                );
            })}
        </div>
    );

    const renderSA = () => (
        <div className="w-full mt-6 space-y-4">
            <form onSubmit={handleSaSubmit}>
                <textarea
                    value={saValue}
                    onChange={(e) => setSaValue(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none min-h-[150px] transition-all"
                    disabled={showAnswer}
                />
                {!showAnswer && (
                    <button
                        type="submit"
                        className="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        Show Answer
                    </button>
                )}
            </form>

            {showAnswer && (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-2">Key:</h3>
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{question.answer}</p>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={() => onAnswer(true)}
                            className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                            I got it right!
                        </button>
                        <button
                            onClick={() => onAnswer(false)}
                            className="flex-1 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors"
                        >
                            I was wrong.
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900/50 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {question.type}
                </span>
                <span className="text-xs text-slate-400">#{question.num} from {question.tournament}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-medium leading-relaxed mb-8">
                {question.question}
            </h2>

            {question.type === 'SA' ? renderSA() : renderMCQ()}
        </div>
    );
}

export default QuestionCard;
