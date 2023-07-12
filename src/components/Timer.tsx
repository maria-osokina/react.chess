import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const defaultTime = 300;

    const [blackTime, setBlackTime] = useState(defaultTime);
    const [whiteTime, setWhiteTime] = useState(defaultTime);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhitePlayer : decrementBlackPlayer
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackPlayer() {
        setBlackTime(prev => prev-1)
    }

    function decrementWhitePlayer() {
        setWhiteTime(prev => prev-1)
    }

    function handleRestart() {
        setWhiteTime(defaultTime)
        setBlackTime(defaultTime)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;