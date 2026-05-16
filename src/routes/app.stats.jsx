import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/app/stats")({ component: Stats });

function Stats() {
  const tasks = useStore((s) => s.tasks);
  const streak = useStore((s) => s.streakDays);
  const done = tasks.filter((t) => t.completed);
  const productivity = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
    day: d,
    done: Math.max(0, Math.round(((done.length || 4) / 7) * (1 + Math.sin(i)))),
  }));

  const cats = ["Work", "Study", "Personal", "Health", "Home"]
    .map((c) => ({
      name: c,
      value: tasks.filter((t) => t.category === c).length || 0,
    }))
    .filter((c) => c.value > 0);
  const colors = ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"];

  const KPIs = [
    { label: "Tasks Completed", value: done.length, sub: "+12% from last week" },
    { label: "Total Tasks", value: tasks.length, sub: "+8% from last week" },
    { label: "Productivity", value: `${productivity}%`, sub: "+15% from last week" },
    { label: "Streak", value: `${streak}`, sub: "days" },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h1 className="text-2xl font-bold md:text-3xl">Your Progress</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIs.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-2 text-3xl font-bold">{k.value}</div>
            <div className="mt-1 text-xs text-success">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">Completion Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.21 0.025 270)",
                    border: "1px solid oklch(0.28 0.025 270)",
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="done"
                  stroke="oklch(0.62 0.22 285)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold">Tasks by Category</h3>
          {cats.length === 0 ? (
            <div className="grid h-64 place-items-center text-sm text-muted-foreground">
              No data yet
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-[180px_1fr] items-center">
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cats}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {cats.map((_, i) => (
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {cats.map((c, i) => {
                  const total = cats.reduce((s, x) => s + x.value, 0);
                  const pct = Math.round((c.value / total) * 100);
                  return (
                    <div
                      key={c.name}
                      className="group rounded-xl border border-border bg-background/40 p-2.5 transition hover:border-primary/40 hover:scale-[1.02]"
                    >
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-medium">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: colors[i % colors.length] }}
                          />
                          {c.name}
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-bold text-foreground">{c.value}</span> · {pct}%
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: colors[i % colors.length] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
