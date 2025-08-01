import { FC } from "react";
import { SpinnerBall } from "@phosphor-icons/react";

const FullWidthLoader: FC = () => {
  return (
    <div className={"w-full h-full flex items-center justify-center "}>
      <div className={"animate-spin"}>
        <SpinnerBall weight={"duotone"} size={48} />
      </div>
    </div>
  );
};

export default FullWidthLoader;
