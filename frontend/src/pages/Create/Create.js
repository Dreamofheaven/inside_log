import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// import Message from '../components/Message'
// import { createProduct } from '../actions/productActions'
// import { POST_CREATE_RESET } from '../constants/postConstants'

import './Create.css'


function Create() {
  // const dispatch = useDispatch()

  // const postCreate = useSelector(state => state.postCreate)
  //   const { error: errorCreate, success: successCreate, post: createdPost } = postCreate

  const userLogin = useSelector(state => {return state.userLogin.userInfo})
  // console.log(userLogin)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  // const dispatch = useDispatch()

  const createPostHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:8000/posts/create/',
        {
          title: title,
          body: body,
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userLogin.token}`,
          },
        }
      )
      console.log('post를 성공했습니다!')
      window.location.assign('/main')
    } catch (error) {
      console.log('에러가 발생하였습니다.', error)
      // console.log(userLogin.userInfo.token)
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
            <input 
              type='text' 
              placeholder='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div id = 'message' className='create-page-form-content'>
            <textarea 
            placeholder='내용을 입력하세요.'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <input id = 'send' className='create-page-form-submit' onClick={() => console.log('등록눌렀음')} type='submit' value='등록'/>
        </form>
      </div>   
    </div>
  )
}

export default Create
