import React from 'react';

const TimerControls = ({ isActive, onStart, onPause, onReset }) => {
  return (
    <div className="timer-controls">
      {!isActive ? (
        <button onClick={onStart} className="control-button start">
          Start
        </button>
      ) : (
        <button onClick={onPause} className="control-button pause">
          Pause
        </button>
      )}
      <button onClick={onReset} className="control-button reset">
        Reset
      </button>
    </div>
  );
};

export default TimerControls;