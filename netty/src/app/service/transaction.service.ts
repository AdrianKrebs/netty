import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from '../domain/transaction.model';

@Injectable({providedIn: 'root'})
export class TransactionService {


    getTransactions(): Observable<Transaction[]> {
        return of([
            {
                transactionId: 1,
                date: '01.02.20',
                text: 'EAT.CH',
                location: 'ZURICH CH',
                category: 'Food',
                price: '38.70',
                carbon: 0.3,
                score: 0.8
            },
            {
                transactionId: 2,
                date: '02.02.20',
                text: 'Coop Pronto Dubendorfer.',
                location: 'Zurich CH',
                category: 'Groceries',
                carbon: 0.2,
                score: 0.7
            },
            {
                transactionId: 3,
                date: '05.02.20',
                text: 'SOCAR Buhlwiesen',
                location: 'Dubendorf CH',
                category: 'Car',
                price: '58.20',
                carbon: 5.2,
                score: 0.9
            },
            {
                transactionId: 4,
                date: '15.02.20',
                text: 'IKEA Dt. NL Freiburg',
                location: 'Freiburg im B DE',
                category: 'Goods',
                price: '212.20',
                carbon: 4.2,
                score: 0.85
            },
            {
                transactionId: 5,
                date: '16.02.20',
                text: 'Shamrock Irish Pub',
                location: 'Zurich CH',
                category: 'Food',
                price: '15.20',
                carbon: 0.2,
                score: 0.85
            },
        ]);
    }
}
