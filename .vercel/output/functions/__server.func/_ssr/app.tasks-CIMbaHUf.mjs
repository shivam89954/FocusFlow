import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { i as CircleCheck, j as Clock, p as Trash2 } from "../_libs/lucide-react.mjs";
const catColors = {
  Work: "bg-blue-500/20 text-blue-300",
  Study: "bg-cyan-500/20 text-cyan-300",
  Personal: "bg-pink-500/20 text-pink-300",
  Health: "bg-emerald-500/20 text-emerald-300",
  Home: "bg-violet-500/20 text-violet-300"
};
const prioColors = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/15 text-warning",
  High: "bg-destructive/15 text-destructive"
};
function Tasks() {
  const tasks = useStore((s) => s.tasks);
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = tasks.filter((t) => filter === "all" ? true : filter === "pending" ? !t.completed : t.completed);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "All Tasks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground", children: [
        tasks.length,
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rounded-xl border border-border bg-card p-1", children: ["all", "pending", "completed"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: `flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${filter === f ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-accent"}`, children: f }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground", children: "No tasks here." }),
      filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow", children: [
        t.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-warning/15 text-warning", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `truncate text-sm font-medium ${t.completed ? "text-muted-foreground line-through" : ""}`, children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-1.5 py-0.5 text-[10px] font-medium ${t.completed ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`, children: t.completed ? "Completed" : "Pending" }),
            t.time && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.time })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `hidden rounded-md px-2 py-0.5 text-[10px] font-medium sm:inline-block ${catColors[t.category]}`, children: t.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-[10px] font-medium ${prioColors[t.priority]}`, children: t.priority }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => actions.deleteTask(t.id), className: "rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100", "aria-label": "delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, t.id))
    ] })
  ] });
}
export {
  Tasks as component
};
