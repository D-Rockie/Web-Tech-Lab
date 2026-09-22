import React from "react";

function TaskItem({ todo, onToggle, onDelete }) {
  return (
    <li className={"task-item" + (todo.completed ? " done" : "")}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
        <span>{todo.task}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo._id)} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
