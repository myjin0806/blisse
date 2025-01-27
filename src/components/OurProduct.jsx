import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import '../styles/components/OurProduct.scss';

function ControlledTabsExample() {
  const [key, setKey] = useState('BEST');

  const bestProducts = products.filter((product) => product.isBest);
  const newProducts = products.filter((product) => product.isNew);

  const getFirstFour = (products) => products.filter((_, index) => index < 4);

  const displayedBestProducts = getFirstFour(bestProducts);
  const displayedNewProducts = getFirstFour(newProducts);

  return (
    <div className="tab_product">
      <div className="tab-title">
        <h2>Our Product</h2>
        <p>Blissé의 베스트상품과 신상품을 만나보세요</p>
      </div>
      <div className="tab_category">
        
        <div className="tab-menu">
          <button
            className={`tab-button ${key === 'BEST' ? 'active' : ''}`}
            onClick={() => setKey('BEST')}
          >
            BEST
          </button>
          <div className='line'></div>
          <button
            className={`tab-button ${key === 'NEW' ? 'active' : ''}`}
            onClick={() => setKey('NEW')}
          >
            NEW
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          <div className="tab-content-inner">
          {key === 'BEST' && (
            <div className="product-list">
              {displayedBestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {key === 'NEW' && (
            <div className="product-list">
              {displayedNewProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlledTabsExample;
