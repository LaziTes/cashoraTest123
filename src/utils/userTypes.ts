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
      min: number | null;
      max: number | null;
    };
    send: {
      min: number | null;
      max: number | null;
    };
  };
  assignedBanks: number[];
}

export interface UserRegistration {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  residence: string;
  nationality: string;
  idCard: File;
  phoneNumber: string;
  address: string;
}

export interface Bank {
  id: number;
  name: string;
}