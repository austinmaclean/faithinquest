import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Notification} from '../notification/notification';

interface IHttpLoaderService {
    process(url:string, observable:Observable<any>);
}

@Injectable()
export class HttpLoaderService implements IHttpLoaderService, OnDestroy {

    private numLoadings:number;
    private subject:Subject<number>;

    constructor(private notification:Notification) {
        this.numLoadings = 0;
        this.subject = new Subject<number>();

        this.subject.asObservable().subscribe((sequence) => {
            notification.Loading.trigger(sequence > 0);
        });
    }

    private increment(url:string) {
        this.numLoadings++;
        this.subject.next(this.numLoadings);
    }

    private decrement(url:string) {
        if (this.numLoadings > 0)
            this.numLoadings--;
        this.subject.next(this.numLoadings);
    }

    public process(url:string, observable:Observable<any>) {
        this.increment(url);
        observable.subscribe(null, null, () => this.decrement(url));
    }

    ngOnDestroy() {
        this.subject.unsubscribe();
    }

}