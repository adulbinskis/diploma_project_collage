import "./Header.css"
import React, {FC, useState, useEffect, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import NvaBar from "../navbar/NvaBar";

const Header: FC = () =>{
    return(
        <div>
            <div className='header-container'> 
                <img className="header-image" src="../logo2transp2.png" alt="titupoj"/>
                <div className='header-wraper1'>
                    <h1 className={'home-main-title'}> Balvu Teritoriālā invalīdu biedrība </h1> 
                </div>
            </div>
            <div className='header-container2'> 
            <div className='header-wraper'>
                    <NvaBar/>
               
                </div>
            </div>
        </div>
        
    )
}

export default observer(Header)