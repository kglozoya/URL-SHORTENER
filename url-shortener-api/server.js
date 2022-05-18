// fancy way to import stuff
const express = require( "express" );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
// require('dotenv').config();


const app = express();
var corsOptions = {
    orgin: '*'
};

app.use( cors( corsOptions ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

require( './app/index' );
require( './app/routes/urlShortner.routes' )( app );
require( './app/routes/users.routes' )( app );


const PORT = process.env.PORT || 8080
app.listen( 8080, () => {
    console.log(`Server is running on port ${PORT}`);
} )