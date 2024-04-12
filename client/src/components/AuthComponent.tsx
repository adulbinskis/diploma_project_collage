import React, {FC, useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './AuthComponent.css';

const AuthComponent: FC = () => {
    const {store} = useContext(Context);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [store])


    return (
        <div className='info-center'>
            <h1>{store.isAuth ? `Lietotājs autorizējies ${store.user.email}` : 'Lietotājs nav autorizējies'}</h1>
            {store.isAuth ?
                <h1>{store.user.isActivated ? 'Lietotājs apstiprināts caur epastu' : 'Austipriniet lietotāju!!!!'}</h1> : null
            }
        </div>
    );
};

export default observer(AuthComponent );