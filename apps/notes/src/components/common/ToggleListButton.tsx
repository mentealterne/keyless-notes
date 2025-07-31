import { FC } from "react";
import { CaretDoubleLeft, CaretDoubleRight, List } from "@phosphor-icons/react";
import { useTheme } from "@/providers/themeProvider/useTheme";
import clsx from "clsx";
import { ListState } from "@/providers/themeProvider/theme.context";
import Tooltip from "@/components/common/Tooltip";

interface Props {
  color?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHoverable?: boolean;
}
const ToggleListButton: FC<Props> = ({
  color,
  onMouseEnter,
  onMouseLeave,
  isHoverable,
}) => {
  const { listState, updateListState } = useTheme();
  return (
    <div
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      className={"cursor-pointer"}
      onClick={() =>
        updateListState(
          listState === ListState.EXPANDED
            ? ListState.COLLAPSED
            : ListState.EXPANDED,
        )
      }
    >
      {listState === ListState.COLLAPSED && isHoverable && (
        <List size={20} className={clsx(`text-${color ?? "accent"}`)} />
      )}
      {listState === ListState.FLOATING && isHoverable && (
        <Tooltip label={"Click to expand list"}>
          <CaretDoubleRight
            size={20}
            className={clsx(`text-${color ?? "accent"}`)}
          />
        </Tooltip>
      )}

      {!isHoverable && listState !== ListState.EXPANDED && (
        <CaretDoubleRight
          size={20}
          className={clsx(`text-${color ?? "accent"}`)}
        />
      )}

      {!isHoverable && listState === ListState.EXPANDED && (
        <CaretDoubleLeft
          size={20}
          className={clsx(`text-${color ?? "accent"}`)}
        />
      )}
    </div>
  );
};

export default ToggleListButton;
