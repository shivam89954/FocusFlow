import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Calendar,
  BarChart3,
  Flame,
  Moon,
  Sparkles,
  ArrowRight,
  ListTodo,
  Target,
} from "lucide-react";
import { useState } from "react";
import { WelcomeModal } from "@/components/WelcomeModal";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const [showWelcome, setShowWelcome] = useState(false);
  const triggerStart = (e) => {
    if (typeof window !== "undefined" && !localStorage.getItem("focusflow.welcomed")) {
      e.preventDefault();
      setShowWelcome(true);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Nav */}
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">FocusFlow</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#preview" className="hover:text-foreground">
            Preview
          </a>
        </nav>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Open App <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-12 pb-24 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <Flame className="h-3.5 w-3.5 text-warning" />
          Build a 30-day streak with FocusFlow
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Plan your day. <br />
          <span className="text-gradient">Master your habits.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          A beautifully simple task & habit tracker that keeps you consistent. Tasks, calendar,
          stats and streaks — all in one dark, focused workspace.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/app"
            onClick={triggerStart}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-[0_0_80px_-5px_oklch(0.62_0.22_285)]"
          >
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#preview"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-base font-medium backdrop-blur hover:bg-card"
          >
            See preview
          </a>
        </div>

        {/* Floating preview mock */}
        <div id="preview" className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-30 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="flex items-center gap-1.5 border-b border-border bg-background/60 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <span className="ml-3 text-xs text-muted-foreground">focusflow.app/dashboard</span>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-xs text-muted-foreground">Day 1 · Progress</div>
                <div className="mt-2 text-3xl font-bold">65%</div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[65%] bg-gradient-primary" />
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-xs text-muted-foreground">Streak</div>
                <div className="mt-2 text-3xl font-bold">30 days</div>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-6 flex-1 rounded ${i < 11 ? "bg-gradient-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-xs text-muted-foreground">Today</div>
                <div className="mt-2 text-3xl font-bold">4 tasks</div>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Workout
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">○ Read 20 pages</li>
                  <li className="flex items-center gap-2 text-muted-foreground">○ React project</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h2 className="text-center text-4xl font-bold md:text-5xl">
          Everything you need to stay on track
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Six tools, one workspace. Built to feel fast and beautiful.
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ListTodo,
              t: "Add Tasks",
              d: "Capture todos with priority, category & due date.",
            },
            { icon: Calendar, t: "Calendar View", d: "See your week and month at a glance." },
            {
              icon: BarChart3,
              t: "Progress Tracking",
              d: "Visual stats for completion & productivity.",
            },
            {
              icon: Target,
              t: "Categories",
              d: "Work, Study, Personal, Health — organize better.",
            },
            { icon: Flame, t: "Streaks", d: "Stay consistent with daily streak counters." },
            { icon: Moon, t: "Dark Mode", d: "A focused, eye-friendly dark interface." },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-glow"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent transition group-hover:bg-gradient-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="container mx-auto px-6 py-24">
        <div className="rounded-3xl border border-border bg-card p-10 md:p-16">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { n: "01", t: "Add your tasks", d: "Capture everything that matters today." },
              { n: "02", t: "Track progress", d: "Tick items off and watch your streak grow." },
              { n: "03", t: "Build habits", d: "Repeat daily and turn streaks into routines." },
            ].map((s) => (
              <div key={s.n}>
                <div className="text-5xl font-bold text-gradient">{s.n}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">Ready to focus?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Jump into your dashboard. No sign-up required — everything saves locally.
        </p>
        <Link
          to="/app"
          onClick={triggerStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Launch FocusFlow <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FocusFlow · Crafted for focused minds
      </footer>

      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
    </div>
  );
}
