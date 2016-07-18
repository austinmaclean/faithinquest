import {Component, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {SlideService} from "../../shared/service/slide.service";
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {SlideComponent} from "./slide/slideComponent";

@Component({
    moduleId: module.id,
    selector: 'ti-slide-edit',
    templateUrl: 'slideEditComponent.html',
    styleUrls: ['slideEditComponent.css'],
    viewProviders: [<any>SlideService],
    directives: [
        <any>SlideComponent,
        <any>NgClass,
        <any>NgStyle,
        DND_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideEditComponent implements OnDestroy {

    slides:any[] = [];

    constructor(private route:ActivatedRoute, private router:Router, private slideService:SlideService) {
        ArrayObservable.of(1, 2, 3, 4, 5, 6).subscribe((res) => {
            this.slides.push({
                link: '',
                attachment: null,
                indexNumber: res
            });
        });
    }

    ngOnDestroy() {
    }

    onBack() {
        this.router.navigate(['admin']);
    }

    transferSuccess($event) {
        debugger;
    }

}
