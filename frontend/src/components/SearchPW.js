import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


function SearchPW() {

  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch()

  }
  return (
    <div>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="phone_number" placeholder='Enter Phone number' value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button type="submit">확인</button>
      </form>
    </div>
  )
}

export default SearchPW
