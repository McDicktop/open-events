import React, {createContext, useState, useEffect} from "react";
import { getInitialTheme } from "../utils";

const defaultContextValue = {
    theme: getInitialTheme(),
    setTheme: () => {
        return;
    }
}

export const isDark = (theme) => {
    if(theme === 'system') {
        return window.matchMedia('(prefers-color-schema: dark)').matches;
    }

    return theme === 'dark';
}

export const ThemeContext = createContext(defaultContextValue);

export const ThemeProvider = ({initialTheme, children}) => {
    const [theme, setTheme] = useState(getInitialTheme);
    
    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement;
        const darkMode = isDark(rawTheme);

        root.classList.remove(darkMode ? 'light' : 'dark');
        root.classList.add(darkMode ? 'dark' : 'light');

        localStorage.setItem('color-theme', rawTheme);
    }

    useEffect(() => {
        const medaiQuery = window.matchMedia('(prefers-color-schema: dark)');
        const changeThemeOnSystemChange = () => {
            rawSetTheme(medaiQuery.matches ? 'dark' : 'light');
        }

        medaiQuery.addEventListener('change', changeThemeOnSystemChange);

        return () => {
            medaiQuery.removeEventListener('change', changeThemeOnSystemChange);
        }
    }, []);

    if(initialTheme) {
        rawSetTheme(initialTheme);
    }

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme])

    return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}