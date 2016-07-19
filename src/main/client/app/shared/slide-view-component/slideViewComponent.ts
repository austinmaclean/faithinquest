import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from '@angular/forms';
import {CORE_DIRECTIVES} from "@angular/common";
import {Router} from "@angular/router";
import {BS_VIEW_PROVIDERS, CAROUSEL_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {SlideService} from "../service/slide.service";


@Component({
    moduleId: module.id,
    selector: 'ti-slide-view',
    templateUrl: 'slideViewComponent.html',
    styleUrls: ['slideViewComponent.css'],
    viewProviders: [<any>SlideService, BS_VIEW_PROVIDERS],
    directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class SlideViewComponent implements OnInit {

    public interval:number = 3000;
    public slides:Array<any> = [];

    constructor(private slideService:SlideService, private router:Router) {
    }

    ngOnInit() {
        this.slideService.get().subscribe(list => {
            list.result.forEach(item => {
                this.slides.push({slide: item, image: SlideService.attachURL(item.attachment)});
            });
        })
    }

    public onClick(item):void {
        if(item.slide.link) {
            window.location.href = item.slide.link;
        }
    }

}
