import { createContext, useContext, useEffect } from "react";

type ThemeProviderContextType = {
  theme: "dark";
  setTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add("dark");
  }, []);

  const value = {
    theme: "dark" as const,
    setTheme: () => {}, // No-op since we're always dark
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};