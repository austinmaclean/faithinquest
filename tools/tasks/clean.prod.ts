import { join } from 'path';
import { PROJECT_ROOT, PROD_DEST, TMP_DIR } from '../config';
import { clean } from '../utils';

/**
 * Executes the build process, cleaning all files within the `/dist/dev` and `dist/tmp` directory.
 */
export = clean([
    join(PROJECT_ROOT,PROD_DEST,'assets'),
    join(PROJECT_ROOT,PROD_DEST,'css'),
    join(PROJECT_ROOT,PROD_DEST,'fonts'),
    join(PROJECT_ROOT,PROD_DEST,'js'),

    join(PROJECT_ROOT,TMP_DIR)
]);
