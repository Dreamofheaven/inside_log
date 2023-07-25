import React from 'react'

function LoginForm() {
  return (
    <div className='form'>
      <input type="text" name="email" id="email" />
      <input type="text" name="password" id="password" />
      <button type="submit">로그인</button>
    </div>
  )
}

export default LoginForm
