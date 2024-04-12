import React, {FC, useState, useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import PersonService from "../services/PersonService";
import {PersonModel} from "../models/PersonModel";
import moment from "moment";
import Modal from "../modal/Modal";
import EditContentForm from "./Edit";
import AddToolComponent from "./AddToolComponent";
import './DataList.css';
import CreatePersonForm from "./CreatePersonForm";
import {Context} from "../index";
import {selectedParams} from '../models/SelectedParams'
import ToPrint from "./ToPrint";
import AuthComponent from "../components/AuthComponent";




const DataList: FC = () => {
    const {store} = useContext(Context);

    const [persons, setPersons] = useState<PersonModel[]>([]);

    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showToolModal, setShowToolModal] = React.useState(false);
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [showPrintModal, setShowPrintModal] = React.useState(false);

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [pCode, setPersonalCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [group, setGroup] = useState<number>(0);
    const [parish, setParish] = useState('');
    const [address, setAddress] = useState<string>('');
    const [startDate, setStartDate] = useState<any>(new Date());
    const [birthDay, setBirthDay] = useState<any>(new Date())

    const [inventory, setInventory] = useState<string[]>([])

    const [selected, setSelected] = useState<selectedParams[]>([
        { id: 0,name: "Group", value: null , active: false },
        { id: 1,name: "Parish", value: null, active: false},
        { id: 2,name: "Date", value: null, active: false },
        { id: 3,name: "Tool", value: null, active: false },
        { id: 4,name: "BirthDayMonth", value: null, active: false }
    ])

    useEffect(() => {
        async function getPersonsOnMount(){
            try{
                const response = await PersonService.fetchPersonsWithParams(selected);
                // console.log(response)
                setPersons(response.data);
            }catch (e){
                console.log(e);
            }
        }
        getPersonsOnMount()

    }, [setPersons, selected])

    async function getPersons(): Promise<void>{
        try{
            const response = await PersonService.fetchPersonsWithParams(selected);
            // console.log(response)
            setPersons(response.data);
        }catch (e){
            console.log(e);
        }
    }

    async function onSelect(e: React.ChangeEvent<HTMLSelectElement>, id: number) : Promise<void>{
        try{
            if(e.target.selectedIndex === 0){
                let newArr = [...selected]
                newArr[id].active = false
                newArr[id].value = null
                setSelected(newArr)

            }else{
                let newArr = [...selected]
                newArr[id].active = true
                id === 0 ? newArr[id].value = e.target.selectedIndex :
                    id === 1 ? newArr[id].value = e.target.value :
                        id === 2 ? newArr[id].value = e.target.selectedIndex :
                            id === 3 ? newArr[id].value = e.target.value :
                                id === 4 ? newArr[id].value = e.target.selectedIndex :
                                
                                setSelected(newArr)
                                console.log(newArr)
            }
            
            await getPersons()
        }catch (e){
            console.log(e);
        }

    }


    async function deletePersons(pCode: string){
        try{
            console.log(pCode)
            await PersonService.deletePerson(pCode);
            const response = await PersonService.fetchPersonsWithParams(selected);
            setPersons(response.data);
        }catch (e){
            console.log(e);
        }
    }

    async function setOnEdit(name: string, surname: string, pCode: string, phone: string, group: number, parish: string, address: string, date: string, birthDay: string){
        try{
            setName(name);
            setSurname(surname);
            setPersonalCode(pCode);
            setPhone(phone);
            setGroup(group);
            setParish(parish);
            setAddress(address);
            setStartDate(date);
            setBirthDay(birthDay)
        }catch (e){
            console.log(e);
        }
    }

    async function setOnAddTool(pCode: string, inventory: []){
        try{
            setPersonalCode(pCode);
            setInventory(inventory)
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className='list'>
            <AuthComponent/>
            {store.isAuth ?
                <div className='list-table-div'>
                    <div>
                        <input
                            className='list-search'
                            onChange={async (e)=> {
                                const response = await PersonService.fetchPersonsSearch(e.target.value);
                                setPersons(response.data);
                            }}
                            placeholder={'Meklēt'}>
                        </input>
                        <button 
                            className='list-create'
                            disabled={!store.user.isActivated}
                            onClick={()=>(setShowCreateModal(true))}>
                            Izveidot
                        </button>
                        <button className='list-create' onClick={()=>setShowPrintModal(true)}> Printēt </button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Vārds</th>
                            <th>Uzvārds</th>
                            <th>Telefons</th>
                            <th>Personas kods</th>
                            <th>Grupa <br/>
                                <select
                                    className='list-select'
                                    onChange={ async (e)=>{
                                        await onSelect(e, 0)

                                    }}
                                >
                                    <option value={'0'}> Nn</option>
                                    <option value={'1'}> 1</option>
                                    <option value={'2'}> 2</option>
                                    <option value={'3'}> 3</option>
                                    <option value={'b/i'}> b/i</option>
                                </select>
                            </th>
                            <th>Novads <br/>
                                <select
                                    className='list-select'
                                    onChange={ async (e)=>{
                                        await onSelect(e, 1)
                                    }}
                                >
                                    <option value="0"> Nn</option>
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
                            </th>
                            <th>Adrese</th>
                            <th>Iest. dat. <br/>
                                <select
                                    className='list-select'
                                    onChange={ async (e)=>{
                                        await onSelect(e, 2)
                                    }}>
                                    <option value="0"> Nn</option>
                                    <option value="val1"> January</option>
                                    <option value="val2"> February</option>
                                    <option value="val3"> March</option>
                                    <option value="val4"> April</option>
                                    <option value="val5"> May</option>
                                    <option value="val6"> June</option>
                                    <option value="val7"> July</option>
                                    <option value="val8"> August</option>
                                    <option value="val9"> September</option>
                                    <option value="val10" >October</option>
                                    <option value="val10" >November</option>
                                    <option value="val11" >December</option>
                                </select>
                            </th>
                            <th>Inventārs <br/>
                                <select
                                    className='list-select'
                                    onChange={async (e) => {
                                        await onSelect(e, 3)
                                    }}
                                >
                                    <option value="0"> Nn</option>
                                    <option value="Funkcionālā gulta"> Funkcionālā gulta</option>
                                    <option value="Kruķi - elkoņu"> Kruķi - elkoņu</option>
                                    <option value="Kruķi - padušu"> Kruķi - padušu</option>
                                    <option value="Ratiņkrēsls"> Ratiņkrēsls</option>
                                    <option value="Rolators"> Rolators</option>
                                    <option value="Staigulis"> Staigulis</option>
                                    <option value="Poda paaugstinājums"> Poda paaugstinājums</option>
                                    <option value="Mazgāšanas krēsls"> Mazgāšanas krēsls</option>
                                    <option value="Toletes krēsls"> Toletes krēsls</option>
                                </select>
                            </th>
                            <th>Dzimšanas diena<br/>
                            <select
                                    className='list-select'
                                    onChange={ async (e)=>{
                                        await onSelect(e, 4)
                                    }}>
                                    <option value="0"> Nn</option>
                                    <option value="val1"> January</option>
                                    <option value="val2"> February</option>
                                    <option value="val3"> March</option>
                                    <option value="val4"> April</option>
                                    <option value="val5"> May</option>
                                    <option value="val6"> June</option>
                                    <option value="val7"> July</option>
                                    <option value="val8"> August</option>
                                    <option value="val9"> September</option>
                                    <option value="val10" >October</option>
                                    <option value="val10" >November</option>
                                    <option value="val11" >December</option>
                                </select>
                            </th>
                            <th>\(=_=)/</th>
                        </tr>
                        </thead>

                        <tbody>
                        {persons.map(person=>
                            <tr key={person.pCode}>
                                <td onClick={() => { setOnEdit(person.name, person.surname, person.pCode, person.phone, person.group, person.parish, person.address, person.date, person.birthDay).then(() =>
                                    store.user.isActivated ? setShowEditModal(true): null) }}>
                                    {person.name}</td>
                                <td>{person.surname}</td>
                                <td>{person.phone}</td>
                                <td>{person.pCode}</td>
                                <td>{person.group}</td>
                                <td>{person.parish}</td>
                                <td>{person.address}</td>
                                <td>
                                    { moment(person.date).format('MMM') }
                                    {/* { moment(person.date).month()+1 } */}
                                    {' / '}
                                    { moment(person.date).year() }
                                </td>
                                <td
                                    onClick={() => { setOnAddTool(person.pCode, person.inventory).then( ()=>
                                        store.user.isActivated ? setShowToolModal(true): null) }}
                                >
                                    {person.inventory.map(inventory =>
                                        <div key={inventory}>
                                            {inventory}
                                        </div>)}
                                </td>
                                <td> 
                                    { moment(person.birthDay).format('MMM') }
                                    {' / '}
                                    {/* { moment(person.birthDay).day() }
                                    {' / '} */}
                                    { person.birthDay.slice(8,10)}
                                    {' / '}
                                    { moment(person.birthDay).year() }

                                </td>
                                <td className='list-td-delete' >
                                    {<button 
                                        className='list-button-delete'
                                        onClick={() => 
                                            {
                                                // if (window.confirm('Jus tiešām vēlaties izdzēst šo ierakstu?')) 
                                                deletePersons(person.pCode)
                                            }
                                        }
                                        disabled={!store.user.isActivated}
                                        > Izdzēst 
                                    </button>
                                    }
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </table>

                    <Modal modalOpen={showPrintModal}>
                        <ToPrint setShowModal={setShowPrintModal} persons={persons}/>
                    </Modal>
                    <Modal modalOpen={showEditModal}>
                        <EditContentForm 
                         setShowModal={setShowEditModal}
                         name={name} 
                         surname={surname} 
                         pCode={pCode} 
                         phone={phone} 
                         group={group} 
                         address={address} 
                         parish={parish} 
                         date={startDate} 
                         birthDay={birthDay} 
                         setPersons={setPersons} 
                         selected={selected} />
                    </Modal>
                    <Modal modalOpen={showToolModal}>
                        <AddToolComponent setShowModal={setShowToolModal} pCode={pCode} inventory={inventory} setPersons={setPersons} selected={selected}/>
                    </Modal>
                    <Modal modalOpen={showCreateModal}>
                        <CreatePersonForm  setShowCreateModal={setShowCreateModal} setPersons={setPersons} selected={selected}/>
                    </Modal>
                </div>: null
            }
        </div>
    );
};


export default observer(DataList);