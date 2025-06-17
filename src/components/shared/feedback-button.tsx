import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";

/**
 * Props for the FeedbackButton component.
 * @param type - The type of feedback: "feedback" or "bug".
 * @param className - Additional class names for custom styling.
 */
type FeedbackButtonProps = {
  type?: "feedback" | "bug";
  className?: string;
};

export const FeedbackButton = ({
  type = "feedback",
  className,
}: FeedbackButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const label = type === "bug" ? "Report a Bug" : "Send Feedback";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle feedback submission (API call, toast, etc.)
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setMessage("");
    }, 1200);
  };

  return (
    <TooltipProvider>
      <Sheet open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={className}
              aria-label={label}
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{label}</TooltipContent>
        </Tooltip>
        <SheetContent side="right" className="max-w-xs w-full">
          <SheetHeader>
            <SheetTitle>{label}</SheetTitle>
            <SheetDescription>
              {type === "bug"
                ? "Please describe the bug you encountered."
                : "We value your feedback. Let us know your thoughts!"}
            </SheetDescription>
          </SheetHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-4 p-5"
          >
            <textarea
              className="border rounded-md p-2 min-h-[80px] text-sm focus:outline-none focus:ring focus:border-primary"
              placeholder={
                type === "bug" ? "Describe the bug..." : "Your feedback..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={submitted}
            />
            <SheetFooter className="w-full p-0">
              <Button type="submit" disabled={submitted || !message.trim()}>
                {submitted ? "Thank you!" : label}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
};
