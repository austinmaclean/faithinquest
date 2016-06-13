import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Admin} from '../model/admin';
import { Observable } from 'rxjs/Observable';

const jsonHeaders:Headers = new Headers();
jsonHeaders.append('Accept', 'application/json');
jsonHeaders.append('Content-Type', 'application/json');

const formHeaders:Headers = new Headers();
formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class AccountService {

    constructor(private http:Http) {
    }

    public login(admin:Admin):Observable<Response> {
        let o = this.http.post('/api/admin/account/signin', 'password=' + admin.password, {headers: formHeaders});
        o.subscribe(
            response => {
                localStorage.setItem('adminAuth', response.json());
            },
            error => {
                console.log(error.text());
            }
        );
        return o;
    }

    public logout(admin:Admin):void {
        localStorage.removeItem('adminAuth');
    }

}
