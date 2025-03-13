import React from 'react';

const SubtaskForm = ({ newSubtask, setNewSubtask, addSubtask, subtasks }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtask();
    }
  };

  return (
    <div className="subtask-form">
      <label>Subtasks</label>
      <div className="subtask-input">
        <input
          type="text"
          placeholder="Add subtask"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
        />
        <button 
          type="button"
          onClick={addSubtask}
          className="add-subtask-button"
        >
          Add
        </button>
      </div>
      
      {subtasks.length > 0 && (
        <ul className="subtask-list">
          {subtasks.map((subtask, index) => (
            <li key={index} className="subtask-item">
              • {subtask.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubtaskForm;