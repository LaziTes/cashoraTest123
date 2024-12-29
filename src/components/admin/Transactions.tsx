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
import { CustomBadge } from "@/components/ui/custom-badge";
import { ArrowDownToLine, ArrowUpFromLine, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal" | "send";
  user: string;
  recipient?: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const Transactions = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "deposit",
      user: "John Doe",
      amount: 500,
      date: "2024-03-20",
      status: "completed",
    },
    {
      id: 2,
      type: "withdrawal",
      user: "Jane Smith",
      amount: 300,
      date: "2024-03-19",
      status: "pending",
    },
    {
      id: 3,
      type: "send",
      user: "Alice Johnson",
      recipient: "Bob Wilson",
      amount: 150,
      date: "2024-03-18",
      status: "completed",
    },
  ]);

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4" />;
      case "withdrawal":
        return <ArrowUpFromLine className="h-4 w-4" />;
      case "send":
        return <Send className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposits
            </CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .filter((t) => t.type === "deposit")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawals
            </CardTitle>
            <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .filter((t) => t.type === "withdrawal")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transfers
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .filter((t) => t.type === "send")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(transaction.type)}
                    <span className="capitalize">{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{transaction.user}</TableCell>
                <TableCell>{transaction.recipient || "-"}</TableCell>
                <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <CustomBadge
                    variant={
                      transaction.status === "completed"
                        ? "success"
                        : transaction.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {transaction.status}
                  </CustomBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default Transactions;