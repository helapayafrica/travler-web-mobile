export interface PaymentConfirmation {
  type: string;
  invoice_ref: string;
  timestamp: string;
  data: {
    TransactionType: string;
    TransID: string;
    TransTime: string;
    TransAmount: string;
    BusinessShortCode: string;
    BillRefNumber: string;
    InvoiceNumber: string;
    OrgAccountBalance: string;
    ThirdPartyTransID: string;
    MSISDN: string;
    FirstName: string;
  };
}

export interface RoomStatus {
  room: string;
  invoice_ref: string;
  message: string;
  timeout: number;
}
