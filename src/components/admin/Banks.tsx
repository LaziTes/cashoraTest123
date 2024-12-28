import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Bank {
  id: number;
  name: string;
  assignedUsers: number;
}

interface User {
  id: number;
  name: string;
  isAssigned: boolean;
}

const Banks = () => {
  const [banks, setBanks] = useState<Bank[]>([
    { id: 1, name: "Bank A", assignedUsers: 150 },
    { id: 2, name: "Bank B", assignedUsers: 89 },
    { id: 3, name: "Bank C", assignedUsers: 234 },
  ]);

  const [newBankName, setNewBankName] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isAssignUsersOpen, setIsAssignUsersOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Mock users data - in real app, this would come from your user management system
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", isAssigned: false },
    { id: 2, name: "Jane Smith", isAssigned: false },
    { id: 3, name: "Bob Johnson", isAssigned: false },
  ]);

  const handleAddBank = () => {
    if (newBankName.trim()) {
      setBanks([
        ...banks,
        { id: banks.length + 1, name: newBankName, assignedUsers: 0 },
      ]);
      setNewBankName("");
    }
  };

  const handleDeleteBank = (id: number) => {
    setBanks(banks.filter((bank) => bank.id !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setUsers(users.map(user => ({ ...user, isAssigned: checked })));
  };

  const handleUserSelect = (userId: number, checked: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isAssigned: checked } : user
    ));
    setSelectAll(users.every(user => 
      user.id === userId ? checked : user.isAssigned
    ));
  };

  const handleSaveAssignments = () => {
    if (selectedBank) {
      const assignedCount = users.filter(user => user.isAssigned).length;
      setBanks(banks.map(bank =>
        bank.id === selectedBank.id
          ? { ...bank, assignedUsers: assignedCount }
          : bank
      ));
      setIsAssignUsersOpen(false);
      setSelectedBank(null);
      setUsers(users.map(user => ({ ...user, isAssigned: false })));
      setSelectAll(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Banks Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Bank
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bank</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  placeholder="Enter bank name"
                />
              </div>
              <Button onClick={handleAddBank} className="w-full">
                Add Bank
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank Name</TableHead>
              <TableHead>Assigned Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    {bank.assignedUsers}
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedBank(bank);
                      setIsAssignUsersOpen(true);
                    }}
                  >
                    Assign Users
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBank(bank.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={isAssignUsersOpen} onOpenChange={setIsAssignUsersOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Users to {selectedBank?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="selectAll"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="selectAll">Select All Users</Label>
            </div>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={user.isAssigned}
                    onCheckedChange={(checked) => handleUserSelect(user.id, checked as boolean)}
                  />
                  <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
                </div>
              ))}
            </div>
            <Button onClick={handleSaveAssignments} className="w-full">
              Save Assignments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Banks;