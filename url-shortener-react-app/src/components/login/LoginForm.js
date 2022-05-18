import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../services/axios.service";
import { useLocalStorage } from "../../services/localStorage.service";
import './LoginForm.css';


export default function LoginForm () {
  const [ formData, setFormData ] = useState( {
    email: "",
    password: "",
  } );

  const [ isLoading, setIsLoading ] = useState( false );

  const http = useAxios();
  const localStorageService = useLocalStorage();
  const navigate = useNavigate();

  function onInputChanged ( e ) {
    let value = e.target.value;
    let name = e.target.name;

    setFormData( {
      ...formData,
      [ name ]: value,
    } );
  }

  function attemptLogIn () {

    http.login( formData )
      .then( ( results ) => {
        console.log( results );
        // success!
        // 'save' the user into local storage
        let user = results.data.user;
        localStorageService.saveUser( user );
        // nav to homepage
        navigate( '/' );
      } ).catch( ( error ) => {
        console.log( error )
        let errno = error.response.status
        if ( errno == 400 ) {

        }
        setIsLoading( false )
      } );
  }

  function handleFormSubmit ( e ) {
    e.preventDefault();

    setIsLoading( true )

    setTimeout( () => {
      attemptLogIn();
    }, 1000 );

  }


  return (
    <div className="login-form-root" >
      <form onSubmit={handleFormSubmit}>

        <div  >
          <div className="form-input">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChanged}
              placeholder="user@domain.com"
              id="email"
              title="email"
              required
            />
          </div>
          <div className="form-input" >
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onInputChanged}
              placeholder="password"
              id="password"
              title="password"
              required
            />
          </div>

          <button type="submit" disabled={!formData.email}>
            {isLoading
              ? <div className="loader"></div>
              : 'Log In'
            }
          </button>

        </div>

      </form>
    </div>
  );
}
