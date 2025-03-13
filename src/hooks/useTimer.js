import { useState, useEffect, useRef } from 'react';

function useTimer({ initialTime, mode, onComplete, onTick }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  
  const intervalRef = useRef(null);
  const modeRef = useRef(mode);
  
  // Update mode ref when mode changes
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Handle timer tick
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (onTick) onTick();
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(intervalRef.current);
      
      if (modeRef.current === 'pomodoro') {
        setCycles(prev => prev + 1);
      }
      
      if (onComplete) onComplete();
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, onComplete, onTick]);

  const startTimer = () => setIsActive(true);
  
  const pauseTimer = () => setIsActive(false);
  
  const resetTimer = (newTime = initialTime) => {
    setIsActive(false);
    setTimeLeft(newTime);
  };

  return {
    timeLeft,
    isActive,
    cycles,
    startTimer,
    pauseTimer,
    resetTimer
  };
}

export default useTimer;