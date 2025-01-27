import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/NoticePage.scss';

const notices = [
  {
    id: 1,
    title: '앤디자인 출시 예정일 발표',
    author: '앤디자인',
    date: '2022-08-14 16:13:35',
    image: '/assets/images/community/main-1.jpg',
  },
  {
    id: 2,
    title: '고객감사 이벤트 오픈',
    author: '앤디자인',
    date: '2022-08-14 16:17:52',
    image: '/assets/images/community/main-2.jpg',
  },
  {
    id: 3,
    title: '홈페이지 리뉴얼 소식',
    author: '앤디자인',
    date: '2022-08-14 16:17:23',
    image: '/assets/images/community/main-3.jpg',
  },
];

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState('all');
  const [searchField, setSearchField] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const noticesPerPage = 3;

  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * noticesPerPage;

  // 필터링 및 검색
  const filteredNotices = notices.filter((notice) => {
    if (searchQuery) {
      return notice[searchField]?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const currentNotices = filteredNotices.slice(startIndex, startIndex + noticesPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <section className="notice-page">
      <div className="notice">
        <h1 className="title">NOTICE</h1>
        <p className="subtitle">갤러리 게시판을 이용해 만든 공지 게시판 입니다.</p>
        <div className="notice-list">
          {currentNotices.map((notice) => (
            <div className="notice-item" key={notice.id}>
              <Link to={`/community/${notice.id}`}>
                <img src={notice.image} alt={notice.title} />
                <div className="notice-info">
                  <h2 className="notice-title">{notice.title}</h2>
                  <div className="notice-desc">
                    <p className="notice-author">{notice.author}</p>
                    <p className="notice-date">{notice.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {currentNotices.length === 0 && <p>검색 결과가 없습니다.</p>}
        </div>
        <div className="search-bar">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="three-months">세달</option>
            <option value="all">전체</option>
          </select>
          <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="author">글쓴이</option>
            <option value="id">아이디</option>
            <option value="nickname">별명</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>검색하기</button>
        </div>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticePage;
