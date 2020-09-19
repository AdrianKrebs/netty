import { Component } from '@angular/core';
import {TransactionService} from "../service/transaction.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Transaction} from "../domain/transaction.model";
import {ReductionService} from "../service/reduction.service";

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
        this.reductionTips = this.reductionService.fetchReductionTips();
    }


}
