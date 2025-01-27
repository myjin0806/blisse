import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/pages/LoginPage.scss';

const OrderPage = () => {
  return (
    <section className='order-page'>
      <div className="order">
        <LoginForm/>
        <form className="order-form">
          <p>비회원의 경우, 주문시의 주문번호로 <em>주문조회</em>가 가능합니다.</p>
          <div className="form-group">
            <label htmlFor="user-name">주문자명</label>
            <input type="text" id="user-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="order-number">주문번호</label>
            <input type="text" id="order-number" placeholder="주문번호" />
          </div>
          <div className="form-group">
            <label htmlFor="order-password">비회원주문 비밀번호</label>
            <input type="password" id="order-password" />
          </div>
          <button type="submit" className="order-button">주문조회</button>
        </form>
      </div>
    </section>
  );
};

export default OrderPage;