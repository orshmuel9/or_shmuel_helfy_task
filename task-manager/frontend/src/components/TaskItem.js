export default function TaskItem({ task }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 18,
        padding: "32px 28px",
        background: "#fff",
        minHeight: 140,
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
      {task.completed && (
        <div style={{ color: "green", marginTop: 12, fontSize: "1.1rem" }}>
          ✅ Completed
        </div>
      )}
    </div>
  );
}
