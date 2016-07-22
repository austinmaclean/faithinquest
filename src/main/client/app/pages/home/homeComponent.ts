import {Component, ViewChild, OnInit} from '@angular/core';

import {FooterComponent,} from '../../shared/footer/footer.component';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';
import {TagsService} from "../../shared/service/tags.service";

@Component({
    moduleId: module.id,
    selector: 'ti-home',
    templateUrl: 'homeComponent.html',
    styleUrls: ['homeComponent.css'],
    providers: [TagsService],
    directives: [<any>StudyListComponent, <any>FooterComponent]
})
export class HomeComponent implements OnInit{

    pattern:string = null;

    trends:Array<any> = [];

    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;

    constructor(private tagsService:TagsService) {
    }

    convert(item) {
        return {text: item.id, weight: item.amount};
    }

    ngOnInit() {
        this.tagsService.get(10).subscribe(res => {
            this.trends = res.result.map(this.convert);
        });
    }

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        setTimeout(() => {
            this.pattern = outString;
        });
    }

    onTrendSearch(trend:any) {
        this.pattern = trend.text;
        this.onSearch();
    }

}
