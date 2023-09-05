import React  from 'react'
import '../css/LoginForm.css'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../actions/userActions'

function Logout() {
    const userLogin = useSelector(state => state=>state.userLogin)
    const dispatch =useDispatch()

    const logOut = () => {
        dispatch(logout())
        console.log('로그아웃 버튼 누름')
    };
    return (
        <div className='logOut'>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Logout
