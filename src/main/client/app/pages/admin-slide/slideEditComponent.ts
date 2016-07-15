import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'ti-slide-edit',
    templateUrl: 'slideEditComponent.html',
    styleUrls: ['slideEditComponent.css'],
    directives: [
        <any>NgClass,
        <any>NgStyle,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideEditComponent implements OnInit, OnDestroy {

    sub:any;

    constructor(private route:ActivatedRoute, private router:Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            console.log(id);
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onBack() {
        this.router.navigate(['admin']);
    }

}
