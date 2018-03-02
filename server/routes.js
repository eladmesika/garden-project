/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below
    app.use('/api/elements/e_plants', require('./api/elements/e_plant'));
    app.use('/api/gildas', require('./api/gilda'));
    app.use('/api/families', require('./api/family'));
    app.use('/api/plants', require('./api/plant'));
    app.use('/api/things', require('./api/thing'));

    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
