import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

import {TASKS_DIR} from './tools/config';
import {loadTasks} from './tools/utils';

loadTasks(TASKS_DIR);

// --------------
// Build dev.
gulp.task('build.dev', (done:any) =>
    runSequence('clean.dev',
        //'tslint',
        //'css-lint',
        'build.assets.dev',
        'build.fonts',
        'build.html_css',
        'build.js.dev',
        'build.bundles.dev',
        'build.bundles.app.dev',
        done));

// --------------
// Build dev watch handler.
gulp.task('build.dev.watch.handler', (done:any) =>
    runSequence(//'tslint',
        //'css-lint',
        'build.assets.dev',
        'build.fonts',
        'build.html_css',
        'build.js.dev',
        'build.bundles.app.dev',
        done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done:any) =>
    runSequence('build.dev',
        'watch.dev',
        done));

// --------------
// Build prod.
gulp.task('build.prod', (done:any) =>
    runSequence('clean.prod',
        'tslint',
        'css-lint',
        'build.assets.prod',
        'build.fonts',
        'build.html_css',
        'copy.js.prod',
        'build.js.prod',
        'build.bundles.prod',
        'build.bundles.app.prod',
        done));

// --------------
// Build tools.
gulp.task('build.tools', (done:any) =>
    runSequence('clean.tools',
        'build.js.tools',
        done));

// --------------
// Clean All in Dest.
gulp.task('clean.all.dest', (done:any) =>
    runSequence('clean.all',
        done));