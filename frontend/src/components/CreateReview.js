import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../css/CreateReview.css'
// import axios from 'axios'
import { reviewCreate } from '../actions/postAction'

function CreateReview({id, handleButtonClick}) {
    const dispatch = useDispatch()

    const handleReview = () => {
      dispatch(reviewCreate(id))
      handleButtonClick()
        // try {
        //     // fetchReview()
        //     dispatch(reviewCreate())
        //     handleButtonClick()
        // } catch (error) {
        //     console.log('에러', error)
        // }
    }
    
  return (
    <div className='gptButton'>
      <button type="button" className='btn btn-primary' onClick={handleReview}>chatGPT의 위로</button>
    </div>
  )
}

export default CreateReview