"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface ThemeContextType {
  listCollapsed: boolean;
  collapseList: (collapsed: boolean) => void;
  isMobile?: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [listCollapsed, setListCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => document.removeEventListener("resize", handleResize);
  }, []);

  const collapseList = (collapsed: boolean) => {
    setListCollapsed(collapsed);
  };

  return (
    <ThemeContext.Provider value={{ listCollapsed, collapseList, isMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};
