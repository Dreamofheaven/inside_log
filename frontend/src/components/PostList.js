import React from 'react'

function PostList({ post }) {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </div>
  )
}

export default PostList
