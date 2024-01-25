"use client"
import React,{ Fragment } from 'react'

const Select  = ({handleChange,model,values,options,value}) => {
  
      return (
        <Fragment>
          <select className='form-control' name={model} onChange={handleChange} value={value} >
          <option value="">-----Please Select-----</option>
          {
            options.map((val,ind)=>{
                  return <option value={values[ind]} key={`options_${ind}`}>{val}</option>
            })
          }
          </select>
        </Fragment>
      )
      
}

export default Select