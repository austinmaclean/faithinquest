import { join } from 'path';

import * as gulp from 'gulp';
import * as Builder from 'systemjs-builder';

import {
    BOOTSTRAP_MODULE,
    SYSTEM_BUILDER_CONFIG_DEV,
    DEV_DEST,
    PROJECT_ROOT,
    JS_DEST
} from '../config';

const BUNDLER_OPTIONS = {
    minify: false,
    mangle: false,
    globalDefs: {
        DEBUG: false
    }
};

/**
 * Executes the build process, bundlig the JavaScript files using the SystemJS builder.
 */
export = (done:any) => {
    let builder = new Builder(SYSTEM_BUILDER_CONFIG_DEV);
    builder
        .buildStatic(`${DEV_DEST}/${BOOTSTRAP_MODULE}`, null, BUNDLER_OPTIONS)
        .then((output) => {
            let paths:string[] = output.modules;
            paths = paths
                .filter(d => !d.startsWith(DEV_DEST))
                .map(d => join(PROJECT_ROOT, 'node_modules', d));

            //console.log(paths);

            gulp.src(paths, {base: './node_modules'})
                .pipe(gulp.dest(JS_DEST));

            done();
        })
        .catch(err => done(err));
};
