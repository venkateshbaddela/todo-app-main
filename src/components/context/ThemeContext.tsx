import React, { useEffect, useState } from "react";

interface ThemeModeContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleBtn: boolean;
  themeHandler: () => void;
}

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeModeContext | undefined>(
  undefined
);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("");

  const [toggleBtn, setToggleBtn] = useState<boolean>(false);

  const localStorage = window.localStorage;

  useEffect(() => {
    document.body.classList.add("preload");

    setTimeout(() => {
      document.body.classList.remove("preload");
    }, 500);
  }, []);

  useEffect(() => {
    const saveTheme = localStorage.getItem("globalTheme");

    if (saveTheme) {
      setTheme(saveTheme);
    }
  }, [localStorage, setTheme]);

  const themeHandler = () => {
    const themeSetter = theme === "light" ? "dark" : "light";

    localStorage.setItem("globalTheme", themeSetter);

    setTheme(themeSetter);

    setToggleBtn((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleBtn,
        themeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  let context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw Error(
      "ThemeContext must be used inside of a Provider components, " +
        "otherwise it will not function correctly."
    );
  }
  return context;
};
