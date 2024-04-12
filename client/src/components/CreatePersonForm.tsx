import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PersonService from "../services/PersonService";
import './CreatePersonForm.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from  "moment";
import Modal from "../modal/Modal";
import AddToolComonent from "./AddToolComponent";
import {PersonModel} from "../models/PersonModel";
import useInput from '../validator/HookValidator'
import useInputSelect from '../validator/HookValidatorSelect'
import {selectedParams} from "../models/SelectedParams";

interface Props{
    setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPersons?: React.Dispatch<React.SetStateAction<PersonModel[]>>;
    selected: selectedParams[];
}


const CreatePersonForm: FC<Props> = ({setShowCreateModal, setPersons, selected}) => {
    const name = useInput('', {isEmpty: true, isName: true})
    const surname = useInput('', {isEmpty: true, isName: true})
    const phone = useInput('', {isEmpty: true, minLength: 8, maxLength: 8, isNumber: true})
    const pCode = useInput('', {isEmpty: true, isPersonCode: true})
    const group = useInput('', {isEmpty: true, maxLength: 1, isGroup: true })
    const parish = useInputSelect('', {isSelected: true})
    const address =useInput('', {isEmpty: true, isAddress: true})
    const [startDate, setStartDate] = useState<any>(new Date())
    const [birthDay, setBirthDay] = useState<any>(new Date())

    const [showModal, setShowModal] = React.useState(false);
    const {store} = useContext(Context);
    const [isSaved, setIsSaved] = React.useState(false);

    async function getPersons(){
        try{
            const response = await PersonService.fetchPersonsWithParams(selected);
            if (setPersons) {
                setPersons(response.data);
            }
            setIsSaved(true);
        }catch (e){
            console.log(e);
        }
    }

    async function onClear(){
        name.onChange('');
        surname.onChange('');
        pCode.onChange('');
        phone.onChange('');
        group.onChange('');
        parish.onChange('');
        address.onChange('');

    }

    async function createPerson(name: string, surname: string, persCode: string, number: string, group: string, parish: string, address: string, date: string, birthDay: string){
        try {
            const month = moment(date).month()+1;
            const birthDayMonth = moment(birthDay).month()+1;
            // console.log(birthDay, ' ', birthDayMonth)
            const response = await PersonService.create(name, surname, persCode, number, group, parish, address, date, month, birthDay, birthDayMonth);
            console.log(response);

        } catch (e) {
            console.log(e);
        }
    }

    function onCloseAnimation(){
        let ini = document.querySelector('#create-window');
        if(ini){
            ini.classList.add("hideModalPerson");
        }
        setTimeout(() => {
            setShowCreateModal(false)
        }, 500)

    }

    return (
        <div id='create-window' className='create-person-block'>
                <div className='edit-label-container'>
                     Izveidot 
                </div>
            {name.isDirty && name.isMessageOpen?
                <div onClick={()=> name.closeErrorMessage()}
                     className='create-Error'>
                    {(name.isEmpty) && <div className='validation-info'>{name.isEmptyMessage} </div>}
                    {(name.isName) && <div className='validation-info'>{name.isNameMessage} </div>}
                </div> : null
            }
            <input
                id='create-name-input'
                className='create-person-input'
                onClick={()=> name.openErrorMessage()}
                onChange={e => name.onChangeInput(e)}
                onBlur={e=> name.onBlur(e)}
                value={name.value}
                type="text"
                placeholder='Vārds'
            />

            {surname.isDirty && surname.isMessageOpen?
                <div  onClick={()=> surname.closeErrorMessage()}
                      className='create-Error'>
                    {(surname.isEmpty) && <div className='validation-info'>{surname.isEmptyMessage} </div>}
                    {(surname.isName) && <div className='validation-info'>{surname.isNameMessage} </div>}
                </div> : null
            }
            <input
                id='create-surname-input'
                className='create-person-input'
                onClick={()=> surname.openErrorMessage()}
                onChange={e => surname.onChangeInput(e)}
                onBlur={e=> surname.onBlur(e)}
                value={surname.value}
                type="text"
                placeholder='Uzvārds'
            />

            {phone.isDirty && phone.isMessageOpen?
                <div  onClick={()=> phone.closeErrorMessage()}
                      className='create-Error'>
                    {(phone.isEmpty) && <div className='validation-info'>{phone.isEmptyMessage} </div>}
                    {(phone.minLengthError) && <div className='validation-info'>{phone.minLengthErrorMessage} </div>}
                    {(phone.maxLengthError) && <div className='validation-info'>{phone.maxLengthErrorMessage} </div>}
                    {(phone.isNumber) && <div className='validation-info'>{phone.isNumberMessage} </div>}
                </div> : null
            }
            <input
                id='create-phone-input'
                className='create-person-input'
                onClick={()=> phone.openErrorMessage()}
                onChange={e => phone.onChangeInput(e)}
                onBlur={e=> phone.onBlur(e)}
                value={phone.value}
                type="text"
                placeholder='Telefons'
            />

            {pCode.isDirty&& pCode.isMessageOpen?
                <div  onClick={()=> pCode.closeErrorMessage()}
                      className='create-Error'>
                    {(pCode.isEmpty) && <div className='validation-info'>{pCode.isEmptyMessage} </div>}
                    {(pCode.isPersonCode) && <div className='validation-info'>{pCode.isPersonCodeMessage} </div>}
                </div> : null
            }
            <input
                id='create-pCode-input'
                className='create-person-input'
                onClick={()=> pCode.openErrorMessage()}
                onChange={e => pCode.onChangeInput(e)}
                onBlur={e=> pCode.onBlur(e)}
                value={pCode.value}
                type="text"
                placeholder='Personas kods'
            />

            {group.isDirty && group.isMessageOpen?
                <div  onClick={()=> group.closeErrorMessage()}
                      className='create-Error'>
                    {(group.isEmpty) && <div  className='validation-info'>{group.isEmptyMessage} </div>}
                    {(group.maxLengthError) && <div className='validation-info'>{group.maxLengthErrorMessage} </div>}
                    {(group.isGroup) && <div className='validation-info'>{group.isGroupMessage} </div>}
                </div> : null
            }
            <input
                id='create-group-input'
                className='create-person-input'
                onClick={()=> group.openErrorMessage()}
                onChange={e => group.onChangeInput(e)}
                onBlur={e=> group.onBlur(e)}
                value={group.value}
                type="number"
                placeholder='Grupa'
            />

            {parish.isDirty && parish.isMessageOpen?
                <div  onClick={()=> parish.closeErrorMessage()}
                      className='create-Error'>
                    {(parish.isSelected) && <div className='validation-info'>{parish.isSelectedMessage} </div>}
                </div> : null
            }
            <select
                value={parish.value}
                id='create-parish-select'
                className='create-person-select'
                onClick={()=> parish.openErrorMessage()}
                onBlur={e => parish.onBlurSelect(e) }
                onChange={ (e)=>{
                parish.onChangeSelect(e);
            }}>
                <option> </option>
                <option value="Balvu pagasts"> Balvu pagasts</option>
                <option value="Bērzkalnes pagasts"> Bērzkalnes pagasts</option>
                <option value="Bērzpils pagasts"> Bērzpils pagasts</option>
                <option value="Briežuciema pagasts"> Briežuciema pagasts</option>
                <option value="Krišjāņu pagasts"> Krišjāņu pagasts</option>
                <option value="Kubulu pagasts"> Kubulu pagasts</option>
                <option value="Kupravas pagasts"> Kupravas pagasts</option>
                <option value="Lazdukalna pagasts"> Lazdukalna pagasts</option>
                <option value="Lazdulejas pagasts"> Lazdulejas pagasts</option>
                <option value="Medņavas pagasts"> Medņavas pagasts</option>
                <option value="Rugaju pagasts"> Rugaju pagasts</option>
                <option value="Susaju pagasts"> Susaju pagasts</option>
                <option value="Šķilbēnu pagasts"> Šķilbēnu pagasts</option>
                <option value="Tilžas pagasts"> Tilžas pagasts</option>
                <option value="Vectilžas pagasts"> Vectilžas pagasts</option>
                <option value="Vīksnas pagasts"> Vīksnas pagasts</option>
                <option value="Vecumu pagasts"> Vecumu pagasts</option>
                <option value="Žīguru pagasts"> Žīguru pagasts</option>
                <option value="Viļakas pilsēta"> Viļakas pilsēta</option>
                <option value="Balvu pilsēta"> Balvu pilsēta</option>
            </select>

            {address.isDirty && address.isMessageOpen?
                <div  onClick={()=> address.closeErrorMessage()}
                      className='create-Error'>
                    {(address.isEmpty) && <div className='validation-info'>{address.isEmptyMessage} </div>}
                    {(address.isAddress) && <div className='validation-info'>{address.isAddressMessage} </div>}
                </div> : null
            }
            <input
                id='create-address-input'
                className='create-person-input'
                onClick={()=> address.openErrorMessage()}
                onChange={e => address.onChangeInput(e)}
                onBlur={e=> address.onBlur(e)}
                value={address.value}
                type="text"
                placeholder='Adrese'
            />

            <DatePicker
                className='create-person-input'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
            />

            <input
                className='create-person-input'
                onChange={(date) => setBirthDay(new Date(date.target.value))}
                type="date"
            />

            <div className='createP-button-container'>
                {store.isAuth ?
                    <button
                        disabled={!name.inputValid || !surname.inputValid || !phone.inputValid || !pCode.inputValid || !group.inputValid || !parish.selectValid || !address.inputValid}
                        className='create-person-button'
                        onClick={() => createPerson(name.value, surname.value, pCode.value, phone.value, group.value, parish.value, address.value, startDate, birthDay).then(()=> getPersons())}>
                        Saglabāt
                    </button>: null
                }

                <button
                    className='create-person-button'
                    onClick={() => { onClear().then( ()=>setIsSaved(false)) }}>
                    Notīrīt
                </button>

                <button
                    className='create-person-button'
                    onClick={()=>(onCloseAnimation())

                    }>
                    Aizvērt
                </button>

                {isSaved ?
                    <button
                        className='create-person-button'
                        onClick={ ()=> (setShowModal(true))}>
                        Inventārs
                    </button> : null
                }
            </div>

            <Modal modalOpen={showModal}>
                <AddToolComonent setShowModal={setShowModal} pCode={pCode.value} inventory={[]} setPersons={setPersons} selected={selected}/>
            </Modal>
        </div>

    );
};

export default observer(CreatePersonForm);