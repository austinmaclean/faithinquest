import {Injectable} from '@angular/core';
import {Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

// @Injectable()
export class HttpInterceptor extends Http {

    constructor(_backend:ConnectionBackend, _defaultOptions:RequestOptions, private router:Router) {
        super(_backend, _defaultOptions);
        debugger;
    }

    request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
        debugger;
        return this.intercept(super.request(url, options));
    }

    get(url:string, options?:RequestOptionsArgs):Observable<Response> {
        debugger;
        return this.intercept(super.get(url, options));
    }

    post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        debugger;
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        debugger;
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
        debugger;
        return this.intercept(super.delete(url, options));
    }


    getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
        if (options === null) {
            options = new RequestOptions();
        }
        if (options.headers === null) {
            options.headers = new Headers();
        }
        options.headers.append('Accept', 'application/json');
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable:Observable<Response>):Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status === 401 && err.url.indexOf('api/admin/account/signin') !== -1) {
                this.router.parent.navigateByUrl('/login');
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }
}
