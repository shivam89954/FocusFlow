import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  CalendarDays,
  ListTodo,
  BarChart3,
  Repeat,
  Settings,
  Sparkles,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/today", label: "Today", icon: CalendarDays },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/tasks", label: "Tasks", icon: ListTodo },
  { to: "/app/stats", label: "Stats", icon: BarChart3 },
  { to: "/app/habits", label: "Habits", icon: Repeat },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

const COLLAPSE_KEY = "focusflow.sidebar.collapsed";

export function AppShell({ children, title }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const userName = useStore((s) => s.userName);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar mobile */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar/90 px-4 py-3 backdrop-blur md:hidden">
        <Link to="/app" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">FocusFlow</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 transition hover:bg-accent"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${open ? "fixed inset-0 z-50 block bg-sidebar" : "hidden"} md:sticky md:top-0 md:block md:h-screen ${sideWidth} md:flex-shrink-0 md:bg-sidebar transition-all duration-300 border-r border-border`}
        >
          <div className="flex h-full flex-col p-4">
            <div className="hidden items-center justify-between md:flex">
              <Link
                to="/"
                className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`}
                onClick={() => setOpen(false)}
              >
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                {!collapsed && <span className="text-lg font-bold">FocusFlow</span>}
              </Link>
              {!collapsed && (
                <button
                  onClick={toggleCollapse}
                  className="rounded-md p-1.5 transition hover:bg-accent"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              )}
            </div>
            {collapsed && (
              <button
                onClick={toggleCollapse}
                className="mt-3 hidden rounded-md p-2 transition hover:bg-accent md:grid md:place-items-center"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            )}

            <nav className="mt-8 flex-1 space-y-1">
              {nav.map((item) => {
                const active = item.exact
                  ? path === item.to
                  : path.startsWith(item.to) && item.to !== "/app";
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    title={item.label}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:scale-[1.03] ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:shadow-sm"
                    } ${collapsed ? "md:justify-center md:px-2" : ""}`}
                  >
                    <item.icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
                    <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div
              className={`mt-4 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 ${collapsed ? "md:justify-center md:p-2" : ""}`}
            >
              <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className={`min-w-0 ${collapsed ? "md:hidden" : ""}`}>
                <div className="truncate text-sm font-medium">{userName}</div>
                <div className="truncate text-xs text-muted-foreground">Stay focused ✨</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 p-4 md:p-8">
          {title && <h1 className="mb-6 text-2xl font-bold md:text-3xl">{title}</h1>}
          {children}
        </main>
      </div>

      {/* Floating arrow to hide/show bottom nav (mobile) */}
      <button
        onClick={() => setNavHidden((v) => !v)}
        aria-label={navHidden ? "Show menu" : "Hide menu"}
        className={`fixed right-3 z-50 grid h-9 w-9 place-items-center rounded-full border border-border bg-sidebar/95 shadow-glow backdrop-blur transition-all md:hidden ${navHidden ? "bottom-3" : "bottom-[78px]"}`}
      >
        {navHidden ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Bottom nav mobile — pill style */}
      <nav
        className={`fixed inset-x-0 z-40 mx-auto flex w-[94%] max-w-md items-center justify-around rounded-2xl border border-border bg-sidebar/95 px-2 py-2 shadow-glow backdrop-blur transition-all duration-300 md:hidden ${
          navHidden ? "bottom-[-100px] opacity-0 pointer-events-none" : "bottom-3 opacity-100"
        }`}
      >
        {nav.slice(0, 5).map((item) => {
          const active = item.exact
            ? path === item.to
            : path.startsWith(item.to) && item.to !== "/app";
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[10px] transition-all duration-200 ${
                active
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground hover:scale-[1.08]"
              }`}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
