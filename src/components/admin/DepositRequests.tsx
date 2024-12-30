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
import { CustomBadge } from "@/components/ui/custom-badge";
import { Check, X, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendStatusEmail } from "@/utils/emailService";
import { toast } from "@/hooks/use-toast";
import { DepositDetailsDialog } from "./deposits/DepositDetailsDialog";

interface DepositRequest {
  id: number;
  user: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  receipt?: File;
}

const DepositRequests = () => {
  const [requests, setRequests] = useState<DepositRequest[]>([
    {
      id: 1,
      user: "John Doe",
      amount: 500,
      date: "2024-03-20",
      status: "pending",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async (id: number) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      await sendStatusEmail(request.user, "approved", "deposit");
      setRequests(
        requests.map((request) =>
          request.id === id ? { ...request, status: "approved" } : request
        )
      );
      toast({
        title: "Deposit Request Approved",
        description: "User has been notified via email",
      });
    }
  };

  const handleReject = async () => {
    if (selectedRequest && rejectReason) {
      await sendStatusEmail(
        selectedRequest.user,
        "rejected",
        "deposit",
        rejectReason
      );
      setRequests(
        requests.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "rejected" }
            : request
        )
      );
      setIsRejectDialogOpen(false);
      setRejectReason("");
      setSelectedRequest(null);
      toast({
        title: "Deposit Request Rejected",
        description: "User has been notified via email",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Deposit Requests</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.user}</TableCell>
                <TableCell>${request.amount.toLocaleString()}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <CustomBadge
                    variant={
                      request.status === "approved"
                        ? "success"
                        : request.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {request.status}
                  </CustomBadge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDetailsDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsRejectDialogOpen(true);
                        }}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Deposit Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection
            </DialogDescription>
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

      {selectedRequest && (
        <DepositDetailsDialog
          deposit={selectedRequest}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </div>
  );
};

export default DepositRequests;