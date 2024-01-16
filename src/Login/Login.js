"use client"
import React, { useState } from 'react'
import {styles} from "./Login.module.css"
import Link from 'next/link'
import confirguation from "./confirguation.json"
import Input from '@/InputControls/Input'
import { handleFormValidation,handleFiledValidation } from '@/validations/appValidations'

export const Login = () => {
  const[inputControls,setInputContorls]=useState(confirguation)
const fnChange=(eve)=>{
 setInputContorls(handleFiledValidation(eve,inputControls))
}
const handleLogin=()=>{
 const[isFormInvalid,clonedInputControls,dataObj]= handleFormValidation(inputControls)
  if(isFormInvalid){
         setInputContorls(clonedInputControls)
         return;
      }
  console.log("send the request with this data")
  console.log(dataObj)
 
}
  return (
    <div className='container-fluid'>
        <h2 className='text-center my-3'>Login</h2>
        {
            inputControls?.map(({lbl,type,value,errorMessage,model})=>{
                return <div className='row mb-3'>
                <div className='col-sm-5 text-end'>
                    <b>{lbl}:</b>
                    </div>
                    <div className='col-sm-3'>
                      <Input model={model} type={type} value={value} handleChange={fnChange}/>
                        </div>
                        <div className='col-sm-4'>
                            <b className='text-danger'>{errorMessage}</b>
    
                        </div>
    
            </div>
            })
        }
        
          <div className='row mt-3'>
           <div className='offset-sm-5  col-sm-7'>
          <button onClick={handleLogin} className='btn btn-primary me-3'>Login</button>
          <Link href={"/register"}>To Register</Link>
           </div>
        </div>
        </div>
        
  )
}
