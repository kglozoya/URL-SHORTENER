import React, { isValidElement, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAxios } from '../services/axios.service';
import ShortenUrl from './ShortenUrl';
import './HomePage.css'
import { useLocalStorage } from '../services/localStorage.service';

export default function HomePage () {
    const [ formData, setFormData ] = useState( {
        longUrl: "",
        id: ""
    } );

    const [ isInvalid, setIsInvalid ] = useState( false );

    const [ shortUrl, setShortUrl ] = useState( "" );

    const [ isUrlVisible, setIsUrlVisible ] = useState( false );

    const [ didUserSumbit, setDidUserSumbit ] = useState( false );

    const navigate = useNavigate();

    var timeoutRef = useRef( null );

    const http = useAxios();

    const ls = useLocalStorage();

    var user = ls.getUser()


    function onInputChanged ( e ) {
        let value = e.target.value;
        let name = e.target.name;
        setFormData( {
            ...formData,
            [ name ]: value,
        } );
    }

    function onHandleSubmit ( e ) {
        e.preventDefault();

        if ( !didUserSumbit ) {
            setDidUserSumbit( true )
        }

        http.createNewRoute( formData.id, formData.longUrl )
            .then( res => {
                console.log( res.data.message )
                setIsUrlVisible( true );
                // alert( res.data.message )
                // display some confirmation... toast?
            } )
            .catch( err => {
                console.log( err )
                console.log( err?.response?.data?.error?.errno )
                let errno = err?.response?.data?.error?.errno
                if ( errno == 1062 ) {
                    setIsInvalid( true )
                }
                //
            } );
    }

    function checkIfIdIsTaken () {
        if ( formData.id == "" ) {
            return
        } else {
            http.getRouteById( formData.id )
                .then( ( data ) => {
                    setIsInvalid( true )
                } )
                .catch( ( err ) => {
                    console.log( err.response.status )
                    let errno = err?.response?.status
                    if ( errno == 404 ) {
                        setIsInvalid( false );
                    }
                } )
        }
    };

    function onLogOutClicked () {
        ls.removeUser(); // better function name... 'logout'?
        navigate( '/user/login' )
    };

    const loginButton = (
        <button onClick={() => {
            navigate( "/user/login" );
        }}>
            Log In
        </button> );

    const logoutButton = (
        <button onClick={onLogOutClicked}>
            Log Out
        </button> );



    useEffect( () => {
        setShortUrl( formData.id )
    } )

    useEffect( () => {
        // debouncing
        // clear a timeout
        clearTimeout( timeoutRef.current );
        // create timeout
        timeoutRef.current = setTimeout( () => {
            checkIfIdIsTaken();
        }, 500 );
        //wait 500 ms then -> checkID

    }, [ formData.id ] );

    return (
        <>
            <nav className='homepage-nav-root'>
                <span>
                Email: {user && (
                    <Link to ={`/user/${user.id}`}>
                        {user.email}
                    </Link>
                )}
                </span>
                {user
                    ? logoutButton
                    : loginButton
                }
                
            </nav>

            <div className='homepage-root'>

                <h1>SHORTEN THAT URL!</h1>

                <form
                    onSubmit={onHandleSubmit}
                    className="url-root"
                >

                    <div className="input-container url-intake">
                        <label htmlFor="url" className={`${( didUserSumbit && formData.longUrl == '' ) ? 'required' : ''}`}>Your URL : </label>
                        <input
                            type="text"
                            name="longUrl"
                            value={formData.longUrl}
                            onChange={onInputChanged}
                            placeholder="http://www.yourlongurl.com"

                            id="url"
                        />
                    </div>

                    <div className={`input-container id-intake ${isInvalid ? 'invalid' : ""}`}>
                        <label htmlFor="idIntake"> Keyword : </label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={onInputChanged}
                            placeholder="catchy keyword"

                            id="idIntake"
                        />
                    </div>

                    <p className={`error-message ${isInvalid ? 'invalid' : ""}`}>-- keyword is unavailable --</p>

                    <div className="submit-button">
                        <button type="submit" >
                            Get My Short URL
                        </button>
                    </div>

                </form>

                {isUrlVisible && <ShortenUrl
                    shortUrl={shortUrl}
                    setIsUrlVisible={setIsUrlVisible}
                    isUrlVisible={isUrlVisible}
                    setFormData={setFormData}
                />}
            </div>
        </>
    );
}
