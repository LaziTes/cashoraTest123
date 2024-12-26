import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const commonQuestions = {
  "how to deposit": "To make a deposit, go to the Deposit tab, enter your details, and upload proof of payment. We accept bank transfers and various payment methods.",
  "withdrawal process": "Withdrawals can be requested through the Withdraw tab. Processing usually takes 1-2 business days. Minimum withdrawal amount is $10.",
  "send money": "You can send money to other users via the Send Money tab. Just enter their email/username and the amount you wish to send.",
  "contact support": "You can reach our support team 24/7 through this chat or email us at support@example.com",
  "account security": "We use industry-standard encryption and two-factor authentication to protect your account. Enable 2FA in your account settings for extra security.",
};

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today? You can ask me about deposits, withdrawals, sending money, or account security.",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Check for automated responses
    const lowerMessage = newMessage.toLowerCase();
    let automatedResponse = "I'll connect you with a support agent who can help you with that.";

    // Check if the message contains any keywords from commonQuestions
    for (const [keyword, response] of Object.entries(commonQuestions)) {
      if (lowerMessage.includes(keyword)) {
        automatedResponse = response;
        break;
      }
    }

    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: automatedResponse,
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 animate-fade-in"
    >
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader>
          <CardTitle>Customer Support</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-5rem)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Support;