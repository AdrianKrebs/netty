import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TransactionService} from '../service/transaction.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'offset.page.html',
    styleUrls: ['offset.page.scss']
})
export class OffsetPage implements OnInit {

    carbonTotal$: Observable<number>

    offsetProviders = [
        {title: 'Climeworks', description: 'Filter carbon dioxide from the air with Climeworks.', enabled: false, offset: 0},
        {title: 'Almighty Tree', description: 'Trees absorb CO2 and contribute to a climate balance. We take care of planting trees in Switzerland and in the world.', enabled: false, offset: 0},
        {title: 'Myclimate', description: 'We want to shape the future together with you through consulting services, education and climate protection projects. We are motivated and experienced experts in sustainability and climate protection with high-​profile supporters.', enabled: false, offset: 0},
    ];


    constructor(private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.carbonTotal$ = this.transactionService.getCarbonTotal();
    }


    changeOffset(index, offsetValue) {
        console.log(offsetValue);
        this.offsetProviders[index].offset = offsetValue;
    }

}
