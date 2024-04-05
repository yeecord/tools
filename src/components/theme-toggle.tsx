import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { MoonStar, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  if (theme === "dark")
    return (
      <Button
        variant="ghost"
        size="sm"
        aria-label="Light mode toggle"
        onClick={() => setTheme("light")}
      >
        <MoonStar className="w-5" />
      </Button>
    );

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Dark mode toggle"
      onClick={() => setTheme("dark")}
    >
      <Sun className="w-5" />
    </Button>
  );
};
