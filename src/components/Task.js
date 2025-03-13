import React from 'react';

const Task = ({ task, taskIndex, onCompleteTask, onCompleteSubtask, onDeleteTask }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onCompleteTask}
            id={`task-${taskIndex}`}
          />
          <label 
            htmlFor={`task-${taskIndex}`}
            className={task.completed ? 'line-through' : ''}
          >
            {task.title}
          </label>
        </div>
        <button 
          onClick={onDeleteTask}
          className="delete-task-button"
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
      
      {task.dueDate && (
        <div className="task-due-date">
          Due: {new Date(task.dueDate).toLocaleString()}
        </div>
      )}
      
      {task.notes && (
        <div className="task-notes">
          {task.notes}
        </div>
      )}
      
      {task.subtasks.length > 0 && (
        <ul className="subtasks-list">
          {task.subtasks.map((subtask, subtaskIndex) => (
            <li key={subtaskIndex} className="subtask-item">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => onCompleteSubtask(subtaskIndex)}
                id={`subtask-${taskIndex}-${subtaskIndex}`}
              />
              <label 
                htmlFor={`subtask-${taskIndex}-${subtaskIndex}`}
                className={subtask.completed ? 'line-through' : ''}
              >
                {subtask.title}
              </label>
            </li>
          ))}
        </ul>
      )}
      
      {task.progress.length > 0 && (
        <div className="task-progress">
          {task.progress.reduce((total, day) => total + day.pomodoros, 0)} pomodoros total
        </div>
      )}
    </li>
  );
};

export default Task;