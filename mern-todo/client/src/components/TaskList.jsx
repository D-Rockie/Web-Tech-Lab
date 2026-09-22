import React from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="muted">No tasks yet. Add one above.</p>;
  }
  return (
    <ul className="task-list">
      {todos.map((todo) => (
        // _id from MongoDB is a stable, unique key
        <TaskItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
