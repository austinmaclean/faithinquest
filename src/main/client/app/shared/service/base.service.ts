import {Http, Request} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import {RESTClient} from './rest-client';
import {HttpLoaderService} from "../http-loader/httpLoaderService";

export abstract class BaseService extends RESTClient {

    constructor(protected router:Router, protected http:Http, protected httpLoaderService:HttpLoaderService) {
        super(http);
    }

    protected requestInterceptor(req:Request) {
        // none
    }

    protected responseInterceptor(req:Request, observable:Observable<any>):Observable<any> {
        // Load handling        
        this.httpLoaderService.process(req.url, observable);

        // Unauthorized Error handling
        return observable.catch((err, source) => {
            if (err.status === 401 && err.url.indexOf('api/admin/account/signin') !== -1) {
                this.router.navigateByUrl('login');
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

}
