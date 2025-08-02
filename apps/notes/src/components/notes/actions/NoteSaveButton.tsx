import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { ArrowsClockwise, FloppyDisk } from "@phosphor-icons/react";

interface Props {
  isSaving?: boolean;
}
const NoteSaveButton: FC<Props> = (props) => {
  return (
    <IconButton onClick={() => console.log("Save Note")}>
      {!props.isSaving && (
        <FloppyDisk
          size={24}
          weight="duotone"
          className="text-emerald-700 hover:text-gray-700 transition-colors"
        />
      )}
      {props.isSaving && (
        <ArrowsClockwise size={24} className="text-amber-500 animate-spin" />
      )}
    </IconButton>
  );
};

export default NoteSaveButton;
