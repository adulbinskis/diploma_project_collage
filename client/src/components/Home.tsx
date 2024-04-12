import React, {FC} from "react";
import {observer} from "mobx-react-lite";
// import {Context} from "../index";
import './Home.css'
import SimpleImageSlider from "react-simple-image-slider";


const images = [
    { url:  process.env.REACT_APP_HOST_URL+"/sliderImg/homeImg.jpg" },
    { url:  process.env.REACT_APP_HOST_URL+"/sliderImg/homeImg2.jpeg" },
    { url:  process.env.REACT_APP_HOST_URL+"/sliderImg/homeImg3.jpg" }

  ];

const Home: FC = () => {
    return(
        <div>
             <SimpleImageSlider
                width={'100%'}
                height={400}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                slideDuration={1}
                autoPlayDelay={6}
            />
            <div className="title-wraper">
                <h1 className={'h1-title'}> Par mums </h1>
            </div>
            
            <div className='home-container'>
             
                <p className={'aboutUS-text'}>
                   
                    Balvu Teritoriālā invalīdu biedrība ir izveidota un reģistrēta sabiedrisko organizāciju reģistrā 1995.gadā.<br/>
                    2005.gadā biedrībai piešķirts sabiedriskā labuma organizācijas statuss.<br/>
                    Biedrība uz brīvprātības pamatiem apvieno Balvu, Viļakas un Rugāju novadu teritorijā dzīvojošos invalīdus, kā arī veselos cilvēkus, kas nepastarpinātā veidā saistīti ar invalīdiem.<br/>
                    <br/>


                    <b className="b-home-title"> Biedrības mērķi:</b><br/>
                    <>&bull;</> Invalīdu sociālā integrācija ikvienā dzīves sfērā.<br/>
                    <>&bull;</> Sociālās integrācijas programmas ietvaros emocionālā atbalsta došana, zināšanu paplašināšana, kultūras un sporta pasākumu atbalstīšana.<br/>
                    <>&bull;</> Bērnu invalīdu fizisko un garīgo aktivitāšu veicināšana, sadarbojoties ar attiecīgajām organizācijām.<br/>
                    <>&bull;</> Invalīdu nodarbinātības veicināšana profesionālā līmenī.<br/>
                    <>&bull;</> Sadarbības veicināšana ar citām biedrībām, asociācijām, pašvaldībām, valsts struktūrām.<br/>
                    <br/>
                    Invalīdu biedrība ir bezpeļņas organizācija, kuras budžetu sastāda invalīdu iemaksātās biedru naudas, pašvaldību iedalītie līdzekļi un labdaru ziedojumi.
                    Invalīdu biedrībai ir īpašs statuss, kā sabiedriskā labuma organizācijai, kas sniedz labumu un atbalstu tai sabiedrības daļai, kam pāri nodarīts no likteņa puses- cilvēks kļuvis invalīds.
                    Ir reizes, kad invalīdam vajag kādam izstāstīt savas problēmas un sāpes, lūgt morālo atbalstu, aprunāties ar cilvēkiem, kas ir tādā pašā statusā, kādā ir viņš pats. Biedrības biedri var dot padomu, kā risināt sasāpējušo problēmu, kur un pie kā griezties ar padomu.
                    Ņemot vērā biedrības mērķus, tiek plānoti biedrības darbi un darbības virzieni. Biedrībā notiek aktīva sabiedriskā dzīve. Draudzīga sadarbība ir izveidojusies ar Alūksnes un Gulbenes invalīdu biedrībām, ar biedrību „Invalīdu sporta un rehabilitācijas centru ’’Medņeva”.
                    <br/>
                    <br/>
                    Pašreiz biedrībā darbojas vairāki pulciņi: nūjošana, BigGames spēles bērniem un jauniešiem, boccija, ārstnieciskās vingrošanas nodarbības ārā, novuss.<br/>
                    <br/>
                </p>
            </div>
        </div>
    )
}

export default observer(Home);