import React from 'react';
import { useParams } from 'react-router-dom';
import lookbookData from '../data/LookBookData.json';
import '../styles/pages/LookBookDetailPage.scss';

const LookBookDetailPage = () => {
  const { id } = useParams();
  const look = lookbookData.find((item) => item.id === parseInt(id, 10));

  if (!look) {
    return <p>해당 콘텐츠를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="lookbook-detail-page">
      <div className="detail-container">
        {/* 대표 이미지 */}
        <div className="main-image">
          <img src={look.representativeImage} alt={look.title} />
        </div>

        {/* 상세 이미지와 설명 */}
        <div className="details">
          <h1>{look.title}</h1>
          <p>{look.details}</p>
          <div className="thumbnail-gallery">
            {look.images.map((img, index) => (
              <img key={index} src={img} alt={`${look.title} Thumbnail ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookBookDetailPage;
