/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below
    app.use('/api/dict/tags', require('./api/dict/tag'));
    app.use('/api/dict/gildas', require('./api/dict/gilda'));
    app.use('/api/dict/families', require('./api/dict/family'));
    app.use('/api/dict/plants', require('./api/dict/plant'));
    app.use('/api/dict/things', require('./api/thing'));

    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
 