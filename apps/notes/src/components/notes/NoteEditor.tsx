import { FC } from "react";
import { NoteDTO } from "@/types/notes";
import FullWidthMessage from "@/components/common/FullWidthMessage";
import { Cactus } from "@phosphor-icons/react";
import { useStore } from "@nanostores/react";
import { $showingNote } from "@/store/notes";

interface Props {
  note: NoteDTO | undefined;
  onHeadingChange: (heading: string) => void;
  onTextChange: (text: string) => void;
}
const NoteEditor: FC<Props> = (props) => {
  const showingNote = useStore($showingNote);
  if (!props.note && !showingNote)
    return (
      <FullWidthMessage
        message={"Please select or add a note to start"}
        icon={<Cactus size={152} className="text-accent" weight="duotone" />}
      />
    );

  return (
    <div className={"flex flex-col gap-4 w-full h-full"}>
      <textarea
        autoFocus
        onChange={(e) => props.onHeadingChange(e.target.value)}
        name={"heading"}
        placeholder={"Write a title"}
        className={
          "w-full text-accent font-bold text-4xl  no-underline focus:outline-none scrollbar-hide"
        }
        value={props.note?.heading || ""}
      />

      <textarea
        onChange={(e) => props.onTextChange(e.target.value)}
        name={"text"}
        placeholder={"Write your note here..."}
        className={
          "w-full h-full leading-relaxed text-xl no-underline focus:outline-none scrollbar-hide"
        }
        value={props.note?.text || ""}
      />
    </div>
  );
};

export default NoteEditor;
