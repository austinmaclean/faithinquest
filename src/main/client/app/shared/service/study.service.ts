import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Study} from '../model/study';

const STUDIES:Study[] = [
    {
        'id': 0, 'code': 'ltfdl-ED9O0', 'start': 30, 'img': 'preview.jpg', 'title': 'What does bible says about marriage?',
        'author': 'judah smith', 'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    },
    {
        'id': 1, 'code': '_iO3o_uYHhQ', 'start': 20, 'img': 'preview.jpg', 'title': 'What1 does bible says about marriage?',
        'author': 'judah smith1', 'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    },
    {
        'id': 2, 'code': '_J1vhLu0OKM', 'start': 70, 'img': 'preview.jpg', 'title': 'What2 does bible says about marriage?',
        'author': 'judah smith2', 'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    }
];

@Injectable()
export class StudyService {

    public getStudies():Observable<Study[]> {
        return Observable.create(observer => {
            observer.next(STUDIES);
            observer.complete();
        });
    };

}
