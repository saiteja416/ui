import React from 'react'
import { Header } from '@/Header'
import { Footer } from '@/Footer'
import { Menu } from '@/Menu'
import { Loader } from '@/Loader'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const LayoutWrapper = ({children}) => {
   const state= useSelector((state)=>state)
  return (
    <div>
     <Header/>
      {state?.appReducer?.isLoggedIn && <Menu/>}  
        {children}
      {state?.appReducer?.isShowLoadder && <Loader/>} 
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default LayoutWrapper