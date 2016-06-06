import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as runSequence from 'run-sequence';
import * as codeChangeTool from './code_change_tools';

import { APP_SRC, TEMP_FILES } from '../config';

const plugins = <any>gulpLoadPlugins();

export function notifyLiveReload(e:any) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */
export function watch(taskname: string) {
  return function () {
    let paths:string[]=[
      join(APP_SRC,'**')
    ].concat(TEMP_FILES.map((p) => { return '!'+p; }));

    plugins.watch(paths, (e:any) =>
      runSequence(taskname, () => notifyLiveReload(e))
    );
  };
}
