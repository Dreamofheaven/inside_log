import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm'

function LandingPage() { 
  return (
    <main className='page-wrap'>
      <div className='page-main'>  
        <LoginForm />
      </div>
      <Footer/>
    </main>
  )
}

export default LandingPage
