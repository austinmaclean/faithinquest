import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Study} from '../model/study';
import {Paging, Order} from '../dto/paging';
import {DataService} from '../auth/data.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StudyService {

    constructor(private dataService:DataService) {
    }

    public get(paging?:Paging):Observable<Study[]> {
        return this.dataService.get('/api/study', paging)
            .map(res => res.json().result);
    };

    public create(study:Study):Observable<Study> {
        return this.dataService.post('/api/admin/study', JSON.stringify(study))
            .map(res => res.json().result);
    }

    public update(study:Study):Observable<Study> {
        return this.dataService.put('/api/admin/study', JSON.stringify(study))
            .map(res => res.json().result);
    }

    public remove(studyId:number):Observable<Response> {
        return this.dataService.delete(`/api/admin/study/${studyId}`);
    }

}
