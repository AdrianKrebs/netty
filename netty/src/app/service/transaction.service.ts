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
        this.transactions = this.shuffle(
            await this.http.get<TransactionDto[]>(`${environment.api}/classifier/transaction-data`).toPromise()
        );
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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
                return this.transactions.map(t => {
                    return {
                        date: moment(t.date, 'DD.MM.YY').toDate(),
                        text: t.text,
                        location: t.location,
                        category: t.category,
                        price: Number.parseFloat(t.price),
                        carbon: t.carbon,
                        score: t.score,
                    };
                }).slice(0, i).sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1);
            }),
            startWith([])
        );

    }

    getCarbonTotal(): Observable<number> {
        const die$ = new Subject();
        const interval$ = interval(100);

        return interval$.pipe(
            takeUntil(die$),
            map((i) => {
                const total = this.transactions.reduce((a, b) => a + b.carbon, 0);
                const current = i * 115.2;
                console.log(current, total);
                if (current > total) {
                    die$.next();
                }
                return current;
            })
        );
    }
}
