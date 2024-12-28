import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getSystemSettings, updateSystemSettings } from "@/utils/settingsService";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState(getSystemSettings());

  const handleSave = () => {
    updateSystemSettings(settings);
    toast({
      title: "Settings updated",
      description: "System settings have been updated successfully",
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Fee Type</Label>
              <p className="text-sm text-muted-foreground">
                Toggle between percentage and fixed amount
              </p>
            </div>
            <Switch
              checked={settings.isPercentageFee}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, isPercentageFee: checked })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              {settings.isPercentageFee ? "Fee Percentage" : "Fixed Fee Amount"}
            </Label>
            <Input
              type="number"
              value={settings.defaultTransactionFee}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultTransactionFee: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Default Transaction Limits</Label>
            <div className="grid gap-4">
              <Input
                type="number"
                value={settings.withdrawalMinLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    withdrawalMinLimit: Number(e.target.value),
                  })
                }
                placeholder="Minimum Withdrawal"
              />
              <Input
                type="number"
                value={settings.withdrawalMaxLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    withdrawalMaxLimit: Number(e.target.value),
                  })
                }
                placeholder="Maximum Withdrawal"
              />
              <Input
                type="number"
                value={settings.sendMinLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sendMinLimit: Number(e.target.value),
                  })
                }
                placeholder="Minimum Send"
              />
              <Input
                type="number"
                value={settings.sendMaxLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sendMaxLimit: Number(e.target.value),
                  })
                }
                placeholder="Maximum Send"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;