import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileIcon, ImageIcon } from "lucide-react";

interface DepositDetailsDialogProps {
  deposit: {
    id: number;
    user: string;
    amount: number;
    date: string;
    receipt?: File;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DepositDetailsDialog = ({
  deposit,
  open,
  onOpenChange,
}: DepositDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Deposit Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Transaction Information</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="text-muted-foreground">User:</span>{" "}
                  {deposit.user}
                </p>
                <p>
                  <span className="text-muted-foreground">Amount:</span> $
                  {deposit.amount.toLocaleString()}
                </p>
                <p>
                  <span className="text-muted-foreground">Date:</span>{" "}
                  {deposit.date}
                </p>
              </div>
            </div>
          </div>
          {deposit.receipt && (
            <div>
              <h3 className="font-semibold mb-2">Receipt</h3>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Filename: {deposit.receipt.name}
                </p>
                {deposit.receipt.type.startsWith("image/") ? (
                  <div className="relative aspect-video">
                    <img
                      src={URL.createObjectURL(deposit.receipt)}
                      alt="Receipt"
                      className="rounded-lg object-contain w-full h-full"
                    />
                  </div>
                ) : deposit.receipt.type === "application/pdf" ? (
                  <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                    <FileIcon className="h-5 w-5" />
                    <a
                      href={URL.createObjectURL(deposit.receipt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      View PDF Receipt
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    <a
                      href={URL.createObjectURL(deposit.receipt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                    >
                      View Receipt
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};