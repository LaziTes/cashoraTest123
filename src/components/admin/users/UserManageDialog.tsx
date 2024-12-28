import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User } from "@/utils/userTypes";
import { toast } from "@/hooks/use-toast";

interface UserManageDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedUser: User) => void;
}

export const UserManageDialog = ({
  user,
  open,
  onOpenChange,
  onUpdate,
}: UserManageDialogProps) => {
  const [balance, setBalance] = useState(user.balance.toString());
  const [feeType, setFeeType] = useState(user.customFee?.type || "percentage");
  const [feeValue, setFeeValue] = useState(
    user.customFee?.value.toString() || ""
  );
  const [withdrawalMin, setWithdrawalMin] = useState(
    user.limits?.withdrawal.min.toString() || ""
  );
  const [withdrawalMax, setWithdrawalMax] = useState(
    user.limits?.withdrawal.max.toString() || ""
  );
  const [sendMin, setSendMin] = useState(
    user.limits?.send.min.toString() || ""
  );
  const [sendMax, setSendMax] = useState(
    user.limits?.send.max.toString() || ""
  );
  const [useCustomFee, setUseCustomFee] = useState(!!user.customFee);
  const [useCustomLimits, setUseCustomLimits] = useState(!!user.limits);

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      balance: parseFloat(balance),
      customFee: useCustomFee
        ? {
            type: feeType as "percentage" | "fixed",
            value: parseFloat(feeValue),
          }
        : undefined,
      limits: useCustomLimits
        ? {
            withdrawal: {
              min: parseFloat(withdrawalMin),
              max: parseFloat(withdrawalMax),
            },
            send: {
              min: parseFloat(sendMin),
              max: parseFloat(sendMax),
            },
          }
        : undefined,
    };

    onUpdate(updatedUser);
    toast({
      title: "Success",
      description: "User settings updated successfully",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Balance Management</Label>
            <Input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Custom Fee Settings</Label>
              <Switch
                checked={useCustomFee}
                onCheckedChange={setUseCustomFee}
              />
            </div>
            {useCustomFee && (
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={feeType}
                  onValueChange={(value) => setFeeType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fee Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={feeValue}
                  onChange={(e) => setFeeValue(e.target.value)}
                  placeholder={feeType === "percentage" ? "%" : "$"}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Custom Limits</Label>
              <Switch
                checked={useCustomLimits}
                onCheckedChange={setUseCustomLimits}
              />
            </div>
            {useCustomLimits && (
              <div className="space-y-4">
                <div>
                  <Label>Withdrawal Limits</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                      type="number"
                      value={withdrawalMin}
                      onChange={(e) => setWithdrawalMin(e.target.value)}
                      placeholder="Min"
                    />
                    <Input
                      type="number"
                      value={withdrawalMax}
                      onChange={(e) => setWithdrawalMax(e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <Label>Send Limits</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                      type="number"
                      value={sendMin}
                      onChange={(e) => setSendMin(e.target.value)}
                      placeholder="Min"
                    />
                    <Input
                      type="number"
                      value={sendMax}
                      onChange={(e) => setSendMax(e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};