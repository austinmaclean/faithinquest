import {Injectable} from '@angular/core';
import {Http, Request, RequestOptionsArgs, Response, RequestOptions, Headers} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

@Injectable()
export class DataService {

    constructor(private http:Http, private router:Router) {
    }

    public request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(this.http.request(url, options));
    }

    public get(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(this.http.get(url, options));
    }

    public post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(this.http.post(url, body, this.getRequestOptionArgs(options)));
    }

    public put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(this.http.put(url, body, this.getRequestOptionArgs(options)));
    }

    public delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(this.http.delete(url, options));
    }

    private getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Accept', 'application/json');
            options.headers.append('Content-Type', 'application/json');
        }
        return options;
    }

    private intercept(observable:Observable<Response>):Observable<Response> {
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
