import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { sendEmail } from "@/utils/emailService";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface User {
  id: number;
  email: string;
  name: string;
}

const EmailManagement = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Mock users data - replace with actual users data
  const users: User[] = [
    { id: 1, email: "john@example.com", name: "John Doe" },
    { id: 2, email: "jane@example.com", name: "Jane Smith" },
    { id: 3, email: "alice@example.com", name: "Alice Johnson" },
  ];

  const handleSend = async () => {
    try {
      const emails = sendToAll
        ? users.map((user) => user.email)
        : users
            .filter((user) => selectedUsers.includes(user.id))
            .map((user) => user.email);

      for (const email of emails) {
        await sendEmail({
          to: email,
          subject,
          body: message,
        });
      }

      setSubject("");
      setMessage("");
      setSelectedUsers([]);

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
              <Label>Select Users</Label>
              <Card>
                <ScrollArea className="h-[200px] w-full rounded-md border">
                  <div className="p-4 space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(
                                selectedUsers.filter((id) => id !== user.id)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`user-${user.id}`} className="flex-1">
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
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
            disabled={
              !subject ||
              !message ||
              (!sendToAll && selectedUsers.length === 0)
            }
          >
            Send Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailManagement;