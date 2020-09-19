export interface Transaction {
    name: string;
    description?: string;
    category: string;
    price: Money;
    co2Emission: number;
}

export interface Money {
    currency: string;
    number: number;
}