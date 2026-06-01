import { Sun, Moon } from "lucide-react";
import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "xlclub-theme";

function getSnapshot(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        callback();
        return;
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) callback();
  });

  return () => {
    observer.disconnect();
  };
}

function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable
  }
}

function resolveSystemPreference(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* On first visit without stored preference, follow system */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();

    if (!stored) {
      setTheme(resolveSystemPreference());
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center border border-paper/14 bg-transparent text-fog transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
      aria-label={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      title={theme === "dark" ? "亮色模式" : "暗色模式"}
    >
      {theme === "dark" ? (
        <Sun size={18} strokeWidth={1.8} />
      ) : (
        <Moon size={18} strokeWidth={1.8} />
      )}
    </button>
  );
}
