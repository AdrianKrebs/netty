import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import {Observable} from 'rxjs';
import {Transaction} from '../domain/transaction.model';
import {filter, map, take, tap} from 'rxjs/operators';
import SmokeMachine from '@bijection/smoke'


const BAD_CARBON_VALUE = 1500; // in kg


@Component({
    selector: 'app-tab1',
    templateUrl: 'measure.page.html',
    styleUrls: ['measure.page.scss']
})
export class MeasurePage implements OnInit, AfterViewInit {

    public transactions$: Observable<Transaction[]>;
    public carbonTotal$: Observable<number>;
    public carbonTotalColor: Observable<any>;

    @ViewChild("myCanvas", {static: false}) myCanvas: ElementRef<HTMLCanvasElement>;

    public context: CanvasRenderingContext2D;

    constructor(private transactionService: TransactionService) {
    }


    ngOnInit(): void {
        this.transactionService.fetchTransactions();

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

    getLabelForScore(score: number) {
        if (score > 0.8) {
            return 'High';
        } else if (score > 0.6 && score <= 0.8) {
            return 'Medium';
        } else if (score <= 0.6) {
            return 'Low';
        }
    }

    getColorForScore(carbon: number) {
        if (carbon > 600) {
            return 'danger';
        } else if (carbon > 150) {
            return 'warning';
        } else if (carbon < 150 && carbon > 50) {
            return 'warning-low ';
        } else if (carbon < 50) {
            return 'success';
        }
    }

    ngAfterViewInit(): void {
        this.transactions$.pipe(
            filter(t => t.length > 0),
            take(1),
        ).subscribe((total) => {
            this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
            var party = SmokeMachine(this.context, [54, 16.8, 18.2])

            party.start() // start animating
            party.addSmoke(Math.random() * document.getElementsByTagName('body')[0].getClientRects()[0].width,300,20)

            setInterval(() => {
                party.addSmoke(Math.random() * document.getElementsByTagName('body')[0].getClientRects()[0].width,300,20)
            }, 1500);
        });

    }
}
