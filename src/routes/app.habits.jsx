import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, actions } from "@/lib/store";
import { Flame, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/app/habits")({ component: Habits });

function Habits() {
  const habits = useStore((s) => s.habits);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h1 className="text-2xl font-bold md:text-3xl">Habits</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          actions.addHabit(name.trim(), emoji);
          setName("");
        }}
        className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3"
      >
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          maxLength={2}
          className="w-14 rounded-lg border border-border bg-input px-3 py-2 text-center text-lg outline-none focus:border-primary"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit (e.g. Read 10 pages)"
          className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((h) => {
          const doneToday = h.history.includes(today);
          return (
            <div
              key={h.id}
              className="group rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{h.emoji}</div>
                <button
                  onClick={() => actions.deleteHabit(h.id)}
                  className="rounded p-1 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 font-semibold">{h.name}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Flame className="h-3.5 w-3.5 text-warning" /> {h.streak} day streak
              </div>
              <button
                onClick={() => actions.toggleHabit(h.id)}
                className={`mt-4 w-full rounded-lg py-2 text-sm font-medium transition ${
                  doneToday
                    ? "bg-success/20 text-success"
                    : "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
                }`}
              >
                {doneToday ? "✓ Done today" : "Mark as done"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
