import './Footer.css'
import React, {FC, useState, useEffect, useContext} from 'react';
import { observer } from 'mobx-react-lite';

const Footer: FC = () =>{
    return(
        <div className='footer-container'> 
            <div className='footer-wraper1'>
                <b className="footer-entity-title"> Kontaktinformācija: </b><br/>
                    Adrese: Brīvības iela 48, Balvi, LV-4501<br/>
                    Tālrunis: 28347903<br/>
                    E-pasts: balvuinvalidi@inbox.lv<br/>
                    Apmeklētāju pieņemšanas laiks: otrdien / ceturtdien  – <br/>
                    iepriekš piesakoties no 9:00 – 14:00
            </div>
            <div className='footer-wraper2'>
            <b className="b-home-title">Biedrības rekvizīti:</b><br/>
                Brīvības iela 48-20, Balvi, Balvu novads, LV-4501, Latvija<br/>
                tālrunis: +371 28347903<br/>
                Reģ.Nr.40008017698<br/>
                A/S Citadele banka<br/>
                Balvu fil. Kods PARXLV22<br/>
                konts LV84PARX0002731540015
            </div>
        </div>
    )
}

export default observer(Footer)