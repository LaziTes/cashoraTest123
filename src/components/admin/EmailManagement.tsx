import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { sendEmail } from "@/utils/emailService";
import { toast } from "@/hooks/use-toast";

const EmailManagement = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [selectedEmails, setSelectedEmails] = useState("");

  const handleSend = async () => {
    try {
      const emails = sendToAll
        ? ["all-users@example.com"]
        : selectedEmails.split(",").map((email) => email.trim());

      for (const email of emails) {
        await sendEmail({
          to: email,
          subject,
          body: message,
        });
      }

      setSubject("");
      setMessage("");
      setSelectedEmails("");

      toast({
        title: "Success",
        description: "Email(s) sent successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send email(s)",
      });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Email Management</h2>

      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label>Send to All Users</Label>
            <Switch checked={sendToAll} onCheckedChange={setSendToAll} />
          </div>

          {!sendToAll && (
            <div className="space-y-2">
              <Label>Selected Users (comma-separated emails)</Label>
              <Input
                value={selectedEmails}
                onChange={(e) => setSelectedEmails(e.target.value)}
                placeholder="user1@example.com, user2@example.com"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={6}
            />
          </div>

          <Button
            onClick={handleSend}
            className="w-full"
            disabled={!subject || !message || (!sendToAll && !selectedEmails)}
          >
            Send Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailManagement;