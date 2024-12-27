import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, ArrowUpRight, ArrowDownRight, History } from "lucide-react";

const AdminDashboard = () => {
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
    </div>
  );
};

export default AdminDashboard;