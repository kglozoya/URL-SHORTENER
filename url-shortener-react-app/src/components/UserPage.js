import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../services/axios.service';
import { useLocalStorage } from '../services/localStorage.service'
import './UserPage.css'

export default function UserPage () {

    const ls = useLocalStorage();
    const user = ls.getUser();
    const { userId } = useParams();
    const navigate = useNavigate();
    const http = useAxios();

    const [ allUrls, setAllUrls ] = useState( [] );

    function loadUrls () {
        http.getAllUrls()
            .then( ( results ) => {
                console.log( results )
                setAllUrls( results.data.urls )
            } )
            .catch( () => {

            } )
    }

    useEffect( () => {
        if ( user && user?.id == userId ) {
            // logged in an viewing their own webpage
            loadUrls();
        } else {
            // not logged in or trying to look at another users page

            // navigate( '/' );
        }

    }, [] )


    return (
        <div className='user-page-root'>
            {allUrls.map( url => (
                <div>
                    <span>{url.id}</span>
                    <Link to={`/user/${url.url}`}>
                        {url.url}
                    </Link>
                </div>
            ) )}
        </div>
    )
}
