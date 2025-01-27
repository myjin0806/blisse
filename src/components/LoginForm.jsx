import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (username === 'abc123' && password === 'abc123') {
      setErrorMessage('');
      const token = 'example-auth-token';
      localStorage.setItem('token', token);
      console.log('토큰 저장 완료:', token);
      navigate('/mypage');
    } else {
      setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <form className='login-form' onSubmit={handleLogin}>
        <h1 className='login-tit'>LOGIN</h1>

        <div className="login-area">
          <label className='id' title='아이디'>
          <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='아이디 (abc123)' className='login-input'/>
          </label>
          <label className='password' title='비밀번호'>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='비밀번호 (abc123)' className='login-input' />
          </label>
        </div>
        {/* error */}
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {/* login-btn */}
        <button type='submit' className='login-btn'>로그인</button>
        {/* find */}
        <div className="login-join">
          <Link to="/join-id">아이디 찾기</Link>
          <span>|</span>
          <Link to="/join-password">비밀번호 찾기</Link>
        </div>
        {/* register-area */}
        <div className="join-area">
          <p>
            아직 회원이 아니신가요? <br />
            회원님을 위한 다양한 혜택이 준비되어 있습니다.
          </p>
          <Link to="/join" className='join-btn'>회원가입</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm