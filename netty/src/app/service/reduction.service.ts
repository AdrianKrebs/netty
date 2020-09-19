import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ReductionService {
    constructor(private http: HttpClient) {

    }

    fetchReductionTips(): Observable<any[]> {
        return this.http.get<any>(`${environment.api}/classifier/reduction`);
    }
}
