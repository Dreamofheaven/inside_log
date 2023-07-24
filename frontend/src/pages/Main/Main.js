import React, { useState, useEffect } from 'react'
import './Main.css'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
// import Background from '../../components/Background'
// import axios from 'axios'

function Main() { 
  return (
    <main className='main-wrap'>
      <div className="main-title">
        <h1>내 안의 긍정이</h1>
      </div>
      <Tree/>
      <Footer/>
    </main>
  )
}

export default Main
