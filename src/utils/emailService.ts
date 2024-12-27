import { toast } from "@/hooks/use-toast"

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ to, subject, body }: EmailParams) => {
  try {
    // In a real application, this would connect to your email service provider
    console.log('Sending email:', { to, subject, body });
    toast({
      title: "Email sent successfully",
      description: `Email sent to ${to}`,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    toast({
      variant: "destructive",
      title: "Failed to send email",
      description: "Please try again later",
    });
    return false;
  }
};

export const sendStatusEmail = async (
  email: string, 
  status: 'approved' | 'rejected', 
  type: 'registration' | 'withdrawal' | 'deposit' | 'send',
  reason?: string
) => {
  const subject = `Your ${type} request has been ${status}`;
  const body = status === 'approved' 
    ? `Your ${type} request has been approved.`
    : `Your ${type} request has been rejected. Reason: ${reason}`;
    
  return sendEmail({ to: email, subject, body });
};