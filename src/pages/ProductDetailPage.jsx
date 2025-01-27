import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/pages/ProductDetailPage.scss';
import '../styles/mixin.scss';
import products from '../data/products.json';
import DetailMenu from '../components/DetailMenu';
import { GoThumbsup } from "react-icons/go";
import { useCart } from '../components/CartContext';

const ProductDetailPage = () => {
  const zoomBoxRef = useRef(null);
  const BigimgRef = useRef(null);
  const [imgWrapMouseIn, setImgWrapMouseIn] = useState(false);

  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id, 10));

  // 좋아요 카운트 상태 관리
  const [likeCount, setLikeCount] = useState(0);

  // 선택된 색상 상태 관리
  const [selectedColor, setSelectedColor] = useState(null); // 추가된 부분

  // 로컬스토리지에서 초기 좋아요 카운트 가져오기
  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    setLikeCount(likes[id] || 0);
  }, [id]);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = () => {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    likes[id] = (likes[id] || 0) + 1; // 카운트 증가
    localStorage.setItem('likes', JSON.stringify(likes));
    setLikeCount(likes[id]);
  };

  // CartContext에서 addToCart 함수 가져오기
  const { addToCart } = useCart();

  // 장바구니 추가 핸들러
  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('색상을 선택해 주세요.'); // 색상이 선택되지 않았을 때 알림
      return;
    }
    addToCart({ ...product, selectedColor }); // 선택된 색상을 포함하여 장바구니에 추가
    alert('상품이 장바구니에 추가되었습니다!');
  };

  // 색상 선택 핸들러
  const handleColorSelect = (color) => {
    setSelectedColor(color); // 선택된 색상 업데이트
  };

  // 각 섹션의 ref 생성
  const detailsRef = useRef(null);
  const shoppingInfoRef = useRef(null);
  const reviewRef = useRef(null);
  const qnaRef = useRef(null);

  const handleMenuClick = (sectionId) => {
    const sectionRefs = {
      details: detailsRef,
      'shopping-info': shoppingInfoRef,
      review: reviewRef,
      qna: qnaRef,
    };

    const targetRef = sectionRefs[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 상품이 로드되지 않았을 때 처리
  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  // product 객체 구조 분해 할당
  const { name, description, imageUrl, hoverimageUrl, price, discountprice, isBest, isNew, shipping, colors } = product;

  return (
    <div className='product-detail-page'>
      <div className="product-detail-area">
        {/* 이미지 */}
        <div className="product-image">
          <div className="img-wrap" 
            onMouseEnter={()=>{
              setImgWrapMouseIn(true);
            }}
            onMouseLeave={()=>{
              setImgWrapMouseIn(false);
            }}
            onMouseMove={(e) => {
              let [positionX, positionY] = [0, 0];
              if (zoomBoxRef.current !== null && BigimgRef.current !== null) {
                const mouseX = e.nativeEvent.offsetX;
                const mouseY = e.nativeEvent.offsetY;
                const zoomBoxWidth = zoomBoxRef.current.offsetWidth;
                const zoomBoxHeight = zoomBoxRef.current.offsetHeight;
                const imgWrapWidth = zoomBoxRef.current.parentElement.offsetWidth;
                const imgWrapHeight = zoomBoxRef.current.parentElement.offsetHeight;
            
                // zoomBox 위치 계산
                if (mouseX < zoomBoxWidth / 2) {
                  positionX = zoomBoxWidth / 2;
                } else if (mouseX + zoomBoxWidth / 2 > imgWrapWidth) {
                  positionX = imgWrapWidth - zoomBoxWidth / 2;
                } else {
                  positionX = mouseX;
                }
            
                if (mouseY < zoomBoxHeight / 2) {
                  positionY = zoomBoxHeight / 2;
                } else if (mouseY + zoomBoxHeight / 2 > imgWrapHeight) {
                  positionY = imgWrapHeight - zoomBoxHeight / 2;
                } else {
                  positionY = mouseY;
                }
            
                // 확대 이미지 위치 계산
                const translateX = ((positionX / imgWrapWidth) - 0.5) * -100 * 2 / 3; // 반대 방향 보정
                const translateY = ((positionY / imgWrapHeight) - 0.5) * -100 * 2 / 3; // 반대 방향 보정
            
                // 업데이트
                setTimeout(() => {
                  BigimgRef.current.children[0].style.transform = `scale(1.5) translate(${translateX}%, ${translateY}%)`;
                  zoomBoxRef.current.style.top = `${positionY}px`;
                  zoomBoxRef.current.style.left = `${positionX}px`;
                }, 50);
              }
            }}
          >
            <div className="zoom-box" 
              style={{display: imgWrapMouseIn ? 'block':'none'}}
              ref={zoomBoxRef}
            ></div>
            <img src={imageUrl} alt={name} />
            <img src="/assets/images/product/mousehoverimg.png" alt="마우스를 올려보세요" style={{display: imgWrapMouseIn ? 'none':'block'}} className='mouse-img'/>
            <div className="big-img-wrap" 
              style={{display: imgWrapMouseIn ? 'block' : 'none'}}
              ref={BigimgRef}>
              <img src={imageUrl} alt={name} />
            </div>
          </div>
          <div className="like-area">
            <button className="white-btn like-btn" onClick={handleLike}>
              <p>좋아요</p> | 
              <span className="like-count"><GoThumbsup/>{likeCount}</span>
            </button>
          </div>
        </div>
        {/* 상품 정보 */}
        <div className="product-info">
          {/* 머리 */}
          <div className="info-head">
            <h3>{name}{isBest && <img src="/assets/images/product/ico_product_recommended.gif" alt="추천 아이콘" />}{isNew && <img src="/assets/images/product/ico_product_new.gif" alt="신상품 아이콘" />}</h3>
            <p>{description}</p>
            <h4><span>{price.toLocaleString()}원</span>{discountprice.toLocaleString()}원</h4>
          </div>
          {/* 몸통 */}
          <table className="info-table">
            <tbody>
              <tr>
                <th>국내·해외배송</th>
                <td>{shipping}</td>
              </tr>
              <tr>
                <th>배송방법</th>
                <td>택배</td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>2,500원 (50,000원 이상 구매 시 무료)</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>
                  <ul className="colors">
                    {colors && colors.length > 0 ? (
                      colors.map((color, index) => (
                        <li key={index}>
                          <span
                            style={{
                              backgroundColor: color || "transparent",
                              border: selectedColor === color ? '2px solid #000' : '1px solid #d7d7d7', // 선택된 색상 강조
                            }}
                            onClick={() => handleColorSelect(color)} // 추가된 부분: 색상 선택 핸들러
                          ></span>
                        </li>
                      ))
                    ) : (
                      <li>색상 정보 없음</li>
                    )}
                  </ul>
                  <em>[필수] 옵션을 선택해 주세요</em>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="info-total">
            <p>(최소주문수량 1개 이상)</p>
            <b>위 옵션선택 박스를 선택하시면 아래에 상품이 추가됩니다.</b>
            <p className="total-price">TOTAL: {discountprice.toLocaleString()}원 (<span>1</span>개)</p> {/* 추가된 부분: 선택된 색상에 따라 가격 업데이트 */}
          </div>
          <div className="cart-buy-btns">
            <button className='white-btn' onClick={handleAddToCart}>ADD CART</button>
            <button className='white-btn'>WISH LIST</button>
            <button className='black-btn'>BUY IT NOW</button>
          </div>
        </div>
      </div>
      {/* 상세 정보 */}
      <div ref={detailsRef} id="details" className="detail-banner">
        <DetailMenu onMenuClick={handleMenuClick} activeTab="details" />
        <img src={hoverimageUrl} alt={name} />
      </div>
      {/* 쇼핑 인포 */}
      <div ref={shoppingInfoRef} id="shopping-info" className="shopping-info">
        <DetailMenu onMenuClick={handleMenuClick} activeTab="shopping-info" />
        <div>
          <h4>상품결제정보</h4>
          <p>
            고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.  
            <br/><br/>
            무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.<br/>
            주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
          </p>
        </div>
        <div>
          <h4>배송정보</h4>
          <p>
            배송 방법 : 택배<br/>
            배송 지역 : 전국지역<br/>
            배송 비용 : 2,500원<br/>
            배송 기간 : 3일 ~ 7일<br/>
            배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.<br/>
            고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.<br/>
          </p>
        </div>
        <div>
          <h4>교환 및 반품정보</h4>
          <p>
            교환 및 반품이 가능한 경우<br/>
            - 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.<br/>
            - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내<br/><br/>
            교환 및 반품이 불가능한 경우<br/>
            - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외<br/>
            - 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우<br/>
            (예 : 가전제품, 식품, 음반 등, 단 액정화면이 부착된 노트북, LCD모니터, 디지털 카메라 등의 불량화소에 따른 반품/교환은 제조사 기준에 따릅니다.)<br/>
            - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 단, 화장품등의 경우 시용제품을 제공한 경우에 한 합니다.<br/>
            - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우<br/>
            - 복제가 가능한 상품등의 포장을 훼손한 경우<br/>
            (자세한 내용은 고객만족센터 1:1 E-MAIL상담을 이용해 주시기 바랍니다.)<br/><br/>
            ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.<br/>
            (색상 교환, 사이즈 교환 등 포함)<br/><br/>
            <Link>서비스 문의</Link>
          </p>
        </div>
      </div>
      {/* 리뷰 */}
      <div ref={reviewRef} id="review" className="review">
        <DetailMenu onMenuClick={handleMenuClick} activeTab="review" />
        <div className="detail-title">
          <h3>REVIEW</h3>
          <p>상품의 사용후기를 적어주세요</p>
        </div>
        <div className="review-area none">
          <p>
            상품의 사용후기가 없습니다.
          </p>
        </div>
        <div className="detail-btns">
          <button className='white-btn'>후기쓰기</button>
          <button className='black-btn'>모두 보기</button>
        </div>
      </div>
      {/* QNA */}
      <div ref={qnaRef} id="qna" className="qna">
        <DetailMenu onMenuClick={handleMenuClick} activeTab="qna" />
        <div className="detail-title">
          <h3>Q&A</h3>
          <p>상품에 대해 궁금한 점을 해결해 드립니다.</p>
        </div>
        <div className="qna-area none">
          <p>
            게시물이 없습니다.
          </p>
        </div>
        <div className="detail-btns">
          <button className='white-btn'>문의하기</button>
          <button className='black-btn'>모두 보기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;