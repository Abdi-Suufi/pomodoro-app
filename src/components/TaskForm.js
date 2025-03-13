import React, { useState } from 'react';
import SubtaskForm from './SubtaskForm';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    reminder: '',
    notes: '',
    completed: false,
    subtasks: [],
    repeat: 'none', // 'none', 'daily', 'weekly', 'monthly'
    progress: []
  });
  
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;
    
    onAddTask(newTask);
    setNewTask({
      title: '',
      dueDate: '',
      reminder: '',
      notes: '',
      completed: false,
      subtasks: [],
      repeat: 'none',
      progress: []
    });
  };

  const addSubtask = () => {
    if (newSubtask.trim() === '') return;
    
    setNewTask({
      ...newTask,
      subtasks: [
        ...newTask.subtasks,
        {
          title: newSubtask,
          completed: false
        }
      ]
    });
    
    setNewSubtask('');
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="datetime-local"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Reminder</label>
            <input
              type="datetime-local"
              value={newTask.reminder}
              onChange={(e) => setNewTask({...newTask, reminder: e.target.value})}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Repeat</label>
          <select
            value={newTask.repeat}
            onChange={(e) => setNewTask({...newTask, repeat: e.target.value})}
            className="form-control"
          >
            <option value="none">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Notes</label>
          <textarea
            rows="2"
            placeholder="Add notes about this task"
            value={newTask.notes}
            onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
            className="form-control"
          ></textarea>
        </div>
        
        <SubtaskForm
          newSubtask={newSubtask}
          setNewSubtask={setNewSubtask}
          addSubtask={addSubtask}
          subtasks={newTask.subtasks}
        />
        
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;