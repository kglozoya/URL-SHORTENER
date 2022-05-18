const axios = require( 'axios' );
const URL = `http://localhost:8080/api`


/**
 * 
 * @param {string} id 
 * @returns an HTTP promise
 */
function getRouteById ( id ) {
    return axios.get( `${URL}/urls/${id}` )

}

function getAllUrls (  ) {
    return axios.get( `${URL}/urls` )
}

function createNewRoute ( id, url ) {
    // post(url: string, body: object)
    console.log( id )
    return axios.post( `${URL}/newroute`, { id, url } );  // do I need to make id/url one object?? -> yes!
}

function login ( { email, password } ) {
    let body = { email, password };
    console.log(body);
    return axios.post( `${URL}/users/login`, body );

}

const api = {
    getRouteById,
    getAllUrls,
    createNewRoute,
    login
}

function useAxios () {
    return api;
}

export { useAxios };