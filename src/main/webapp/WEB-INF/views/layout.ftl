<#import "/spring.ftl" as spring/>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="${baseUrl}/">

    <link rel="shortcut icon" href="<@spring.url "/assets/img/faviconfi.png"/>" type="image/x-icon"/>
    <title>FaithInquest</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="FaithInquest">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">

<#if buildEnv?? && buildEnv == 'prod'>
<#--PROD-->
    <link rel="stylesheet" href="css/main.css">
<#--end-->
<#else >
<#--DEV-->
    <link rel="stylesheet" href="css/main.css">
<#--end-->
</#if>

    <script type="application/javascript">
        window.AppConfig = {
            appPath: "<@spring.url "/"/>",
            baseUrl: "${baseUrl}/",
            addThisKey: "${addThisKey}"
        };
    </script>
</head>
<body>

<#--<script>-->
    <#--(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){-->
                <#--(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),-->
            <#--m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)-->
    <#--})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');-->

    <#--ga('create', 'UA-80431868-1', 'auto'); // 'none' while you are working on localhost-->
    <#--ga('send', 'pageview'); // this is already done by Angulartics (Now Angulartics disabled)-->
<#--</script>-->

<ti-app>
    <div class="loader"></div>
</ti-app>

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
        defaultJSExtensions: true,
        paths: {
            "app/main": "app/main",
            "app/*": "app/*",
            "*": "js/*"
        },
        packages: {
            '@angular/common': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/compiler': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/forms': {
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
            'rxjs': {
                defaultExtension: 'js'
            },
            'angulartics2': {
                main: 'index.js',
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
    System.import('app/main').catch(function (e) {
        console.error(e, 'Error');
    });
</script>
<#--end-->
</#if>

<#include "version.ftl">
</body>
</html>
