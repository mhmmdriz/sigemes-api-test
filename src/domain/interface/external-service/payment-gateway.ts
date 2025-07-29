export interface PaymentGatewayInterface {
    createTransaction(orderId: string, customer_name:string, customer_email: string, customer_phone: string, item_name: string, item_brand: string, item_category: string, grossAmount: number, actualAmount: number, transactionFee: number): Promise<string>;
    cancelTransaction(orderId: string): Promise<void>;
}