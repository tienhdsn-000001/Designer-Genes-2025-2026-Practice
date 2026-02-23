import React from 'react';

function StatsDisplay({ score }) {
    const percentage = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100);

    return (
        <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/20 text-white">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70">Progress</p>
                    <h3 className="text-3xl font-black mt-1">{percentage}%</h3>
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold">
                    STREAK: 0
                </div>
            </div>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-white transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold opacity-60">Correct</p>
                    <p className="text-2xl font-bold">{score.correct}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold opacity-60">Total</p>
                    <p className="text-2xl font-bold">{score.total}</p>
                </div>
            </div>
        </div>
    );
}

export default StatsDisplay;
