import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Wallet, ArrowUpRight, ArrowDownRight, History, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const data = [
  { name: "Jan 1", value: 100 },
  { name: "Jan 8", value: 150 },
  { name: "Jan 15", value: 200 },
  { name: "Jan 24", value: 180 },
  { name: "Jan 31", value: 220 },
  { name: "Feb 1", value: 190 },
];

const transactionHistory = [
  { id: 1, type: "deposit", amount: 500, date: "2024-01-25", status: "completed", user: "self" },
  { id: 2, type: "withdraw", amount: -200, date: "2024-01-24", status: "completed", user: "self" },
  { id: 3, type: "send", amount: -150, date: "2024-01-23", status: "completed", user: "john@example.com" },
  { id: 4, type: "deposit", amount: 1000, date: "2024-01-22", status: "completed", user: "self" },
  { id: 5, type: "withdraw", amount: -300, date: "2024-01-21", status: "pending", user: "self" },
];

const chartConfig = {
  value: {
    theme: {
      light: "#0EA5E9",
      dark: "#0EA5E9"
    }
  }
};

const Dashboard = () => {
  const [transactionType, setTransactionType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Balance",
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
      title: "Total Transactions",
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-[#1A1F2C] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#1A1F2C] border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transaction Overview</CardTitle>
            <div className="text-4xl font-bold">257</div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2C" />
                  <XAxis dataKey="name" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <ChartTooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0EA5E9"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C] border-none">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="w-[180px] bg-[#0A0D1B] border-[#1A1F2C]">
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
                className="max-w-sm bg-[#0A0D1B] border-[#1A1F2C]"
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#0A0D1B] hover:bg-[#1A1F2C] transition-colors"
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
    </div>
  );
};

export default Dashboard;