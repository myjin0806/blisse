import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowRight } from "react-icons/fa6";

// Swiper 스타일 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import '../styles/components/MainVisual.scss';

// 슬라이드 데이터 배열 (이미지 경로 포함)
const slideData = [
  {
    image: "/assets/images/main/main-visual01.jpg",
    subtitle: "#강력 #워터프루프 #아이라이너",
    title: "물놀이에도 끄떡없이,<br> 지워지지않는 아이라이너",
  },
  {
    image: "/assets/images/main/main-visual02.jpg",
    subtitle: "#깨끗하고 #맑고 #자신있게",
    title: "건강과 피부를 위한 작은습관,<br> 피부 본연의 힘을 지키세요",
  },
  {
    image: "/assets/images/main/main-visual03.jpg",
    subtitle: "#데일리 #베이스 #파우더",
    title: "뽀송한 마무리감으로<br> 매일 사용할 수 있는 파우더",
  },
  {
    image: "/assets/images/main/main-visual04.jpg",
    subtitle: "#가볍게 #픽싱 #파운데이션",
    title: "더 강력해진 픽싱,<br> 24시간 커버 유지 파운데이션",
  },
];

const App = () => {
  const [isLastSlide, setIsLastSlide] = useState(false);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      direction="vertical"
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      onReachEnd={() => setIsLastSlide(true)} // 마지막 슬라이드에 도달하면 상태 업데이트
      style={{ height: '100vh' }} // 높이를 고정
    >
      {slideData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="swiper-wrap">
            <img src={slide.image} alt={`Main Visual ${index + 1}`} />
            <div className="text-container">
              <p dangerouslySetInnerHTML={{ __html: slide.subtitle }}></p>
              <h1 dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
              <a href="#none" className="more">
                MORE VIEW <FaArrowRight className="visual-more" />
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {isLastSlide && (
        <div className="last-slide-message">
          <p>마지막 슬라이드입니다.</p>
        </div>
      )}
    </Swiper>
  );
};

export default App;