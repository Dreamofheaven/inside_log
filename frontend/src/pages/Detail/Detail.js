import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaRegFaceGrin } from 'react-icons/fa6'
import { listReview } from '../../actions/postAction'
import CreateReview from '../../components/CreateReview'
import axios from 'axios'
import './Detail.css'

function Detail() {
  const { id } = useParams()
  
  const dispatch = useDispatch()

  const [post, setPost] = useState(null)

  const reviewList = useSelector(state => state.reviewList.review) 

  //삭제 버튼
  const handleDelete=async()=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/posts/delete/${id}/`)
      console.log(response)
      window.location.assign('/main') 
    } catch (error){
      console.error('리뷰 삭제 오류',error);
    }
  }
  const handleButtonClick = () => {
    console.log('지피티 버튼을 눌렀습니다.')
    dispatch(listReview(id)) 
  }; 

  useEffect(() => {
    async function fetchPost() {
      try {
        const postResponse = await axios.get(`http://127.0.0.1:8000/posts/${id}/`)
        const postData = postResponse.data
  
        setPost(postData)
        dispatch(listReview(id)) 
      } catch (error) {
        console.log('detail에서 오류발생', error)
      }
    }
    fetchPost()
  
  },[id]);
    
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
        <button className='delete-button' onClick={handleDelete}>Delete</button> {/* 삭제 버튼 */}
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
          <CreateReview id={id} handleButtonClick={handleButtonClick} />
        </div>
        <FaRegFaceGrin className='icon'/>
        <div className='detail-review'>
          {/* {reviews && reviews.length > 0 ? <p>{reviews[0].comment}</p> : <p>리뷰아직없음</p>}   */}
          {reviewList && reviewList.length > 0 ? <p>{reviewList[0].comment}</p> : <p>리뷰아직없음</p>}  
        </div>
      </div>
    </div>
  )
}

export default Detail




// 코드 임시저장

// const handleButtonClick = async() => {
//   try{
//     console.log('눌렸다!!☆☆☆')
//     // 버튼 클릭 시 버튼 클릭 횟수를 증가시킴
//     setButtonClickCount((prevCount) => prevCount + 1);
//     const response = await axios.get(`http://127.0.0.1:8000/posts/${id}/reviews/`);
//     const reviewData = response.data;
//     setReview(reviewData);
//   }catch(error){
//     console.error(error);
//   }
// };


// useEffect(() => {
//   console.log('디테일 페이지가 실행되었습니다.')
//   async function fetchPostAndReview() {
//     try {
//       const [postResponse, reviewResponse] = await Promise.all([
//         axios.get(`http://127.0.0.1:8000/posts/${id}/`),
//         axios.get(`http://127.0.0.1:8000/posts/${id}/reviews/`)
//       ])
//       const postData = postResponse.data
//       const reviewData = reviewResponse.data

//       setPost(postData)
//       setReview(reviewData)
//     } catch (error) {
//       console.log('detail에서 오류발생', error)
//     }
//   }
//   fetchPostAndReview()

// },[buttonClickCount]);