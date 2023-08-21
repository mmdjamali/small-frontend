import { toast as OGtoast } from "sonner";
import Icon from "@/components/icon";

type ToastProps = {
  varinat?: "success" | "error" | "normal";
  title: string;
  description?: string;
};

const toast = ({ varinat = "normal", title, description }: ToastProps) => {
  return OGtoast.custom((t) => {
    return (
      <div className="flex items-start relative font-[Inter] w-[var(--width)] max-w-full mx-auto gap-1 p-3 rounded border bg-background border-foreground/10 shadow-md shadow-foreground/20">
        {["success", "error"].includes(varinat) ? (
          <Icon
            name={toastIcons[varinat as keyof typeof toastIcons]}
            className="text-[21px] text-foreground mr-2"
          />
        ) : null}

        <div className="flex flex-col w-full">
          <h4 className="text-sm text-foreground font-semibold">{title}</h4>
          {description ? (
            <p className="text-sm text-foreground/75">{description}</p>
          ) : null}
        </div>

        <button
          className="text-foreground text-[14px]"
          onClick={() => OGtoast.dismiss(t)}
        >
          <Icon name="Close" />
        </button>
      </div>
    );
  });
};

export default toast;

const toastIcons = {
  success: "Success",
  error: "Error",
};
