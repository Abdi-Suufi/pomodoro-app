import React from 'react';

const ProgressStats = ({ dailyStats }) => {
  return (
    <div className="progress-stats">
      <h3>Today's Progress</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <p className="stat-label">Completed Pomodoros</p>
          <p className="stat-value">{dailyStats.completedPomodoros}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Focus Time</p>
          <p className="stat-value">{Math.floor(dailyStats.totalFocusTime / 60)} min</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Completed Tasks</p>
          <p className="stat-value">{dailyStats.completedTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;