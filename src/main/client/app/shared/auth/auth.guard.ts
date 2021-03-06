import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AccountService} from '../service/account.service';
import {loginPath} from '../../app.routes';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private accountService:AccountService, private router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | boolean {
        return Observable.create(observer => {
            this.accountService.getInfo().subscribe(
                info => {
                    observer.next(true);
                },
                err => {
                    this.router.navigate([loginPath]);
                    observer.next(false);
                },
                ()=> observer.complete());
        });
    }

}
