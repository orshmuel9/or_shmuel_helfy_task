import "./EditTask.css";
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
        <form className="edit-task-form" onSubmit={handleSubmit}>
            <div className="edit-task-row">
                <div className="edit-task-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-task-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="edit-task-row">
                <div className="edit-task-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="edit-task-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="edit-task-group">
                    <label htmlFor="time">Time</label>
                    <input
                        id="time"
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="edit-task-btn"
            >
                {submitting ? "Saving..." : "Save"}
            </button>
            {error && <div className="edit-task-error">{error}</div>}
        </form>
    );
}

