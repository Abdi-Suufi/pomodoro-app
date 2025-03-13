import React, { useState } from 'react';
import TimerControls from './TimerControls';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils/timeUtils';

const PomodoroTimer = ({ onPomodoroComplete, onFocusTimeUpdate, tasks, currentTask, setCurrentTask }) => {
  const [mode, setMode] = useState('pomodoro');
  
  // Timer modes configuration
  const timerModes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  // Use custom timer hook
  const { timeLeft, isActive, cycles, startTimer, pauseTimer, resetTimer } = useTimer({
    initialTime: timerModes[mode],
    mode,
    onComplete: handleTimerComplete,
    onTick: handleTick
  });

  // Switch between timer modes
  function switchMode(newMode) {
    setMode(newMode);
    resetTimer(timerModes[newMode]);
  }

  // Handle timer completion
  function handleTimerComplete() {
    const notification = new Audio('/sounds/notification.mp3');
    notification.play();
    
    if (mode === 'pomodoro') {
      onPomodoroComplete();
      
      if (cycles % 4 === 3) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('pomodoro');
    }
  }

  // Handle timer tick for focus time tracking
  function handleTick() {
    if (mode === 'pomodoro' && isActive) {
      onFocusTimeUpdate();
    }
  }

  return (
    <div className="timer-container">
      <div className="timer-mode-selector">
        <button 
          onClick={() => switchMode('pomodoro')} 
          className={`mode-button ${mode === 'pomodoro' ? 'active' : ''}`}
        >
          Pomodoro
        </button>
        <button 
          onClick={() => switchMode('shortBreak')} 
          className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
        >
          Short Break
        </button>
        <button 
          onClick={() => switchMode('longBreak')} 
          className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
        >
          Long Break
        </button>
      </div>
      
      <div className="timer-display">
        <h2>{formatTime(timeLeft)}</h2>
        
        <TimerControls 
          isActive={isActive}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />
      </div>
      
      {tasks.length > 0 && (
        <div className="current-task-selector">
          <h3>Select Current Task:</h3>
          <select 
            value={currentTask !== null ? currentTask : ''}
            onChange={(e) => setCurrentTask(e.target.value !== '' ? parseInt(e.target.value) : null)}
          >
            <option value="">-- Select a task --</option>
            {tasks.map((task, index) => (
              !task.completed && (
                <option key={index} value={index}>
                  {task.title}
                </option>
              )
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;