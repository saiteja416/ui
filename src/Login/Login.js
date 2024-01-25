"use client"
import React, { useState } from 'react'
import {styles} from "./Login.module.css"
import Link from 'next/link'
import confirguation from "./confirguation.json"
import Input from '@/InputControls/Input'
import { handleFormValidation,handleFiledValidation } from '@/validations/appValidations'
import { Api } from '@/common/Api'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Cookies } from '@/common/cookies'

export const Login = () => {
  const[inputControls,setInputContorls]=useState(confirguation)
      const dispatch = useDispatch() //alternate to appStore.dispatch
const fnChange=(eve)=>{
 setInputContorls(handleFiledValidation(eve,inputControls))
}
const handleLogin= async ()=>{
  try{
 const[isFormInvalid,clonedInputControls,dataObj]= handleFormValidation(inputControls)
  if(isFormInvalid){
         setInputContorls(clonedInputControls)
         return;
      }
      dispatch({type:"LOADER", payload: true})
      const res = await Api.fnSendPostReq("std/login", {data: dataObj})
      if(res?.data?.length){
        const {uid}=res?.data[0]
              dispatch({type:"AUTH", payload: true})
              Cookies.setItem("uid",uid)
      }
      else{
         toast.error("Please check entered user id or password")
      }
      console.log(11,res.data )
    }
    catch(ex){

    }
    finally{
      dispatch({type:"LOADER",payload: false})
    }
}
  return (
    <div className='container-fluid'>
        <h2 className='text-center my-3'>Login</h2>
        {
            inputControls?.map(({lbl,type,value,errorMessage,model},index)=>{
                return <div  key={`div_${index}`}className='row mb-3'>
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
