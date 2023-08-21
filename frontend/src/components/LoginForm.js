import React, { useState, useEffect } from 'react'
import '../css/LoginForm.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { login } from '../actions/userActions';

function LoginForm({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(location?.search || ''); 
  const redirectParam = queryParams.get('redirect');
  const redirect = redirectParam || '/';

  const userLogin = useSelector(state => state.userLogin)
  const { error, userInfo } = userLogin || {}
  

  useEffect(() => {
    if (userInfo) {
      console.log('이미 로그인이 된 상태입니다.')
      window.location.assign('/main')
      // history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='form'>
      {error && <Message variant='danger'>{error}</Message>}

      <form onSubmit={submitHandler}>
        <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      <Link to={'/register'}>
        <p className='register'>회원가입</p>
      </Link>
    </div>
  )
}

export default LoginForm