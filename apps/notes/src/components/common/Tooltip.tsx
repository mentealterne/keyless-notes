import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

const Tooltip = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <RadixTooltip.Provider delayDuration={100}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side="top"
          className="bg-gray-800 text-white font-sans text-xs px-2 py-1 rounded shadow"
        >
          {label}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
