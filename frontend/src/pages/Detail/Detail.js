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

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(`http://127.0.0.1:8000/posts/${id}/`)
      setPost(data)
    }

    fetchPost()
  }, [id]) //id가 변경될 때마다 useEffect가 실행된다.

  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>
  }
  const created_at = `${post.created_at.split('T')[0]} ${post.created_at.split('T')[1].split(':')[0]}:${post.created_at.split('T')[1].split(':')[1]}`;

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

        <FaRegFaceGrin className='icon'/>
        <div className='detail-review'>
          <p>나는 챗지피이다. ㅇㅎㄹㅇㅀㅇㄹㅇㄹㅇㅀㅇㅀ
            물론입니다. 힘든 시간을 겪고 계시다면, 저는 항상 여기 있어서 위로와 조언을 드릴 준비가 되어 있습니다.
            어떤 어려움을 겪고 계신 건지 알려주시면, 더 구체적인 도움을 드릴 수 있을 것 같아요. 어떤 주제든지 괜찮으니 망설이지 마시고 이야기해보세요. 제가 도움이 될 수 있도록 최선을 다하겠습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Detail

