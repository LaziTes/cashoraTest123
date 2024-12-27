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
  "deposit": "To make a deposit, go to the Deposit tab and follow these steps:\n1. Enter the amount\n2. Upload proof of payment\n3. Submit the form",
  "withdraw": "To withdraw funds:\n1. Go to the Withdraw tab\n2. Enter the amount\n3. Select your withdrawal method\n4. Confirm the transaction",
  "send money": "To send money to another user:\n1. Go to the Send Money tab\n2. Enter the recipient's email or username\n3. Enter the amount\n4. Confirm the transaction",
  "account": "To manage your account:\n1. Click on your profile icon\n2. Update your information\n3. Enable 2FA for extra security",
  "contact": "You can reach our support team:\n- Email: support@cashora.com\n- Phone: 1-800-CASHORA\n- Live chat: Available 24/7",
  "fees": "Our fee structure:\n- Deposits: Free\n- Withdrawals: 1%\n- Money transfers: 0.5%",
  "security": "We take security seriously:\n- 2FA authentication\n- End-to-end encryption\n- Regular security audits",
  "limits": "Transaction limits:\n- Minimum deposit: $10\n- Maximum withdrawal: $10,000/day\n- Transfer limit: $5,000/day"
};

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today? You can ask me about:\n- Deposits & Withdrawals\n- Sending Money\n- Account Security\n- Transaction Limits\n- Fees\n- Contact Information",
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
    let automatedResponse = "I'll connect you with a support agent who can help you with that specific issue.";

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
                    <p className="whitespace-pre-line">{message.text}</p>
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