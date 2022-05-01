import { neru } from 'neru-alpha';
import path from 'path';
import st from 'serve-static';
import { fileURLToPath } from 'url';

import { router as meetingsRouter } from './routes/index.js';

var __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = neru.Router();

/**
 * Frontend resources
 */
router.use('/public/static/', st(path.join(__dirname, './public/static/')));
router.use('/public/manifest.json', st(path.join(__dirname, './public/manifest.json')));
router.get('/public/*', function(req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, './public')});
});
/**
 * APIs
 */
router.use('/meetings', meetingsRouter);

export { router };