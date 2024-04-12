import React, { useEffect, useState} from 'react';



const useValidation = (value: any, validations: any) => {
    const [inputValid, setInputValid] = useState(false)

    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [isName, setIsName] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const [isPersonCode, setIsPersonCode] = useState(false)
    const [isGroup, setIsGroup] = useState(false)
    const [isAddress, setIsAddress] = useState(false)
    const [isYear, setIsYear] = useState(false)


    const [isEmptyMessage, setEmptyMessage] = useState('')
    const [minLengthErrorMessage, setMinLengthErrorMessage] = useState('')
    const [maxLengthErrorMessage, setMaxLengthErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [isNameMessage, setIsNameMessage] = useState('')
    const [isNumberMessage, setIsNumberMessage] = useState('')
    const [isPersonCodeMessage, setIsPersonCodeMessage] = useState('')
    const [isGroupMessage, setIsGroupMessage] = useState('')
    const [isAddressMessage, setIsAddressMessage] = useState('')
    const [isYearMessage, setIsYearMessage] = useState('')


    useEffect(() => {
        for (const validation in validations){
            switch (validation){
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    value ? setEmptyMessage('') : setEmptyMessage('Lauks ir tukšs')
                    break;
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    value.length < validations[validation] ? setMinLengthErrorMessage('Jābūt garākam par:'+ validations[validation]) :  setMinLengthErrorMessage('');

                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    value.length > validations[validation] ? setMaxLengthErrorMessage('ne garāks par '+ validations[validation]) : setMaxLengthErrorMessage('');

                    break;
                case 'isEmail':
                    const reIsEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    reIsEmail.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    reIsEmail.test(String(value).toLowerCase()) ? setEmailErrorMessage('') : setEmailErrorMessage('Epasts: xxxxxx@xxxx.xxx')

                    break;
                case 'isName':
                    const reIsName = /^[A-ZĀČĒĢĪĶĻŅŌŖŠŪŽ][a-zāčēģīķļņōŗšūž]{1,19}(\[a-zāčēģīķļņōŗšūž]{2,20})?$/;
                    reIsName.test(value) ? setIsName(false) : setIsName(true)
                    reIsName.test(value) ? setIsNameMessage('') : setIsNameMessage('izmantojiet simbolus [A-z] \n garums [2-20] simboli')

                    break;
                case 'isNumber':
                    const reIsNum = /^\d+$/
                    reIsNum.test(value) ? setIsNumber(false) : setIsNumber(true)
                    reIsNum.test(value) ? setIsNumberMessage('') : setIsNumberMessage('Ievadiet ciparus')

                    break;
                case 'isPersonCode':
                    const reIspCode = /^(\d{6})-[012]\d{4}$/
                    reIspCode.test(value) ? setIsPersonCode(false) : setIsPersonCode(true)
                    reIspCode.test(value) ? setIsPersonCodeMessage('') : setIsPersonCodeMessage('Personas kods: 123456-11111 \n izmantojiet tikai ciparus!!!')

                    break;
                case 'isGroup':
                    const reIsGroup = /^[1-4]/
                    reIsGroup.test(value) ? setIsGroup(false) : setIsGroup(true)
                    reIsGroup.test(value) ? setIsGroupMessage('') : setIsGroupMessage('Grupas pieaugušiem ir [1-3] 4 - bērni līdz 18')

                    break;
                case 'isAddress':
                    const reIsAddress = /^[A-ZĀČĒĢĪĶĻŅŌŖŠŪŽ][ a-zāčēģīķļņōŗšūž#.0-9a-zA-Z\s,-]+$/
                    reIsAddress.test(value) ? setIsAddress(false) : setIsAddress(true)
                    reIsAddress.test(value) ? setIsAddressMessage('') : setIsAddressMessage('Nepareizs formāts!!!!!! \n Paraugs: Vidzemes 20-46')
                    break;
                case 'isYear':
                    const reIsYear = /^(19|20)\d{2}$/
                    reIsYear.test(value) ? setIsYear(false): setIsYear(true)
                    reIsYear.test(value) ? setIsYearMessage(''): setIsYearMessage('Ievadiet gadu 1900-2099')
                    break;
            }
        }

    }, [value, validations])

    useEffect(() => {
        if( isName|| isEmpty || minLengthError|| maxLengthError|| emailError || isNumber || isPersonCode || isGroup || isAddress || isYear){
            setInputValid(false)
        }else {
            setInputValid(true)
        }
    }, [isAddress, isGroup, isPersonCode, isNumber, isName, isEmpty, minLengthError, maxLengthError, emailError,isYear, validations])

    return {
        isEmpty,
        isName,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
        isEmptyMessage,
        minLengthErrorMessage,
        maxLengthErrorMessage,
        emailErrorMessage,
        isNameMessage,
        isNumber,
        isNumberMessage,
        isPersonCode,
        isPersonCodeMessage,
        isGroupMessage,
        isGroup,
        isAddress,
        isAddressMessage,
        isYear,
        isYearMessage
    }
}

const useInput = (initialValue: any, validations: any) => {

    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const [isMessageOpen, setMessageOpen] = useState(true)

    const onChangeInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        changeInputColor(e)
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) =>{
        setDirty(true)
        changeInputColor(e)
    }


    function changeInputColor(e: React.ChangeEvent<HTMLInputElement>){
        let ini = document.querySelector('#'+e.target.id);
        if(ini)
            if(!valid.inputValid){
                ini.classList.add("setError");
            }else{
                ini.classList.remove("setError");
            }
    }

    function closeErrorMessage(){
        setMessageOpen(false)
    }
    function openErrorMessage(){
        setMessageOpen(true)
    }


    return {
        value,
        onChange,
        onChangeInput,
        onBlur,
        closeErrorMessage,
        openErrorMessage,
        isDirty,
        ...valid,
        isMessageOpen
    }
}

export default useInput;