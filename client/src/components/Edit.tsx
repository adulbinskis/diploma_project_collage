 import React, {FC, useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PersonService from "../services/PersonService";
import './CreatePersonForm.css';
import DatePicker from "react-datepicker";
import './Edit.css';
import {PersonModel} from "../models/PersonModel";
import useInput from '../validator/HookValidator'
import useInputSelect from '../validator/HookValidatorSelect'
import {selectedParams} from "../models/SelectedParams";

import moment from "moment";



type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    surname: string;
    phone: string;
    pCode: string;
    group: number;
    parish:string;
    address: string;
    date: string;
    birthDay: string;
    setPersons: React.Dispatch<React.SetStateAction<PersonModel[]>>;
    selected: selectedParams[];
}

const EditPersonForm: FC<Props> = ({setShowModal, name,surname,pCode, phone,group,parish,address ,date, birthDay, setPersons , selected}) => {
    useEffect(() => {
        return () => {
            // console.log(birthDay)
            async function getPersons(){
                try{
                    const response = await PersonService.fetchPersonsWithParams(selected);
                    setPersons(response.data);
                }catch (e){
                    console.log(e);
                }
            }
            getPersons()
        }
    }, [setPersons, selected])

    const newName = useInput(name,{isEmpty: true, isName: true})
    const newSurname = useInput(surname,{isEmpty: true, isName: true})
    const newPersCode = useInput(pCode,{isEmpty: true, isPersonCode: true})
    const newPhone = useInput(phone,{isEmpty: true, minLength: 8, maxLength: 8, isNumber: true})
    const newGroup = useInput(group,{isEmpty: true, maxLength: 1, isGroup: true })
    const newParish = useInputSelect(parish,{isSelected: true})
    const newAddress = useInput(address,{isEmpty: true, isAddress: true})
    const [newStartDate, setNewStartDate] = useState<any>(new Date(date))
    const [newBirthDay, setNewBirthDay] = useState<any>(new Date(birthDay))
    const {store} = useContext(Context);
    const [persCode] = useState<string>(pCode)


    async function editPerson(){
        try {
            // const b = moment(birthDay).format("YYYY-MM-DD")
            // console.log(b)
            const response = await PersonService.editPerson(
                newName.value,
                newSurname.value,
                newPersCode.value,
                persCode,
                newPhone.value,
                newGroup.value,
                newParish.value,
                newAddress.value,
                newStartDate,
                newBirthDay,
            );
        } catch (e) {
            console.log(e);
        }
    }
    function onCloseAnimation(){
        let ini = document.querySelector('#edit-window');
        if(ini){
            ini.classList.add("hideModal");
        }
        setTimeout(() => {
            setShowModal(false)
        }, 500)

    }

    return (
            <div id='edit-window' className='edit-block'>
                <div className='edit-label-container'>
                     Labot 
                </div>
                {newPersCode.isDirty && newPersCode.isMessageOpen?
                    <div onClick={()=> newPersCode.closeErrorMessage()}
                         className='edit-Error'>
                        {(newPersCode.isEmpty) && <div className='validation-info'>{newPersCode.isEmptyMessage} </div>}
                        {(newPersCode.isPersonCode) && <div className='validation-info'>{newPersCode.isPersonCodeMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-pCode-input'
                    className='edit-input'
                    onClick={()=> newPersCode.openErrorMessage()}
                    onChange={e => newPersCode.onChangeInput(e)}
                    onBlur={e=> newPersCode.onBlur(e)}
                    value={newPersCode.value}
                    type="text"
                    placeholder={pCode}
                />

                {newName.isDirty && newName.isMessageOpen?
                    <div onClick={()=> newName.closeErrorMessage()}
                         className='edit-Error'>
                        {(newName.isEmpty) && <div className='validation-info'>{newName.isEmptyMessage} </div>}
                        {(newName.isName) && <div className='validation-info'>{newName.isNameMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-name-input'
                    className='edit-input'
                    onClick={()=> newName.openErrorMessage()}
                    onChange={e => newName.onChangeInput(e)}
                    onBlur={e=> newName.onBlur(e)}
                    value={newName.value}
                    type="text"
                    placeholder='Name'
                />

                {newSurname.isDirty && newSurname.isMessageOpen?
                    <div onClick={newSurname.closeErrorMessage}
                         className='edit-Error'>
                        {(newSurname.isEmpty) && <div className='validation-info'>{newSurname.isEmptyMessage} </div>}
                        {(newSurname.isName) && <div className='validation-info'>{newSurname.isNameMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-surname-input'
                    className='edit-input'
                    onClick={()=> newSurname.openErrorMessage()}
                    onChange={e => newSurname.onChangeInput(e)}
                    onBlur={e=> newSurname.onBlur(e)}
                    value={newSurname.value}
                    type="text"
                    placeholder='Surname'
                />

                {newPhone.isDirty && newPhone.isMessageOpen?
                    <div onClick={()=> newPhone.closeErrorMessage()}
                         className='edit-Error'>
                        {(newPhone.isEmpty) && <div className='validation-info'>{newPhone.isEmptyMessage} </div>}
                        {(newPhone.minLengthError) && <div className='validation-info'>{newPhone.minLengthErrorMessage} </div>}
                        {(newPhone.maxLengthError) && <div className='validation-info'>{newPhone.maxLengthErrorMessage} </div>}
                        {(newPhone.isNumber) && <div className='validation-info'>{newPhone.isNumberMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-phone-input'
                    className='edit-input'
                    onClick={()=> newPhone.openErrorMessage()}
                    onChange={e => newPhone.onChangeInput(e)}
                    onBlur={e=> newPhone.onBlur(e)}
                    value={newPhone.value}
                    type="text"
                    placeholder='Phone Nr.'
                />

                {newGroup.isDirty && newGroup.isMessageOpen?
                    <div onClick={()=> newGroup.closeErrorMessage()}
                         className='edit-Error'>
                        {(newGroup.isEmpty) && <div className='validation-info'>{newGroup.isEmptyMessage} </div>}
                        {(newGroup.maxLengthError) && <div className='validation-info'>{newGroup.maxLengthErrorMessage} </div>}
                        {(newGroup.isGroup) && <div className='validation-info'>{newGroup.isGroupMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-group-input'
                    className='edit-input'
                    onClick={()=> newGroup.openErrorMessage()}
                    onChange={e => newGroup.onChangeInput(e)}
                    onBlur={e=> newGroup.onBlur(e)}
                    value={newGroup.value}
                    type="number"
                    placeholder='Group'
                />

                {newParish.isDirty && newParish.isMessageOpen?
                    <div onClick={()=> newParish.closeErrorMessage()}
                         className='edit-Error'>
                        {(newParish.isSelected) && <div className='validation-info'>{newParish.isSelectedMessage} </div>}
                    </div> : null
                }
                <select
                    value={newParish.value}
                    id='edit-parish-select'
                    className='edit-person-select'
                    onClick={()=> newParish.openErrorMessage()}
                    onBlur={e => newParish.onBlurSelect(e) }
                    onChange={ (e)=>{
                        newParish.onChangeSelect(e)}}
                        >
                    <option > </option>
                    <option value="Balvu pagasts"> Balvu pagasts</option>
                    <option value="Bērzkalnes pagasts"> Bērzkalnes pagasts</option>
                    <option value="Bērzpils pagasts"> Bērzpils pagasts</option>
                    <option value="Briežuciema pagasts"> Briežuciema pagasts</option>
                    <option value="Krišjāņu pagasts"> Krišjāņu pagasts</option>
                    <option value="Kubulu pagasts"> Kubulu pagasts</option>
                    <option value="Kupravas pagasts"> Kupravas pagasts</option>
                    <option value="Lazdukalna pagasts"> Lazdukalna pagasts</option>
                    <option value="Lazdulejas pagasts"> Lazdulejas pagasts</option>
                    <option value="Medņevas pagasts"> Medņevas pagasts</option>
                    <option value="Rugāju pagasts"> Rugāju pagasts</option>
                    <option value="Susāju pagasts"> Susāju pagasts</option>
                    <option value="Šķilbēnu pagasts"> Šķilbēnu pagasts</option>
                    <option value="Tilžas pagasts"> Tilžas pagasts</option>
                    <option value="Vectilžas pagasts"> Vectilžas pagasts</option>
                    <option value="Vīksnas pagasts"> Vīksnas pagasts</option>
                    <option value="Vecumu pagasts"> Vecumu pagasts</option>
                    <option value="Žīguru pagasts"> Žīguru pagasts</option>
                    <option value="Viļakas pilsēta"> Viļakas pilsēta</option>
                    <option value="Balvu pilsēta"> Balvu pilsēta</option>
                </select>

                {newAddress.isDirty && newAddress.isMessageOpen?
                    <div onClick={()=> newAddress.closeErrorMessage()}
                         className='edit-Error'>
                        {(newAddress.isEmpty) && <div className='validation-info'>{newAddress.isEmptyMessage} </div>}
                        {(newAddress.isAddress) && <div className='validation-info'>{newAddress.isAddressMessage} </div>}
                    </div> : null
                }
                <input
                    id='edit-address-input'
                    className='edit-input'
                    onClick={()=> newAddress.openErrorMessage()}
                    onChange={e => newAddress.onChangeInput(e)}
                    onBlur={e=> newAddress.onBlur(e)}
                    value={newAddress.value}
                    type="text"
                    placeholder='Adress'
                />
                <DatePicker
                    className='edit-input'
                    selected={newStartDate}
                    onChange={(dattee) => setNewStartDate(dattee)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    showTwoColumnMonthYearPicker
                />

                <input
                    className='create-person-input'
                    // defaultValue={moment(newBirthDay).format("YYYY-MM-DD")}
                    value={moment(newBirthDay).format("YYYY-MM-DD")}
                    onChange={(e) => setNewBirthDay(new Date(e.target.value))}
                    type="date"
                />

                <div className='edit-button-container'>
                    {store.isAuth ?
                        <button
                            disabled={!newName.inputValid || !newSurname.inputValid || !newPhone.inputValid || !newPersCode.inputValid || !newGroup.inputValid || !newParish.selectValid || !newAddress.inputValid}
                            id='button'
                            className='edit-button'
                            onClick={ () => { editPerson().then(onCloseAnimation);
                                } 
                            }>
                                Saglabāt
                        </button> : null
                    }
                    <button
                        className='edit-button'
                        onClick={()=>{onCloseAnimation(); }

                        }>
                        Aizvērt
                    </button>
                </div>
            </div>

    );
};

export default observer(EditPersonForm);