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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface WithdrawalRequest {
  id: number;
  user: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
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
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "success"
                        : request.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Approve Withdrawal</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="reference">
                                Transaction Reference
                              </Label>
                              <Input
                                id="reference"
                                placeholder="Enter transaction reference"
                              />
                            </div>
                            <Button
                              onClick={() => handleApprove(request.id)}
                              className="w-full"
                            >
                              Approve
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default WithdrawalRequests;