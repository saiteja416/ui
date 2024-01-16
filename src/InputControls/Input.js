"use client"
import React,{ Fragment } from 'react'

const Input  = ({type,handleChange,model,values,options}) => {
  switch(type){
    case "text":
    case "password":
    case "date":
      return (
        <Fragment>
          <input className='form-control' name={model} onChange={handleChange} type={type} />
        </Fragment>
      )
      case "radio":
        return (
          <Fragment>
            {
              options.map((val)=>{
                  return  <> <input className="ms-3" name={model} onChange={handleChange} type={type} />{val}</>
              })
            }
          
          </Fragment>
        )

        case "checkbox":
          return (
           <Fragment>
            {
              options.map((val)=>{
                  return  <> <input className="ms-3" name={model} onChange={handleChange} type={type} />{val}</>
              })
            }
          
          </Fragment>
          )
  }
}

export default Input 