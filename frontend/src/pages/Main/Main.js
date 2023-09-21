import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { listPosts } from '../../actions/postAction'
import Footer from '../../components/Footer'
import Tree from '../../components/Tree'
import PostList from '../../components/PostList'
import Logout from '../../components/Logout';
import Paginate from '../../components/Paginate';
import './Main.css'

function Main({}) { 
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }

  const dispatch = useDispatch()
  const postList = useSelector(state => state.postList)

  const userLogin = useSelector(state => {return state.userLogin.userInfo})
  const { loading, error, posts } = postList

  useEffect(() => {
    dispatch(listPosts(userLogin))
  }, [userLogin])


  // 페이지 네이션 관련 코드
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(6); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  console.log(postList)
  useEffect(() => {
    setCount(posts.length)
    setIndexOfLastPost(currentPage * postPerPage)
    setIndexOfFirstPost(indexOfLastPost - postPerPage)
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
  },[currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, posts])

  const setPage = (error) => {
    setCurrentPage(error);
  };

  return (
    <main className='main-wrap'>      
      <div className='main-title'>
        <h1>내 안의 긍정이</h1>
      </div>
      <Logout />
      <Link to='/create'>
        <IoMdAddCircle className='create-post' />
      </Link>
      <Tree />
      <div className='posts-wrap'>
        {currentPosts && currentPosts.map(post => (
          <div className="bubble-wrap" key={post.id}>
            <PostList key={post.id} post={post} className="bubble"></PostList>
            {/* <p className="arrow_box">{post.title}</p> */}
          </div>
          ))}
      </div>
      <div className='paginate-wrap'>
        <Paginate page={currentPage} count={count} setPage={setPage}/>
      </div>
      <Footer/>
    </main>
  )
}

export default Main


// // import React, { useEffect } from 'react'
// // import { Link } from 'react-router-dom'
// // import { IoMdAddCircle } from "react-icons/io";
// // import { useSelector, useDispatch } from 'react-redux'
// // import { listPosts } from '../../actions/postAction'
// // import Footer from '../../components/Footer'
// // import Tree from '../../components/Tree'
// // import PostList from '../../components/PostList'
// // import Logout from '../../components/Logout';
// // import './Main.css'

// // function Main({}) { 
// //   const dispatch = useDispatch()
// //   const postList = useSelector(state => state.postList)

// //   const userLogin = useSelector(state => {return state.userLogin.userInfo})

// //   // const { loading, error, posts, pages, page } = postList
// //   const { posts, error } = postList

// //   useEffect(() => {
// //     dispatch(listPosts(userLogin))
// //   }, [userLogin, dispatch])

// //   //무작위 위치 생성
// //   const generateRandomPosition = () => ({
// //     x: Math.floor(Math.random() * 80 + 10),
// //     y: Math.floor(Math.random() * 60 + 10),
// //   });
// //   // 초기 10개 위치 생성
// //   const initialApplePositions=Array.from({length:10},() => generateRandomPosition())

// //   console.log(initialApplePositions)
  
// //   return (
// //     <main className='main-wrap'>      
// //       <div className='main-title'>
// //         <h1>내 안의 긍정이</h1>
// //       </div>
// //       <Logout />
// //       <Link to='/create'>
// //         <IoMdAddCircle className='create-post' />
// //       </Link>
// //       <Tree applePositions={initialApplePositions} /> {/* 나무 사과 위치 */}
// //       <div className='posts-wrap'>
// //         {posts && posts.map((post) => (
// //           <PostList key={post.id} post={post} />
// //         ))}
// //       </div>
// //       <Footer/>
// //     </main>
// //   )
// // }

// // export default Main

// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { IoMdAddCircle } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux'
// import { listPosts } from '../../actions/postAction'
// import Footer from '../../components/Footer'
// import Tree from '../../components/Tree'
// import PostList from '../../components/PostList'
// import Logout from '../../components/Logout';
// import Paginate from '../../components/Paginate';
// import './Main.css'

// function Main({}) { 
//   const token=sessionStorage.getItem('userInfo')
//   if (!token){
//       window.location.href='/';
//   }

//   const dispatch = useDispatch()
//   const postList = useSelector(state => state.postList)

//   const userLogin = useSelector(state => {return state.userLogin.userInfo})
//   const { loading, error, posts } = postList

//   useEffect(() => {
//     dispatch(listPosts(userLogin))

//     // setCount(posts.length)
//     // setIndexOfLastPost(currentPage * postPerPage)
//     // setIndexOfFirstPost(indexOfLastPost - postPerPage)
//     // setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
//   }, [userLogin])


//   // 페이지 네이션 관련 코드
//   const [count, setCount] = useState(0); // 아이템 총 개수
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
//   const [postPerPage] = useState(6); // 한 페이지에 보여질 아이템 수 
//   const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
//   const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
//   const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

//   console.log(postList)
//   useEffect(() => {
//     setCount(posts.length)
//     setIndexOfLastPost(currentPage * postPerPage)
//     setIndexOfFirstPost(indexOfLastPost - postPerPage)
//     setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
//   },[currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, posts])

//   const setPage = (error) => {
//     setCurrentPage(error);
//   };

//   return (
//     <main className='main-wrap'>      
//       <div className='main-title'>
//         <h1>내 안의 긍정이</h1>
//       </div>
//       <Logout />
//       <Link to='/create'>
//         <IoMdAddCircle className='create-post' />
//       </Link>
//       <Tree />
//       <div className='posts-wrap'>
//         {/* {posts && posts.map(post => (
//           <PostList key={post.id} post={post} />
//         ))} */}

//         {currentPosts && currentPosts.map(post => (
//           <div id="checks">
//               <PostList key={post.id} post={post} className="bubble"></PostList>
//             <p className="arrow_box">{post.title}</p>
//           </div>
//           // <div>
//           //   <p class="arrow_box">{post.title}</p>
//           //   <PostList key={post.id} post={post} className="bubble" />
//           // </div>
//         ))}

// {/* 
//         {currentPosts && posts.length > 0 ? (
//           currentPosts.map((post) => {
//             <PostList key={post.id} post={post}/>
//           })
//         ) : (
//           <div>게시글이 없습니다..</div>
//         )} */}
//       </div>
//       <div className='paginate-wrap'>
//         <Paginate page={currentPage} count={count} setPage={setPage}/>
//       </div>
//       <Footer/>
//     </main>
//   )
// }

// export default Main


