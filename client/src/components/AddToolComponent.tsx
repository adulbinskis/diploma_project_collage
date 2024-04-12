import React, {FC, useState, useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import './AddToolComponent.css';
import PersonService from "../services/PersonService";
import {PersonModel} from "../models/PersonModel";
import {selectedParams} from "../models/SelectedParams";
import {Context} from "../index";

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    pCode: string;
    inventory: string[];
    setPersons?: React.Dispatch<React.SetStateAction<PersonModel[]>>;
    selected: selectedParams[];
}

const AddToolComponent: FC<Props> = ({ setShowModal, pCode, inventory,setPersons, selected }) => {
    const [checkdFunkcionalaGulta, setCheckdFunkcionalaGulta] = useState(false) ;
    const [checkdKrukiElkonu, setCheckdKrukiElkonu] = useState(false) ;
    const [checkdKrukiPadusu, setCheckdKrukiPadusu] = useState(false) ;
    const [checkdRatinkresls, setCheckdRatinkresls] = useState(false) ;
    const [checkdRolators, setCheckdRolators] = useState(false) ;
    const [checkdStaigulis, setCheckdStaigulis] = useState(false) ;
    const [checkdMazgasanasKresls, setCheckdMazgasanasKresls] = useState(false) ;
    const [checkdPodaPaaugstinajums, setCheckdPodaPaaugstinajums] = useState(false) ;
    const [checkdToletesKresls, setCheckdToletesKresls] = useState(false) ;
    // const {store} = useContext(Context);

    useEffect( () => {
        // Anything in here is fired on component mount.
        for(let i = 0; i < inventory.length; i++) {
            switch (inventory[i]) {
                case 'Funkcionālā gulta':
                    setCheckdFunkcionalaGulta(true)
                    break;
                case 'Kruķi - elkoņu':
                    setCheckdKrukiElkonu(true)
                    break;
                case 'Kruķi - padušu':
                    setCheckdKrukiPadusu(true)
                    break;
                case 'Ratiņkrēsls':
                    setCheckdRatinkresls(true)
                    break;
                case 'Rolators':
                   setCheckdRolators(true)
                    break;
                case 'Staigulis':
                    setCheckdStaigulis(true)
                    break;
                case 'Poda paaugstinājums':
                    setCheckdPodaPaaugstinajums(true)
                    break;
                case 'Mazgāšanas krēsls':
                    setCheckdMazgasanasKresls(true)
                    break;
                case 'Toletes krēsls':
                   setCheckdToletesKresls(true)
                    break;
            }
        }
        return () => {
            async function getPersons(){
                try{
                    const response = await PersonService.fetchPersonsWithParams(selected);
                    if (setPersons) {
                        setPersons(response.data);
                    }
                }catch (e){
                    console.log(e);
                }
            }
            getPersons()
            // Anything in here is fired on component unmount.
        }
    }, [inventory, setPersons, selected]);



     async function handleCheckbox(e: React.ChangeEvent<any>){
        if(e.target.checked){
            await PersonService.createInventory(pCode, e.target.value);
        }else if(!e.target.checked){
            await PersonService.deleteInventory(pCode, e.target.value);
        }
    }

    function onClick(e: React.ChangeEvent<any>){
        switch (e.target.value) {
            case 'Funkcionālā gulta':
                setCheckdFunkcionalaGulta(!checkdFunkcionalaGulta)
                break;
            case 'Kruķi - elkoņu':
                setCheckdKrukiElkonu(!checkdKrukiElkonu)
                break;
            case 'Kruķi - padušu':
                setCheckdKrukiPadusu(!checkdKrukiPadusu)
                break;
            case 'Ratiņkrēsls':
                setCheckdRatinkresls(!checkdRatinkresls)
                break;
            case 'Rolators':
                setCheckdRolators(!checkdRolators)
                break;
            case 'Staigulis':
                setCheckdStaigulis(!checkdStaigulis)
                break;
            case 'Poda paaugstinājums':
                setCheckdPodaPaaugstinajums(!checkdPodaPaaugstinajums)
                break;
            case 'Mazgāšanas krēsls':
                setCheckdMazgasanasKresls(!checkdMazgasanasKresls)
                break;
            case 'Toletes krēsls':
                setCheckdToletesKresls(!checkdToletesKresls)
                break;
        }
    }

    function onSave(){
        let ini = document.querySelector('#tool-window');
        if(ini){
            ini.classList.add("hideModalTool");
        }
        setTimeout(() => {
            setShowModal(false)
        }, 500)
    }


    return(
        <div id='tool-window' className= 'overlay'>

            <div className='tool-unite-container'>
                <div className='tool-unite'>
                    <p className='tool-p'> Funkcionālā gulta </p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Funkcionālā gulta'
                        checked={checkdFunkcionalaGulta}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'> Kruķi - elkoņu </p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Kruķi - elkoņu'
                        checked={checkdKrukiElkonu}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Kruķi - padušu</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Kruķi - padušu'
                        checked={checkdKrukiPadusu}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Ratiņkrēsls</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Ratiņkrēsls'
                        checked={checkdRatinkresls}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Rolators</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Rolators'
                        checked={checkdRolators}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Staigulis</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Staigulis'
                        checked={checkdStaigulis}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Poda paaugstinājums</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Poda paaugstinājums'
                        checked={checkdPodaPaaugstinajums}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Mazgāšanas krēsls</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Mazgāšanas krēsls'
                        checked={checkdMazgasanasKresls}
                        onClick={onClick}
                    />
                </div>

                <div className='tool-unite'>
                    <p className='tool-p'>Toletes krēsls</p>
                    <input
                        className='tool-input'
                        onChange={handleCheckbox}
                        type="checkbox"
                        name= 'inventory'
                        value='Toletes krēsls'
                        checked={checkdToletesKresls}
                        onClick={onClick}
                    />
                </div>
            </div>

            <div className='button-row'>
                <button
                    className='tool-button'
                    onClick={ () => { onSave() } }>
                    Saglabāt
                </button>
            </div>
        </div>
    );
};

export default observer(AddToolComponent);