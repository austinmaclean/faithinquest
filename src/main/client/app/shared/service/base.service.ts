import {Http, Request} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import {RESTClient} from './rest-client';
import {HttpLoaderService} from "../http-loader/httpLoaderService";
import {loginPath, loginApiPath} from '../../app.routes';

export abstract class BaseService extends RESTClient {

    constructor(protected router:Router, protected http:Http, protected httpLoaderService:HttpLoaderService) {
        super(http);
    }

    protected requestInterceptor(req:Request) {
        // none
    }

    protected responseInterceptor(req:Request, observable:Observable<any>):Observable<any> {
        // Load handling        
        observable = this.httpLoaderService.process(req.url, observable);

        // Unauthorized Error handling
        return observable.catch((err, source) => {
            if (err.status === 401 && err.url.indexOf(loginApiPath) === -1) {
                this.router.navigate([loginPath]);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

}
