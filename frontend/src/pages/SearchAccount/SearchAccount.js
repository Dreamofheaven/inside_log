import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import SearchID from '../../components/SearchID';
import SearchPW from '../../components/SearchPW';
import './SearchAccount.css'

function SearchAccount({location, history}) {
    const [phone_number, setPhone_number] = useState('')

    const [isSearchID, setIsSearchID] = useState(false);
    const [isSearchPW, setIsSearchPW] = useState(false);
    
    const dispatch = useDispatch()
    const handleSearchID = () => {
        setIsSearchID(true);
    };

    const handleSearchPW = () => {
        setIsSearchPW(true);
    };
    const submitHandler = (e) => {
      e.preventDefault()
          dispatch(SearchAccount(phone_number))
      }
  return (
    <div className='search-wrap'>
        <div className='search-box'> 
            <input type="phone_number" name="phone_number" id="phone_number" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
            <div className='button-wrap'>
                <div className='register-button' onClick={handleSearchID}>아이디 찾기</div>
                {isSearchID && <SearchID phone_number={phone_number}/>}
                
                <div className='search-button' onClick={handleSearchPW}>비밀번호 초기화</div>
                {isSearchPW && <SearchPW />}
            </div>
        </div>
    </div>
  )
}

export default SearchAccount
