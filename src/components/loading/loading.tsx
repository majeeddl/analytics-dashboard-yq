import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Props for the Loading component.
 * @param type - The type of skeleton: 'rect', 'text', or 'circle'.
 * @param width - The width of the skeleton (e.g., '100%', '200px').
 * @param height - The height of the skeleton (e.g., '2rem', '40px').
 * @param className - Additional class names for custom styling.
 */
export interface LoadingProps {
  type?: "rect" | "text" | "circle";
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Shadcn Loading skeleton component for various loading states.
 * Supports rectangle, text, and circle skeletons.
 */
export const Loading: React.FC<LoadingProps> = ({
  type = "rect",
  width,
  height,
  className,
  ...props
}) => {
  let shapeClass = "";
  if (type === "circle") {
    shapeClass = "rounded-full";
  } else if (type === "text") {
    shapeClass = "rounded-md h-4";
    if (!height) height = "1rem";
  } else {
    shapeClass = "rounded-md";
  }

  return (
    <Skeleton
      className={[
        shapeClass,
        className,
        width ? undefined : "w-full",
        height ? undefined : type === "rect" ? "h-6" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
      }}
      {...props}
    />
  );
};

export default Loading;
