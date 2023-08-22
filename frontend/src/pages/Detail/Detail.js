import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Message from '../components/Message'
// import { listProductDetails, createProductReview } from '../actions/postAction'
// import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/postConstants'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Detail() {
  console.log('디테일 페이지에 드러옴') // 왜 안되냐고?ㅠ
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

  return (
    <div key={post.id}>
      {post.title}
      <p>디테일 페이지임</p>
    </div>
  )
}

export default Detail

