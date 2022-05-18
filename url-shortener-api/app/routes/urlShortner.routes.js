// routes defined and connected with defined functions and connected to the app

module.exports = ( app ) => {

    const urls = require( '../controllers/urlShortener.controller' );


    app.get( "/api/urls/:id", urls.getRouteById )
    app.get( "/api/urls", urls.getAllUrls )
    app.post( "/api/newroute", urls.createNewRoute );


}