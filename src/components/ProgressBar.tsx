import React from 'react';

interface ProgressBarProps {
    progress: number; // 0 to 100
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, current, total }) => {
    return (
        <div className="w-full max-w-md mx-auto animate-fade-in">
            <div className="flex justify-between text-sm text-gray-600 mb-3 font-semibold tracking-wide">
                <span>Conversion en cours...</span>
                <span>{current} / {total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner border border-gray-300/50">
                <div
                    className="bg-gradient-to-r from-brand-accent to-brand-secondary h-6 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(95,149,152,0.5)] relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
