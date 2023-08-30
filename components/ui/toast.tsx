import { toast as OGtoast } from "sonner";
import Icon from "@/components/icon";
import { IconKeyType } from "@/types";

type ToastProps = {
  varinat?: "success" | "error" | "normal";
  title: string;
  description?: string;
};

const toast = ({ varinat = "normal", title, description }: ToastProps) => {
  return OGtoast.custom((t) => {
    return (
      <div className="relative mx-auto flex w-[var(--width)] max-w-full items-start gap-1 rounded border border-foreground/10 bg-background p-3 font-[Inter] shadow-md shadow-foreground/20">
        {["success", "error"].includes(varinat) ? (
          <Icon
            name={toastIcons[varinat]}
            className="mr-2 text-[21px] text-foreground"
          />
        ) : null}

        <div className="flex w-full flex-col">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          {description ? (
            <p className="text-sm text-foreground/75">{description}</p>
          ) : null}
        </div>

        <button
          className="text-[14px] text-foreground"
          onClick={() => OGtoast.dismiss(t)}
        >
          <Icon name="Close" />
        </button>
      </div>
    );
  });
};

export default toast;

const toastIcons: Record<string, IconKeyType> = {
  success: "Success",
  error: "Error",
};
