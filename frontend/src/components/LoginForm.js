import React from 'react'
import '../css/LoginForm.css'
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <div className='form'>
      <input type="text" name="email" id="email" />
      <input type="text" name="password" id="password" />
      <button type="submit">로그인</button>
      <Link to={'/register'}>
        <p className='register'>회원가입</p>
      </Link>
    </div>
  )
}

export default LoginForm
