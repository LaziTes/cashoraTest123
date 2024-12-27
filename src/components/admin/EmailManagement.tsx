import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Mail, Send, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EmailManagement = () => {
  const [emailSettings, setEmailSettings] = useState({
    sendRegistrationEmails: true,
    sendTransactionEmails: true,
    sendStatusUpdateEmails: true,
  });

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const templates = {
    registration: {
      approved: {
        subject: "Welcome to Our Platform",
        message: "Your registration has been approved. You can now access all features.",
      },
      rejected: {
        subject: "Registration Status Update",
        message: "We regret to inform you that your registration has been rejected.",
      },
    },
    withdrawal: {
      approved: {
        subject: "Withdrawal Approved",
        message: "Your withdrawal request has been approved and is being processed.",
      },
      rejected: {
        subject: "Withdrawal Request Update",
        message: "Your withdrawal request could not be processed.",
      },
    },
    // ... Add more templates as needed
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    const [type, status] = template.split('-');
    if (templates[type]?.[status]) {
      setSubject(templates[type][status].subject);
      setMessage(templates[type][status].message);
    }
  };

  const handleSettingChange = (setting: string) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast({
      title: "Settings updated",
      description: "Email notification settings have been updated",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Email Management</h2>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleTemplateSelect('registration-approved')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Registration Approval
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleTemplateSelect('registration-rejected')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Registration Rejection
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleTemplateSelect('withdrawal-approved')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Withdrawal Approval
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleTemplateSelect('withdrawal-rejected')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Withdrawal Rejection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Edit Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    rows={6}
                  />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Save Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registration Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send emails for registration status updates
                  </p>
                </div>
                <Switch
                  checked={emailSettings.sendRegistrationEmails}
                  onCheckedChange={() => handleSettingChange('sendRegistrationEmails')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transaction Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send emails for transaction updates
                  </p>
                </div>
                <Switch
                  checked={emailSettings.sendTransactionEmails}
                  onCheckedChange={() => handleSettingChange('sendTransactionEmails')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status Update Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send emails for general status updates
                  </p>
                </div>
                <Switch
                  checked={emailSettings.sendStatusUpdateEmails}
                  onCheckedChange={() => handleSettingChange('sendStatusUpdateEmails')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailManagement;