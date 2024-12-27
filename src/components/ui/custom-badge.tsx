import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomBadgeProps extends React.ComponentProps<typeof Badge> {
  variant?: "outline" | "default" | "destructive" | "secondary" | "success" | "warning";
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