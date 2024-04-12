import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import './NavBar.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const NavBar = () => {
    const {store} = useContext(Context);
    // const navbarid = document.getElementById("navbar")

    // var prevScrollpos = window.pageYOffset;
    // window.onscroll = function() {
    //     var currentScrollPos = window.pageYOffset;
    // if (prevScrollpos > currentScrollPos) {
    //     if(navbarid){
    //         navbarid.style.top = "0";
    //     }
        
    // } else {
    //     if(navbarid){
    //         navbarid.style.top = "-50px";
    //     }
        
    // }
    // prevScrollpos = currentScrollPos;
    // }

    return(
        <nav id="navbar" className='navbar-container'>
            {store.isAuth?
                <div  className={'navbar-is-auth'}>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/'}> Par mums </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/news-this-year'}> Aktualitātes </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/projects'}> Projekti </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/archive'}> Pasākumu albums </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/map'}> Kur mūs atrast? </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/create-page'}> Pasākumu izveide </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/database'}> Biedru dati </NavLink>
                    </div>
                   
                </div>:  <div className={'navbar-is-not-auth'}>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/'}> Par mums </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/news-this-year'}> Aktualitātes </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/projects'}> Projekti </NavLink>
                    </div>
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/archive'}> Pasākumu albums </NavLink>
                    </div>
                
                    <div className='navbar-unite'>
                        <NavLink className='navbar-link' to={'/map'}> Kur mūs atrast? </NavLink>
                    </div>
                </div>
            }
        </nav>
    )
}
export default observer(NavBar)