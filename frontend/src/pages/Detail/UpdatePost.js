import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './UpdatePost.css'
import { updatePost } from '../../actions/postAction'

function UpdatePost() {
        const { id } = useParams() 

        const userInfo = useSelector(state => {return state.userLogin.userInfo})
      
        const [title, setTitle] = useState('')
        const [body, setBody] = useState('')
        
        const dispatch = useDispatch()
        
        const postInfos = useSelector((state) => state.postList.posts)
        useEffect(() => {
          const post = postInfos.find((item) => item.id === parseInt(id,10)) 

          if (post) {
            setTitle(post.title)
            setBody(post.body)
          } else {
            console.log("해당 게시글을 찾을 수 없습니다.")
          }
        }, [id,dispatch])
        
  const createPostHandler = async (e) => {
    e.preventDefault()
    try {
        dispatch(updatePost(id, title, body, userInfo))
        window.location.assign(`/posts/${id}`) 
    } catch (error) {
      console.log('에러가 발생하였습니다.', error)
    }
  }

  return (
    <div className='create-page'>
      <Link to={`/posts/${id}`}>
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
          <input id = 'send' className='create-page-form-submit' type='submit' value='수정'/>
        </form>
      </div>   
    </div>
  )
}

export default UpdatePost
