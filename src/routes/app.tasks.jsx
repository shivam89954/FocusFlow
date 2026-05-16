import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, actions } from "@/lib/store";
import { Trash2, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/app/tasks")({ component: Tasks });

const catColors = {
  Work: "bg-blue-500/20 text-blue-300",
  Study: "bg-cyan-500/20 text-cyan-300",
  Personal: "bg-pink-500/20 text-pink-300",
  Health: "bg-emerald-500/20 text-emerald-300",
  Home: "bg-violet-500/20 text-violet-300",
};
const prioColors = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/15 text-warning",
  High: "bg-destructive/15 text-destructive",
};

function Tasks() {
  const tasks = useStore((s) => s.tasks);
  const [filter, setFilter] = useState("all");
  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "pending" ? !t.completed : t.completed,
  );

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">All Tasks</h1>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          {tasks.length} total
        </span>
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${filter === f ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-accent"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            No tasks here.
          </div>
        )}
        {filtered.map((t) => (
          <div
            key={t.id}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
          >
            {t.completed ? (
              <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-success/15 text-success">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            ) : (
              <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-warning/15 text-warning">
                <Clock className="h-4 w-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div
                className={`truncate text-sm font-medium ${t.completed ? "text-muted-foreground line-through" : ""}`}
              >
                {t.title}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${t.completed ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}
                >
                  {t.completed ? "Completed" : "Pending"}
                </span>
                {t.time && <span>{t.time}</span>}
              </div>
            </div>
            <span
              className={`hidden rounded-md px-2 py-0.5 text-[10px] font-medium sm:inline-block ${catColors[t.category]}`}
            >
              {t.category}
            </span>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${prioColors[t.priority]}`}
            >
              {t.priority}
            </span>
            <button
              onClick={() => actions.deleteTask(t.id)}
              className="rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              aria-label="delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
