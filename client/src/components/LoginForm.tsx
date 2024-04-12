import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './LoginForm.css';
import useInput from '../validator/HookValidator'

const LoginForm: FC = () => {
    const {store} = useContext(Context);
    const [isOpen, setIsOpen] = useState(false)
    const email = useInput('', {isEmpty: true, minLength: 4, isEmail: true})  //, maxLength: 12
    const password = useInput('', {isEmpty: true, minLength: 4, maxLength: 20})

    return (
        <div>
            {isOpen ?
                <div className='login-form'>
                    {email.isDirty && email.isMessageOpen?
                        <div onClick={()=> email.closeErrorMessage()}
                             className='login-Error-email'>
                            {(email.isEmpty) && <div className='validation-info'>{email.isEmptyMessage} </div>}
                            {(email.minLengthError) && <div className='validation-info'>{email.minLengthErrorMessage}</div>}
                            {(email.emailError) && <div className='validation-info'>{email.emailErrorMessage}</div>}
                        </div> : null
                    }
                    <input
                        id='login-email-input'
                        className='auth-input'
                        onClick={()=> email.openErrorMessage()}
                        onChange={(e)=>{email.onChangeInput(e)}}
                        onBlur={(e)=>{email.onBlur(e)}}
                        value={email.value}
                        type="text"
                        placeholder='Ievadiet e-pastu...'
                    />

                    {password.isDirty && password.isMessageOpen?
                        <div onClick={()=> password.closeErrorMessage()}
                             className='login-Error-password'>
                            {(password.isEmpty) && <div className='validation-info'>{password.isEmptyMessage} </div>}
                            {(password.minLengthError) && <div className='validation-info'>{password.minLengthErrorMessage} </div>}
                            {(password.maxLengthError) && <div className='validation-info'>{password.maxLengthErrorMessage} </div>}
                        </div> : null
                    }
                    <input
                        id='login-password-input'
                        className='auth-input'
                        onClick={()=> password.openErrorMessage()}
                        onChange={(e) => {password.onChangeInput(e)}}
                        onBlur={(e)=> {password.onBlur(e)}}
                        value={password.value}
                        type="password"
                        placeholder='Ievadiet paroli...'
                    />

                    <div className='login-button-container'>
                        {!store.isAuth ?
                            <button
                                className='auth-button'
                                onClick={() => store.login(email.value, password.value)}
                                disabled={!email.inputValid || !password.inputValid}
                            >
                                Ieiet
                            </button>: null
                        }

                        {store.isAuth ?
                            <button
                                className='auth-button-logout'
                                onClick={() => store.logout()}>
                                Iziet
                            </button> :null
                        }

                        {store.user.isActivated ?
                            <button
                                className='auth-button'
                                onClick={() => store.registration(email.value, password.value)}
                                disabled={!store.user.isActivated || !email.inputValid || !password.inputValid}
                            >
                                Reģistrēt
                            </button> : null
                        }

                        <button className='close-login-btn' onClick={()=>setIsOpen(false)} >
                            X
                        </button>


                    </div>
                </div> : <div className='openLogin' onClick={()=> setIsOpen(true)}> </div>
            }
        </div>
    )
};

export default observer(LoginForm);