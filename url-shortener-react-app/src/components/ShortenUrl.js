import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAxios } from '../services/axios.service';
import './ShortenUrl.css'

export default function ShortenUrl ( { shortUrl, setIsUrlVisible, setFormData } ) {

    function onHandleClicked () {
        setIsUrlVisible( false );
        setFormData( {
            longUrl: "",
            id: ""
        } )
    };

    return (
        <div className='confirmation-dialog-root background'>
            <div className='dialog'>

                <h2>Your New URL</h2>
                <h4>Copy short URL to send to friends!</h4>
                <div className='short-url'>
                    localhost:3000/{shortUrl}
                </div>
                <br />
                <Link to={shortUrl} className="link" >
                    Navigate to Your Website
                </Link>
                <div>
                    {/* copy to clipboard button/functionality */}
                    <button onClick={onHandleClicked}>Close</button>
                </div>
            </div>
        </div>
    )
}
