import React, {FC,  useRef} from "react";
import moment from "moment";
import {PersonModel} from "../models/PersonModel";
import { useReactToPrint } from 'react-to-print';
import './ToPrint.css';


interface Props{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    persons: PersonModel[];
}

const ToPrint: FC<Props> =({ setShowModal,persons})=>{

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <div className='print-back'>
            <div className='print-container'>
                <button className='print-button' onClick={handlePrint}>Printēt!</button>
                <button className='print-close-button' onClick={()=>setShowModal(false)}>Aizvērt!</button>
                <div ref={componentRef} >
                    <table>
                        <thead>
                        <tr>
                            <th className='print-th' >Vārds</th>
                            <th className='print-th'>Uzvārds</th>
                            <th className='print-th'>Telefons</th>
                            <th className='print-th'>Personas kods</th>
                            <th className='print-th'>Grupa</th>
                            <th className='print-th'>Novads</th>
                            <th className='print-th'>Adrese</th>
                            <th className='print-th'>Iest. dat.</th>
                            <th className='print-th'>Inventārs</th>
                        </tr>
                        </thead>

                        <tbody>
                        {persons.map(person=>
                            <tr key={person.pCode}>
                                <td>{person.name}</td>
                                <td>{person.surname}</td>
                                <td>{person.phone}</td>
                                <td>{person.pCode}</td>
                                <td>{person.group}</td>
                                <td>{person.parish}</td>
                                <td>{person.address}</td>
                                <td>
                                    { moment(person.date).format('MMM ') }
                                    { moment(person.date).month()+1 }
                                    {' / '}
                                    { moment(person.date).year() }
                                </td>
                                <td>
                                    {person.inventory.map(inventory =>
                                        <div key={inventory}>
                                            {inventory}
                                        </div>)}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ToPrint