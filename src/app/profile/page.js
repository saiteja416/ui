"use client"
import { Api } from '@/common/Api'
import { Cookies } from '@/common/cookies'
import { appStore } from '@/store/appStore'
import React, { useEffect,useState } from 'react'
import configuration from "./configuration.json"
import Input from '@/InputControls/Input'
import Select from '@/InputControls/Select'
import Textarea from '@/InputControls/Textarea'
import {toast} from "react-toastify"
import { formSetData, handleFiledValidation,handleFormValidation } from '@/validations/appValidations'
import { Modal } from '@/Modal'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const [inputControls,setInputContorls]=useState(configuration)
  const[isShowModal,setIsShowModal]=useState(false)
  const router=useRouter();
  const fnChange=(eve)=>{
        setInputContorls(handleFiledValidation(eve,inputControls))
  }
    useEffect(()=>{
       getUserById()
    },[])
    const getUserById = async ()=>{
        appStore.dispatch({type:"LOADER", payload:true})
        try{
            const res= await Api.fnSendGetReq(`std/get-std-by-id?id=${Cookies.getItem("id")}`)
          setInputContorls(formSetData(inputControls,res.data));
        }
        catch(ex){
            console.error(ex)
        }
        finally{
             appStore.dispatch({type:"LOADER", payload:false})
        }
    }
    const handleUpdate= async ()=>{
      try { 
        const[isFormInvalid,clonedInputControls,dataObj]= handleFormValidation(inputControls)
        if(isFormInvalid){
               setInputContorls(clonedInputControls)
               return;
            }
            appStore.dispatch({type:"LOADER", payload:true})
           const res =await Api.fnSendPutReq(`std/update-std?id=${Cookies.getItem('id')}`,{data:dataObj})
            const {acknowledged,modifiedCount}=res?.data
        if(acknowledged && modifiedCount > 0 ){
          toast.success("Sucessfully Updated")
        
        }
        else{
          toast.error("Not Updated Try Again")
        }
          }
          catch(ex){
                console.error("update", ex)
                toast.error("Something went Wrong")
          }
          finally{
            appStore.dispatch({type:"LOADER", payload:false})
    
          }

    }
    const handleTerminate=()=>{
      setIsShowModal(true)
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
    const fnDelete= async ()=>{
      try { 
            appStore.dispatch({type:"LOADER", payload:true})
           const res =await Api.fnSendDeleteReq(`std/delete-std/${Cookies.getItem('id')}`)
            const {acknowledged,deletedCount}=res?.data
        if(acknowledged && deletedCount > 0 ){
          toast.success("Sucessfully Terminated")
          setIsShowModal(false)
         appStore.dispatch({type:"AUTH", payload: false})
         Cookies.clear();
         router.push('/');
        }
        else{
          toast.error("Not Terminated Try Again")
        }
          }
          catch(ex){
                console.error("Profile", ex)
                toast.error("Something went Wrong")
          }
          finally{
            appStore.dispatch({type:"LOADER", payload:false})
    
          }
    }
    const fnClose=()=>{
      setIsShowModal(false)
    }
  return (
    <div className='container-fluid'>
    <h2 className='text-center my-3'>Profile</h2>
    {
        inputControls?.map((obj,index)=>{
          const {lbl,errorMessage,tag}=obj;
            return <div key={`div_${index}`} className='row mb-3'>
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
      <button onClick={handleUpdate} className='btn btn-primary me-3'>Update</button>
      <button onClick={handleTerminate} className='btn btn-primary me-3'>Terminate</button>
       </div>
    </div>
  { isShowModal &&  <Modal text="Are You Sure...?" isShowOk={true} fnOK = {fnDelete} fnClose={fnClose}/>}
    </div>
  )
}

export default Profile