import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as actions } from "./store-DGB-vTpe.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function Settings() {
  const userName = useStore((s) => s.userName);
  const [name, setName] = reactExports.useState(userName);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl space-y-6 pb-24 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-xs text-muted-foreground", children: "Display name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        actions.setUserName(name || "User");
        toast.success("Profile updated");
      }, className: "mt-4 rounded-lg bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow", children: "Save changes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-lg font-semibold", children: "Appearance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "FocusFlow runs in a focused dark theme by default." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-lg font-semibold text-destructive", children: "Danger zone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm text-muted-foreground", children: "Permanently delete all tasks, habits, challenges, streak and notes. This cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        if (confirm("Reset ALL data? This will delete everything permanently and cannot be undone.")) {
          localStorage.clear();
          actions.hardReset();
          toast.success("All data cleared successfully");
        }
      }, className: "rounded-lg border border-destructive/40 bg-destructive/10 px-5 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition", children: "Reset all data" })
    ] })
  ] });
}
export {
  Settings as component
};
