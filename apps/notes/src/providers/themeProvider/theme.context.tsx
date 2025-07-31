"use client";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export enum ListState {
  COLLAPSED = "COLLAPSED",
  EXPANDED = "EXPANDED",
  FLOATING = "FLOATING",
}

export interface ThemeContextType {
  listState: ListState;
  updateListState: (listState: ListState) => void;
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
  const [listState, setListState] = useState<ListState>(ListState.EXPANDED);
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

  const updateListState = (state: ListState) => {
    console.log("Updating list state to:", state);
    setListState(state);
  };

  const startHideFloatingList = () => {
    if (!hideTimeoutRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        if (listState === ListState.FLOATING) {
          setListState(ListState.COLLAPSED);
        }
        hideTimeoutRef.current = null;
      }, 1000);
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
        listState,
        updateListState,
        isMobile,
        startHideFloatingList,
        cancelHideFloatingList,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
