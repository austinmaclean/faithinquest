import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'sd-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css'],
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class SignInComponent {

    constructor(private router:Router, private http:Http) {
    }

    signInUser(user:any) {
        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');

        let data = JSON.stringify(user);

        this.http.post('/api/admin/account/signin', data, {headers: contentHeaders})
            .subscribe(
                response => {
                    localStorage.setItem('auth', response.json());
                    this.router.parent.navigateByUrl('/Admin');
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
            );
    }

}
