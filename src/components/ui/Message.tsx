import React from 'react';

interface MessageProps {
    variant?: string;
    children: React.ReactNode;
}

const Message = ({ variant = 'info', children }: MessageProps) => {
    const isError = variant === 'danger';

    return (
        <div className={`p-4 rounded-xl mb-4 font-mono text-xs ${isError ? 'bg-signal-error/10 text-signal-error border border-signal-error/20' : 'bg-clinical-ink/5 text-clinical-ink border border-clinical-ink/10'}`}>
            {children}
        </div>
    );
};



export default Message;
