import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { listPosts } from '../../actions/postAction'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
import PostList from '../../components/PostList'
import Logout from '../../components/Logout';
import './Main.css'

function Main({}) { 
  const dispatch = useDispatch()
  const postList = useSelector(state => state.postList)

  const userLogin = useSelector(state => {return state.userLogin.userInfo})

  // const { loading, error, posts, pages, page } = postList
  const { posts, error } = postList
  const generateRandomPosition=()=>({
    x: `${Math.random() *100}%`,
    y: `${Math.random() *100}%`,
  })

  useEffect(() => {
    dispatch(listPosts(userLogin))
  }, [userLogin, dispatch])

  const initialApplePositions=Array.from({length:10},() => generateRandomPosition())
  
  return (
    <main className='main-wrap'>      
      <div className='main-title'>
        <h1>내 안의 긍정이</h1>
      </div>
      <Logout />
      <Link to='/create'>
        <IoMdAddCircle className='create-post' />
      </Link>
      <Tree appelPositions={initialApplePositions} />
      <div className='posts-wrap'>
        {posts && posts.map(post => (
          <PostList key={post.id} post={post} />
        ))}
      </div>
      <Footer/>
    </main>
  )
}

export default Main

// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { IoMdAddCircle } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux'
// import { listPosts } from '../../actions/postAction'
// import Footer from '../../components/Footer'
// import Tree from '../../components/Tree'
// import PostList from '../../components/PostList'
// import Logout from '../../components/Logout';
// import './Main.css'

// function Main({}) { 
//   const dispatch = useDispatch()
//   const postList = useSelector(state => state.postList)

//   const userLogin = useSelector(state => {return state.userLogin.userInfo})

//   // const { loading, error, posts, pages, page } = postList
//   const { posts, error } = postList

//   useEffect(() => {
//     dispatch(listPosts(userLogin))
//   }, [userLogin, dispatch])

//   return (
//     <main className='main-wrap'>      
//       <div className='main-title'>
//         <h1>내 안의 긍정이</h1>
//       </div>
//       <Logout />
//       <Link to='/create'>
//         <IoMdAddCircle className='create-post' />
//       </Link>
//       <Tree/>
//       <div className='posts-wrap'>
//         {posts && posts.map(post => (
//           <PostList key={post.id} post={post} />
//         ))}
//       </div>
//       <Footer/>
//     </main>
//   )
// }

// export default Main


