import { useState } from "react";
// EditTask component for editing an existing task

export default function EditTask({ task, onSave }) {
    // Pre-fill fields with task values or sensible defaults
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "medium");
    // Date: use task.createdAt if available, else today
    const getDefaultDate = () => {
        if (task.createdAt) {
            return task.createdAt.slice(0, 10);
        }
        return new Date().toISOString().slice(0, 10);
    };
    // Time: use task.createdAt if available, else current time
    const getDefaultTime = () => {
        if (task.createdAt) {
            return new Date(task.createdAt).toISOString().slice(11, 16);
        }
        return new Date().toISOString().slice(11, 16);
    };
    const [date, setDate] = useState(getDefaultDate());
    const [time, setTime] = useState(getDefaultTime());
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Placeholders are not needed, values are shown directly

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required");
            return;
        }
        let createdAt;
        if (date) {
            if (time) {
                createdAt = new Date(date + 'T' + time);
            } else {
                createdAt = new Date(date);
            }
            createdAt = createdAt.toISOString();
        }
        setSubmitting(true);
        await onSave({
            ...task,
            title,
            description,
            priority,
            createdAt,
        });
        setSubmitting(false);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit} style={{
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ padding: 12, fontSize: "1.1rem", borderRadius: 8, border: "1px solid #ddd", fontFamily: "inherit" }}
                        required
                    />
                </div>
                <div style={{ flex: 3, display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <label style={{ fontWeight: 500, marginBottom: 6 }}>Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
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
                        onChange={e => setPriority(e.target.value)}
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
                        onChange={e => setDate(e.target.value)}
                        style={{ padding: 12, fontSize: "1.1rem", borderRadius: 8, border: "1px solid #ddd" }}
                    />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ fontWeight: 500, marginBottom: 6 }}>Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
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
                {submitting ? "Saving..." : "Save"}
            </button>
            {error && <div className="error" style={{ color: "#c00", marginTop: 8 }}>{error}</div>}
        </form>
    );
}

