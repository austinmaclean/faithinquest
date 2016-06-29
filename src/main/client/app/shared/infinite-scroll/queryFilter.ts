import {Router, RouteParams, Instruction} from "@angular/router-deprecated";

export class QueryFilter {

    public filter:any;

    constructor(private filterConfig:any, private routeParams:RouteParams, private router:Router) {
        this.filter = filterConfig;

        this.setFilterDataFromUrl();
    }

    isFilterChanged(syncOldValues):boolean {
        let result:boolean = false;
        for (var filterItemKey in this.filter) {
            let filterItem = this.filter[filterItemKey];
            if (filterItem.value != filterItem.oldValue) {
                result = true;
                if (syncOldValues) {
                    filterItem.oldValue = filterItem.value;
                } else {
                    break;
                }
            }
        }
        return result;
    }

    setFilterDataFromUrl():void {
        for (var filterItemKey in this.filter) {
            let filterItem = this.filter[filterItemKey];
            let routeItemValue = this.routeParams.params[filterItemKey];
            if (routeItemValue != null && routeItemValue.length > 0) {
                filterItem.value = filterItem.oldValue = decodeURIComponent(routeItemValue);
            }
        }
    }

    updateUrlByFilterData():void {
        let current:Instruction = this.router.parent.currentInstruction;
        current.urlParams.splice(0);
        for (var filterItemKey in this.filter) {
            let filterItem = this.filter[filterItemKey];
            if (filterItem.value != null && filterItem.value.length > 0) {
                current.urlParams.push(filterItemKey + '=' + encodeURIComponent(filterItem.value));
            }
        }
        this.router.parent.navigateByInstruction(current, false);
    }

    makeFilterRequest():any {
        let data = {};
        for (var filterItemKey in this.filter) {
            let filterItem = this.filter[filterItemKey];
            if (filterItem.value != null && filterItem.value.length > 0) {
                data[filterItemKey] = filterItem.value;
            }
        }
        return data;
    }

}