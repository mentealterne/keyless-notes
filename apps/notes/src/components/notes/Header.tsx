"use client";

import { FC } from "react";
import { Laptop } from "@phosphor-icons/react";
import { useTheme } from "@/providers/themeProvider/useTheme";
import ToggleListButton from "@/components/common/ToggleListButton";
import { ListVisibility } from "@/providers/themeProvider/theme.context";

const NotesListHeader: FC = () => {
  const { listVisibility, isMobile } = useTheme();

  return (
    <div className="flex items-center justify-between  ">
      <h1
        className={
          "text-sm text-gray-500 font-bold flex flex-row items-center justify-center gap-1"
        }
      >
        <Laptop size={24} /> Workspace
      </h1>

      {listVisibility !== ListVisibility.FLOATING && <ToggleListButton />}
    </div>
  );
};

export default NotesListHeader;
