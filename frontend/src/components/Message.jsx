import React from 'react';

const Message = ({ variant, children }) => {
    const isError = variant === 'danger';

    return (
        <div className={`p-4 rounded-xl mb-4 font-mono text-xs ${isError ? 'bg-signal-error/10 text-signal-error border border-signal-error/20' : 'bg-clinical-ink/5 text-clinical-ink border border-clinical-ink/10'}`}>
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
