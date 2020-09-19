import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ReductionService} from '../service/reduction.service';
import {Transaction} from "../domain/transaction.model";
import {map} from "rxjs/operators";

@Component({
    selector: 'reduce-tab',
    templateUrl: 'reduce.page.html',
    styleUrls: ['reduce.page.scss']
})
export class ReducePage {
    public reductionTips: Observable<any>;

    constructor(private reductionService: ReductionService) {
    }

    ngOnInit(): void {
        this.reductionTips = this.reductionService.fetchReductionTips().pipe(map(arr => arr.sort(this.compare)));
    }


    compare(a, b) {
        if (a.proportion.percentage < b.proportion.percentage) {
            return 1;
        }
        if (a.proportion.percentage > b.proportion.percentage) {
            return -1;
        }
        return 0;
    }

    icon(category) {
        switch (category) {
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


}
