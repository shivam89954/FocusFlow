import { r as reactExports } from "../_libs/react.mjs";
const KEY = "focusflow.v1";
const defaultState = {
  tasks: [
    {
      id: "t1",
      title: "Morning Workout",
      category: "Health",
      priority: "High",
      dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      time: "06:00",
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "t2",
      title: "Read 20 pages of book",
      category: "Study",
      priority: "Medium",
      dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      time: "10:00",
      completed: true,
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "t3",
      title: "Complete React Project",
      category: "Work",
      priority: "High",
      dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      time: "14:00",
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "t4",
      title: "Learn something new",
      category: "Personal",
      priority: "Low",
      dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ],
  habits: [
    { id: "h1", name: "Drink 2L water", emoji: "💧", streak: 5, history: [] },
    { id: "h2", name: "Meditate 10 min", emoji: "🧘", streak: 3, history: [] },
    { id: "h3", name: "No social media", emoji: "📵", streak: 1, history: [] }
  ],
  streakDays: 1,
  streakTarget: 30,
  userName: "User",
  days: {},
  challenges: [],
  firstLoginDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  lastLoginDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
};
let state = defaultState;
const listeners = /* @__PURE__ */ new Set();
function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if (!parsed.firstLoginDate) {
        parsed.firstLoginDate = today;
      }
      if (!parsed.lastLoginDate) {
        parsed.lastLoginDate = today;
        parsed.streakDays = 1;
      } else if (parsed.lastLoginDate !== today) {
        const lastLogin = new Date(parsed.lastLoginDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastLogin);
        const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
        if (diffDays === 1) {
          parsed.streakDays = (parsed.streakDays || 0) + 1;
        } else if (diffDays > 1) {
          parsed.streakDays = 1;
        }
        parsed.lastLoginDate = today;
      }
      state = { ...defaultState, ...parsed };
      save();
    } else {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      state = { ...defaultState, firstLoginDate: today, lastLoginDate: today, streakDays: 1 };
      save();
    }
  } catch {
  }
}
function save() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}
function setState(updater) {
  state = updater(state);
  save();
  listeners.forEach((l) => l());
}
let loaded = false;
function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    load();
    loaded = true;
  }
}
function useStore(selector) {
  ensureLoaded();
  const subscribe = reactExports.useCallback((cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);
  return reactExports.useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(defaultState)
  );
}
const actions = {
  addTask(input) {
    setState((s) => ({
      ...s,
      tasks: [
        ...s.tasks,
        {
          ...input,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]
    }));
  },
  toggleTask(id) {
    setState((s) => ({
      ...s,
      tasks: s.tasks.map(
        (t) => t.id === id ? {
          ...t,
          completed: !t.completed,
          completedAt: !t.completed ? (/* @__PURE__ */ new Date()).toISOString() : void 0
        } : t
      )
    }));
  },
  deleteTask(id) {
    setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));
  },
  updateTask(id, patch) {
    setState((s) => ({ ...s, tasks: s.tasks.map((t) => t.id === id ? { ...t, ...patch } : t) }));
  },
  toggleHabit(id) {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    setState((s) => ({
      ...s,
      habits: s.habits.map((h) => {
        if (h.id !== id) return h;
        const done = h.history.includes(today);
        return {
          ...h,
          history: done ? h.history.filter((d) => d !== today) : [...h.history, today],
          streak: done ? Math.max(0, h.streak - 1) : h.streak + 1,
          lastDone: done ? h.lastDone : today
        };
      })
    }));
  },
  addHabit(name, emoji = "✨") {
    setState((s) => ({
      ...s,
      habits: [...s.habits, { id: crypto.randomUUID(), name, emoji, streak: 0, history: [] }]
    }));
  },
  deleteHabit(id) {
    setState((s) => ({ ...s, habits: s.habits.filter((h) => h.id !== id) }));
  },
  addChallenge(name, totalDays) {
    setState((s) => ({
      ...s,
      challenges: [
        ...s.challenges || [],
        {
          id: crypto.randomUUID(),
          name,
          totalDays,
          startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]
    }));
  },
  removeChallenge(id) {
    setState((s) => ({ ...s, challenges: (s.challenges || []).filter((c) => c.id !== id) }));
  },
  setUserName(name) {
    setState((s) => ({ ...s, userName: name }));
  },
  setDayEntry(date, patch) {
    setState((s) => ({
      ...s,
      days: { ...s.days, [date]: { ...s.days[date] || {}, ...patch } }
    }));
  },
  toggleDayMark(date) {
    setState((s) => {
      const cur = s.days[date] || {};
      return { ...s, days: { ...s.days, [date]: { ...cur, marked: !cur.marked } } };
    });
  },
  clearDay(date) {
    setState((s) => {
      const next = { ...s.days };
      delete next[date];
      return { ...s, days: next };
    });
  },
  reset() {
    setState(() => defaultState);
  },
  hardReset() {
    const emptyState = {
      tasks: [],
      habits: [],
      streakDays: 1,
      streakTarget: 30,
      userName: "User",
      days: {},
      challenges: [],
      firstLoginDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      lastLoginDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    setState(() => emptyState);
  }
};
export {
  actions as a,
  useStore as u
};
