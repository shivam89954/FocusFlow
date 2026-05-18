import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { n as Sparkles, A as ArrowRight, F as Flame, i as CircleCheck, L as ListTodo, C as Calendar, d as ChartColumn, T as Target, k as Moon } from "../_libs/lucide-react.mjs";
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
const KEY = "focusflow.welcomed";
function WelcomeModal({ onClose } = {}) {
  const [open, setOpen] = reactExports.useState(true);
  const navigate = useNavigate();
  if (!open) return null;
  const close = () => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, "1");
    setOpen(false);
    onClose?.();
  };
  const go = () => {
    close();
    navigate({ to: "/app" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 animate-fade-in",
      onClick: close,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-glow animate-scale-in",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 -z-10 bg-gradient-primary opacity-20 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Welcome" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-5xl font-bold text-gradient", children: "Day 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Your journey starts now. Build streaks, crush tasks, and master habits." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: go,
                className: "mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105",
                children: [
                  "Let's go ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function Landing() {
  const [showWelcome, setShowWelcome] = reactExports.useState(false);
  const triggerStart = (e) => {
    if (typeof window !== "undefined" && !localStorage.getItem("focusflow.welcomed")) {
      e.preventDefault();
      setShowWelcome(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-hero", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container mx-auto flex items-center justify-between px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold tracking-tight", children: "FocusFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", className: "hover:text-foreground", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#preview", className: "hover:text-foreground", children: "Preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105", children: [
        "Open App ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 pt-12 pb-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 text-warning" }),
        "Build a 30-day streak with FocusFlow"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl", children: [
        "Plan your day. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Master your habits." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg", children: "A beautifully simple task & habit tracker that keeps you consistent. Tasks, calendar, stats and streaks — all in one dark, focused workspace." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", onClick: triggerStart, className: "inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-[0_0_80px_-5px_oklch(0.62_0.22_285)]", children: [
          "Get started free ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#preview", className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-base font-medium backdrop-blur hover:bg-card", children: "See preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "preview", className: "relative mx-auto mt-20 max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-primary opacity-30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 border-b border-border bg-background/60 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-destructive/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-warning/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-success/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-xs text-muted-foreground", children: "focusflow.app/dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 p-6 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Day 1 · Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold", children: "65%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-[65%] bg-gradient-primary" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Streak" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold", children: "30 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-1", children: Array.from({
                length: 14
              }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-6 flex-1 rounded ${i < 11 ? "bg-gradient-primary" : "bg-muted"}` }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold", children: "4 tasks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" }),
                  " Workout"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-2 text-muted-foreground", children: "○ Read 20 pages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-2 text-muted-foreground", children: "○ React project" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "features", className: "container mx-auto px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center text-4xl font-bold md:text-5xl", children: "Everything you need to stay on track" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-center text-muted-foreground", children: "Six tools, one workspace. Built to feel fast and beautiful." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: [{
        icon: ListTodo,
        t: "Add Tasks",
        d: "Capture todos with priority, category & due date."
      }, {
        icon: Calendar,
        t: "Calendar View",
        d: "See your week and month at a glance."
      }, {
        icon: ChartColumn,
        t: "Progress Tracking",
        d: "Visual stats for completion & productivity."
      }, {
        icon: Target,
        t: "Categories",
        d: "Work, Study, Personal, Health — organize better."
      }, {
        icon: Flame,
        t: "Streaks",
        d: "Stay consistent with daily streak counters."
      }, {
        icon: Moon,
        t: "Dark Mode",
        d: "A focused, eye-friendly dark interface."
      }].map(({
        icon: Icon,
        t,
        d
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent transition group-hover:bg-gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: d })
      ] }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how", className: "container mx-auto px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border bg-card p-10 md:p-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-10 md:grid-cols-3", children: [{
      n: "01",
      t: "Add your tasks",
      d: "Capture everything that matters today."
    }, {
      n: "02",
      t: "Track progress",
      d: "Tick items off and watch your streak grow."
    }, {
      n: "03",
      t: "Build habits",
      d: "Repeat daily and turn streaks into routines."
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-bold text-gradient", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-xl font-semibold", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.d })
    ] }, s.n)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold md:text-5xl", children: "Ready to focus?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Jump into your dashboard. No sign-up required — everything saves locally." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", onClick: triggerStart, className: "mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105", children: [
        "Launch FocusFlow ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border py-8 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FocusFlow · Crafted for focused minds"
    ] }),
    showWelcome && /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeModal, { onClose: () => setShowWelcome(false) })
  ] });
}
export {
  Landing as component
};
