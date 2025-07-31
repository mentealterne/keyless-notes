"use client";

import { FC } from "react";
import { Laptop } from "@phosphor-icons/react";
import { useTheme } from "@/providers/themeProvider/useTheme";
import ToggleListButton from "@/components/common/ToggleListButton";
import { ListState } from "@/providers/themeProvider/theme.context";

const NotesListHeader: FC = () => {
  const { listState, updateListState, isMobile } = useTheme();
  if (isMobile && listState) {
    return <ToggleListButton />;
  }

  return (
    <div className="flex items-center justify-between  ">
      <h1
        className={
          "text-sm text-gray-500 font-bold flex flex-row items-center justify-center gap-1"
        }
      >
        <Laptop size={24} /> Workspace
      </h1>
      <button
        className={"cursor-pointer"}
        onClick={() =>
          updateListState(
            listState === ListState.COLLAPSED
              ? ListState.EXPANDED
              : ListState.COLLAPSED,
          )
        }
      >
        {listState !== ListState.FLOATING && <ToggleListButton />}
      </button>
    </div>
  );
};

export default NotesListHeader;
