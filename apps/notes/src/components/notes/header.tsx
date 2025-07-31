"use client";

import { FC } from "react";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  Laptop,
} from "@phosphor-icons/react";
import { useTheme } from "@/providers/themeProvider/useTheme";

const NotesListHeader: FC = () => {
  const { listCollapsed, collapseList, isMobile } = useTheme();

  if (isMobile && listCollapsed) {
    return (
      <button
        className={"cursor-pointer"}
        onClick={() => collapseList(!listCollapsed)}
      >
        {listCollapsed ? (
          <CaretDoubleRight size={20} className={"text-accent "} />
        ) : (
          <CaretDoubleLeft size={20} className={"text-accent"} />
        )}
      </button>
    ); // Hide the header on mobile devices
  }

  return (
    <div className="flex items-center justify-between  ">
      <h1
        className={
          "text-sm text-gray-500 font-bold flex flex-row items-center justify-center gap-1"
        }
      >
        <Laptop size={24} /> {!listCollapsed && `Workspace`}
      </h1>
      <button
        className={"cursor-pointer"}
        onClick={() => collapseList(!listCollapsed)}
      >
        {listCollapsed ? (
          <CaretDoubleRight size={20} className={"text-accent"} />
        ) : (
          <CaretDoubleLeft size={20} className={"text-accent"} />
        )}
      </button>
    </div>
  );
};

export default NotesListHeader;
