import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, actions } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  const userName = useStore((s) => s.userName);
  const [name, setName] = useState(userName);

  return (
    <div className="max-w-xl space-y-6 pb-24 md:pb-0">
      <h1 className="text-2xl font-bold md:text-3xl">Settings</h1>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 text-lg font-semibold">Profile</h2>
        <label className="mb-1.5 block text-xs text-muted-foreground">Display name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={() => {
            actions.setUserName(name || "User");
            toast.success("Profile updated");
          }}
          className="mt-4 rounded-lg bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Save changes
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-2 text-lg font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          FocusFlow runs in a focused dark theme by default.
        </p>
      </div>

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
        <h2 className="mb-2 text-lg font-semibold text-destructive">Danger zone</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Permanently delete all tasks, habits, challenges, streak and notes. This cannot be undone.
        </p>
        <button
          onClick={() => {
            if (confirm("Reset ALL data? This will delete everything permanently and cannot be undone.")) {
              localStorage.clear();
              actions.hardReset();
              toast.success("All data cleared successfully");
            }
          }}
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-5 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition"
        >
          Reset all data
        </button>
      </div>
    </div>
  );
}
