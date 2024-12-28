export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  residence: string;
  nationality: string;
  status: "pending" | "approved" | "rejected";
  role: "user" | "admin";
  balance: number;
  customFee?: {
    type: "percentage" | "fixed";
    value: number;
  };
  limits?: {
    withdrawal: {
      min: number;
      max: number;
    };
    send: {
      min: number;
      max: number;
    };
  };
  assignedBanks: number[];
}

export interface UserRegistration extends Omit<User, "id" | "status" | "role" | "balance" | "customFee" | "limits" | "assignedBanks"> {
  idCard: File;
}