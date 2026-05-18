import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore } from "./store-DGB-vTpe.mjs";
import { R as ResponsiveContainer, a as LineChart, X as XAxis, Y as YAxis, T as Tooltip, L as Line, b as PieChart, P as Pie, C as Cell } from "../_libs/recharts.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Stats() {
  const tasks = useStore((s) => s.tasks);
  const streak = useStore((s) => s.streakDays);
  const done = tasks.filter((t) => t.completed);
  const productivity = tasks.length ? Math.round(done.length / tasks.length * 100) : 0;
  const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
    day: d,
    done: Math.max(0, Math.round((done.length || 4) / 7 * (1 + Math.sin(i))))
  }));
  const cats = ["Work", "Study", "Personal", "Health", "Home"].map((c) => ({
    name: c,
    value: tasks.filter((t) => t.category === c).length || 0
  })).filter((c) => c.value > 0);
  const colors = ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"];
  const KPIs = [{
    label: "Tasks Completed",
    value: done.length,
    sub: "+12% from last week"
  }, {
    label: "Total Tasks",
    value: tasks.length,
    sub: "+8% from last week"
  }, {
    label: "Productivity",
    value: `${productivity}%`,
    sub: "+15% from last week"
  }, {
    label: "Streak",
    value: `${streak}`,
    sub: "days"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Your Progress" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: KPIs.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: k.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold", children: k.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-success", children: k.sub })
    ] }, k.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Completion Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: weekly, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "oklch(0.21 0.025 270)",
            border: "1px solid oklch(0.28 0.025 270)",
            borderRadius: 8
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "done", stroke: "oklch(0.62 0.22 285)", strokeWidth: 3, dot: {
            r: 4
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Tasks by Category" }),
        cats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-64 place-items-center text-sm text-muted-foreground", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-[180px_1fr] items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: cats, dataKey: "value", nameKey: "name", innerRadius: 45, outerRadius: 75, paddingAngle: 4, stroke: "none", children: cats.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: colors[i % colors.length] }, i)) }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: cats.map((c, i) => {
            const total = cats.reduce((s, x) => s + x.value, 0);
            const pct = Math.round(c.value / total * 100);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-border bg-background/40 p-2.5 transition hover:border-primary/40 hover:scale-[1.02]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full", style: {
                    background: colors[i % colors.length]
                  } }),
                  c.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: c.value }),
                  " · ",
                  pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
                width: `${pct}%`,
                background: colors[i % colors.length]
              } }) })
            ] }, c.name);
          }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Stats as component
};
