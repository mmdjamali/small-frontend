import { useEffect, useState } from "react";
import Icon from "./icon";
import { cn } from "@/lib/utils";

const Saving = ({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) => {
  const [show, setShow] = useState(active);

  useEffect(() => {
    if (active) setShow(true);
  }, [active]);

  if (!show) return null;

  return (
    <div
      onAnimationEndCapture={() => {
        if (!active) setShow(false);
      }}
      data-state={active ? "open" : "closed"}
      className={cn(
        "flex cursor-default select-none items-center justify-center gap-1 rounded bg-foreground/10 px-2 py-1 text-foreground",
        className,
      )}
    >
      <p className="font-medium">Saving</p>
      <Icon name="Spinner" className="animate-spin text-[18px]" />
    </div>
  );
};

export default Saving;
