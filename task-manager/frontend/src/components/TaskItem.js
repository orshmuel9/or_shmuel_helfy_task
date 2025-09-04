
// TaskItem now supports delete and toggle completed
export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 18,
        padding: "32px 28px",
        background: "#fff",
        minHeight: 140,
        position: "relative"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: "1.5rem" }}>{task.title}</strong>
        <small style={{ color: "#666", fontSize: "1.1rem" }}>
          {new Date(task.createdAt).toLocaleString()}
        </small>
        <span
          style={{
            marginLeft: "auto",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 16,
            textTransform: "capitalize",
            border: "1px solid #ddd",
            background:
              task.priority === "high"
                ? "#ffe9e9"
                : task.priority === "medium"
                  ? "#fff4e6"
                  : "#e8f7ee",
            fontWeight: 500,
          }}
        >
          {task.priority}
        </span>
      </div>
      <p style={{ margin: "0", fontSize: "1.2rem" }}>{task.description}</p>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontWeight: 500, color: task.completed ? "green" : "#c00" }}>
          Completed: {task.completed ? "True" : "False"}
        </span>
        <button
          onClick={() => onToggle?.(task.id)}
          style={{
            padding: "6px 18px",
            borderRadius: 8,
            border: "none",
            background: task.completed ? "#e8f7ee" : "#ffe9e9",
            color: "#222",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
        </button>
        <button
          onClick={() => onDelete?.(task.id)}
          style={{
            padding: "6px 18px",
            borderRadius: 8,
            border: "none",
            background: "#eee",
            color: "#c00",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
