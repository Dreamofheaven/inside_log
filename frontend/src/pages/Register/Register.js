import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import './Register.css'
import { register } from '../../actions/userActions'

function Register({location, history}) {
  // 여기가 javascript코드!
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(location?.search || ''); 
  const redirectParam = queryParams.get('redirect');
  const redirect = redirectParam || '/';
  
  const userRegister = useSelector(state => state.userRegister)
  const {error, userInfo} = userRegister || {}

  useEffect(()=> {
    if (userInfo) {
        history.push(redirect)
        window.location.href = '/';
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password != confirmPassword){
        setMessage('비밀번호가 일치하지 않습니다.')
    } else {
        dispatch(register(name, email, password))
    }
  }

  return (
    <div className='register-page'>
      <h1>회원가입</h1>
      {message && <Message variant={'danger'}>{message}</Message>}
      {error && <Message variant={'danger'}>{error}</Message>}
      
      <form onSubmit={submitHandler}>
        <input type="text" name="name" id="name" placeholder='이름' onChange={(e) => setName(e.target.value)} />
        <input type="text" name="email" id="email" placeholder='이메일' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name="password" id="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
        <input type="text" name="passwordConfirm" id="passwordConfirm" placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default Register
