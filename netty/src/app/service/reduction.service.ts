import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from '../domain/transaction.model';
import {HttpClient} from '@angular/common/http';
import {TransactionDto} from './transaction.dto';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ReductionService {
    constructor(private http: HttpClient) {

    }


    fetchReductionTips(): Observable<any[]> {
        return this.http.get<any>(`${environment.api}/classifier/reduction`);
    }
}
