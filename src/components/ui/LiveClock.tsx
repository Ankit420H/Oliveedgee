import { useState, useEffect } from 'react';

const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="font-mono text-xs uppercase tracking-widest text-clinical-canvas/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-green"></span>
            IST {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
    );
};

export default LiveClock;
