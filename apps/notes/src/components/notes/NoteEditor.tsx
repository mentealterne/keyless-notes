import { FC } from "react";
import { NoteDTO } from "@/types/notes";
import { useStore } from "@nanostores/react";
import { $showingNote, setIsUnsavedChanges } from "@/store/notes";
import FullWidthMessage from "@/components/common/FullWidthMessage";
import { Cactus } from "@phosphor-icons/react";
import FullWidthLoader from "@/components/common/FullWidthLoader";

interface Props {
  note: NoteDTO | undefined;
  onHeadingChange: (heading: string) => void;
  onTextChange: (text: string) => void;
  isNoteLoading?: boolean;
}
const NoteEditor: FC<Props> = (props) => {
  const showingNote = useStore($showingNote);

  const updateContent =
    (value: string) => (editContentFunc: (value: string) => void) => {
      setIsUnsavedChanges(true);
      editContentFunc(value);
    };

  if (!props.note && !showingNote && !props.isNoteLoading)
    return (
      <FullWidthMessage
        message={"Please select or add a note to start"}
        icon={<Cactus size={152} className="text-accent" weight="duotone" />}
      />
    );

  if (props.isNoteLoading) return <FullWidthLoader />;

  return (
    <div className={"flex flex-col gap-4 w-full h-full"}>
      <textarea
        autoFocus
        onChange={(e) => updateContent(e.target.value)(props.onHeadingChange)}
        name={"heading"}
        placeholder={"Write a title"}
        className={
          "w-full text-accent font-bold text-4xl  no-underline focus:outline-none scrollbar-hide"
        }
        value={props.note?.heading || ""}
      />

      <textarea
        onChange={(e) => updateContent(e.target.value)(props.onTextChange)}
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
