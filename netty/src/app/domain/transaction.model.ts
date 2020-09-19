
export interface Transaction {
    transactionId: number;
    date: string;
    text: string;
    prettyText?: string;
    location: string;
    category: string;
    price?: string;
    carbon: number;
    score: number;
}