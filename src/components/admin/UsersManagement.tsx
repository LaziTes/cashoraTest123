import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "./users/UsersList";
import { PendingRegistrations } from "./users/PendingRegistrations";
import { User, UserRegistration, Bank } from "@/utils/userTypes";

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      dateOfBirth: new Date(1990, 0, 1),
      placeOfBirth: "New York",
      residence: "Los Angeles",
      nationality: "USA",
      status: "approved",
      role: "user",
      balance: 1000,
      customFee: {
        type: "percentage",
        value: 2.5,
      },
      limits: {
        withdrawal: {
          min: 100,
          max: 5000,
        },
        send: {
          min: 10,
          max: 1000,
        },
      },
      assignedBanks: [1],
    },
  ]);

  const [banks] = useState<Bank[]>([
    { id: 1, name: "Bank A" },
    { id: 2, name: "Bank B" },
  ]);

  const [pendingRegistrations, setPendingRegistrations] = useState<UserRegistration[]>([
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane@example.com",
      dateOfBirth: new Date(1992, 5, 15),
      placeOfBirth: "Chicago",
      residence: "Miami",
      nationality: "USA",
      idCard: new File([], "id-card.jpg"),
      phoneNumber: "+1234567890",
      address: "123 Main St",
    },
  ]);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleRegistrationStatus = (
    id: number,
    status: "approved" | "rejected",
    reason?: string
  ) => {
    const registration = pendingRegistrations.find((r) => r.id === id);
    if (registration) {
      if (status === "approved") {
        const newUser: User = {
          ...registration,
          status: "approved",
          role: "user",
          balance: 0,
          assignedBanks: [],
        };
        setUsers([...users, newUser]);
      }
      setPendingRegistrations(
        pendingRegistrations.filter((r) => r.id !== id)
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Active Users</TabsTrigger>
          <TabsTrigger value="registrations">Pending Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersList users={users} onUpdateUser={handleUpdateUser} banks={banks} />
        </TabsContent>

        <TabsContent value="registrations">
          <PendingRegistrations
            registrations={pendingRegistrations}
            onStatusUpdate={handleRegistrationStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersManagement;