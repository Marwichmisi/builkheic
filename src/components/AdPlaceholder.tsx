import React from 'react';

interface AdPlaceholderProps {
    position: 'top' | 'bottom';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
    if (!window.AppConfig?.ads?.enabled) return null;

    return (
        <div className={`w-full flex justify-center py-4 bg-brand-light ${position === 'top' ? 'border-b' : 'border-t'} border-gray-200`}>
            <div className="w-[728px] h-[90px] bg-gray-300 flex items-center justify-center text-gray-500 text-sm border border-gray-400">
                Ad Space ({JSON.stringify(position)}) - 728x90
            </div>
        </div>
    );
};

export default AdPlaceholder;
