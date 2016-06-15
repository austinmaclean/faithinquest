import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {AccountService} from '../index';

@Directive({
    selector: 'router-outlet',
    providers: [AccountService]
})
export class AuthRouterOutletDirective extends RouterOutlet {
    private publicRoutes:any;
    private parentRouter:Router;

    constructor(_viewContainerRef:ViewContainerRef, _loader:DynamicComponentLoader,
                _parentRouter:Router, @Attribute('name') nameAttr:string,
                private _accountService:AccountService) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;

        this.publicRoutes = {
            'login': true,
            '': true
        };
    }

    activate(instruction:ComponentInstruction) {
        let url = instruction.urlPath;
        if (this.publicRoutes[url]) {
            return super.activate(instruction);
        } else {
            return this._accountService.getInfo().toPromise().then(res => {
                return super.activate(instruction);
            }).catch(err => {
                this.parentRouter.navigateByUrl('/login');
                return super.activate(instruction);
            });
        }
    }
}
