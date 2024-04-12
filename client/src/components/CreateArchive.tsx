import React, {FC, useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import useInput from "../validator/HookValidator";
import './CreateArchive.css'
import ArchiveService from "../services/ArchiveService";
import ProjectService from "../services/ProjectService";
import {Context} from "../index";
import AuthComponent from "./AuthComponent";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG","JPG", "PNG"];

const CreateArchive: FC =()=>{
    const {store} = useContext(Context);
    const [text, setText]= useState('')

    const title = useInput('',{isEmpty:true, maxLength: 64, minLength: 10})
    const year = useInput(2021,{isEmpty:true, isYear: true, maxLength: 4,minLength: 4})
    const author = useInput('',{isEmpty:true,maxLength: 35})
    const [isActual, setIsActual] = useState<boolean>(false)
    const [isProject, setIsProject] = useState<boolean>(false)

    const [file, setFile] = useState<File[]>([]);
    const handleChange = (file: any) => {
      setFile(file);
    };

    async function handleSave(){
        const data = new FormData()
        for (var i = 0; i < file.length; i++) {
            data.append('images', file[i])

        }
        // clearImageStorage()
        if(!isProject){
            const response = await ArchiveService.createArchive(year.value, title.value, author.value, text, isActual)
            console.log(response)
            await ArchiveService.saveImage(data, year.value, title.value)
        }else{
            const response = await ProjectService.createProject(year.value, title.value, author.value, text, isActual)
            console.log(response)
            await ProjectService.saveImage(data, year.value, title.value)
        }
        

    }

    // function clearImageStorage(){
    //     setFile([])
    // }

    // function handleSaveImg(e:  React.ChangeEvent<HTMLInputElement>){
    //     let files = (e.target as HTMLInputElement).files
    //     if (files && files.length > 0)
    //     setImages([...file, files[0]])
    // }


    return(
        <div className='createArchive-container'>
            {store.isAuth ?
                <div>
                    <h1> Izveidot pasākumu </h1>
                    <br/>

                    <h2> ievadiet virsrakstu:</h2>
                    {title.isDirty && title.isMessageOpen?
                        <div
                            onClick={()=> title.closeErrorMessage()}
                            className='create-archive-title-Error'>
                            {(title.isEmpty) && <div className='validation-info'>{title.isEmptyMessage} </div>}
                            {(title.maxLengthError) && <div className='validation-info'>{title.maxLengthErrorMessage} </div>}
                            {(title.minLengthError) && <div className='validation-info'>{title.minLengthErrorMessage} </div>}
                        </div> : null
                    }
                    <input
                        id='create-archive-title-input-id'
                        className='create-archive-title-input'
                        onChange={e=> title.onChangeInput(e)}
                        onClick={()=> title.openErrorMessage()}
                        onBlur={e=> title.onBlur(e)}
                        type="string"
                        value={title.value} 
                        placeholder={'virsraksts'}
                    />
                    <br/> <br/>

                    <h2> ievadiet gadu:</h2>
                    {year.isDirty && year.isMessageOpen?
                        <div
                            onClick={()=> year.closeErrorMessage()}
                            className='create-archive-Error'>
                            {(year.isEmpty) && <div className='validation-info'>{year.isEmptyMessage} </div>}
                            {(year.maxLengthError) && <div className='validation-info'>{year.maxLengthErrorMessage} </div>}
                            {(year.minLengthError) && <div className='validation-info'>{year.minLengthErrorMessage} </div>}
                            {(year.isYear) && <div className='validation-info'>{year.isYearMessage} </div>}
                        </div> : null
                    }
                    <input
                        id='create-archive-year-input-id'
                        className='createP-input'
                        onChange={e=> year.onChangeInput(e)}
                        onClick={()=> year.openErrorMessage()}
                        onBlur={e=> year.onBlur(e)}
                        type="number"
                        value={year.value}
                        placeholder={'gads'}
                    />
                    <br/> <br/>

                    <h2> ievadiet tekstu:</h2>
                    <textarea
                        id='createP-text-input'
                        className='createP-textarea'
                        onChange={e => setText(e.target.value)}
                        value={text}
                    />

                    <h2> ievadiet autoru:</h2>
                    {author.isDirty && author.isMessageOpen?
                        <div
                            onClick={ author.closeErrorMessage}
                            className='create-archive-Error'>
                            {(author.isEmpty) && <div className='validation-info'>{author.isEmptyMessage} </div>}
                            {(author.maxLengthError) && <div className='validation-info'>{author.maxLengthErrorMessage} </div>}
                        </div> : null
                    }
                    <input
                        id='create-archive-author-input-id'
                        className='createP-input'
                        onChange={e=> author.onChangeInput(e)}
                        onClick={()=> author.openErrorMessage()}
                        onBlur={e=> author.onBlur(e)}
                        type="string"
                        value={author.value}
                        placeholder={'autors'}
                    />

                    <h2> pievienojiet bildes:</h2>
                       <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={true} label={'Iemetiet attēlus šeit'} />
                    <br/><br/>

                    <h3> Pievienot pie aktualitātēm?</h3>
                    <input
                        type="checkbox"
                        onClick={()=>setIsActual(!isActual)}
                    />
                    <h3> Projekts?</h3>
                    <input
                        type="checkbox"
                        onClick={()=>setIsProject(!isProject)} 
                    />

                    <br/><br/>
                    <button
                        className={'createArchive-save-button'}
                        onClick={handleSave}
                        disabled={!title.inputValid || !year.inputValid || !author.inputValid }>
                        izveidot
                    </button>

                </div> : <AuthComponent/>
            }
        </div>
    )
}
export default observer(CreateArchive)