import React, { useState, useEffect } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
import { IoMdAddCircle } from "react-icons/io";
// import Background from '../../components/Background'
// import axios from 'axios'

function Main() { 
  return (
    <main className='main-wrap'>
      <div className='main-title'>
        <h1>내 안의 긍정이</h1>
      </div>
      <Link to='/create'>
        <IoMdAddCircle className='create-post' />
      </Link>
      <Tree/>
      <Footer/>
    </main>
  )
}

export default Main
