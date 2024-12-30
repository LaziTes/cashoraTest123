import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserRegistration } from "@/utils/userTypes";
import { format } from "date-fns";

interface RegistrationDetailsDialogProps {
  registration: UserRegistration;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegistrationDetailsDialog = ({
  registration,
  open,
  onOpenChange,
}: RegistrationDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Registration Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Personal Information</h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {registration.firstName} {registration.lastName}
              </p>
              <p>
                <span className="text-muted-foreground">Username:</span>{" "}
                {registration.username}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {registration.email}
              </p>
              <p>
                <span className="text-muted-foreground">Date of Birth:</span>{" "}
                {format(registration.dateOfBirth, "PPP")}
              </p>
              <p>
                <span className="text-muted-foreground">Place of Birth:</span>{" "}
                {registration.placeOfBirth}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Contact Information</h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {registration.phoneNumber}
              </p>
              <p>
                <span className="text-muted-foreground">Address:</span>{" "}
                {registration.address}
              </p>
              <p>
                <span className="text-muted-foreground">Nationality:</span>{" "}
                {registration.nationality}
              </p>
              <p>
                <span className="text-muted-foreground">Residence:</span>{" "}
                {registration.residence}
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="font-semibold mb-2">ID Card Document</h3>
            {registration.idCard && (
              <div className="border rounded p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Filename: {registration.idCard.name}
                </p>
                {registration.idCard.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(registration.idCard)}
                    alt="ID Card"
                    className="max-w-full h-auto rounded"
                  />
                ) : (
                  <a
                    href={URL.createObjectURL(registration.idCard)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};