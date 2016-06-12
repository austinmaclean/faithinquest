import {Injectable} from '@angular/core';
import {Study} from '../model/study';

const STUDIES:Study[] = [
    {
        'id': 0, 'img': 'preview.jpg', 'title': 'What does bible says about marriage?', 'author': 'judah smith',
        'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    },
    {
        'id': 1, 'img': 'preview.jpg', 'title': 'What1 does bible says about marriage?', 'author': 'judah smith1',
        'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    },
    {
        'id': 2, 'img': 'preview.jpg', 'title': 'What2 does bible says about marriage?', 'author': 'judah smith2',
        'description': 'joins us at our sunday morning service at hills campus in sidney, australia'
    }
];

@Injectable()
export class StudyService {

    getStudies():Promise<Study[]> {
        return Promise.resolve(STUDIES);
    };

}
