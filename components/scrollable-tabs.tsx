"use client";

import { cn } from "@/lib/utils";
import { IconKeyType } from "@/types";
import React, { useCallback, useRef, useState } from "react";
import Icon from "./icon";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Scrollable = ({ children, className }: Props) => {
  const [rightButton, setRightButton] = useState(false);
  const [leftButton, setLeftButton] = useState(false);

  const ListElement = useRef<HTMLDivElement>();

  const handle = useCallback((node: HTMLDivElement) => {
    const func = () => {
      if (!node) return;

      ListElement.current = node;
      const elementWidth = node.clientWidth;
      const elementScrollWidth = node.scrollWidth;
      const elementScrollLeft = node.scrollLeft;

      if (elementWidth >= elementScrollWidth) {
        setRightButton(false);
        return;
      }

      setRightButton(elementWidth + elementScrollLeft !== elementScrollWidth);
      setLeftButton(elementScrollLeft > 0);
    };

    func();

    window.addEventListener("resize", func);

    return () => {
      window.removeEventListener("resize", func);
    };
  }, []);

  return (
    <div
      ref={handle}
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const elementWidth = node?.clientWidth;
        const elementScrollWidth = node?.scrollWidth;
        const elementScrollLeft = node?.scrollLeft;

        if (elementWidth >= elementScrollWidth) {
          setRightButton(false);
          return;
        }

        setRightButton(elementWidth + elementScrollLeft !== elementScrollWidth);
        setLeftButton(elementScrollLeft > 0);
      }}
      className={cn("flex w-full overflow-x-hidden", className)}
    >
      {children}
      {leftButton ? (
        <TabScrollButton
          icon="ArrowLeftS"
          onClick={() => {
            ListElement.current?.scrollBy({
              behavior: "smooth",
              left: -60,
              top: 0,
            });
          }}
          className="
            left-0
            bg-gradient-to-r
            "
        />
      ) : (
        ""
      )}

      {rightButton ? (
        <TabScrollButton
          icon="ArrowRightS"
          onClick={() => {
            ListElement.current?.scrollBy({
              behavior: "smooth",
              left: 60,
              top: 0,
            });
          }}
          className="
            right-0
            bg-gradient-to-l
            "
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Scrollable;

interface TabScrollButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  icon: IconKeyType;
}

const TabScrollButton = React.forwardRef<
  React.ElementRef<"button">,
  TabScrollButtonProps
>(({ icon, className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      `absolute bottom-0 top-0 flex items-center justify-center 
        from-background from-50% to-transparent px-2 text-foreground/75 transition-colors
        hover:text-foreground`,
      className,
    )}
    {...props}
  >
    <Icon name={icon} className="text-[24px]" />
  </button>
));

TabScrollButton.displayName = "ScrollButton";
