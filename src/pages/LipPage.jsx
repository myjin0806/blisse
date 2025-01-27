import React, { useState, useEffect } from 'react';

import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import BestNewProducts from '../components/BestNewProducts.jsx';
import Pagination from '../components/Pagination.jsx';

const LipPage = () => {
  const [sortOrder, setSortOrder] = useState('new'); // 초기 정렬 기준: 신상품
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(''); // 선택된 subCategory
  const [currentStoresPage, setCurrentStoresPage] = useState(1); // 페이지네이션

  // eyes 제품 필터링
  const lipProducts = products.filter((product) => product.category === 'lip');

  // subCategory에 따른 필터링
  const filteredProducts = selectedSubCategory
    ? lipProducts.filter((product) => product.subCategory === selectedSubCategory)
    : lipProducts;

    useEffect(() => {
      let sorted = [...lipProducts]; 
      if (selectedSubCategory) {
        sorted = sorted.filter((product) => product.subCategory === selectedSubCategory);
      }
      switch (sortOrder) {
        case 'new':
          sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'lowPrice':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'highPrice':
          sorted.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      setSortedProducts(sorted); // 상태 업데이트
    }, [sortOrder, selectedSubCategory]);
  /* 페이지네이션 */
  const itemsPerPage = 12;
  const indexOfLastStores = currentStoresPage * itemsPerPage;
  const indexOfFirstStores = indexOfLastStores - itemsPerPage;
  const currentStores = sortedProducts.slice(indexOfFirstStores, indexOfLastStores);
  const totalStoresPages = Math.ceil(sortedProducts.length / itemsPerPage);
  return (
    <div className='lips-page products-page'>
      {/* 상품 타이틀 */}
      <div className="products-title">
        <h2>립</h2>
        <ul className="products-list">
          <li
            onClick={() => setSelectedSubCategory('립스틱')}
            className={selectedSubCategory === '립스틱' ? 'active' : ''}
          >
            립스틱
          </li>
          <li
            onClick={() => setSelectedSubCategory('틴트')}
            className={selectedSubCategory === '틴트' ? 'active' : ''}
          >
            틴트
          </li>
          <li
            onClick={() => setSelectedSubCategory('글로즈')}
            className={selectedSubCategory === '글로즈' ? 'active' : ''}
          >
            글로즈
          </li>
          {/* <li
            onClick={() => setSelectedSubCategory('')} // 전체 보기
            className={selectedSubCategory === '' ? 'active' : ''}
          >
            전체
          </li> */}
        </ul>
      </div>
      {/* 인기, 신상품 */}
      <BestNewProducts />
      {/* 상품 목록 */}
      <div className="products-header">
        <div className="total-products">
          TOTAL <span>{filteredProducts.length}</span> ITEMS
        </div>
        <ul className="header-btns">
          <li onClick={() => setSortOrder('new')} className={sortOrder === 'new' ? 'active' : ''}>
            신상품
          </li>
          <li onClick={() => setSortOrder('name')} className={sortOrder === 'name' ? 'active' : ''}>
            상품명
          </li>
          <li onClick={() => setSortOrder('lowPrice')} className={sortOrder === 'lowPrice' ? 'active' : ''}>
            낮은가격
          </li>
          <li onClick={() => setSortOrder('highPrice')} className={sortOrder === 'highPrice' ? 'active' : ''}>
            높은가격
          </li>
        </ul>
      </div>
      <div className="products-items">
        {currentStores.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentStoresPage}
        totalPages={totalStoresPages}
        onPageChange={(page) => setCurrentStoresPage(page)}
      />
    </div>
  )
}

export default LipPage