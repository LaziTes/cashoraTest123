import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  ArrowUpRight,
  ArrowDownRight,
  History,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CustomBadge } from "@/components/ui/custom-badge";

const data = [
  { name: "Jan", transactions: 400, users: 240 },
  { name: "Feb", transactions: 300, users: 139 },
  { name: "Mar", transactions: 200, users: 980 },
  { name: "Apr", transactions: 278, users: 390 },
  { name: "May", transactions: 189, users: 480 },
  { name: "Jun", transactions: 239, users: 380 },
  { name: "Jul", transactions: 349, users: 430 },
];

const recentTransactions = [
  { id: 1, type: "deposit", amount: 500, date: "2024-03-20", user: "John Doe", status: "completed" },
  { id: 2, type: "withdrawal", amount: -200, date: "2024-03-19", user: "Jane Smith", status: "pending" },
  { id: 3, type: "send", amount: -150, date: "2024-03-18", user: "Alice Johnson", status: "completed" },
  { id: 4, type: "deposit", amount: 1000, date: "2024-03-17", user: "Bob Wilson", status: "completed" },
  { id: 5, type: "withdrawal", amount: -300, date: "2024-03-16", user: "Carol Brown", status: "rejected" },
];

const AdminDashboard = () => {
  const [transactionType, setTransactionType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+20.1%",
      trend: "up",
    },
    {
      title: "Total Withdrawals",
      value: "$45,231",
      icon: ArrowUpRight,
      change: "+10.5%",
      trend: "up",
    },
    {
      title: "Total Deposits",
      value: "$67,432",
      icon: ArrowDownRight,
      change: "+35.2%",
      trend: "up",
    },
    {
      title: "Transactions",
      value: "892",
      icon: History,
      change: "+4.75%",
      trend: "up",
    },
  ];

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    const matchesSearch = 
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.date.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="transactions"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="send">Sent Money</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {transaction.user}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`font-bold ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
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
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;