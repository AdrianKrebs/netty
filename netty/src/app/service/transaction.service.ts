import {Injectable} from '@angular/core';
import {interval, Observable, of, Subject} from 'rxjs';
import {Transaction} from '../domain/transaction.model';
import {HttpClient} from '@angular/common/http';
import {TransactionDto} from './transaction.dto';
import {map, startWith, takeUntil, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class TransactionService {

    private transactions = [];

    constructor(private http: HttpClient) {
    }

    async fetchTransactions() {
        const trans = await this.http.get<TransactionDto[]>(`${environment.api}/classifier/transaction-data`).toPromise();
        this.transactions = trans
            .map(t => {
                return {
                    date: moment(t.date, 'DD.MM.YY').toDate(),
                    text: t.text,
                    location: t.location,
                    category: t.category,
                    price: Number.parseFloat(t.price),
                    carbon: t.carbon,
                    score: t.score,
                };
            })
            .sort((a, b) => a.date.getTime() < b.date.getTime() ? -1 : 1);
    }


    getTransactions(): Observable<Transaction[]> {
        const interval$ = interval(250);
        const die$ = new Subject();

        return interval$.pipe(
            takeUntil(die$),
            map((i) => {
                if (i === this.transactions.length) {
                    die$.next();
                }
                return this.transactions.slice(0, i).sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1);
            }),
            startWith([])
        );

    }

    getCarbonTotal(): Observable<number> {
        const die$ = new Subject();
        const interval$ = interval(50);

        return interval$.pipe(
            takeUntil(die$),
            map((i) => {
                const total = this.transactions.reduce((a, b) => a + b.carbon, 0);
                const current = i * 12.2;
                console.log(current, total);
                if (current > total) {
                    die$.next();
                }
                return current;
            })
        );
    }

    getCarobonTotalInstant(): Observable<number> {
        return of(this.transactions.reduce((a, b) => a + b.carbon, 0));
    }
}
