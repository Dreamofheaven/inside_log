import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createPost } from '../../actions/postAction'
import './Create.css'

function Create() {
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }
  const userLogin = useSelector(state => {return state.userLogin.userInfo})
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  const createPostHandler = (e) => {
    e.preventDefault()
    if (title !== " "){
      dispatch(createPost(title,body,userLogin))
      window.location.href = '/main';
    }
  }

  return (
    <div className='create-page'>
      <Link to='/main'>
        <FaArrowLeftLong className='back' />
      </Link>
      <div className='create-page-box'>
        <form className='create-page-form' onSubmit={createPostHandler}>
          <div className='create-page-form-title'>
            <input type='text' placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div id = 'message' className='create-page-form-content'>
            <textarea placeholder='힘들고 슬픈 일이 있나요? 저에게 작성해주세요🙂' value={body} onChange={(e) => setBody(e.target.value)}/>
          </div>
          <input id = 'send' className='create-page-form-submit' type='submit' value='등록'/>
        </form>
      </div>   
    </div>
  )
}

export default Create
