import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore } from "./store-DGB-vTpe.mjs";
import { n as Sparkles, X, M as Menu, P as PanelLeftClose, l as PanelLeftOpen, H as House, b as CalendarDays, L as ListTodo, d as ChartColumn, R as Repeat, S as Settings, h as ChevronUp, e as ChevronDown } from "../_libs/lucide-react.mjs";
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
const nav = [
  { to: "/app", label: "Home", icon: House, exact: true },
  { to: "/app/today", label: "Today", icon: CalendarDays },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/tasks", label: "Tasks", icon: ListTodo },
  { to: "/app/stats", label: "Stats", icon: ChartColumn },
  { to: "/app/habits", label: "Habits", icon: Repeat },
  { to: "/app/settings", label: "Settings", icon: Settings }
];
const COLLAPSE_KEY = "focusflow.sidebar.collapsed";
function AppShell({ children, title }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const userName = useStore((s) => s.userName);
  const [open, setOpen] = reactExports.useState(false);
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [navHidden, setNavHidden] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    }
  }, []);
  const toggleCollapse = () => {
    setCollapsed((v) => {
      const next = !v;
      if (typeof window !== "undefined") localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  };
  const sideWidth = collapsed ? "md:w-20" : "md:w-64";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar/90 px-4 py-3 backdrop-blur md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "FocusFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen((v) => !v),
          className: "rounded-md p-2 transition hover:bg-accent",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: `${open ? "fixed inset-0 z-50 block bg-sidebar" : "hidden"} md:sticky md:top-0 md:block md:h-screen ${sideWidth} md:flex-shrink-0 md:bg-sidebar transition-all duration-300 border-r border-border`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center justify-between md:flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/",
                  className: `flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`,
                  onClick: () => setOpen(false),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
                    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", children: "FocusFlow" })
                  ]
                }
              ),
              !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: toggleCollapse,
                  className: "rounded-md p-1.5 transition hover:bg-accent",
                  "aria-label": "Collapse sidebar",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftClose, { className: "h-4 w-4" })
                }
              )
            ] }),
            collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: toggleCollapse,
                className: "mt-3 hidden rounded-md p-2 transition hover:bg-accent md:grid md:place-items-center",
                "aria-label": "Expand sidebar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftOpen, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-8 flex-1 space-y-1", children: nav.map((item) => {
              const active = item.exact ? path === item.to : path.startsWith(item.to) && item.to !== "/app";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: item.to,
                  onClick: () => setOpen(false),
                  title: item.label,
                  className: `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:scale-[1.03] ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:shadow-sm"} ${collapsed ? "md:justify-center md:px-2" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `h-4 w-4 flex-shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: collapsed ? "md:hidden" : "", children: item.label })
                  ]
                },
                item.to
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `mt-4 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 ${collapsed ? "md:justify-center md:p-2" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground", children: userName.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-w-0 ${collapsed ? "md:hidden" : ""}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: userName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: "Stay focused ✨" })
                  ] })
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 flex-1 p-4 md:p-8", children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-2xl font-bold md:text-3xl", children: title }),
        children
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setNavHidden((v) => !v),
        "aria-label": navHidden ? "Show menu" : "Hide menu",
        className: `fixed right-3 z-50 grid h-9 w-9 place-items-center rounded-full border border-border bg-sidebar/95 shadow-glow backdrop-blur transition-all md:hidden ${navHidden ? "bottom-3" : "bottom-[78px]"}`,
        children: navHidden ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: `fixed inset-x-0 z-40 mx-auto flex w-[94%] max-w-md items-center justify-around rounded-2xl border border-border bg-sidebar/95 px-2 py-2 shadow-glow backdrop-blur transition-all duration-300 md:hidden ${navHidden ? "bottom-[-100px] opacity-0 pointer-events-none" : "bottom-3 opacity-100"}`,
        children: nav.slice(0, 5).map((item) => {
          const active = item.exact ? path === item.to : path.startsWith(item.to) && item.to !== "/app";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: `group flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[10px] transition-all duration-200 ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent hover:text-foreground hover:scale-[1.08]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `h-5 w-5 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}` }),
                item.label
              ]
            },
            item.to
          );
        })
      }
    )
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};
