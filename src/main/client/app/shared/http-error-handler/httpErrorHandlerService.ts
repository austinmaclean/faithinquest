import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {loginPath} from '../../app.routes';
import {ErrorMessagesEventEmitter} from '../notification/notification';

enum ErrorStatus {
    Unauthorized = 401,
    Forbidden = 403
}

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
                case ErrorStatus.Unauthorized:
                    return this.process401(err.json());
                case ErrorStatus.Forbidden:
                    return this.process403(err.json());
                default:
                    return this.processXXX(err.json(), req);
            }
        });
    }

    private process401(err:any):Observable<any> {
        this.router.navigate([loginPath]);

        return Observable.empty();
    }

    private process403(err:any):Observable<any> {
        if (err.statusText) {
            this.errorMessagesEventEmitter.emit([err.statusText]);
        }

        return Observable.throw(err);
    }

    private processXXX(err:any, req:Request):Observable<any> {
        let messageList:any[] = [];
        let errList:any[] = err.items ? err.items : [err.data];

        errList.forEach(item => {
            if (item.messageCode) {
                messageList.push({
                    name: item.name,
                    msg: item.message,
                    trace: item.trace
                });
            } else if (item.message) {
                messageList.push({
                    name: item.name,
                    msg: item.message,
                    trace: item.trace
                });
            } else if (item.reason) {
                messageList.push({
                    name: item.name,
                    msg: 'Operation ' + RequestMethod[req.method] + ' Error. Reason: ' + item.reason,
                    trace: item.trace
                });
            } else {
                console.warn('Unhandled error!');
            }
        });

        if (messageList.length) {
            this.errorMessagesEventEmitter.emit(messageList);
        }

        return Observable.throw(err);
    }

}