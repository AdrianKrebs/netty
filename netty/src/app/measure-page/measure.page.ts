import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import {Observable} from 'rxjs';
import {Transaction} from '../domain/transaction.model';

@Component({
    selector: 'app-tab1',
    templateUrl: 'measure.page.html',
    styleUrls: ['measure.page.scss']
})
export class MeasurePage implements OnInit {

    public transactions$: Observable<Transaction[]>;


    constructor(private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.transactions$ = this.transactionService.getTransactions();
    }

    improve(transaction: Transaction) {
        console.log(transaction);
    }

    icon(transaction: Transaction) {
        switch (transaction.category) {
            case 'transportation':
                return 'jam jam-train';
            case 'fuel':
                return 'jam jam-car';
            case 'food':
                return 'jam jam-pizza-slice';
            default:
                return 'jam jam-credit-card';
        }
    }
}
