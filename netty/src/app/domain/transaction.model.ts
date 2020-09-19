import {Moment} from 'moment';

export interface Transaction {
    date: Date;
    text: string;
    prettyText?: string;
    location: string;
    category: string;
    price?: number;
    carbon: number;
    score: number;
}