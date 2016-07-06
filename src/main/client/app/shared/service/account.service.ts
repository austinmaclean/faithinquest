import {Injectable} from '@angular/core';
import {Admin} from '../model/admin';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {
    GET, PUT, POST,
    DELETE, BaseUrl, Headers, Header,
    Produces, MediaType, DefaultHeaders,
    Path, Body, Query
} from './rest-client';
import {BaseService} from './base.service';
import {HttpLoaderService} from '../http-loader/httpLoaderService';

var Token:Admin = null;

@Injectable()
@BaseUrl('/api/admin/account/')
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class AccountService extends BaseService {

    constructor(protected router:Router, protected http:Http, protected httpLoaderService:HttpLoaderService) {
        super(router, http, httpLoaderService);
    }

    @GET('info')
    @Produces(MediaType.JSON)
    private info():Observable<any> {
        return null;
    }

    @POST('sign-in')
    @Produces(MediaType.JSON)
    private signIn(@Body admin:Admin):Observable<any> {
        return null;
    }

    @GET('sign-out')
    private signOut():Observable<any> {
        return null;
    }

    public getInfo():Observable<any> {
        return Observable.create(observer => {
            if (Token) {
                observer.next(Token);
                observer.complete();
            } else {
                this.info().subscribe(
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

    public login(admin:Admin):Observable<any> {
        return Observable.create(observer => {
            this.signIn(admin).subscribe(
                response => {
                    Token = response;
                    observer.next(Token);
                    observer.complete();
                },
                error => {
                    console.log(error.json().message);

                    observer.error(error);
                    observer.complete();
                }
            );
        });
    }

    public logout():Observable<any> {
        return Observable.create(observer => {
            this.signOut().subscribe(null, null, () => {
                Token = null;
                observer.next(true);
                observer.complete();
            });
        });
    }

}
