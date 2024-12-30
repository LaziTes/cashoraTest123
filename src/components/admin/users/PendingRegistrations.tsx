import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";
import { UserRegistration } from "@/utils/userTypes";
import { sendStatusEmail } from "@/utils/emailService";
import { toast } from "@/hooks/use-toast";
import { RegistrationDetailsDialog } from "./RegistrationDetailsDialog";

interface PendingRegistrationsProps {
  registrations: UserRegistration[];
  onStatusUpdate: (id: number, status: "approved" | "rejected", reason?: string) => void;
}

export const PendingRegistrations = ({
  registrations,
  onStatusUpdate,
}: PendingRegistrationsProps) => {
  const [selectedUser, setSelectedUser] = useState<UserRegistration | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleApprove = async (user: UserRegistration) => {
    await sendStatusEmail(user.email, "approved", "registration");
    onStatusUpdate(user.id, "approved");
    toast({
      title: "Registration Approved",
      description: "User has been notified via email",
    });
  };

  const handleReject = async () => {
    if (selectedUser && rejectReason) {
      await sendStatusEmail(selectedUser.email, "rejected", "registration", rejectReason);
      onStatusUpdate(selectedUser.id, "rejected", rejectReason);
      setIsRejectDialogOpen(false);
      setRejectReason("");
      setSelectedUser(null);
      toast({
        title: "Registration Rejected",
        description: "User has been notified via email",
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell>
                  {registration.firstName} {registration.lastName}
                </TableCell>
                <TableCell>{registration.email}</TableCell>
                <TableCell>{registration.nationality}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(registration);
                      setIsDetailsDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleApprove(registration)}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(registration);
                      setIsRejectDialogOpen(true);
                    }}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Registration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for Rejection</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection"
                rows={4}
              />
            </div>
            <Button
              onClick={handleReject}
              className="w-full"
              disabled={!rejectReason}
            >
              Confirm Rejection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedUser && (
        <RegistrationDetailsDialog
          registration={selectedUser}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </div>
  );
};