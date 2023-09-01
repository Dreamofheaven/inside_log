import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import { listProductDetails, createProductReview } from '../actions/postAction'
// import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/postConstants'
import { useParams } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaRegFaceGrin } from 'react-icons/fa6'
import axios from 'axios'
import './Detail.css'

function Detail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [review, setReview] = useState("")

  const [buttonClicked, setButtonClicked] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(`http://127.0.0.1:8000/posts/${id}/`)
      setPost(data)
    }
    fetchPost()
  },[id]) 

  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>
  }

  const created_at = `${post.created_at.split('T')[0]} ${post.created_at.split('T')[1].split(':')[0]}:${post.created_at.split('T')[1].split(':')[1]}`;

  //리뷰 받아오기

  async function fetchReview() {
    const { data } = await axios.get(`http://127.0.0.1:8000/posts/${id}/reviews/`)
    setReview(data)
    console.log(data)
  }

  const handleGPT = () => {
    if (!buttonClicked) {
      setButtonClicked(true)

      fetchReview()
      console.log(review)
    }
  }

  return (
    <div className='detail-page'>
      <Link to='/main'>
        <FaArrowLeftLong className='back' />
      </Link>
      <div className='detail-page-box'>
        <div className='detail-title'>
          <p>No. {post.id}</p>
          <h2>{post.title}</h2>
          <p className='date'>{created_at}</p>
        </div>

        <div className='detail-body'> 
          <span>◇</span>
          <p>{post.body}</p>
        </div>

        <div className='detail-status'> 
          <p>{post.status}</p>
        </div>

        <div className='call-button'>
          <button onClick={handleGPT} disabled={buttonClicked}>chatGPT의 위로</button>
        </div>
        <FaRegFaceGrin className='icon'/>
        <div className='detail-review'>
          <p>{(!buttonClicked) && `${review.comment}`} </p>
        </div>
      </div>
    </div>
  )
}

export default Detail

