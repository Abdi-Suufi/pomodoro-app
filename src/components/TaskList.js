import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onCompleteTask, onCompleteSubtask, onDeleteTask }) => {
  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks added yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, taskIndex) => (
            <Task
              key={taskIndex}
              task={task}
              taskIndex={taskIndex}
              onCompleteTask={() => onCompleteTask(taskIndex)}
              onCompleteSubtask={(subtaskIndex) => onCompleteSubtask(taskIndex, subtaskIndex)}
              onDeleteTask={() => onDeleteTask(taskIndex)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;