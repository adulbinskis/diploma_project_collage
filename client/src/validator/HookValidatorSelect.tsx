import React, { useEffect, useState} from 'react';



const useValidation = (value: any, validations: any) => {
    const [selectValid, setSelectValid] = useState(false)

    const [isSelected, setSelected] = useState(true)
    const [isSelectedMessage, setSelectedMessage] = useState('')

    useEffect(() => {
        for (const validation in validations){
            switch (validation){
                case 'isSelected':
                    value ? setSelected(false) : setSelected(true)
                    value ? setSelectedMessage('') : setSelectedMessage('Izvēlaties pagastu!!!')

                    break;
            }
        }

    }, [value, validations])

    useEffect(() => {
        if( isSelected ){
            setSelectValid(false)
        }else {
            setSelectValid(true)
        }
    }, [ isSelected ])

    return {
        isSelected,
        selectValid,
        isSelectedMessage
    }
}

const useInputSelect = (initialValue: any, validations: any) => {

    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const [isMessageOpen, setMessageOpen] = useState(true)

    const onChangeSelect = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        changeSelectColor(e)
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    const onBlurSelect = (e: React.FocusEvent<HTMLSelectElement>) =>{
        setDirty(true)
        changeSelectColor(e)
    }


    function changeSelectColor(e: React.ChangeEvent<HTMLSelectElement>){
        let ini = document.querySelector('#'+e.target.id);
        if(ini)
            if(!valid.selectValid){
                ini.classList.add("setError");
            }else{
                ini.classList.remove("setError");
            }
    }

    function closeErrorMessage(){
        setMessageOpen(false)
        console.log(isMessageOpen)
    }
    function openErrorMessage(){
        setMessageOpen(true)
        console.log(isMessageOpen)
    }

    return {
        value,
        onChange,
        onChangeSelect,
        onBlurSelect,
        closeErrorMessage,
        openErrorMessage,
        isDirty,
        ...valid,
        isMessageOpen
    }
}

export default useInputSelect;