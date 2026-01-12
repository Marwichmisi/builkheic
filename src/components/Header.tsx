

const Header = () => {
    return (
        <header className="w-full p-6 flex justify-center animate-slide-up">
            <div className="text-center">
                <span className="text-brand-accent font-black tracking-widest text-xs sm:text-sm uppercase mb-1 block">Local Batch Converter</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F3F4F4] tracking-tight drop-shadow-md">
                    bulk<span className="text-brand-accent">heic</span>
                </h1>
            </div>
        </header>
    );
};

export default Header;
