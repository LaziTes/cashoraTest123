import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
              <div className="border rounded p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Filename: {deposit.receipt.name}
                </p>
                {deposit.receipt.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(deposit.receipt)}
                    alt="Receipt"
                    className="max-w-full h-auto rounded"
                  />
                ) : (
                  <a
                    href={URL.createObjectURL(deposit.receipt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Receipt
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};