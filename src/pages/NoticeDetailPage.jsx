import React from 'react';
import { useParams } from 'react-router-dom';

const notices = [
  {
    id: 1,
    title: '앤디자인 출시 예정일 발표',
    author: '앤디자인',
    date: '2022-08-14 16:13:35',
    content: '앤디자인의 출시 예정일은 2022년 8월 20일입니다.',
  },
  {
    id: 2,
    title: '고객감사 이벤트 오픈',
    author: '앤디자인',
    date: '2022-08-14 16:17:52',
    content: '고객감사 이벤트를 2022년 8월 25일부터 진행합니다.',
  },
  {
    id: 3,
    title: '홈페이지 리뉴얼 소식',
    author: '앤디자인',
    date: '2022-08-14 16:17:23',
    content: '앤디자인 홈페이지가 2022년 8월 18일 리뉴얼됩니다.',
  },
];

const NoticeDetailPage = () => {
  const { id } = useParams();
  const notice = notices.find((n) => n.id === parseInt(id));

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="notice-detail-page">
      <h1>{notice.title}</h1>
      <p>{notice.author} | {notice.date}</p>
      <div className="content">{notice.content}</div>
    </div>
  );
};

export default NoticeDetailPage;
