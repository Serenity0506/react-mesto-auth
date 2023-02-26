import React, { useRef } from 'react';
import ApiAuth from '../../utils/ApiAuth';


export const Login = ({ onLogin }) => {
    const emailRef = useRef()
    const pwdRef = useRef()
    
    function handleLogin() {
        const email = emailRef.current.value
        const pwd = pwdRef.current.value

        ApiAuth.signIn(email, pwd)
        .then(data => {
            console.log(data)
            onLogin({
                isOk: true,
                email, 
                token: data.token
            })
        })
        .catch(error => {
            onLogin({
                isOk: false,
                error
            })
        })
    }

    return (
        <>
            <div className="sign__container">
                <h1 className="sign__header">Вход</h1>
                <input 
                    className="sign__input" 
                    placeholder="Email"
                    type='email'
                    required
                    ref={emailRef}
                    ></input>
                <input
                    className="sign__input" 
                    placeholder="Пароль"
                    type='password'
                    required
                    ref={pwdRef}
                    ></input>
                <button 
                    className="sign__button"
                    onClick={handleLogin}
                >Войти</button>
            </div>
        </>
    )
}