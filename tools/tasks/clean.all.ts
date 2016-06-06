import { DEV_DEST, PROD_DEST, TMP_DIR } from '../config';
import { clean } from '../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean([
    `${DEV_DEST}/app`,
    `${DEV_DEST}/assets`,
    `${DEV_DEST}/css`,
    `${DEV_DEST}/fonts`,
    `${DEV_DEST}/js`,

    `${PROD_DEST}/assets`,
    `${PROD_DEST}/css`,
    `${PROD_DEST}/fonts`,
    `${PROD_DEST}/js`,

    TMP_DIR
]);
