import React from 'react'
import '../css/PostList.css'
import { Link } from 'react-router-dom'

function PostList({ post }) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div className='PostList-box'>
        <h4>{post.title}</h4>
      </div>
    </Link>
  )
}

export default PostList
