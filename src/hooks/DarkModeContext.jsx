import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
    const [darkmode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkmode") === "true"; // Get stored mode
    });

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (darkmode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
        localStorage.setItem("darkmode", darkmode); // Save to localStorage
    }, [darkmode]);

    return (
        <DarkModeContext.Provider value={{ darkmode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
