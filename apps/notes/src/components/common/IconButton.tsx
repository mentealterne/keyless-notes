import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}
const IconButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center justify-center p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
      }
    >
      {children}
    </button>
  );
};

export default IconButton;
