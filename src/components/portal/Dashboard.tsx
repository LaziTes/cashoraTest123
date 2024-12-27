import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Wallet, ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

const transactionHistory = [
  { id: 1, type: "deposit", amount: 500, date: "2024-01-25", status: "completed", user: "self" },
  { id: 2, type: "withdraw", amount: -200, date: "2024-01-24", status: "completed", user: "self" },
  { id: 3, type: "send", amount: -150, date: "2024-01-23", status: "completed", user: "john@example.com" },
  { id: 4, type: "deposit", amount: 1000, date: "2024-01-22", status: "completed", user: "self" },
  { id: 5, type: "withdraw", amount: -300, date: "2024-01-21", status: "pending", user: "self" },
];

const Dashboard = () => {
  const [transactionType, setTransactionType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Balance",
      value: "$2,450",
      icon: Wallet,
      change: "+20.1%",
      trend: "up",
    },
    {
      title: "Total Withdrawals",
      value: "$1,200",
      icon: ArrowUpRight,
      change: "+10.5%",
      trend: "up",
    },
    {
      title: "Total Deposits",
      value: "$3,650",
      icon: ArrowDownRight,
      change: "+35.2%",
      trend: "up",
    },
    {
      title: "Transactions",
      value: "24",
      icon: History,
      change: "+4.75%",
      trend: "up",
    },
  ];

  const filteredTransactions = transactionHistory.filter(transaction => {
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.amount.toString().includes(searchTerm) ||
                         transaction.date.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                primary: {
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))",
                  },
                },
              }}
            >
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
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
                <SelectItem value="withdraw">Withdrawals</SelectItem>
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
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
