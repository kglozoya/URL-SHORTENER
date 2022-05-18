const db = require('../index');

// bunch of function defined and exported
// function MUST send response to client, and they MUST NOT send more than one.

exports.getRouteById = ( req, res ) => {
    let id = req.params.id;

    const query = `
        SELECT id, url
        FROM urls.urls
        WHERE id = ?;`

    const placeholders = [ id ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was a server error',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No url found at that route',
                    error: err
                } )
        } else {
            console.log(results)
            res.send( {
                url: results[0]
            } );
        }
    } );
}

exports.getAllUrls = ( req, res ) => {

    const query = `
        SELECT * FROM urls.urls;`

    db.query( query, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was a server error',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No urls',
                    error: err
                } )
        } else {
            console.log(results)
            res.send( {
                urls: results
            } );
        }
    } );
}

exports.createNewRoute = ( req, res ) => {
    console.log( req.body );
    let { id, url } = req.body;
    // if the title, author or coverImage was not defined --> error
    if ( !id || !url ) {
        res.status( 400 ).send( {
            message: "id and url required.",
            error: err
        } );
        return
    }
    const query = `
                INSERT INTO urls.urls (id, url) 
                VALUES 
                (?, ?);
        `;
    const placeholders = [ id, url ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was an error creating a short url',
                    error: err
                } );
        } else {
            console.log( results[0] );

            res.send( {
                message: 'Your URL was successfully shortened! 😃'
            } );
        }
    } );
}
