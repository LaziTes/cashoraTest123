import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/utils/userTypes";
import { format } from "date-fns";

interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDetailsDialog = ({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Personal Information</h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {user.firstName} {user.lastName}
              </p>
              <p>
                <span className="text-muted-foreground">Username:</span>{" "}
                {user.username}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-muted-foreground">Date of Birth:</span>{" "}
                {format(user.dateOfBirth, "PPP")}
              </p>
              <p>
                <span className="text-muted-foreground">Place of Birth:</span>{" "}
                {user.placeOfBirth}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Account Information</h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="text-muted-foreground">Balance:</span> $
                {user.balance.toLocaleString()}
              </p>
              <p>
                <span className="text-muted-foreground">Custom Fee:</span>{" "}
                {user.customFee
                  ? `${user.customFee.value}${
                      user.customFee.type === "percentage" ? "%" : "$"
                    }`
                  : "Default"}
              </p>
              <p>
                <span className="text-muted-foreground">Withdrawal Limits:</span>{" "}
                {user.limits
                  ? `$${user.limits.withdrawal.min.toLocaleString()} - $${user.limits.withdrawal.max.toLocaleString()}`
                  : "Default"}
              </p>
              <p>
                <span className="text-muted-foreground">Send Limits:</span>{" "}
                {user.limits
                  ? `$${user.limits.send.min.toLocaleString()} - $${user.limits.send.max.toLocaleString()}`
                  : "Default"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};