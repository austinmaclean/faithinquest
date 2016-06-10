import { join } from 'path';
import {PROJECT_ROOT, DEV_DEST, TMP_DIR} from '../config';
import {clean} from '../utils';

/**
 * Executes the build process, cleaning all files within the `/dist/dev` directory.
 */
export = clean([
    join(PROJECT_ROOT,DEV_DEST,'app'),
    join(PROJECT_ROOT,DEV_DEST,'assets'),
    join(PROJECT_ROOT,DEV_DEST,'css'),
    join(PROJECT_ROOT,DEV_DEST,'fonts'),
    join(PROJECT_ROOT,DEV_DEST,'js'),

    join(PROJECT_ROOT,TMP_DIR)
]);
