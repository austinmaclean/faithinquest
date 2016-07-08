import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {loginPath} from '../../app.routes';
import {ErrorMessagesEventEmitter} from '../notification/notification';

interface IHttpErrorHandlerService {
    process(req:Request, observable:Observable<any>):Observable<any>;
}

@Injectable()
export class HttpErrorHandlerService implements IHttpErrorHandlerService {

    constructor(protected router:Router, private errorMessagesEventEmitter:ErrorMessagesEventEmitter) {
    }

    public process(req:Request, observable:Observable<any>):Observable<any> {
        return observable.catch((err, source) => {
            switch (err.status) {
                case 401:
                    return this.process401(err);
                case 403:
                    return this.process403(err);
                default:
                    return this.processXXX(err);
            }
        });
    }

    private process401(err:any):Observable<any> {
        this.router.navigate([loginPath]);
        return Observable.empty();
    }

    private process403(err:any):Observable<any> {
        return Observable.throw(err);
    }

    private processXXX(err:any):Observable<any> {
        return Observable.throw(err);
    }

}