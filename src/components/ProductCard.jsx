import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/components/ProductCard.scss";

/* icons */
import { GoThumbsup } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useCart } from "../components/CartContext"; // CartContext 추가

const ProductCard = ({ product }) => {
  const { id, name, description, price, discountprice, imageUrl, hoverimageUrl, isBest, isNew, colors } = product;

  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // CartContext에서 addToCart 함수 가져오기
  const { addToCart } = useCart();

  // 로컬 스토리지에서 초기 상태 가져오기
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(savedFavorites.includes(id));
  }, [id]);

  // 하트 클릭 핸들러
  const handleLikeClick = (e) => {
    e.preventDefault(); // 부모 `Link` 동작 방지
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (liked) {
      updatedFavorites = savedFavorites.filter((productId) => productId !== id);
    } else {
      updatedFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setLiked(!liked); // 상태 업데이트
  };

  // 장바구니 추가 핸들러
  const handleAddToCart = (e) => {
    e.preventDefault(); // 부모 `Link` 동작 방지
    addToCart({ ...product, quantity: 1 }); // 상품을 장바구니에 추가
    alert('상품이 장바구니에 추가되었습니다!');
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.1 } // 요소가 10% 보이면 트리거
    );

    const currentCardRef = cardRef.current;  // cardRef.current를 변수에 저장
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <Link to={`/products/${id}`}>
      <div
        className={`product-card ${isVisible ? "visible" : ""}`}
        key={id}
        ref={cardRef}
      >
        <div className="product-img">
          <img src={imageUrl} alt={name} className="img" />
          <img src={hoverimageUrl} alt={`${name} hover`} className="hover-img" />
          <div className="icon-wrap">
            <div>
              <GoThumbsup />
            </div>
            <div onClick={handleAddToCart}> {/* 장바구니 아이콘 클릭 이벤트 추가 */}
              <AiOutlineShopping />
            </div>
            <div>
              <IoIosSearch />
            </div>
            <div onClick={handleLikeClick} className="heart-icon">
              {liked ? <IoIosHeart style={{ color: "red" }} /> : <IoIosHeartEmpty />}
            </div>
          </div>
        </div>
        <div className="product-desc">
          <h3>{name}</h3>
          <p>{description}</p>
          <h4>
            <span>{price.toLocaleString()}원</span>
            {discountprice.toLocaleString()}원
          </h4>
          <ul className="colors">
            {colors.map((color, index) => (
              <li key={index}>
                <span style={{ backgroundColor: color }}></span>
              </li>
            ))}
          </ul>
          <div className="product-icon">
            {isBest && <img src="/assets/images/product/ico_product_recommended.gif" alt="추천 아이콘" />}
            {isNew && <img src="/assets/images/product/ico_product_new.gif" alt="신상품 아이콘" />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
