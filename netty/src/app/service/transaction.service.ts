import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from '../domain/transaction.model';

@Injectable({providedIn: 'root'})
export class TransactionService {


    getTransactions(): Observable<Transaction[]> {
        return of([
            {
                name: 'Fuel',
                description: 'Eni Tankstelle',
                category: 'fuel',
                co2Emission: 15,
                price: {currency: 'CHF', number: 54.2}
            },
            {
                name: 'Restaurant',
                description: 'McDonalds',
                category: 'food',
                co2Emission: 0.5,
                price: {currency: 'CHF', number: 24.2}
            },
            {
                name: 'SBB Mobile Ticket',
                category: 'transportation',
                co2Emission: 2,
                price: {currency: 'CHF', number: 6.8}
            },
            {
                name: 'Fuel',
                description: 'Eni Tankstelle',
                category: 'fuel',
                co2Emission: 15,
                price: {currency: 'CHF', number: 54.2}
            },
            {
                name: 'Restaurant',
                description: 'McDonalds',
                category: 'food',
                co2Emission: 0.5,
                price: {currency: 'CHF', number: 24.2}
            },
            {
                name: 'SBB Mobile Ticket',
                category: 'transportation',
                co2Emission: 2,
                price: {currency: 'CHF', number: 6.8}
            },
            {
                name: 'Fuel',
                description: 'Eni Tankstelle',
                category: 'fuel',
                co2Emission: 15,
                price: {currency: 'CHF', number: 54.2}
            },
            {
                name: 'Restaurant',
                description: 'McDonalds',
                category: 'food',
                co2Emission: 0.5,
                price: {currency: 'CHF', number: 24.2}
            },
            {
                name: 'SBB Mobile Ticket',
                category: 'transportation',
                co2Emission: 2,
                price: {currency: 'CHF', number: 6.8}
            },
        ]);
    }
}