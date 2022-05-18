import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAxios } from '../services/axios.service'

export default function UrlNavigator () {

  const http = useAxios();
  const { routeId } = useParams(); // why did I have to change from 'id' to 'routeid' ??


  function navigate () {

    http.getRouteById( routeId ) // when it was just 'id' it was undefined
      .then( ( response ) => {
        console.log( response )
        const destination = response.data?.url?.url
        if ( destination ) {
          window.location.href = destination
        }

        //     let newUrl = "http://www.google.com";
        //     window.location.href = newUrl
      } )
  }


  useEffect( () => {
    navigate();
  }, [] );

  return (
    <div>Loading </div>
  )
}
