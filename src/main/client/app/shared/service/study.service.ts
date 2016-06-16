import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Study} from '../model/study';
import {DataService} from '../auth/data.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StudyService {

    constructor(private dataService:DataService) {
    }

    public getStudies():Observable<Study[]> {

        return this.dataService.get('/api/study').map(res => {
            debugger;
            var lst: Array<Study> = res.json().result;
            return lst;
        });
    };

    public createStudy(study:Study):Observable<Response> {
        let o = this.dataService.post('/api/admin/study', JSON.stringify(study));
        o.subscribe(
            response => {
                debugger;
                console.log(response);
            },
            error => {
                debugger;
                console.log(error.text());
            }
        );
        return o;
    }

}
