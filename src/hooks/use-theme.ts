import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>();

  useEffect(() => {
    const storage = localStorage.getItem("theme");

    if (storage === "light") return setTheme("light");
    if (storage === "dark") return setTheme("dark");

    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem("theme", theme);

    if (theme === "light")
      document.querySelector("html")?.classList.remove("dark");
    else document.querySelector("html")?.classList.add("dark");
  }, [theme]);

  return [theme, setTheme] as const;
}
