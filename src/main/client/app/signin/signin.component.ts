import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css']
})

export class SigninComponent {
    constructor(private _router:Router) {
    }

    gotoBibleStudyList() {
        this._router.navigate(['Dashboard']);
    }

}
