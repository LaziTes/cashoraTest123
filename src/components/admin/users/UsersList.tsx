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
import { Settings, User } from "lucide-react";
import { User as UserType } from "@/utils/userTypes";
import { UserDetailsDialog } from "./UserDetailsDialog";
import { UserManageDialog } from "./UserManageDialog";

interface UsersListProps {
  users: UserType[];
  onUpdateUser: (updatedUser: UserType) => void;
}

export const UsersList = ({ users, onUpdateUser }: UsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <CustomBadge
                  variant={user.role === "admin" ? "destructive" : "secondary"}
                >
                  {user.role}
                </CustomBadge>
              </TableCell>
              <TableCell>
                <CustomBadge
                  variant={
                    user.status === "approved"
                      ? "success"
                      : user.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {user.status}
                </CustomBadge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDetailsOpen(true);
                  }}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsManageOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <>
          <UserDetailsDialog
            user={selectedUser}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
          <UserManageDialog
            user={selectedUser}
            open={isManageOpen}
            onOpenChange={setIsManageOpen}
            onUpdate={onUpdateUser}
          />
        </>
      )}
    </motion.div>
  );
};