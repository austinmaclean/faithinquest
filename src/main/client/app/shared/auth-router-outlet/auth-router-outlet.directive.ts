import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';

@Directive({
    selector: 'router-outlet'
})
export class AuthRouterOutletDirective extends RouterOutlet {
    private publicRoutes: any;
    private parentRouter: Router;

    constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
                _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;

        this.publicRoutes = {
            'login': true,
            '': true
        };
    }

    activate(instruction: ComponentInstruction) {
        let url = instruction.urlPath;
        if (!this.publicRoutes[url] && !localStorage.getItem('adminAuth')) {
            this.parentRouter.navigateByUrl('/login');
        }
        return super.activate(instruction);
    }
}
