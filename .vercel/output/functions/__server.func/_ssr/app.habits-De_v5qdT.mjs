import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { m as Plus, p as Trash2, F as Flame } from "../_libs/lucide-react.mjs";
function Habits() {
  const habits = useStore((s) => s.habits);
  const [name, setName] = reactExports.useState("");
  const [emoji, setEmoji] = reactExports.useState("✨");
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Habits" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (!name.trim()) return;
      actions.addHabit(name.trim(), emoji);
      setName("");
    }, className: "flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: emoji, onChange: (e) => setEmoji(e.target.value), maxLength: 2, className: "w-14 rounded-lg border border-border bg-input px-3 py-2 text-center text-lg outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "New habit (e.g. Read 10 pages)", className: "flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: habits.map((h) => {
      const doneToday = h.history.includes(today);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: h.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.deleteHabit(h.id), className: "rounded p-1 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-semibold", children: h.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 text-warning" }),
          " ",
          h.streak,
          " day streak"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.toggleHabit(h.id), className: `mt-4 w-full rounded-lg py-2 text-sm font-medium transition ${doneToday ? "bg-success/20 text-success" : "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"}`, children: doneToday ? "✓ Done today" : "Mark as done" })
      ] }, h.id);
    }) })
  ] });
}
export {
  Habits as component
};
