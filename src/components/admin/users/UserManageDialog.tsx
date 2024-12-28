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
import { Checkbox } from "@/components/ui/checkbox";
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
  banks: { id: number; name: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedUser: User) => void;
}

export const UserManageDialog = ({
  user,
  banks,
  open,
  onOpenChange,
  onUpdate,
}: UserManageDialogProps) => {
  const [balance, setBalance] = useState(user.balance.toString());
  const [feeType, setFeeType] = useState<"percentage" | "fixed">(
    user.customFee?.type || "percentage"
  );
  const [feeValue, setFeeValue] = useState(
    user.customFee?.value.toString() || ""
  );
  const [withdrawalMin, setWithdrawalMin] = useState(
    user.limits?.withdrawal.min?.toString() || ""
  );
  const [withdrawalMax, setWithdrawalMax] = useState(
    user.limits?.withdrawal.max?.toString() || ""
  );
  const [sendMin, setSendMin] = useState(
    user.limits?.send.min?.toString() || ""
  );
  const [sendMax, setSendMax] = useState(
    user.limits?.send.max?.toString() || ""
  );
  const [useCustomFee, setUseCustomFee] = useState(!!user.customFee);
  const [useCustomLimits, setUseCustomLimits] = useState(!!user.limits);
  const [selectedBanks, setSelectedBanks] = useState<number[]>(
    user.assignedBanks || []
  );
  const [noLimitWithdrawal, setNoLimitWithdrawal] = useState(
    !user.limits?.withdrawal.max
  );
  const [noLimitSend, setNoLimitSend] = useState(!user.limits?.send.max);

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      balance: parseFloat(balance),
      customFee: useCustomFee
        ? {
            type: feeType,
            value: parseFloat(feeValue),
          }
        : undefined,
      limits: useCustomLimits
        ? {
            withdrawal: {
              min: withdrawalMin ? parseFloat(withdrawalMin) : null,
              max: noLimitWithdrawal ? null : parseFloat(withdrawalMax),
            },
            send: {
              min: sendMin ? parseFloat(sendMin) : null,
              max: noLimitSend ? null : parseFloat(sendMax),
            },
          }
        : undefined,
      assignedBanks: selectedBanks,
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
                  onValueChange={(value: "percentage" | "fixed") =>
                    setFeeType(value)
                  }
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
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={withdrawalMin}
                      onChange={(e) => setWithdrawalMin(e.target.value)}
                      placeholder="Min"
                    />
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={withdrawalMax}
                        onChange={(e) => setWithdrawalMax(e.target.value)}
                        placeholder="Max"
                        disabled={noLimitWithdrawal}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={noLimitWithdrawal}
                          onCheckedChange={(checked) =>
                            setNoLimitWithdrawal(checked as boolean)
                          }
                        />
                        <Label>No Limit</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Send Limits</Label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={sendMin}
                      onChange={(e) => setSendMin(e.target.value)}
                      placeholder="Min"
                    />
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={sendMax}
                        onChange={(e) => setSendMax(e.target.value)}
                        placeholder="Max"
                        disabled={noLimitSend}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={noLimitSend}
                          onCheckedChange={(checked) =>
                            setNoLimitSend(checked as boolean)
                          }
                        />
                        <Label>No Limit</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label>Assigned Banks</Label>
            <div className="grid grid-cols-2 gap-4">
              {banks.map((bank) => (
                <div key={bank.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBanks.includes(bank.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBanks([...selectedBanks, bank.id]);
                      } else {
                        setSelectedBanks(
                          selectedBanks.filter((id) => id !== bank.id)
                        );
                      }
                    }}
                  />
                  <Label>{bank.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};