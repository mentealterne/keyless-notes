"use client";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export enum ListVisibility {
  COLLAPSED = "COLLAPSED",
  EXPANDED = "EXPANDED",
  FLOATING = "FLOATING",
}

export interface ThemeContextType {
  listVisibility: ListVisibility;
  updateListVisibility: (listVisibility: ListVisibility) => void;
  isMobile?: boolean;
  startHideFloatingList: () => void;
  cancelHideFloatingList: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [listVisibility, setListVisibility] = useState<ListVisibility>(
    ListVisibility.EXPANDED,
  );
  const [isMobile, setIsMobile] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateListVisibility = (state: ListVisibility) => {
    console.log("Updating list state to:", state);
    setListVisibility(state);
  };

  const startHideFloatingList = () => {
    if (!hideTimeoutRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        if (listVisibility === ListVisibility.FLOATING) {
          setListVisibility(ListVisibility.COLLAPSED);
        }
        hideTimeoutRef.current = null;
      }, 200);
    }
  };

  const cancelHideFloatingList = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        listVisibility,
        updateListVisibility,
        isMobile,
        startHideFloatingList,
        cancelHideFloatingList,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
