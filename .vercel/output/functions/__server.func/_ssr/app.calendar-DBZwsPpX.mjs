import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { T as TaskItem } from "./TaskItem-Crn3DTE_.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as ChevronLeft, g as ChevronRight, c as CalendarPlus, a as BookmarkCheck, o as StickyNote, X, B as Bookmark, p as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function DayEditor({ date, onClose }) {
  const entry = useStore((s) => s.days[date]) || {};
  const [event, setEvent] = reactExports.useState(entry.event ?? "");
  const [note, setNote] = reactExports.useState(entry.note ?? "");
  reactExports.useEffect(() => {
    setEvent(entry.event ?? "");
    setNote(entry.note ?? "");
  }, [date]);
  const save = () => {
    actions.setDayEntry(date, { event: event.trim() || void 0, note: note.trim() || void 0 });
    toast.success("Saved");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 animate-fade-in",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-glow animate-scale-in",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Edit day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: new Date(date).toLocaleDateString(void 0, {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-md p-1.5 hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  actions.toggleDayMark(date);
                  toast.success(entry.marked ? "Unmarked" : "Marked");
                },
                className: `mb-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition hover:scale-[1.02] ${entry.marked ? "bg-gradient-primary text-primary-foreground shadow-glow" : "border border-border hover:bg-accent"}`,
                children: [
                  entry.marked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
                  entry.marked ? "Marked" : "Mark this date"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-muted-foreground", children: "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: event,
                onChange: (e) => setEvent(e.target.value),
                placeholder: "e.g. Team meeting",
                className: "mb-4 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-muted-foreground", children: "Note" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: note,
                onChange: (e) => setNote(e.target.value),
                placeholder: "Write a note...",
                rows: 4,
                className: "mb-4 w-full resize-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: save,
                  className: "flex-1 rounded-lg bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]",
                  children: "Save"
                }
              ),
              (entry.event || entry.note || entry.marked) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    actions.clearDay(date);
                    toast.success("Cleared");
                    onClose();
                  },
                  className: "rounded-lg border border-border px-3 py-2.5 text-sm transition hover:bg-destructive/10 hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function CalendarView() {
  const tasks = useStore((s) => s.tasks);
  const days = useStore((s) => s.days);
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selected, setSelected] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [editing, setEditing] = reactExports.useState(null);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const monthName = cursor.toLocaleString(void 0, {
    month: "long",
    year: "numeric"
  });
  const dayTasks = tasks.filter((t) => t.dueDate === selected);
  const datesWithTasks = new Set(tasks.map((t) => t.dueDate));
  const selectedEntry = days[selected] || {};
  const handleClick = (ds) => {
    setSelected(ds);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-28 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Calendar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: monthName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(new Date(year, month - 1, 1)), className: "rounded-md p-1.5 transition hover:bg-accent hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setCursor(/* @__PURE__ */ new Date());
              setSelected((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
            }, className: "rounded-md px-2 py-1 text-xs transition hover:bg-accent", children: "Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(new Date(year, month + 1, 1)), className: "rounded-md p-1.5 transition hover:bg-accent hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: d }, d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: cells.map((d, i) => {
          if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, i);
          const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const isSel = ds === selected;
          const hasTasks = datesWithTasks.has(ds);
          const entry = days[ds];
          const isMarked = entry?.marked;
          const hasEvent = !!entry?.event;
          const hasNote = !!entry?.note;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleClick(ds), onDoubleClick: () => setEditing(ds), title: "Click to select • Double-click to add", className: `relative aspect-square rounded-lg text-sm transition-all hover:scale-105 ${isSel ? "bg-gradient-primary font-bold text-primary-foreground shadow-glow" : isMarked ? "border border-primary/60 bg-primary/10 font-semibold" : "hover:bg-accent"}`, children: [
            d,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5", children: [
              hasTasks && !isSel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-primary" }),
              hasEvent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-warning" }),
              hasNote && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-success" })
            ] })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }),
            " Tasks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-warning" }),
            " Event"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-success" }),
            " Note"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full border border-primary" }),
            " Marked"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: new Date(selected).toLocaleDateString(void 0, {
            weekday: "long",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(selected), className: "inline-flex items-center gap-1 rounded-md bg-gradient-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground shadow-glow transition hover:scale-105", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-3.5 w-3.5" }),
            " Add"
          ] })
        ] }),
        (selectedEntry.marked || selectedEntry.event || selectedEntry.note) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-2 rounded-xl border border-border bg-background/40 p-3 text-sm", children: [
          selectedEntry.marked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }),
            " Marked day"
          ] }),
          selectedEntry.event && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mt-0.5 h-4 w-4 text-warning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedEntry.event })
          ] }),
          selectedEntry.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "mt-0.5 h-4 w-4 text-success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-pre-wrap text-muted-foreground", children: selectedEntry.note })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          dayTasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No tasks for this day." }),
          dayTasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskItem, { task: t }, t.id))
        ] })
      ] })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(DayEditor, { date: editing, onClose: () => setEditing(null) })
  ] });
}
export {
  CalendarView as component
};
