import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as actions } from "./store-DGB-vTpe.mjs";
import { p as Trash2 } from "../_libs/lucide-react.mjs";
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
function TaskItem({ task }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => actions.toggleTask(task.id),
        className: `grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border-2 transition ${task.completed ? "border-primary bg-gradient-primary" : "border-muted-foreground/40 hover:border-primary"}`,
        "aria-label": "toggle",
        children: task.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "h-3 w-3 text-primary-foreground",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "3",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "20 6 9 17 4 12" })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `truncate text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`,
          children: task.title
        }
      ),
      task.time && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: task.time })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `hidden rounded-md px-2 py-0.5 text-[10px] font-medium sm:inline-block ${catColors[task.category]}`,
        children: task.category
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `rounded-md px-2 py-0.5 text-[10px] font-medium ${prioColors[task.priority]}`,
        children: task.priority
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => actions.deleteTask(task.id),
        className: "rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100",
        "aria-label": "delete",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
      }
    )
  ] });
}
export {
  TaskItem as T
};
