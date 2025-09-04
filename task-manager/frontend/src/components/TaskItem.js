
import "./TaskItem.css";

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="task-item">
      <div className="task-item-header" style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
        <strong className="task-item-title">{task.title}</strong>
        <small style={{ color: "#666", fontSize: "1.1rem" }}>
          {new Date(task.createdAt).toLocaleString()}
        </small>
        <span
          className="task-item-priority"
          style={{
            marginLeft: "auto",
            background:
              task.priority === "high"
                ? "#ffe9e9"
                : task.priority === "medium"
                  ? "#fff4e6"
                  : "#e8f7ee"
          }}
        >
          {task.priority}
        </span>
      </div>
      <p className={task.completed ? "task-item-desc task-item-completed" : "task-item-desc"}>{task.description}</p>
      <div className="task-item-footer">
        <span style={{ fontWeight: 500, color: task.completed ? "green" : "#c00" }}>
          Completed: {task.completed ? "True" : "False"}
        </span>
        <div className="task-item-actions">
          <button
            className="task-item-btn"
            onClick={() => onToggle?.(task.id)}
            style={{ background: task.completed ? "#e8f7ee" : "#ffe9e9" }}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
          </button>
          <button
            className="task-item-btn"
            onClick={() => onEdit?.(task)}
            style={{ background: "#e6f7ff" }}
          >
            Edit
          </button>
          <button
            className="task-item-btn"
            onClick={() => onDelete?.(task.id)}
            style={{ background: "#eee", color: "#c00" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
