import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Admin} from '../model/admin';
import {Observable} from 'rxjs/Observable';

import {DataService} from '../auth/data.service';

const formHeaders:Headers = new Headers();
formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

var Token:any = null;

@Injectable()
export class AccountService {

    constructor(private dataService:DataService) {
    }

    public getInfo():Observable<any> {
        return new Observable(observer => {
            if (Token) {
                observer.next(Token);
                observer.complete();
            } else {
                this.dataService.get('/api/admin/account/info').subscribe(
                    result => {
                        Token = result;
                        observer.next(Token);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                        observer.complete();
                    });
            }
        });
    }

    public login(admin:Admin):Observable<Response> {
        let o = this.dataService.post('/api/admin/account/signin', 'password=' + admin.password, {headers: formHeaders});
        o.subscribe(
            response => {
                Token = response;
            },
            error => {
                console.log(error.text());
            }
        );
        return o;
    }

    public logout() {
        Token = null;
    }

}
