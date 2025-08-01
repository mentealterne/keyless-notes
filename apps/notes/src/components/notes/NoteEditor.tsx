import { FC } from "react";
import { Note } from "@/types/notes";

interface Props {
  note: Note | undefined;
  onHeadingChange: (heading: string) => void;
  onTextChange: (text: string) => void;
}
const NoteEditor: FC<Props> = (props) => {
  if (!props.note)
    return (
      <div className={"flex flex-col    w-full h-full"}>
        <h2 className={"text-xl"}>Please select a note to start.</h2>
      </div>
    );

  return (
    <div className={"flex flex-col gap-8 w-full h-full"}>
      <textarea
        autoFocus
        onChange={(e) => props.onHeadingChange(e.target.value)}
        name={"heading"}
        className={
          "w-full text-accent font-bold text-4xl no-underline focus:outline-none"
        }
        value={props.note.heading}
      />

      <textarea
        onChange={(e) => props.onTextChange(e.target.value)}
        name={"text"}
        className={
          "w-full h-full leading-relaxed text-xl no-underline focus:outline-none"
        }
        value={props.note.text}
      />
    </div>
  );
};

export default NoteEditor;
