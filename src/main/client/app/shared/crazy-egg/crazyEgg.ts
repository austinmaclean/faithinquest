import { Injectable } from '@angular/core';

@Injectable()

export class CrazyEgg {

    inputVanue:string;

    public fire() {

        let key = AppConfig.crazyEggKey;

        /** create new script **/
        key = key + '';
        var scriptPath = key.substr(0, 4) + '/' + key.substr(4, 4);

        var script:HTMLScriptElement = <HTMLScriptElement>document.getElementById('crazyegg-js');
        if (script) {
            script.parentNode.removeChild(script);
        }

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'crazyegg-js';
        script.async = true;
        var first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);

        // script.src = 'https://script.crazyegg.com/pages/scripts/' + scriptPath + '.js?' + (new Date().getTime());
        script.src = 'https://script.crazyegg.com/pages/scripts/' + scriptPath + '.js';
        script.onload = function (evt) {
        };

    }
}