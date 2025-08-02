import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}
const IconButton: FC<Props> = ({ children, onClick, disabled, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        "flex items-center justify-center p-2 gap-4 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
      }
    >
      {children}
      {label && <span className={"text-sm font-bold"}>{label}</span>}
    </button>
  );
};

export default IconButton;
