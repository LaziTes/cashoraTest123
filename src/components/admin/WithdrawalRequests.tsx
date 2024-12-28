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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Check, X } from "lucide-react";
import { sendStatusEmail } from "@/utils/emailService";
import { toast } from "@/hooks/use-toast";

interface WithdrawalRequest {
  id: number;
  user: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface BankTransactionDetails {
  reference: string;
  bankName: string;
  accountNumber: string;
  transactionDate: string;
  notes: string;
}

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([
    {
      id: 1,
      user: "John Doe",
      amount: 1000,
      date: "2024-03-20",
      status: "pending",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(
    null
  );
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [bankDetails, setBankDetails] = useState<BankTransactionDetails>({
    reference: "",
    bankName: "",
    accountNumber: "",
    transactionDate: "",
    notes: "",
  });

  const handleApprove = async () => {
    if (selectedRequest && bankDetails.reference) {
      await sendStatusEmail(
        selectedRequest.user,
        "approved",
        "withdrawal"
      );
      setRequests(
        requests.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "approved" }
            : request
        )
      );
      setIsApproveDialogOpen(false);
      setSelectedRequest(null);
      setBankDetails({
        reference: "",
        bankName: "",
        accountNumber: "",
        transactionDate: "",
        notes: "",
      });
      toast({
        title: "Withdrawal Approved",
        description: "User has been notified via email",
      });
    }
  };

  const handleReject = async () => {
    if (selectedRequest && rejectReason) {
      await sendStatusEmail(
        selectedRequest.user,
        "rejected",
        "withdrawal",
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
        title: "Withdrawal Rejected",
        description: "User has been notified via email",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Withdrawal Requests
        </h2>
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
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsApproveDialogOpen(true);
                        }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="outline"
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

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Withdrawal</DialogTitle>
            <DialogDescription>
              Please enter the bank transaction details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Transaction Reference</Label>
              <Input
                value={bankDetails.reference}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, reference: e.target.value })
                }
                placeholder="Enter transaction reference"
              />
            </div>
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input
                value={bankDetails.bankName}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, bankName: e.target.value })
                }
                placeholder="Enter bank name"
              />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    accountNumber: e.target.value,
                  })
                }
                placeholder="Enter account number"
              />
            </div>
            <div className="space-y-2">
              <Label>Transaction Date</Label>
              <Input
                type="date"
                value={bankDetails.transactionDate}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    transactionDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={bankDetails.notes}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, notes: e.target.value })
                }
                placeholder="Enter any additional notes"
              />
            </div>
            <Button
              onClick={handleApprove}
              className="w-full"
              disabled={!bankDetails.reference}
            >
              Approve Withdrawal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
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
    </div>
  );
};

export default WithdrawalRequests;