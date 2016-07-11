import {join} from 'path';
import {argv} from 'yargs';

import {Environments, InjectableDependency} from './project.config.interfaces.ts';

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const ENVIRONMENTS: Environments = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod'
};

/**
 * This class represents the basic configuration of the seed.
 * It provides the following:
 * - Constants for directories, ports, versions etc.
 * - Injectable NPM dependencies
 * - Injectable application assets
 * - Temporary editor files to be ignored by the watcher and asset builder
 * - SystemJS configuration
 * - Autoprefixer configuration
 * - BrowserSync configuration
 * - Utilities
 */
export class ProjectConfig {

    /**
     * The port where the application will run.
     * The default port is `5555`, which can be overriden by the  `--port` flag when running `npm start`.
     * @type {number}
     */
    PORT = argv['port'] || 5555;

    /**
     * The root folder of the project (up two levels from the current directory).
     */
    PROJECT_ROOT = join(__dirname, '../..');

    /**
     * The current environment.
     * The default environment is `dev`, which can be overriden by the `--config-env ENV_NAME` flag when running `npm start`.
     */
    ENV = getEnvironment();

    /**
     * The path for the base of the application at runtime.
     * The default path is `/`, which can be overriden by the `--base` flag when running `npm start`.
     * @type {string}
     */
    APP_BASE = argv['base'] || '/';

    /**
     * The flag for the hot-loader option of the application.
     * Per default the option is not set, but can be set by the `--hot-loader` flag when running `npm start`.
     * @type {boolean}
     */
    ENABLE_HOT_LOADING = argv['hot-loader'];

    /**
     * The port where the application will run, if the `hot-loader` option mode is used.
     * The default hot-loader port is `5578`.
     * @type {number}
     */
    HOT_LOADER_PORT = 5578;

    /**
     * The directory where the bootstrap file is located.
     * The default directory is `app`.
     * @type {string}
     */
    BOOTSTRAP_DIR = 'app';

    /**
     * The directory where the client files are located.
     * The default directory is `client`.
     * @type {string}
     */
    APP_CLIENT = argv['client'] || 'client';

    /**
     * The bootstrap file to be used to boot the application. The file to be used is dependent if the hot-loader option is
     * used or not.
     * Per default (non hot-loader mode) the `main.ts` file will be used, with the hot-loader option enabled, the
     * `hot_loader_main.ts` file will be used.
     * @type {string}
     */
    BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main');

    /**
     * The base folder of the applications source files.
     * @type {string}
     */
    APP_SRC = `src/main/${this.APP_CLIENT}`;

    /**
     * The folder of the applications asset files.
     * @type {string}
     */
    ASSETS_SRC = `${this.APP_SRC}/assets`;

    /**
     * The folder of the applications css files.
     * @type {string}
     */
    CSS_SRC = `${this.APP_SRC}/css`;

    /**
     * The directory of the applications tools
     * @type {string}
     */
    TOOLS_DIR = 'tools';

    /**
     * The directory of the tasks
     */
    TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks');

    /**
     * The base folder for built files.
     * @type {string}
     */
    DIST_DIR = 'src/main';

    /**
     * The folder for built files in the `dev` environment.
     * @type {string}
     */
    DEV_DEST = `${this.DIST_DIR}/webapp`;

    /**
     * The folder for the built files in the `prod` environment.
     * @type {string}
     */
    PROD_DEST = `${this.DIST_DIR}/webapp`;

    /**
     * The folder for temporary files.
     * @type {string}
     */
    TMP_DIR = `${this.DIST_DIR}/tmp`;

    /**
     * The folder for the built files, corresponding to the current environment.
     * @type {string}
     */
    APP_DEST = this.ENV === ENVIRONMENTS.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;

    /**
     * The folder for the built CSS files.
     * @type {strings}
     */
    CSS_DEST = `${this.APP_DEST}/css`;

    /**
     * The folder for the built JavaScript files.
     * @type {string}
     */
    JS_DEST = `${this.APP_DEST}/js`;

    /**
     * The folder for the built Fonts files.
     * @type {string}
     */
    FONTS_DEST = `${this.APP_DEST}/fonts`;

    /**
     * The version of the application as defined in the `package.json`.
     */
    VERSION = appVersion();

    /**
     * The name of the bundle file to includes all CSS files.
     * @type {string}
     */
    CSS_PROD_BUNDLE = 'main.css';

    /**
     * The name of the bundle file to include all JavaScript shims.
     * @type {string}
     */
    JS_PROD_SHIMS_BUNDLE = 'shims.js';

    /**
     * The name of the bundle file to include all JavaScript application files.
     * @type {string}
     */
    JS_PROD_APP_BUNDLE = 'app.js';

    /**
     * The required NPM version to run the application.
     * @type {string}
     */
    VERSION_NPM = '2.15.5';

    /**
     * The required NodeJS version to run the application.
     * @type {string}
     */
    VERSION_NODE = '4.4.5';

    /**
     * The ruleset to be used by `codelyzer` for linting the TypeScript files.
     */
    CODELYZER_RULES = customRules();

    /**
     * The flag to enable handling of SCSS files
     * The default value is false. Override with the '--scss' flag.
     * @type {boolean}
     */
    ENABLE_SCSS = argv['scss'] || true;


    FONTS_SRC = [
        'node_modules/bootstrap-sass/assets/fonts/**',
        'node_modules/font-awesome/fonts/**'
    ];

    /**
     * The list of NPM dependcies to be injected in the `index.html`.
     * @type {InjectableDependency[]}
     */

    NPM_DEPENDENCIES:InjectableDependency[] = [
        {src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT},
        {src: 'zone.js/dist/zone.js', inject: 'libs'},
        {src: 'core-js/client/shim.min.js', inject: 'shims'},
        {src: 'systemjs/dist/system.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT},
        {src: 'rxjs/bundles/Rx.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT},

        {src: 'bootstrap-sass/assets/javascripts/bootstrap.min.js', inject: 'libs'},
        {src: 'jquery/dist/jquery.min.js', inject: 'shims'}
    ];

    /**
     * The list of local files to be injected in the `index.html`.
     * @type {InjectableDependency[]}
     */
    APP_ASSETS: InjectableDependency[] = [
        { src: `${this.CSS_SRC}/main.${ this.getInjectableStyleExtension() }`, inject: true, vendor: false },
    ];

    /**
     * The list of editor temporary files to ignore in watcher and asset builder.
     * @type {string[]}
     */
    TEMP_FILES: string[] = [
        '**/*___jb_tmp___',
        '**/*~',
    ];

    /**
     * Returns the array of injectable dependencies (npm dependencies and assets).
     * @return {InjectableDependency[]} The array of npm dependencies and assets.
     */
    get DEPENDENCIES():InjectableDependency[] {
        return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
            .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
    }

    /**
     * The system builder configuration of the application.
     * @type {any}
     */
    SYSTEM_BUILDER_CONFIG:any = {
        defaultJSExtensions: true,
        packageConfigPaths: [
            join(this.PROJECT_ROOT, 'node_modules', '*', 'package.json'),
            join(this.PROJECT_ROOT, 'node_modules', '@angular', '*', 'package.json')
        ],
        paths: {
            [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
            '*': 'node_modules/*'
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
    };

    SYSTEM_BUILDER_CONFIG_DEV:any = {
        defaultJSExtensions: true,
        packageConfigPaths: [
            join( this.PROJECT_ROOT, 'node_modules', '*', 'package.json' ),
            join( this.PROJECT_ROOT, 'node_modules', '@angular', '*', 'package.json' )
        ],
        paths: {
            [`${this.DEV_DEST}/app/*`]: `${this.DEV_DEST}/app/*`,
            '*': 'node_modules/*'
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
    };

    /**
     * The Autoprefixer configuration for the application.
     * @type {Array}
     */
    BROWSER_LIST = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    /**
     * Configurations for NPM module configurations. Add to or override in project.config.ts.
     * If you like, use the mergeObject() method to assist with this.
     */
    PLUGIN_CONFIGS: any = {
        /**
         * The BrowserSync configuration of the application.
         * The default open behavior is to open the browser. To prevent the browser from opening use the `--b`  flag when
         * running `npm start` (tested with serve.dev).
         * Example: `npm start -- --b`
         * @type {any}
         */
        'browser-sync': {
            middleware: [require('connect-history-api-fallback')({ index: `${this.APP_BASE}index.html` })],
            port: this.PORT,
            startPath: this.APP_BASE,
            open: argv['b'] ? false : true,
            injectChanges: false,
            server: {
                baseDir: `${this.DIST_DIR}/empty/`,
                routes: {
                    [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
                    [`${this.APP_BASE}node_modules`]: 'node_modules',
                    [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
                }
            }
        },
        // Note: you can customize the location of the file
        'environment-config': require('../env/config.json')
    };

    /**
     * Recursively merge source onto target.
     * @param {any} target The target object (to receive values from source)
     * @param {any} source The source object (to be merged onto target)
     */
    mergeObject(target: any, source: any) {
        const deepExtend = require('deep-extend');
        deepExtend(target, source);
    }

    /**
     * Locate a plugin configuration object by plugin key.
     * @param {any} pluginKey The object key to look up in PLUGIN_CONFIGS.
     */
    getPluginConfig(pluginKey: string): any {
        if (this.PLUGIN_CONFIGS[ pluginKey ]) {
            return this.PLUGIN_CONFIGS[pluginKey];
        }
        return null;
    }

    getInjectableStyleExtension() {
        return this.ENV === ENVIRONMENTS.PRODUCTION && this.ENABLE_SCSS ? 'scss' : 'css';
    }

}

/**
 * Normalizes the given `deps` to skip globs.
 * @param {InjectableDependency[]} deps - The dependencies to be normalized.
 */
export function normalizeDependencies(deps: InjectableDependency[]) {
    deps
        .filter((d: InjectableDependency) => !/\*/.test(d.src)) // Skip globs
        .forEach((d: InjectableDependency) => d.src = require.resolve(d.src));
    return deps;
}

/**
 * Returns if the given dependency is used in the given environment.
 * @param  {string}               env - The environment to be filtered for.
 * @param  {InjectableDependency} d   - The dependency to check.
 * @return {boolean}                    `true` if the dependency is used in this environment, `false` otherwise.
 */
function filterDependency(env: string, d: InjectableDependency): boolean {
    if (!d.env) {
        d.env = Object.keys(ENVIRONMENTS).map(k => ENVIRONMENTS[k]);
    }
    if (!(d.env instanceof Array)) {
        (<any>d).env = [d.env];
    }
    return d.env.indexOf(env) >= 0;
}

/**
 * Returns the applications version as defined in the `package.json`.
 * @return {number} The applications version.
 */
function appVersion(): number | string {
    var pkg = require('../../package.json');
    return pkg.version;
}

/**
 * Returns the linting configuration to be used for `codelyzer`.
 * @return {string[]} The list of linting rules.
 */
function customRules(): string[] {
    var lintConf = require('../../tslint.json');
    return lintConf.rulesDirectory;
}

/**
 * Returns the environment of the application.
 */
function getEnvironment() {
    let base: string[] = argv['_'];
    let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
    let env = (argv['env'] || '').toLowerCase();
    if ((base && prodKeyword) || env === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    } else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}
