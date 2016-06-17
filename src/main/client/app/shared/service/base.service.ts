import {Http, Request} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import {RESTClient} from './rest-client';

export abstract class BaseService extends RESTClient {

    constructor(protected router:Router, protected http:Http) {
        super(http);
    }

    protected requestInterceptor(req:Request) {
        // none
    }

    protected responseInterceptor(observable:Observable<any>):Observable<any> {
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
