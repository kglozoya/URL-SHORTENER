
module.exports = ( app ) => {

    const users = require( '../controllers/users.contoller' );


    app.post( "/api/users", users.creatNewUser )
    app.post( "/api/users/login", users.login );
    app.delete( "/api/users/:id", users.deleteUserById );

}