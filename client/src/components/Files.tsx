import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import './Files.css'
import FileService from '../services/FileManagementService'

const Files: FC =()=> {
    const [document, setDocument] = useState<File>();
    const [filename, setFilename] = useState<string>('');

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);

    function handleSaveDocLocal(e:  React.ChangeEvent<HTMLInputElement>){
        let file = (e.target as HTMLInputElement).files
        if (file && file.length > 0)
            setDocument(file[0])
    }


    async function handleSaveToServer(){
        const data = new FormData()
   
        if(document)
        data.append('document', document)

        const response = await FileService.saveFile(filename, year, data)

        console.log(response)
    }

    function changeYear(e: React.ChangeEvent<HTMLInputElement>){
        const newYear = e.target.value
        setYear(Number(newYear))
    }

    function changeFilename(e: React.ChangeEvent<HTMLInputElement>){
        setFilename(e.target.value)
    }
    

    return (
        <div className='file-management-container'>
            <div className='file-upload-container'>
                <div className='file-upload-input-container'>
                    <div className='upload-input'>
                        <h2> Ievadiet gadu </h2> 
                        <input onChange={(e)=>changeYear(e)} value={year} type={'number'}/>
                    </div>
                    <div className='upload-input'>
                        <h2> Ievadiet nosaukumu</h2>
                        <input onChange={(e)=>changeFilename(e)} value={filename}/>
                    </div>
                </div>
                <input className='archive-upload-input' type='file' onChange={e =>  handleSaveDocLocal(e)} accept='.xls,.xlsx,.docx,.doc'/>
                <button className='archive-button' onClick={async ()=> await handleSaveToServer()}> saglabāt </button>
            </div>
         </div>
    );
}

export default observer(Files)