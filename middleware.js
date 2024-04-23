const express = require( 'express' );
const app = express();
const helmet = require( 'helmet' );
const morgan = require( 'morgan' );
const timeout = require( 'connect-timeout' );
app.use(helmet());
app.use(morgan( 'tiny' ));
app.use(timeout( '5s' ));
// An empty endpoint to try things out. This won t respond!
app.get( '/' , (req, res) => {});
app.listen(3000, () => {"Listening on 3000."});