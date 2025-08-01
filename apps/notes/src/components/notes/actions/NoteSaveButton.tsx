import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { FloppyDisk, SpinnerBall } from "@phosphor-icons/react";

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
          className="text-accent hover:text-gray-700 transition-colors"
        />
      )}
      {props.isSaving && (
        <SpinnerBall
          size={24}
          weight="duotone"
          className="text-green-600 animate-spin"
        />
      )}
    </IconButton>
  );
};

export default NoteSaveButton;
