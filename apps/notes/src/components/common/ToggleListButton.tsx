import { FC } from "react";
import { CaretDoubleLeft, CaretDoubleRight, List } from "@phosphor-icons/react";
import { useTheme } from "@/providers/themeProvider/useTheme";
import clsx from "clsx";
import { ListVisibility } from "@/providers/themeProvider/theme.context";
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
  const { listVisibility, updateListVisibility } = useTheme();
  return (
    <div
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      className={"cursor-pointer"}
      onClick={() =>
        updateListVisibility(
          listVisibility === ListVisibility.EXPANDED
            ? ListVisibility.COLLAPSED
            : ListVisibility.EXPANDED,
        )
      }
    >
      {listVisibility === ListVisibility.COLLAPSED && isHoverable && (
        <List size={20} className={clsx(`text-${color ?? "accent"}`)} />
      )}
      {listVisibility === ListVisibility.FLOATING && isHoverable && (
        <Tooltip label={"Click to expand list"}>
          <CaretDoubleRight
            size={20}
            className={clsx(`text-${color ?? "accent"}`)}
          />
        </Tooltip>
      )}

      {!isHoverable && listVisibility !== ListVisibility.EXPANDED && (
        <CaretDoubleRight
          size={20}
          className={clsx(`text-${color ?? "accent"}`)}
        />
      )}

      {!isHoverable && listVisibility === ListVisibility.EXPANDED && (
        <CaretDoubleLeft
          size={20}
          className={clsx(`text-${color ?? "accent"}`)}
        />
      )}
    </div>
  );
};

export default ToggleListButton;
