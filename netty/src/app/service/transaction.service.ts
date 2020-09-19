import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from '../domain/transaction.model';
import {HttpClient} from '@angular/common/http';
import {TransactionDto} from './transaction.dto';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private http: HttpClient) {

    }


    fetchTransactions(): Observable<TransactionDto[]> {
        return this.http.get<TransactionDto[]>(`${environment.api}/classifier/transaction-data`);
    }


    getTransactions(): Observable<Transaction[]> {
        return this.fetchTransactions().pipe(
            map(transactions => {
                return transactions.map(t => {
                    return {
                        date: moment(t.date, 'DD.MM.YY').toDate(),
                        text: t.text,
                        location: t.location,
                        category: t.category,
                        price: Number.parseFloat(t.price),
                        carbon: t.carbon,
                        score: t.score,
                    };
                }).sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1);
            }),
            startWith([]),
        );
    }
}
