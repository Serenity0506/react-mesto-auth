import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import ApiAuth from '../../utils/ApiAuth';

export const Register = ({ onRegister }) => {
    const emailRef = useRef()
    const pwdRef = useRef()

    function handleRegister() {
        ApiAuth.signUp(emailRef.current.value, pwdRef.current.value)
        .then(data => {
            console.log(data)
            onRegister({
                isOk: true,
            })
        })
        .catch(error => {
            onRegister({
                isOk: false,
                error
            })
        })
    }

    return (
        <>
        <div className='sign__container'>
            <h1 className='sign__header'>Регистрация</h1>
            <input 
                className='sign__input' 
                placeholder='Email'
                type='email'
                required
                ref={emailRef}
            ></input>
            <input
                className='sign__input' 
                placeholder='Пароль'
                type='password'
                required
                ref={pwdRef}
                ></input>
            <button 
                className='sign__button'
                onClick={() => handleRegister()}
            >Зарегистрироваться</button>
            <NavLink to='/sign-in' className='sign__button-subtitle'>
                <span>Уже зарегистрированы? Войти</span>
            </NavLink>
        </div>
        </>
    )
}
