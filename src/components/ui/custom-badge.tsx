import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

type CustomVariant = "success" | "warning";
type BadgeVariant = VariantProps<typeof Badge>["variant"];
type CombinedVariant = BadgeVariant | CustomVariant;

interface CustomBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "variant"> {
  variant?: CombinedVariant;
}

export function CustomBadge({ className, variant = "default", ...props }: CustomBadgeProps) {
  return (
    <Badge
      className={cn(
        {
          "bg-green-500 hover:bg-green-600": variant === "success",
          "bg-yellow-500 hover:bg-yellow-600 text-black": variant === "warning",
        },
        className
      )}
      variant={
        variant === "success" || variant === "warning" ? "default" : variant
      }
      {...props}
    />
  );
}