import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { TaskItem } from "@/components/TaskItem";
import { DayEditor } from "@/components/DayEditor";
import { ChevronLeft, ChevronRight, BookmarkCheck, StickyNote, CalendarPlus } from "lucide-react";

export const Route = createFileRoute("/app/calendar")({ component: CalendarView });

function CalendarView() {
  const tasks = useStore((s) => s.tasks);
  const days = useStore((s) => s.days);
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));
  const [editing, setEditing] = useState(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  const monthName = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });
  const dayTasks = tasks.filter((t) => t.dueDate === selected);
  const datesWithTasks = new Set(tasks.map((t) => t.dueDate));
  const selectedEntry = days[selected] || {};

  const handleClick = (ds) => {
    setSelected(ds);
  };

  return (
    <div className="space-y-6 pb-28 md:pb-0">
      <h1 className="text-2xl font-bold md:text-3xl">Calendar</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{monthName}</h2>
            <div className="flex gap-1">
              <button
                onClick={() => setCursor(new Date(year, month - 1, 1))}
                className="rounded-md p-1.5 transition hover:bg-accent hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setCursor(new Date());
                  setSelected(new Date().toISOString().slice(0, 10));
                }}
                className="rounded-md px-2 py-1 text-xs transition hover:bg-accent"
              >
                Today
              </button>
              <button
                onClick={() => setCursor(new Date(year, month + 1, 1))}
                className="rounded-md p-1.5 transition hover:bg-accent hover:scale-105"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const isSel = ds === selected;
              const hasTasks = datesWithTasks.has(ds);
              const entry = days[ds];
              const isMarked = entry?.marked;
              const hasEvent = !!entry?.event;
              const hasNote = !!entry?.note;
              return (
                <button
                  key={i}
                  onClick={() => handleClick(ds)}
                  onDoubleClick={() => setEditing(ds)}
                  title="Click to select • Double-click to add"
                  className={`relative aspect-square rounded-lg text-sm transition-all hover:scale-105 ${
                    isSel
                      ? "bg-gradient-primary font-bold text-primary-foreground shadow-glow"
                      : isMarked
                        ? "border border-primary/60 bg-primary/10 font-semibold"
                        : "hover:bg-accent"
                  }`}
                >
                  {d}
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                    {hasTasks && !isSel && <span className="h-1 w-1 rounded-full bg-primary" />}
                    {hasEvent && <span className="h-1 w-1 rounded-full bg-warning" />}
                    {hasNote && <span className="h-1 w-1 rounded-full bg-success" />}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary" /> Tasks
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-warning" /> Event
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success" /> Note
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full border border-primary" /> Marked
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">
              {new Date(selected).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            <button
              onClick={() => setEditing(selected)}
              className="inline-flex items-center gap-1 rounded-md bg-gradient-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground shadow-glow transition hover:scale-105"
            >
              <CalendarPlus className="h-3.5 w-3.5" /> Add
            </button>
          </div>

          {(selectedEntry.marked || selectedEntry.event || selectedEntry.note) && (
            <div className="mb-4 space-y-2 rounded-xl border border-border bg-background/40 p-3 text-sm">
              {selectedEntry.marked && (
                <div className="flex items-center gap-2 text-primary">
                  <BookmarkCheck className="h-4 w-4" /> Marked day
                </div>
              )}
              {selectedEntry.event && (
                <div className="flex items-start gap-2">
                  <CalendarPlus className="mt-0.5 h-4 w-4 text-warning" />
                  <span>{selectedEntry.event}</span>
                </div>
              )}
              {selectedEntry.note && (
                <div className="flex items-start gap-2">
                  <StickyNote className="mt-0.5 h-4 w-4 text-success" />
                  <span className="whitespace-pre-wrap text-muted-foreground">
                    {selectedEntry.note}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {dayTasks.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No tasks for this day.
              </p>
            )}
            {dayTasks.map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
          </div>
        </div>
      </div>
      {editing && <DayEditor date={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
