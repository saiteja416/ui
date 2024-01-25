"use client"
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { appStore } from '@/store/appStore'
import { Provider  } from 'react-redux'
import LayoutWrapper from './layoutWrapper'


function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={appStore}>
          <LayoutWrapper>
              {children}
          </LayoutWrapper>
        
        </Provider>
      </body>
    </html>
  )
}


export default RootLayout
