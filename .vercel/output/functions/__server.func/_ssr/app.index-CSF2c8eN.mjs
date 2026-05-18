import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { T as TaskItem } from "./TaskItem-Crn3DTE_.mjs";
import { m as Plus, Z as Zap, q as Trophy, a as BookmarkCheck, c as CalendarPlus, o as StickyNote, b as CalendarDays, F as Flame, X, e as ChevronDown, i as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function CircularProgress({ rings, size = 220, stroke = 10, gap = 8, children }) {
  const center = size / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-grid place-items-center", style: { width: size, height: size }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, className: "-rotate-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: rings.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: `glow-${i}`, x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "b" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] }, i)) }),
      rings.map((r, i) => {
        const radius = center - stroke / 2 - i * (stroke + gap);
        if (radius <= 0) return null;
        const c = 2 * Math.PI * radius;
        const dash = Math.min(100, Math.max(0, r.value)) / 100 * c;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: center,
              cy: center,
              r: radius,
              fill: "none",
              stroke: "oklch(0.28 0.025 270)",
              strokeWidth: stroke
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: center,
              cy: center,
              r: radius,
              fill: "none",
              stroke: r.color,
              strokeWidth: stroke,
              strokeLinecap: "round",
              strokeDasharray: `${dash} ${c}`,
              filter: `url(#glow-${i})`,
              style: { transition: "stroke-dasharray 600ms ease" }
            }
          )
        ] }, i);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center text-center", children })
  ] });
}
const UNIT_OPTIONS = [{
  label: "Days",
  value: "days",
  multiplier: 1
}, {
  label: "Months",
  value: "months",
  multiplier: 30
}, {
  label: "Years",
  value: "years",
  multiplier: 365
}];
function getDaysRemaining(challenge) {
  const start = new Date(challenge.startDate);
  const now = /* @__PURE__ */ new Date();
  const daysPassed = Math.floor((now - start) / (1e3 * 60 * 60 * 24));
  return Math.max(0, challenge.totalDays - daysPassed);
}
function getProgressPct(challenge) {
  const remaining = getDaysRemaining(challenge);
  const passed = challenge.totalDays - remaining;
  return Math.min(100, Math.round(passed / challenge.totalDays * 100));
}
function getDurationLabel(totalDays) {
  if (totalDays % 365 === 0) return `${totalDays / 365} Year${totalDays / 365 > 1 ? "s" : ""}`;
  if (totalDays % 30 === 0) return `${totalDays / 30} Month${totalDays / 30 > 1 ? "s" : ""}`;
  return `${totalDays} Day${totalDays > 1 ? "s" : ""}`;
}
function useChallengeAutoClean(challenges) {
  reactExports.useEffect(() => {
    if (!challenges) return;
    challenges.forEach((c) => {
      if (getDaysRemaining(c) === 0) {
        const t = setTimeout(() => actions.removeChallenge(c.id), 3e3);
        return () => clearTimeout(t);
      }
    });
  }, [challenges]);
}
function AddChallengeModal({
  onClose
}) {
  const [name, setName] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("");
  const [unit, setUnit] = reactExports.useState("days");
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = parseInt(duration, 10);
    if (!name.trim() || !d || d <= 0) return;
    const multiplier = UNIT_OPTIONS.find((u) => u.value === unit)?.multiplier ?? 1;
    actions.addChallenge(name.trim(), d * multiplier);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-scale-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "New Challenge" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Challenge Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Morning Running", className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", value: duration, onChange: (e) => setDuration(e.target.value), placeholder: "e.g. 7", className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Unit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: unit, onChange: (e) => setUnit(e.target.value), className: "w-full appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-8 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20", children: UNIT_OPTIONS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.value, children: u.label }, u.value)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })
            ] })
          ] })
        ] }),
        name && duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " ",
            "for ",
            getDurationLabel(parseInt(duration || 0) * (UNIT_OPTIONS.find((u) => u.value === unit)?.multiplier ?? 1))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !name.trim() || !duration || parseInt(duration) <= 0, className: "w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100", children: "Start Challenge 🚀" })
      ] })
    ] })
  ] });
}
function ChallengeCard({
  challenge,
  onRemove
}) {
  const remaining = getDaysRemaining(challenge);
  const pct = getProgressPct(challenge);
  const isComplete = remaining === 0;
  const passed = challenge.totalDays - remaining;
  const completedPct = Math.min(100, passed / challenge.totalDays * 100);
  const remainingPct = Math.min(100, remaining / challenge.totalDays * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${isComplete ? "border-green-500/40 bg-gradient-to-br from-green-500/10 to-emerald-500/5" : "border-border bg-card hover:border-primary/40 hover:shadow-primary/10"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: 80, stroke: 6, gap: 3, rings: [{
        value: completedPct,
        color: isComplete ? "oklch(0.72 0.18 150)" : "oklch(0.72 0.2 295)"
      }, {
        value: remainingPct,
        color: isComplete ? "oklch(0.78 0.16 140)" : "oklch(0.78 0.16 75)"
      }], children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-gradient leading-none", children: remaining }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[8px] uppercase tracking-wide text-muted-foreground mt-0.5", children: "left" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm leading-tight truncate", children: challenge.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onRemove, className: "flex-shrink-0 rounded-lg p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
          getDurationLabel(challenge.totalDays),
          " challenge"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
              background: isComplete ? "oklch(0.72 0.18 150)" : "oklch(0.72 0.2 295)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              passed,
              "d done"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
              background: isComplete ? "oklch(0.78 0.16 140)" : "oklch(0.78 0.16 75)"
            } }),
            isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-green-500", children: "Complete! 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              remaining,
              "d left"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-[11px] font-bold text-primary", children: [
            pct,
            "%"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Dashboard() {
  const tasks = useStore((s) => s.tasks);
  const streak = useStore((s) => s.streakDays);
  const daysMap = useStore((s) => s.days);
  const challenges = useStore((s) => s.challenges || []);
  const firstLoginDate = useStore((s) => s.firstLoginDate);
  const [showAddChallenge, setShowAddChallenge] = reactExports.useState(false);
  const dayNumber = firstLoginDate ? Math.floor((/* @__PURE__ */ new Date() - new Date(firstLoginDate)) / (1e3 * 60 * 60 * 24)) + 1 : 1;
  useChallengeAutoClean(challenges);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todays = tasks.filter((t) => t.dueDate === today);
  const done = todays.filter((t) => t.completed).length;
  const pct = todays.length ? Math.round(done / todays.length * 100) : 0;
  const totalAll = tasks.length;
  const doneAll = tasks.filter((t) => t.completed).length;
  const pendingAll = totalAll - doneAll;
  const completionRate = totalAll ? Math.round(doneAll / totalAll * 100) : 0;
  const pendingRate = totalAll ? Math.round(pendingAll / totalAll * 100) : 0;
  const totalRate = Math.min(100, totalAll * 8);
  const calendarNotes = Object.entries(daysMap).filter(([, e]) => e?.note || e?.event || e?.marked).sort(([a], [b]) => a < b ? 1 : -1).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showAddChallenge && /* @__PURE__ */ jsxRuntimeExports.jsx(AddChallengeModal, { onClose: () => setShowAddChallenge(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 pb-28 md:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Day 1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: "Progress" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-gradient", children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-primary transition-all duration-700", style: {
              width: `${pct}%`
            } }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:scale-[1.01]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-5 blur-3xl transition-opacity duration-500 group-hover:opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-foreground", children: "Ready to plan?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Create your next task and keep the momentum going" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/today", className: "inline-flex w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
              " Add Tasks"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Today's Tasks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent px-2 py-0.5 text-xs", children: todays.length })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            todays.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No tasks today — tap Add to create one." }),
            todays.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskItem, { task: t }, t.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Challenges" }),
              challenges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: challenges.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAddChallenge(true), className: "inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:scale-105", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " New Challenge"
            ] })
          ] }),
          challenges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setShowAddChallenge(true), className: "group cursor-pointer rounded-2xl border-2 border-dashed border-border py-10 text-center transition hover:border-primary/50 hover:bg-primary/3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto mb-3 h-10 w-10 text-muted-foreground/40 transition group-hover:text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "No active challenges" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground/60", children: "Click to add your first challenge" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: challenges.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeCard, { challenge: c, onRemove: () => actions.removeChallenge(c.id) }, c.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Calendar Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/calendar", className: "text-xs text-primary transition hover:underline", children: "View all" })
          ] }),
          calendarNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: "No reminders or notes yet. Add some from the Calendar." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: calendarNotes.map(([date, e]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/40 p-3 transition hover:border-primary/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary", children: new Date(date).toLocaleDateString(void 0, {
                weekday: "short",
                month: "short",
                day: "numeric"
              }) }),
              e.marked && /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5 text-primary" })
            ] }),
            e.event && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.event })
            ] }),
            e.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-start gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 whitespace-pre-wrap", children: e.note })
            ] })
          ] }, date)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-left w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Current Activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Active Streak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: 180, stroke: 8, gap: 0, rings: [{
              value: 100,
              color: "oklch(0.72 0.2 295)"
            }], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1 bg-background/50 backdrop-blur px-3 py-1 rounded-full border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-foreground font-semibold", children: [
                  "Day ",
                  dayNumber
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "mx-auto mt-2 mb-1 h-6 w-6 text-warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-gradient leading-none", children: streak }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-muted-foreground mt-1.5 font-medium", children: streak === 1 ? "Day" : "Days" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-semibold", children: "Quick Stats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { size: 170, stroke: 7, gap: 4, rings: [{
              value: completionRate,
              color: "oklch(0.72 0.2 295)"
            }, {
              value: pendingRate,
              color: "oklch(0.78 0.16 75)"
            }, {
              value: totalRate,
              color: "oklch(0.72 0.18 200)"
            }], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-gradient leading-none", children: [
                completionRate,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mt-1", children: "Done" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-1.5 w-1.5 rounded-full", style: {
                  background: "oklch(0.72 0.2 295)"
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-semibold", children: doneAll }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-[10px]", children: "Done" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-1.5 w-1.5 rounded-full", style: {
                  background: "oklch(0.78 0.16 75)"
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-semibold", children: pendingAll }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-[10px]", children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-1.5 w-1.5 rounded-full", style: {
                  background: "oklch(0.72 0.18 200)"
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-semibold", children: totalAll }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-[10px]", children: "Total" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Dashboard as component
};
