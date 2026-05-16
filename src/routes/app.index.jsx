import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { actions, useStore } from "@/lib/store";
import { TaskItem } from "@/components/TaskItem";
import { CircularProgress } from "@/components/CircularProgress";
import {
  Flame,
  Plus,
  Minus,
  StickyNote,
  CalendarPlus,
  BookmarkCheck,
  Trophy,
  Target,
  Zap,
  X,
  Clock,
  CheckCircle2,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

export const Route = createFileRoute("/app/")({ component: Dashboard });



const UNIT_OPTIONS = [
  { label: "Days", value: "days", multiplier: 1 },
  { label: "Months", value: "months", multiplier: 30 },
  { label: "Years", value: "years", multiplier: 365 },
];

function getDaysRemaining(challenge) {
  const start = new Date(challenge.startDate);
  const now = new Date();
  const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(0, challenge.totalDays - daysPassed);
}

function getProgressPct(challenge) {
  const remaining = getDaysRemaining(challenge);
  const passed = challenge.totalDays - remaining;
  return Math.min(100, Math.round((passed / challenge.totalDays) * 100));
}

function getDurationLabel(totalDays) {
  if (totalDays % 365 === 0) return `${totalDays / 365} Year${totalDays / 365 > 1 ? "s" : ""}`;
  if (totalDays % 30 === 0) return `${totalDays / 30} Month${totalDays / 30 > 1 ? "s" : ""}`;
  return `${totalDays} Day${totalDays > 1 ? "s" : ""}`;
}

// Auto-remove completed challenges
function useChallengeAutoClean(challenges) {
  useEffect(() => {
    if (!challenges) return;
    challenges.forEach((c) => {
      if (getDaysRemaining(c) === 0) {
        // show it briefly then remove
        const t = setTimeout(() => actions.removeChallenge(c.id), 3000);
        return () => clearTimeout(t);
      }
    });
  }, [challenges]);
}

function AddChallengeModal({ onClose }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("days");
  const inputRef = useRef(null);

  useEffect(() => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold">New Challenge</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Challenge Name
            </label>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Running"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Duration
              </label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 7"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Unit
              </label>
              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-8 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {name && duration && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
              <span className="font-semibold text-primary">{name}</span>
              <span className="text-muted-foreground">
                {" "}
                for {getDurationLabel(
                  parseInt(duration || 0) *
                    (UNIT_OPTIONS.find((u) => u.value === unit)?.multiplier ?? 1)
                )}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={!name.trim() || !duration || parseInt(duration) <= 0}
            className="w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Start Challenge 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, onRemove }) {
  const remaining = getDaysRemaining(challenge);
  const pct = getProgressPct(challenge);
  const isComplete = remaining === 0;
  const passed = challenge.totalDays - remaining;

  // Two rings: completed days (purple) + remaining days (amber)
  const completedPct = Math.min(100, (passed / challenge.totalDays) * 100);
  const remainingPct = Math.min(100, (remaining / challenge.totalDays) * 100);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
        isComplete
          ? "border-green-500/40 bg-gradient-to-br from-green-500/10 to-emerald-500/5"
          : "border-border bg-card hover:border-primary/40 hover:shadow-primary/10"
      }`}
    >
      <div className="absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />
      <div className="relative z-10 flex items-center gap-4">
        {/* Circular ring */}
        <div className="flex-shrink-0">
          <CircularProgress
            size={80}
            stroke={6}
            gap={3}
            rings={[
              { value: completedPct, color: isComplete ? "oklch(0.72 0.18 150)" : "oklch(0.72 0.2 295)" },
              { value: remainingPct, color: isComplete ? "oklch(0.78 0.16 140)" : "oklch(0.78 0.16 75)" },
            ]}
          >
            <div>
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <>
                  <div className="text-lg font-bold text-gradient leading-none">{remaining}</div>
                  <div className="text-[8px] uppercase tracking-wide text-muted-foreground mt-0.5">left</div>
                </>
              )}
            </div>
          </CircularProgress>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <div className="font-semibold text-sm leading-tight truncate">{challenge.name}</div>
            <button
              onClick={onRemove}
              className="flex-shrink-0 rounded-lg p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {getDurationLabel(challenge.totalDays)} challenge
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: isComplete ? "oklch(0.72 0.18 150)" : "oklch(0.72 0.2 295)" }}
              />
              <span className="text-muted-foreground">{passed}d done</span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: isComplete ? "oklch(0.78 0.16 140)" : "oklch(0.78 0.16 75)" }}
              />
              {isComplete ? (
                <span className="font-semibold text-green-500">Complete! 🎉</span>
              ) : (
                <span className="text-muted-foreground">{remaining}d left</span>
              )}
            </div>
            <div className="ml-auto text-[11px] font-bold text-primary">{pct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const tasks = useStore((s) => s.tasks);
  const streak = useStore((s) => s.streakDays);
  const daysMap = useStore((s) => s.days);
  const challenges = useStore((s) => s.challenges || []);
  const firstLoginDate = useStore((s) => s.firstLoginDate);
  const [showAddChallenge, setShowAddChallenge] = useState(false);

  // Calculate how many days since first login
  const dayNumber = firstLoginDate
    ? Math.floor((new Date() - new Date(firstLoginDate)) / (1000 * 60 * 60 * 24)) + 1
    : 1;

  useChallengeAutoClean(challenges);

  const today = new Date().toISOString().slice(0, 10);
  const todays = tasks.filter((t) => t.dueDate === today);
  const done = todays.filter((t) => t.completed).length;
  const pct = todays.length ? Math.round((done / todays.length) * 100) : 0;

  const totalAll = tasks.length;
  const doneAll = tasks.filter((t) => t.completed).length;
  const pendingAll = totalAll - doneAll;
  const completionRate = totalAll ? Math.round((doneAll / totalAll) * 100) : 0;
  const pendingRate = totalAll ? Math.round((pendingAll / totalAll) * 100) : 0;
  const totalRate = Math.min(100, totalAll * 8);



  const calendarNotes = Object.entries(daysMap)
    .filter(([, e]) => e?.note || e?.event || e?.marked)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, 5);

  return (
    <>
      {showAddChallenge && <AddChallengeModal onClose={() => setShowAddChallenge(false)} />}

      <div className="space-y-6 pb-28 md:pb-0">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01]">
              <div className="absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Day 1</div>
                    <div className="text-lg font-semibold">Progress</div>
                  </div>
                  <div className="text-2xl font-bold text-gradient">{pct}%</div>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick add */}
            <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:scale-[1.01]">
              <div className="absolute -inset-10 -z-0 bg-gradient-primary opacity-5 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-lg font-bold text-foreground">Ready to plan?</div>
                  <div className="text-sm text-muted-foreground">Create your next task and keep the momentum going</div>
                </div>
                <Link
                  to="/app/today"
                  className="inline-flex w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-lg"
                >
                  <Plus className="h-5 w-5" /> Add Tasks
                </Link>
              </div>
            </div>

            {/* Today's tasks */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Today's Tasks</h2>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs">{todays.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                {todays.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No tasks today — tap Add to create one.
                  </p>
                )}
                {todays.map((t) => (
                  <TaskItem key={t.id} task={t} />
                ))}
              </div>
            </div>

            {/* Challenges Section */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
                    <Zap className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold">Challenges</h2>
                  {challenges.length > 0 && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {challenges.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowAddChallenge(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
                >
                  <Plus className="h-3.5 w-3.5" /> New Challenge
                </button>
              </div>

              {challenges.length === 0 ? (
                <div
                  onClick={() => setShowAddChallenge(true)}
                  className="group cursor-pointer rounded-2xl border-2 border-dashed border-border py-10 text-center transition hover:border-primary/50 hover:bg-primary/3"
                >
                  <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40 transition group-hover:text-primary/60" />
                  <div className="text-sm font-medium text-muted-foreground">No active challenges</div>
                  <div className="mt-1 text-xs text-muted-foreground/60">
                    Click to add your first challenge
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {challenges.map((c) => (
                    <ChallengeCard
                      key={c.id}
                      challenge={c}
                      onRemove={() => actions.removeChallenge(c.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Calendar Notes */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Calendar Notes</h2>
                <Link to="/app/calendar" className="text-xs text-primary transition hover:underline">
                  View all
                </Link>
              </div>
              {calendarNotes.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No reminders or notes yet. Add some from the Calendar.
                </p>
              ) : (
                <div className="space-y-2">
                  {calendarNotes.map(([date, e]) => (
                    <div
                      key={date}
                      className="rounded-xl border border-border bg-background/40 p-3 transition hover:border-primary/40"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-xs font-semibold text-primary">
                          {new Date(date).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        {e.marked && <BookmarkCheck className="h-3.5 w-3.5 text-primary" />}
                      </div>
                      {e.event && (
                        <div className="flex items-start gap-1.5 text-sm">
                          <CalendarPlus className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-warning" />
                          <span>{e.event}</span>
                        </div>
                      )}
                      {e.note && (
                        <div className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                          <StickyNote className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />
                          <span className="line-clamp-2 whitespace-pre-wrap">{e.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Streak */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]">
              <div className="absolute -inset-10 -z-0 bg-gradient-primary opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 text-left w-full">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Current Activity
                  </div>
                  <div className="text-sm font-semibold">Active Streak</div>
                </div>

                <CircularProgress
                  size={180}
                  stroke={8}
                  gap={0}
                  rings={[
                    { value: 100, color: "oklch(0.72 0.2 295)" },
                  ]}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1 bg-background/50 backdrop-blur px-3 py-1 rounded-full border border-border">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span className="text-[11px] text-foreground font-semibold">Day {dayNumber}</span>
                    </div>
                    <Flame className="mx-auto mt-2 mb-1 h-6 w-6 text-warning" />
                    <div className="text-4xl font-bold text-gradient leading-none">{streak}</div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1.5 font-medium">
                      {streak === 1 ? 'Day' : 'Days'}
                    </div>
                  </div>
                </CircularProgress>
              </div>
            </div>

            {/* Quick stats */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:scale-[1.02]">
              <div className="absolute -inset-10 -z-0 bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />
              <div className="relative z-10">
                <h3 className="mb-2 text-sm font-semibold">Quick Stats</h3>
                <div className="flex items-center justify-center">
                  <CircularProgress
                    size={170}
                    stroke={7}
                    gap={4}
                    rings={[
                      { value: completionRate, color: "oklch(0.72 0.2 295)" },
                      { value: pendingRate, color: "oklch(0.78 0.16 75)" },
                      { value: totalRate, color: "oklch(0.72 0.18 200)" },
                    ]}
                  >
                    <div>
                      <div className="text-2xl font-bold text-gradient leading-none">
                        {completionRate}%
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                        Done
                      </div>
                    </div>
                  </CircularProgress>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div>
                    <div
                      className="mx-auto h-1.5 w-1.5 rounded-full"
                      style={{ background: "oklch(0.72 0.2 295)" }}
                    />
                    <div className="mt-0.5 font-semibold">{doneAll}</div>
                    <div className="text-muted-foreground text-[10px]">Done</div>
                  </div>
                  <div>
                    <div
                      className="mx-auto h-1.5 w-1.5 rounded-full"
                      style={{ background: "oklch(0.78 0.16 75)" }}
                    />
                    <div className="mt-0.5 font-semibold">{pendingAll}</div>
                    <div className="text-muted-foreground text-[10px]">Pending</div>
                  </div>
                  <div>
                    <div
                      className="mx-auto h-1.5 w-1.5 rounded-full"
                      style={{ background: "oklch(0.72 0.18 200)" }}
                    />
                    <div className="mt-0.5 font-semibold">{totalAll}</div>
                    <div className="text-muted-foreground text-[10px]">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
