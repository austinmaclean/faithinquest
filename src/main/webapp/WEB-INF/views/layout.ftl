<#import "/spring.ftl" as spring/>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>FaithInquest</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

<#if buildEnv?? && buildEnv == 'prod'>
<#--PROD-->
    <link rel="stylesheet" href="css/main.css">
<#--end-->
<#else >
<#--DEV-->
    <#--<link rel="stylesheet" href="css/font-awesome.min.css">-->
    <#--<link rel="stylesheet" href="css/bootstrap.min.css">-->
    <link rel="stylesheet" href="css/main.css">
<#--end-->
</#if>

    <script type="application/javascript">
        window.appConfig = {
            appPath: "<@spring.url "/"/>",
            baseUrl: "${baseUrl}/"
        };
    </script>
</head>
<body>

<sd-app>Loading...</sd-app>

<script>
    // function.name (all IE)
    // Remove once https://github.com/angular/angular/issues/6501 is fixed.
    /*! @source http://stackoverflow.com/questions/6903762/function-name-not-supported-in-ie*/
    if (!Object.hasOwnProperty('name')) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                var matches = this.toString().match(/^\s*function\s*((?![0-9])[a-zA-Z0-9_$]*)\s*\(/);
                var name = matches && matches.length > 1 ? matches[1] : "";
                // For better performance only parse once, and then cache the
                // result through a new accessor for repeated access.
                Object.defineProperty(this, 'name', {value: name});
                return name;
            }
        });
    }
</script>

<script>
    // Fixes undefined module function in SystemJS bundle
    function module() {
    }
</script>

<#--YOUTUBE API-->
<script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>

<#if buildEnv?? && buildEnv == 'prod'>
<#--PROD-->
<script src="js/shims.js"></script>
<script src="js/app.js"></script>
<#--end-->
<#else >
<#--DEV-->
<script src="js/systemjs/dist/system-polyfills.src.js"></script>
<script src="js/core-js/client/shim.min.js"></script>
<script src="js/systemjs/dist/system.src.js"></script>
<script src="js/jquery/dist/jquery.min.js"></script>

<script>
    System.config({
        "defaultJSExtensions": true,
        "paths": {
            "app/main": "app/main",
            "app/*": "app/*",
            "*": "js/*"
        },
        "packages": {
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/compiler': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/common': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/http': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser-dynamic': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/router': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/router-deprecated': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/upgrade': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            }
        },
        map: {
            'moment': 'moment/moment'
        }
    });
</script>

<script src="js/zone.js/dist/zone.js"></script>
<script src="js/rxjs/bundles/Rx.js"></script>
<script src="js/bootstrap-sass/assets/javascripts/bootstrap.min.js"></script>

<script>
    System.import('app/main')
            .catch(function (e) {
                console.error(e, 'Error');
            });
</script>
<#--end-->
</#if>

<#include "version.ftl">
</body>
</html>
