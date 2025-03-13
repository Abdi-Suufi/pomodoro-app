import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PomodoroTimer from './components/PomodoroTimer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressStats from './components/ProgressStats';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  // State for tasks
  const [tasks, setTasks] = useLocalStorage('pomodoroTasks', []);
  const [currentTask, setCurrentTask] = useState(null);
  
  // Stats for reports
  const [dailyStats, setDailyStats] = useLocalStorage('pomodoroStats', {
    date: new Date().toISOString().split('T')[0],
    completedPomodoros: 0,
    completedTasks: 0,
    totalFocusTime: 0
  });

  // Update stats date if it's a new day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (dailyStats.date !== today) {
      setDailyStats({
        date: today,
        completedPomodoros: 0,
        completedTasks: 0,
        totalFocusTime: 0
      });
    }
  }, [dailyStats.date, setDailyStats]);

  // Adding a new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Completing a task
  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    
    if (updatedTasks[index].completed) {
      setDailyStats(prev => ({
        ...prev,
        completedTasks: prev.completedTasks + 1
      }));
    }
    
    setTasks(updatedTasks);
  };

  // Completing a subtask
  const handleCompleteSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = 
      !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    
    setTasks(updatedTasks);
  };

  // Deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (currentTask === index) {
      setCurrentTask(null);
    } else if (currentTask > index) {
      setCurrentTask(currentTask - 1);
    }
  };

  // Update task progress when pomodoro completes
  const handlePomodoroComplete = () => {
    setDailyStats(prev => ({
      ...prev,
      completedPomodoros: prev.completedPomodoros + 1
    }));
    
    // Update current task progress if selected
    if (currentTask !== null) {
      const updatedTasks = [...tasks];
      const today = new Date().toISOString().split('T')[0];
      
      if (!updatedTasks[currentTask].progress.find(p => p.date === today)) {
        updatedTasks[currentTask].progress.push({
          date: today,
          pomodoros: 1
        });
      } else {
        const progressIndex = updatedTasks[currentTask].progress.findIndex(p => p.date === today);
        updatedTasks[currentTask].progress[progressIndex].pomodoros += 1;
      }
      
      setTasks(updatedTasks);
    }
  };

  // Update focus time
  const handleFocusTimeUpdate = () => {
    setDailyStats(prev => ({
      ...prev,
      totalFocusTime: prev.totalFocusTime + 1
    }));
  };

  // Check for due tasks and show reminders
  const checkReminders = () => {
    const now = new Date();
    
    tasks.forEach(task => {
      if (task.reminder) {
        const reminderTime = new Date(task.reminder);
        if (now >= reminderTime && now <= new Date(reminderTime.getTime() + 60000)) {
          alert(`Reminder: ${task.title}`);
        }
      }
    });
  };

  // Run reminder check every minute
  useEffect(() => {
    const reminderInterval = setInterval(checkReminders, 60000);
    return () => clearInterval(reminderInterval);
  }, [tasks]);

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <div className="grid-container">
          <div className="timer-section">
            <PomodoroTimer 
              onPomodoroComplete={handlePomodoroComplete}
              onFocusTimeUpdate={handleFocusTimeUpdate}
              tasks={tasks}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />
            
            <ProgressStats dailyStats={dailyStats} />
          </div>
          
          <div className="task-section">
            <TaskForm onAddTask={handleAddTask} />
            
            <TaskList 
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onCompleteSubtask={handleCompleteSubtask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;