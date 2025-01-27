import React from 'react'
import '../styles/components/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className='footer-warp'>
        <div className="footer-text-box">
          <div className="text-left">
            <img src="/assets/images/Blissé-Logo.png" alt="Logo" />
            <p className="address">
              상호명: 블리스 &nbsp; 대표: 대표자명 &nbsp; 대표전화: 02-0000-0000<br />
              사업자등록번호: 000-0000-000 &nbsp; 통신판매업: 제2025-서울강남-01234호<br />
              주소: 06028 서울특별시 강남구 압구정로 106 신사동 에스모드서울1 
            </p>
            <p className='copyright'>COPYRIGHT © 블리스 ALL RIGHT RESERVED. DESIGN BY ANDESIGN.</p>
          </div>
          <div className="text-right">
            <div className="footer-info">
              <ul>
                <li>회사소개</li>
                <li>이용안내</li>
                <li><strong>개인정보처리방침</strong></li>
                <li>이용약관</li>
              </ul>
            </div>
            <div className="footer-service">
              <ul className="user-menu">
                <li><p class="title">고객센터 운영시간</p></li>
                <li><p class="number">02-0000-0000</p></li>
                <li><p class="runtime">
                  평일 10:00 ~ 17:00 (주말 및 공휴일 휴무)<br />
                  점심 시간 : 12:00 ~ 13:00
                </p></li>
              </ul>
              <ul className="user-menu">
                <li>facebook</li>
                <li>instagram</li>
                <li>kakaotalk</li>
                <li>blog</li>
              </ul>
              <ul className="user-menu">
                <li>마이페이지</li>
                <li>주문내역조회</li>
                <li>장바구니</li>
                <li>위시리스트</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;