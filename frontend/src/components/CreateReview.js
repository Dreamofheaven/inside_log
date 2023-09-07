import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
import '../css/CreateReview.css'
import axios from 'axios'

function CreateReview({id, handleButtonClick}) {
    // const userLogin = useSelector(state => {return state.userLogin.userInfo})
    async function fetchReview() {
        await axios.post(`http://127.0.0.1:8000/posts/${id}/reviews/create/`,{})
      }

    const handleReview = () => {
        try {
            fetchReview()
            handleButtonClick()
        } catch (error) {
            console.log('에러', error)
        }
    }
    
  return (
    <div className='gptButton'>
      <button type="button" className='btn btn-primary' onClick={handleReview}>chatGPT의 위로</button>
    </div>
  )
}

export default CreateReview
