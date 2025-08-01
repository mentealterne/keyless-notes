import { FC, ReactNode } from "react";

interface Props {
  message: string;
  icon: ReactNode;
}
const FullWidthMessage: FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4  text-gray-700">
      <div className="text-2xl mb-4">{props.icon}</div>
      <div className="text-lg font-semibold">{props.message}</div>
    </div>
  );
};
export default FullWidthMessage;
