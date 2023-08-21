import React, { useState, useEffect } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
import { IoMdAddCircle } from "react-icons/io";
// import Background from '../../components/Background'
import axios from 'axios'
import PostList from '../../components/PostList'

function Main() { 
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPost(){
      const { data } = await axios.get('http://127.0.0.1:8000/posts/')
      setPosts(data.posts)
      console.log('post 불러오기 성공')
      console.log(data.posts)
    }

    fetchPost()
  }, [])

  return (
    <main className='main-wrap'>
      <div className='main-title'>
        <h1>내 안의 긍정이</h1>
      </div>
      <Link to='/create'>
        <IoMdAddCircle className='create-post' />
      </Link>
      <Tree/>
      <div>
        {posts.map(post => (
          <PostList post={post} />
        ))}
      </div>

      <Footer/>
    </main>
  )
}

export default Main

