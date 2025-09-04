
import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, toggleTaskCompletion } from "./services/taskApi";
import TaskCarousel from "./components/TaskCarousel";
import TaskForm from "./components/FormTask";
import "./App.css";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all"); // all, completed, uncompleted
  const [sortPriority, setSortPriority] = useState(""); // '', 'asc', 'desc'

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // Create new task and go back to carousel
  const handleCreate = async (payload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  // Delete a task
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle completed
  const handleToggle = async (id) => {
    const updated = await toggleTaskCompletion(id);
    setTasks((prev) => prev.map((t) => t.id === id ? updated : t));
  };


  if (loading) return <div>Loading…</div>;
  if (err) return <div>Error: {err}</div>;

  // Filter and sort tasks
  let filteredTasks = tasks;
  if (filter === "completed") filteredTasks = filteredTasks.filter(t => t.completed);
  if (filter === "uncompleted") filteredTasks = filteredTasks.filter(t => !t.completed);
  if (sortPriority) {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      const prio = { low: 1, medium: 2, high: 3 };
      return sortPriority === "asc" ? prio[a.priority] - prio[b.priority] : prio[b.priority] - prio[a.priority];
    });
  }

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", fontFamily: "system-ui" }}>
      <h1>Tasks</h1>
      {/* Filter and sort controls */}
      {!showForm && (
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          <select value={sortPriority} onChange={e => setSortPriority(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
            <option value="">Sort by Priority</option>
            <option value="asc">Priority Ascending</option>
            <option value="desc">Priority Descending</option>
          </select>
        </div>
      )}
      {/* Show carousel and add button if not adding */}
      {!showForm && (
        <>
          <TaskCarousel tasks={filteredTasks} auto={false} onDelete={handleDelete} onToggle={handleToggle} />
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "14px 36px",
                fontSize: "1.2rem",
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
              }}
            >
              Add New Task
            </button>
          </div>
        </>
      )}
      {/* Show form if adding */}
      {showForm && (
        <div>
          <TaskForm onSubmit={handleCreate} />
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 28px",
                fontSize: "1.1rem",
                background: "#eee",
                color: "#222",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 500,
                marginTop: 8,
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
