import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'


import './Create.css'

function Create() {

  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  // const dispatch = useDispatch()

  return (
    <div className='create-page'>
      <Link to='/main'>
        <FaArrowLeftLong className='back' />
      </Link>
      <div className='create-page-box'>
        <form className='create-page-form'>
          <div className='create-page-form-title'>
            <input type='title' placeholder='제목'/>
          </div>
          <div className='create-page-form-content'>
            <textarea placeholder='내용을 입력하세요.'/>
          </div>
          <input className='create-page-form-submit' type='submit' value='등록'/>
        </form>
      </div>
    </div>
  )
}

export default Create
