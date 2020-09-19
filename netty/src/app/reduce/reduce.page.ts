import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {ReductionService} from '../service/reduction.service';

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
