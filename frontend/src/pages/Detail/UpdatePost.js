import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './UpdatePost.css'
// import { POST_UPDATE_RESET } from '../constants/postConstants'
import { updatePost } from '../../actions/postAction'

function UpdatePost() {
        const userInfo = useSelector(state => {return state.userLogin.userInfo})
        const postInfo = useSelector(state => {return state.postDetails}) 
        console.log(postInfo)
        const [title, setTitle] = useState('')
        const [body, setBody] = useState('')

        const dispatch = useDispatch()
        const { id } = useParams()
        console.log(id)

        useEffect(() => {
            // if (sucessUpdate){
            //     dispatch({type:POST_UPDATE_RESET})
            // }
            if (!id !== Number(id)) {
                // null
            } else {
                setTitle() //자미만요
            }
        }, [dispatch])

  const createPostHandler = async (e) => {
    e.preventDefault()
    try {
        dispatch(updatePost({
            // '_id':post._id,
            'title': title,
            'body': body,
            'userInfo': userInfo
        }))
        window.location.assign('/main')
    } catch (error) {
      console.log('에러가 발생하였습니다.', error)
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
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div id = 'message' className='create-page-form-content'>
            <textarea value={body} onChange={(e) => setBody(e.target.value)}/>
          </div>
          <input id = 'send' className='create-page-form-submit' onClick={() => console.log('등록눌렀음')} type='submit' value='등록'/>
        </form>
      </div>   
    </div>
  )
}

export default UpdatePost