import React from "react";

// Presentational: owns no state, parent (App) controls the value
function TaskForm({ value, onChange, onSubmit }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={value}
        onChange={onChange}
        maxLength={200}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
