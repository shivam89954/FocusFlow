import { useEffect, useState } from "react";
import { actions, useStore } from "@/lib/store";
import { X, Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DayEditor({ date, onClose }) {
  const entry = useStore((s) => s.days[date]) || {};
  const [event, setEvent] = useState(entry.event ?? "");
  const [note, setNote] = useState(entry.note ?? "");

  useEffect(() => {
    setEvent(entry.event ?? "");
    setNote(entry.note ?? "");
  }, [date]);

  const save = () => {
    actions.setDayEntry(date, { event: event.trim() || undefined, note: note.trim() || undefined });
    toast.success("Saved");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-glow animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Edit day</div>
            <h3 className="text-lg font-bold">
              {new Date(date).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => {
            actions.toggleDayMark(date);
            toast.success(entry.marked ? "Unmarked" : "Marked");
          }}
          className={`mb-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:scale-[1.02] ${
            entry.marked
              ? "bg-gradient-primary text-primary-foreground shadow-glow"
              : "border border-border hover:bg-accent"
          }`}
        >
          {entry.marked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          {entry.marked ? "Marked" : "Mark this date"}
        </button>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Event</label>
        <input
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="e.g. Team meeting"
          className="mb-4 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
        />

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          rows={4}
          className="mb-4 w-full resize-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
        />

        <div className="flex gap-2">
          <button
            onClick={save}
            className="flex-1 rounded-lg bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
          >
            Save
          </button>
          {(entry.event || entry.note || entry.marked) && (
            <button
              onClick={() => {
                actions.clearDay(date);
                toast.success("Cleared");
                onClose();
              }}
              className="rounded-lg border border-border px-3 py-2.5 text-sm transition hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
