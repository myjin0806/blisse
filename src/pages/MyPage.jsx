import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/mypage.scss'

const MyPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    console.log('로그아웃 완료');
    navigate('/login'); 
  };
  return (
    <section className='mypage'>
      <div className="mypage-content">
        <div className="mypage-tit">
          <h1>MyPage</h1>
          <p>회원정보를 확인하세요.</p>
        </div>
        <div className="mypage-item">
          <div><h4>아이디</h4><span>blisse</span></div>
          <div><h4>이름</h4><span>블리스</span></div>
          <div><h4>생일</h4><span>2000.04.03</span></div>
          <div><h4>주소</h4><span>(06028) 서울특별시 강남구 압구정로 106 신사동 에스모드서울1</span></div>
          <div><h4>전화번호</h4><span>031-628-6380</span></div>
        </div>
        <div className="mypage-btn">
          <button className="membership">회원정보 수정</button>
          <button className="logout" onClick={handleLogout}>로그아웃</button>
          <button>탈퇴하기</button>
          
        </div>
      </div>
    </section>
  )
}

export default MyPage