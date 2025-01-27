import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/components/Review.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const Review = () => {
  const [isBeginning, setIsBeginning] = useState(true); 
  const [isEnd, setIsEnd] = useState(false); 

  const reviews = [
    {
      id: 1,
      ImageUrl: "/assets/images/main/Review01.jpg",
      title: '고정력 좋은 마스카라 추천!',
      content: '제가 아이메이크업 할 떄 신경쓰는 것 중 하나가 속눈썹인데,한동안 이 제품만 사용했을 때는 친구가 마스카라 뭐 쓰냐고 물어봤을 정도로 정말 컬링력 고정력이 짱짱합니다!',
      productImageUrl: "/assets/images/product/item10.jpg",
      rating: 5,
      author: '롱래쉬 워터프루프 마스카라',
    },
    {
      id: 2,
      ImageUrl: "/assets/images/main/Review02.jpg",
      title: '크림 제형의 블러셔 처음 쓰시는 분들께 강력 추천',
      content: '완전 크림타입의 제형이에요 그래서 손으로 누르면 패여버린답니다 하지만 아래에 째꼬마한 퍼프가 있어서 크림 제형의 블러셔를 처음 사용하시는 분들도 퍼프로 은은하게 표현 할 수 있어요 초보자 분들께 추천합니다',
      productImageUrl: "/assets/images/product/item4.jpg",
      rating: 4,
      author: '체리 블러쉬',
    },
    {
      id: 3,
      ImageUrl: "/assets/images/main/Review03.jpg",
      title: '부드러운 컨실러 추천!',
      content: '제가 사용해봤을 땐 확실히 엄청 부드럽고 얇고 밀착력까지 너무 좋았어요',
      productImageUrl: "/assets/images/product/item13.jpg",
      rating: 5,
      author: '스포트라이트 컨실러 스틱',
    },
    {
      id: 4,
      ImageUrl: "/assets/images/main/Review04.jpg",
      title: '속눈썹에 한 층 더 존재감을 주는 마스카라 추천',
      content: '제품이 정말직접 사용해보니 롱래쉬는 자연스러운 정도로 있고. 깔끔하게 발리면서 컬링이 짱짱하게 되는 타입! 볼륨을 기대하시는 분들에게는 적합하지 않지만, 나는 깔끔한게 좋다! 컬링이 짱짱한걸 원한다! 하시는 분들에게는 강력추천합니다! 좋아요. 다음에도 또 구매할 거예요.',
      productImageUrl: "/assets/images/product/item10.jpg",
      rating: 5,
      author: '롱래쉬 워터프루프 마스카라',
    },
    {
      id: 5,
      ImageUrl: "/assets/images/main/Review05.jpg",
      title: '피부에 밀착되듯 발리는 아이쉐도우추천',
      content: '매트 타입은 블리스 아이쉐도우답게 입자가 엄청 곱고 부드러워서 여러번 쌓아올려도 뭉치지 않아 화장에 어려움을 겪는 분들도 쉽게 아이메이크업을 연출하실수 있을거 같아요!',
      productImageUrl: "/assets/images/product/item8.jpg",
      rating: 4,
      author: '루나 섀도우 파레트',
    },
    {
      id: 6,
      ImageUrl: "/assets/images/main/Review06.jpg",
      title: '보송보송한 틴트추천!',
      content: '처음 바를때는 탱글 촉촉한 느낌이 가득해요.근데 바르고 10초 정도 지나면 보송보송한 제형이 된다. 매트까지는 아니고 벨벳~보송 정도의 느낌? 사실 나는 촉촉립이 어울리는 편이라 처음 발랐을 때의 제형을 더 좋아하긴 하지만 이런 제형을 좋아하시는 분들은 강력추천!',
      productImageUrl: "/assets/images/product/item5.jpg",
      rating: 5,
      author: '젤리 틴트 드롭',
    },
    {
      id: 7,
      ImageUrl: "/assets/images/main/Review07.jpg",
      title: '발색력 쩌는 립스틱 리얼후기',
      content: '이 제품 처음 발색하자마자 오 이거 발림성 뭐야?? 하고 놀랐어요 진짜 어마~어마하게 매끄럽고 부드럽게 발색되는데 미끄러지듯 발린다 라는 워딩이 딲 맞더라는 ㅋㅋ 그러면서 밀도 있게 올라오는 촘촘촘ㅎ나 발색력에 한 번 더 감탄.. 한번만 샥 그어줘도 여러번 바른 것 같은 풍부하고 선명한 발색 이 제품 꼭 써보세요!!',
      productImageUrl: "/assets/images/product/item5.jpg",
      rating: 5,
      author: '젤리 틴트 드롭',
    },
    {
      id: 8,
      ImageUrl: "/assets/images/main/Review08.jpg",
      title: '가볍게 픽싱되는 느낌이에요',
      content: '건성이고 피부에 잘 맞지않을까봐 걱정했는데 가벼우면서 커버력도 좋고 유지력도 좋네요 만족합니다.',
      productImageUrl: "/assets/images/product/item16.jpg",
      rating: 4,
      author: '벨벳 매트 쿠션',
    },
  ];

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning); 
    setIsEnd(swiper.isEnd); 
  };

  return (
    <div className="Review">
      <div className="Review-inner">
        <div className="Review-title">
          <h2>Review</h2>
          <p>실시간 리뷰로 확인하는 블리스 이야기</p>
        </div>
        <div className="ReviewSwiper">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              nextEl: '.custom-swiper-button-next', // 커스텀 다음 버튼
              prevEl: '.custom-swiper-button-prev', // 커스텀 이전 버튼
            }}
            loop={false}
            modules={[Navigation, Pagination]}
            onSlideChange={handleSlideChange} 
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-item">
                  <div className="review-imgBox">
                    <img src={review.ImageUrl} alt={review.title} />
                  </div>
                  <div className="review-text">
                    <h3 className="review-title">{review.title}</h3>
                    <p className="review-content">{review.content}</p>
                  </div>
                  <div className="review-infoBox">
                    <div className="review-productImg">
                      <img src={review.productImageUrl} alt={review.title} />
                    </div>
                    <div className="review-info">
                      <div className="review-rating">
                        {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                      </div>
                      <span className="review-author">{review.author}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 커스텀 네비게이션 버튼 */}
          <div
            className={`custom-swiper-button-prev ${isBeginning ? 'swiper-button-disabled' : ''}`}
          >
            <FaArrowLeft /> {/* 왼쪽 화살표 아이콘 */}
          </div>
          <div
            className={`custom-swiper-button-next ${isEnd ? 'swiper-button-disabled' : ''}`}
          >
            <FaArrowRight /> {/* 오른쪽 화살표 아이콘 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;