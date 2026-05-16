import { useState } from "react";
import { actions } from "@/lib/store";
import { toast } from "sonner";

const cats = ["Work", "Study", "Personal", "Health", "Home"];
const prios = ["Low", "Medium", "High"];

export function AddTaskForm({ compact = false }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    actions.addTask({ title: title.trim(), category, priority, dueDate, time: time || undefined });
    setTitle("");
    setTime("");
    toast.success("Task added");
  };

  if (compact) {
    return (
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          className="flex-1 rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none focus:border-primary"
        />

        <button
          type="submit"
          className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Add
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            {cats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Priority</label>
          <div className="flex gap-1">
            {prios.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition ${priority === p ? "bg-gradient-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Time (optional)
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
      >
        Add Task
      </button>
    </form>
  );
}
