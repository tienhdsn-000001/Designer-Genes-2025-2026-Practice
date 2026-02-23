import React from 'react';

function PracticeControls({ weights, setWeights, types, setTypes }) {
    const handleToggle = (type) => {
        setTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleWeightChange = (type, val) => {
        setWeights(prev => ({ ...prev, [type]: parseInt(val) }));
    };

    return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold">Practice Filters</h3>

            <div className="space-y-4">
                {Object.keys(types).map(type => (
                    <div key={type} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={types[type]}
                                    onChange={() => handleToggle(type)}
                                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="font-medium group-hover:text-indigo-500 transition-colors">{type}</span>
                            </label>
                            <span className="text-xs font-mono text-slate-400">{weights[type]}%</span>
                        </div>
                        {types[type] && (
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={weights[type]}
                                onChange={(e) => handleWeightChange(type, e.target.value)}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
                    Selection logic uses point-weighted randomization for realistic drill sessions.
                </p>
            </div>
        </div>
    );
}

export default PracticeControls;
