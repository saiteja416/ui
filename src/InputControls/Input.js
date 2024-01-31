"use client"
import React,{ Fragment } from 'react'

const Input  = ({type,handleChange,model,values,options,value,isReadOnly}) => {
  switch(type){
    case "text":
    case "password":
    case "date":
      return (
        <Fragment>
          <input className='form-control'disabled={isReadOnly} name={model} onChange={handleChange} type={type} value={value} />
        </Fragment>
      )
      case "radio":
        return (
          <Fragment>
            {
              options.map((val,ind)=>{
                  return  <> <input  checked={value===values[ind]} value={values[ind]} className="ms-3" name={model} onChange={handleChange} type={type} />{val}</>
              })
            }
          
          </Fragment>
        )

        case "checkbox":
          return (
           <Fragment>
            {
              options.map((val,ind)=>{
                  return  <> <input checked={value.split(",").includes(values[ind])} value={values[ind]} className="ms-3" name={model} onChange={handleChange} type={type} />{val}</>
              })
            }
          
          </Fragment>
          )
  }
}

export default Input 