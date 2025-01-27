import React, { useState } from 'react';
import '../styles/pages/JoinPage.scss';

const JoinPage = () => {
  // id - error
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const validateUsername = (value) => {
    const usernameRegex = /^[a-z0-9]{4,16}$/;
    if (!usernameRegex.test(value)) {
      setError('아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.');
    } else {
      setError('');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  // checkbox
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAllChecked = (e) => {
    const isChecked = e.target.checked;
    setAgreements({
      all: isChecked,
      terms: isChecked,
      privacy: isChecked,
      marketing: isChecked,
    });
  };

  const handleIndividualChecked = (e, key) => {
    const isChecked = e.target.checked;
    const updatedAgreements = { ...agreements, [key]: isChecked };
    updatedAgreements.all =
      updatedAgreements.terms && updatedAgreements.privacy && updatedAgreements.marketing;
    setAgreements(updatedAgreements);
  };

  return (
    <section className="join-page">
      <div className="join-content">
        <h1 className="title">회원 가입</h1>
        <form className="join-form">
          {/* 아이디 */}
          <div className="form-group">
            <label htmlFor="username">
              아이디 <span>*</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="영문 소문자/숫자, 4~16자"
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleBlur}
              className={isTouched && error ? 'input-error' : ''}
            />
            {isTouched && error && <p className="error-message">{error}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label htmlFor="password">
              비밀번호 <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label htmlFor="confirm-password">
              비밀번호 확인 <span>*</span>
            </label>
            <input type="password" id="confirm-password" placeholder="비밀번호 확인" />
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="name">
              이름 <span>*</span>
            </label>
            <input type="text" id="name" placeholder="이름" />
          </div>

          {/* 휴대전화 */}
          <div className="form-group phone-group">
            <label htmlFor="phone">
              휴대전화 <span>*</span>
            </label>
            <div className="phone-inputs">
              <select id="phone-prefix">
                <option value="010">010</option>
                <option value="011">011</option>
              </select>
              <input type="text" placeholder="1234" />
              <input type="text" placeholder="5678" />
            </div>
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="이메일" />
          </div>

          {/* 동의 체크박스 */}
          <div className="agreements">
            <label>
              <input
                type="checkbox"
                checked={agreements.all}
                onChange={handleAllChecked}
              />{' '}
              <strong>전체 동의</strong>
            </label>
            <p>이용약관 및 개인정보 수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</p>
            <div className="agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={(e) => handleIndividualChecked(e, 'terms')}
                />{' '}
                [필수] 이용약관 동의
              </label>
              <textarea readOnly>이용약관 내용이 여기에 표시됩니다.</textarea>
            </div>
            <div className="agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreements.privacy}
                  onChange={(e) => handleIndividualChecked(e, 'privacy')}
                />{' '}
                [필수] 개인정보 수집 및 이용 동의
              </label>
              <textarea readOnly>개인정보 수집 및 이용 동의 내용이 여기에 표시됩니다.</textarea>
            </div>
            <div className="agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreements.marketing}
                  onChange={(e) => handleIndividualChecked(e, 'marketing')}
                />{' '}
                [선택] 쇼핑정보 수신 동의
              </label>
              <textarea readOnly>쇼핑정보 수신 동의 내용이 여기에 표시됩니다.</textarea>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="join-button"
            disabled={!agreements.terms || !agreements.privacy || !!error}
          >
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinPage;
