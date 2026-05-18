import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { T as TaskItem } from "./TaskItem-Crn3DTE_.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as Plus, n as Sparkles, Q as Quote } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const cats = ["Work", "Study", "Personal", "Health", "Home"];
const prios = ["Low", "Medium", "High"];
const DAILY_MOTIVATIONS = [
  // Sunday
  ["The secret of getting ahead is getting started.", "Don't watch the clock; do what it does. Keep going.", "Action is the foundational key to all success.", "Success is not final, failure is not fatal: it is courage that counts.", "Every day is a second chance to reach your goals."],
  // Monday
  ["It's Monday. Get a new perspective and crush the week.", "Your morning thoughts set the tone for your whole day.", "Focus on being productive instead of just being busy.", "Make today your absolute masterpiece.", "Discipline is choosing what you want most over what you want now."],
  // Tuesday
  ["Small daily improvements over time lead to stunning results.", "Believe you can and you're already halfway there.", "The only bad workout is the one that didn't happen.", "Push yourself, because no one else is going to do it for you.", "Great things never come from staying in your comfort zone."],
  // Wednesday
  ["Halfway there! Keep your momentum going strong.", "Don't stop when you are tired. Stop when you are done.", "The future depends on exactly what you do today.", "If it doesn't challenge you, it won't change you.", "Dream big, stay focused, and dare to fail."],
  // Thursday
  ["Thursday is your chance to finish the week strong.", "You are capable of absolutely amazing things.", "What you do today can improve all your tomorrows.", "Don't wait for the perfect opportunity. Create it.", "Hard work beats talent when talent doesn't work hard."],
  // Friday
  ["Finish strong. Excellence is a continuous habit.", "Success is what comes after you stop making excuses.", "You miss 100% of the shots you don't take.", "Doubt kills more dreams than failure ever will.", "Stay consistent, stay dedicated, stay focused."],
  // Saturday
  ["Take time to reflect, plan, and recharge.", "A year from now you may wish you had started today.", "Self-care is a vital part of staying highly productive.", "Celebrate your small wins this week.", "Rest is necessary to run the marathon of life."]
];
function Today() {
  const tasks = useStore((s) => s.tasks);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todays = tasks.filter((t) => t.dueDate === today);
  const [title, setTitle] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Personal");
  const [priority, setPriority] = reactExports.useState("Medium");
  const [time, setTime] = reactExports.useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    actions.addTask({
      title: title.trim(),
      category,
      priority,
      dueDate: today,
      time: time || void 0
    });
    setTitle("");
    setTime("");
    toast.success("Task added");
  };
  const dayOfWeek = (/* @__PURE__ */ new Date()).getDay();
  const todaysQuotes = DAILY_MOTIVATIONS[dayOfWeek];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-28 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Today" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
        weekday: "long",
        month: "long",
        day: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-0 bg-gradient-primary opacity-10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Task Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "What do you want to accomplish today?", className: "w-full flex-1 rounded-xl border border-border bg-input px-4 py-3.5 text-base font-medium outline-none transition focus:border-primary focus:shadow-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add Task"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground", children: [
          "Today's tasks (",
          todays.length,
          ")"
        ] }),
        todays.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground", children: "Nothing scheduled today." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: todays.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskItem, { task: t }, t.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-muted-foreground", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-muted-foreground", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: prios.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPriority(p), className: `flex-1 rounded-lg px-2 py-2 text-xs font-medium transition hover:scale-105 ${priority === p ? "bg-gradient-primary text-primary-foreground shadow-glow" : "border border-border hover:bg-accent"}`, children: p }, p)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs font-medium text-muted-foreground", children: "Time (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: time, onChange: (e) => setTime(e.target.value), className: "w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-20 -z-0 bg-gradient-primary opacity-5 blur-3xl transition-opacity duration-700 group-hover:opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Daily Inspiration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fuel for your focus today" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-widest text-primary uppercase", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
            weekday: "long"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: todaysQuotes.map((quote, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative overflow-hidden rounded-xl border border-border bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md ${idx >= 3 ? "lg:col-span-1.5" : ""}`, style: idx === 3 ? {
          gridColumn: "1 / span 1"
        } : idx === 4 ? {
          gridColumn: "2 / span 2"
        } : {}, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute -right-2 -top-2 h-12 w-12 text-primary/10 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-primary/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative z-10 text-sm font-medium leading-relaxed text-foreground/90", children: [
            '"',
            quote,
            '"'
          ] })
        ] }, idx)) })
      ] })
    ] })
  ] });
}
export {
  Today as component
};
