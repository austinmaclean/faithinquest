import { Injectable } from '@angular/core';

@Injectable()

export class Optimizely {

    public activate() {

        let key = AppConfig.optimizelyKey;

        var script:HTMLScriptElement = <HTMLScriptElement>document.getElementById('optimizely-js');

        if (!script) {

            script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'optimizely-js';
            script.async = true;
            var first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(script, first);

            script.src = '//cdn.optimizely.com/js/' + key + '.js';
            script.onload = function (evt) {
                window['optimizely'].push(['activate']);
            };

        } else {
            window['optimizely'].push(['activate']);
        }

    }

}










// script = document.createElement('script');
// script.type = 'text/javascript';
// script.id = 'optimizely-js';
// script.async = true;
// script.src = 'https://cdn.optimizely.com/js/' + key + '.js';
// script.onload = script.onreadystatechange = function () {
//     deferred.resolve($window.optimizely);
// };
// script.onerror = script.onreadystatechange = function (error) {
//     deferred.reject(error);
// };