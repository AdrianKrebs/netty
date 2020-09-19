import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import {Observable} from 'rxjs';
import {Transaction} from '../domain/transaction.model';
import {map} from 'rxjs/operators';


const BAD_CARBON_VALUE = 100; // in kg


@Component({
    selector: 'app-tab1',
    templateUrl: 'measure.page.html',
    styleUrls: ['measure.page.scss']
})
export class MeasurePage implements OnInit {

    public transactions$: Observable<Transaction[]>;
    public carbonTotal$: Observable<number>;
    public carbonTotalColor: Observable<any>;
    public activeSegment = 'total';


    constructor(private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.transactions$ = this.transactionService.getTransactions();
        this.carbonTotal$ = this.transactionService.getCarbonTotal();
        this.carbonTotalColor = this.carbonTotal$.pipe(
            map(carbonTotal => {
                const red = Math.min(255, carbonTotal / BAD_CARBON_VALUE * 255.0);
                const green = Math.min(255, (1.0 - (carbonTotal / BAD_CARBON_VALUE)) * 255.0);

                return {color: `rgba(${red}, ${green}, 128, 1`};
            })
        );
    }

    improve(transaction: Transaction) {
        console.log(transaction);
    }

    icon(transaction: Transaction) {
        switch (transaction.category) {
            case 'Flight':
                return 'jam jam-plane';
            case 'Train':
                return 'jam jam-train';
            case 'Car':
                return 'jam jam-car';
            case 'Food':
                return 'jam jam-pizza-slice';
            case 'Goods':
                return 'jam jam-shopping-cart';
            default:
                return 'jam jam-credit-card';
        }
    }

    setActiveSegment(segment) {
        console.log(segment);
    }
}
