import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const KEY = "focusflow.welcomed";

export function WelcomeModal({ onClose } = {}) {
  const [open, setOpen] = useState(true);
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

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-glow animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-10 -z-10 bg-gradient-primary opacity-20 blur-3xl" />
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome</div>
        <h2 className="mt-1 text-5xl font-bold text-gradient">Day 1</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Your journey starts now. Build streaks, crush tasks, and master habits.
        </p>
        <button
          onClick={go}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Let's go <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
