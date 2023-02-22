export interface userData {
  name: string;
  email: string;
  password: string;
  userName: string;
  phoneNumber: number;
  accountNumber: number;
  veified: boolean;
  wallet: {}[];
  history: {}[];
}

export interface walletData {
  balance: number;
  credit: number;
  debit: number;
}

export interface historyData {
  message: string;
  transactionType: string;
  transactionReference: number;
}
