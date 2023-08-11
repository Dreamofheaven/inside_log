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
      console.log('이미 있는 회원입니다.')
      history.push(redirect)
    }
  // }, [history, userInfo])
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='form'>
      {error && <Message variant='danger'>{error}</Message>}

      <form onSubmit={submitHandler}>
        <input type="text" name="email" id="email" placeholder='Enter Email'  onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" id="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      <Link to={'/register'}>
        <p className='register'>회원가입</p>
      </Link>
    </div>
  )
}

export default LoginForm