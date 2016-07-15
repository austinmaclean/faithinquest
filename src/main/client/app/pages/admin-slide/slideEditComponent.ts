import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {SlideService} from "../../shared/service/slide.service";

@Component({
    moduleId: module.id,
    selector: 'ti-slide-edit',
    templateUrl: 'slideEditComponent.html',
    styleUrls: ['slideEditComponent.css'],
    providers: [SlideService],
    directives: [
        <any>NgClass,
        <any>NgStyle,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideEditComponent implements OnInit, OnDestroy {

    sub:any = null;
    slide:any = null;
    slides:any[] = [];

    constructor(private route:ActivatedRoute, private router:Router, private slideService:SlideService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            if (id) {
                
            } else {

                this.slide = {
                    link: '',
                    attachment: null,
                    indexNumber: 0
                };

                this.slideService.get().subscribe((res) => {
                    this.slides = res.result;
                });
                
            }
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

    add() {
        
    }

    reset() {
        
    }

}
