import { useState } from "react";

// Task form for adding new tasks
export default function FormTask({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        title,
        description,
        priority,
        createdAt: date ? new Date(date).toISOString() : undefined,
      });
      setTitle("");
      setDescription("");
      setPriority("low");
      setDate("");
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={submit} style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: 420,
      margin: "40px auto 0",
      padding: 32,
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
    }}>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500, marginBottom: 6 }}>Title</label>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: 12, fontSize: "1.1rem", borderRadius: 8, border: "1px solid #ddd", fontFamily: "inherit" }}
            required
          />
        </div>
        <div style={{ flex: 3, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <label style={{ fontWeight: 500, marginBottom: 6 }}>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: 12,
              fontSize: "1.1rem",
              borderRadius: 8,
              border: "1px solid #ddd",
              resize: "vertical",
              minHeight: 48,
              maxHeight: 120,
              maxWidth: "100%",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
            required
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500, marginBottom: 6 }}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: 12, fontSize: "1.1rem", borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500, marginBottom: 6 }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: 12, fontSize: "1.1rem", borderRadius: 8, border: "1px solid #ddd" }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        style={{
          marginTop: 18,
          padding: "14px 0",
          fontSize: "1.2rem",
          background: "#222",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {submitting ? "Adding..." : "Add"}
      </button>
      {error && <div className="error" style={{ color: "#c00", marginTop: 8 }}>{error}</div>}
    </form>
  );
}
