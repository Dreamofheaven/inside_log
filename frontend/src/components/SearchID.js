import React, { Component, useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SearchID({ phone_number }) {
    const [result, setResult]=useState('');

    // 모달
    // const [modalOpen, setModalOpen] = 

    useEffect(()=> { 
        async function fetchData() {
            try{
                const response = await axios.post('http://localhost:8000/accounts/search_id/',{
                    phone_number: phone_number,
                });
                const data=response.data;
                console.log(data.id) 
                if (data.length==0){
                    alert('일치하는 데이터가 없습니다 \n다시 확인해주세요.');
                } else {
                    setResult(data);
                }
            } catch(error){
                console.error('검색 중 오류 발생: ',error)
            }
        }
        fetchData();
    },[phone_number]);
  return (
    <div>
        <div>
            <p>당신의 아이디는{phone_number}입니다.</p>
        </div>
        {/* <SearchAccount /> */}
        <Link to={'/'} className="links">
            <div className='back-button'>돌아가기</div>
        </Link>
    </div>
  )
}

export default SearchID
