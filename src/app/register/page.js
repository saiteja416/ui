  "use client"
import React, { useState } from 'react'
import styles from "./register.module.css"
import configuration from "./configuration.json"
import Link from 'next/link'
import Input from '@/InputControls/Input'
import Select from '@/InputControls/Select'
import Textarea from '@/InputControls/Textarea'
import { handleFiledValidation,handleFormValidation } from '@/validations/appValidations'

const Register =()=> {
  const [inputControls,setInputContorls]=useState(configuration)
  const fnChange=(eve)=>{
        setInputContorls(handleFiledValidation(eve,inputControls))
  }
  const handleRegister=()=>{
    const[isFormInvalid,clonedInputControls,dataObj]= handleFormValidation(inputControls)
    if(isFormInvalid){
           setInputContorls(clonedInputControls)
           return;
        }
        alert('sending Request')
  }
  const prepareInputControls=(tag,obj)=>{
    switch(tag){
      case "input":
       return  <Input {...obj} handleChange={fnChange}/>
      
       case "select":
        return  <Select {...obj} handleChange={fnChange}/>

          default:
          return  <Textarea {...obj} handleChange={fnChange}/>

    }
  }
  return (
    <div className='container-fluid'>
        <h2 className='text-center my-3'>Register</h2>
        {
            inputControls?.map((obj)=>{
              const {lbl,errorMessage,tag}=obj;
                return <div className='row mb-3'>
                <div className='col-sm-5 text-end'>
                    <b>{lbl}:</b>
                    </div>
                    <div className='col-sm-3'>
                      {prepareInputControls(tag,obj)}
                        </div>
                        <div className='col-sm-4'>
                            <b className='text-danger'>{errorMessage}</b>
    
                        </div>
    
            </div>
            })
        }
        
          <div className='row mt-3'>
           <div className='offset-sm-5  col-sm-7'>
          <button onClick={handleRegister} className='btn btn-primary me-3'>Register</button>
          <Link href={"/"}>To Login</Link>
           </div>
        </div>
        </div>
        
  )
}

export default Register