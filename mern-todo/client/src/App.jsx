import React, { Component } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const API = "/api/todos";

class App extends Component {
  // Step 2: initial state
  state = {
    todos: [],
    newTodo: "",
    loading: true,
    error: "",
  };

  // Step 3-4: fetch existing tasks when the component mounts
  componentDidMount() {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Server responded " + res.status);
        return res.json();
      })
      .then((todos) => this.setState({ todos, loading: false }))
      .catch((err) =>
        this.setState({ error: "Could not load tasks: " + err.message, loading: false })
      );
  }

  // Step 6: controlled input
  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  // Steps 7-10: add a task
  handleSubmit = async (e) => {
    e.preventDefault();
    const text = this.state.newTodo.trim();
    if (!text) return; // Step 7: ignore empty input

    const newTask = { task: text, completed: false }; // Step 8
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }); // Step 9
      if (!res.ok) throw new Error((await res.json()).error);
      const saved = await res.json();
      // Step 10: functional setState so we never use stale state
      this.setState((prev) => ({ todos: [...prev.todos, saved], newTodo: "", error: "" }));
    } catch (err) {
      this.setState({ error: "Could not add task: " + err.message });
    }
  };

  // Extra CRUD: toggle completed (Update)
  handleToggle = async (todo) => {
    try {
      const res = await fetch(`${API}/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const updated = await res.json();
      this.setState((prev) => ({
        todos: prev.todos.map((t) => (t._id === updated._id ? updated : t)),
      }));
    } catch (err) {
      this.setState({ error: "Could not update task: " + err.message });
    }
  };

  // Extra CRUD: delete (Delete)
  handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      this.setState((prev) => ({ todos: prev.todos.filter((t) => t._id !== id) }));
    } catch (err) {
      this.setState({ error: "Could not delete task: " + err.message });
    }
  };

  // Steps 11-12: render
  render() {
    const { todos, newTodo, loading, error } = this.state;
    const done = todos.filter((t) => t.completed).length;

    return (
      <div className="app">
        <header>
          <h1>MERN To-Do List</h1>
          <p className="stats">
            {todos.length} task{todos.length !== 1 && "s"} · {done} completed
          </p>
        </header>

        <TaskForm
          value={newTodo}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="muted">Loading tasks…</p>
        ) : (
          <TaskList todos={todos} onToggle={this.handleToggle} onDelete={this.handleDelete} />
        )}
      </div>
    );
  }
}

export default App;
