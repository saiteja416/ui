"use client"
import React,{ Fragment } from 'react'

const Textarea  = ({handleChange,model,value}) => {
      return (
        <Fragment>
          <textarea className='form-control' name={model} onChange={handleChange}value={value}/>
        </Fragment>
      )
    
        
  }

export default Textarea