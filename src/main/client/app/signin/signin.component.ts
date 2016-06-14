import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {AccountService, Admin} from '../shared/index';
import {FooterComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css'],
    directives: [<any>FooterComponent,<any>RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [AccountService]
})
export class SignInComponent {

    constructor(private router:Router, private accountService:AccountService) {
    }

    signInUser(admin:Admin) {
        this.accountService.login(admin).subscribe(
            response => {
                this.router.parent.navigateByUrl('/admin');
            }
        );
    }

}
