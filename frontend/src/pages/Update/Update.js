import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants'
import { Link } from 'react-router-dom'
import './Update.css'

function Update() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message, setMessage] = useState('')
    const [showAlert, setShowAlert]=useState(false) //추가

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.details)
    const { error, loading, user } = userDetails

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

    useEffect(() => {
        if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile')) 
                // console.log('getUser디테일 실행됨')
            } else {
                setName(user.name)
                setEmail(user.email)
                setPhone_number(user.phone_number)
            }
    }, [dispatch, userInfo, user, success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
            setShowAlert(false)
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'phone_number':phone_number,
                'password': password
            }))
            setMessage('')
            setShowAlert(true) //추가
        }
    }
  return (
    <div>
        <div className='update-page'> 
            <h1>정보변경</h1> 
            {message && <span>{message}</span>}
            {password == confirmPassword && showAlert && (
                <div className='alert alert-success' role='alert'>
                    내용이 성공적으로 변경되었습니다.
                </div>
            )}
            <form onSubmit={submitHandler}>
                <input type="email" name="email" id="email" value={email} disabled onChange={(e) => setEmail(e.target.value)} className='not-modify' />
                <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="phone_number" name="phone_number" id="phone_number" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder='비밀번호 확인' onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className='btn-container'>
                    <div className='btn-warp'>
                        <Link to="/main" className="btn btn-back">
                            <button>뒤로가기</button>
                        </Link>
                    </div>
                    <div className='btn-warp'>
                        <button type="submit" className="btn btn-submit">변경하기</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Update
