import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-2 border-clinical-ink/20 border-t-clinical-ink rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
