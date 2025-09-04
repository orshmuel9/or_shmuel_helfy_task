import { useEffect, useState } from "react";
import { fetchTasks } from "./services/taskApi";
import TaskCarousel from "./components/TaskCarousel";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

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

  if (loading) return <div>Loading…</div>;
  if (err) return <div>Error: {err}</div>;

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", fontFamily: "system-ui" }}>
      <h1>Tasks</h1>
      <TaskCarousel tasks={tasks} auto={false} />

    </div>
  );
}
