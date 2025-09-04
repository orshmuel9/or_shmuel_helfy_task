import { useState } from "react";

export default function TaskForm({ onCreate }) {
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
      await onCreate({
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
    <form className="task-form" onSubmit={submit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
