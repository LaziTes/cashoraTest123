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
import { Check, X } from "lucide-react";

interface SendRequest {
  id: number;
  sender: string;
  recipient: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const SendRequests = () => {
  const [requests, setRequests] = useState<SendRequest[]>([
    {
      id: 1,
      sender: "John Doe",
      recipient: "Jane Smith",
      amount: 300,
      date: "2024-03-20",
      status: "pending",
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Send Requests</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.sender}</TableCell>
                <TableCell>{request.recipient}</TableCell>
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
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReject(request.id)}
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
    </div>
  );
};

export default SendRequests;