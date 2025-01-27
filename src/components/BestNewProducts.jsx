import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../styles/components/BestNewProducts.scss";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...rest }) => rest);
};

const BestNewProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const filteredBestProducts = products.filter((product) => product.isBest === true);
    const filteredNewProducts = products.filter((product) => product.isNew === true);

    setBestProducts(shuffleArray(filteredBestProducts).slice(0, 4));
    setNewProducts(shuffleArray(filteredNewProducts).slice(0, 4));
  }, []);

  return (
    <div className="best-new-wrap">
      {/* 베스트 상품 */}
      <div className="best-new-products">
        {bestProducts.map((product, index) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="best-new-product">
              <div className="best-new-img">
                <img src={product.imageUrl} alt={product.name} className="img" />
                <img src={product.hoverimageUrl} alt={`${product.name} hover`} className="hover-img" />
                <span className="bedge">Best {index + 1}</span>
              </div>
              <div className="best-new-desc">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>
                  <span>{product.price.toLocaleString()}원</span>
                  {product.discountprice.toLocaleString()}원
                </h4>
                <ul className="colors">
                  {product.colors.map((color, index) => (
                    <li key={index}>
                      <span style={{ backgroundColor: color }}></span>
                    </li>
                  ))}
                </ul>
                <div className="product-icon">
                  {product.isBest && (
                    <img src="/assets/images/product/ico_product_recommended.gif" alt="추천 아이콘" />
                  )}
                  {product.isNew && (
                    <img src="/assets/images/product/ico_product_new.gif" alt="신상품 아이콘" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* 신상품 */}
      <div className="best-new-products">
        {newProducts.map((product, index) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="best-new-product">
              <div className="best-new-img">
                <img src={product.imageUrl} alt={product.name} className="img" />
                <img src={product.hoverimageUrl} alt={`${product.name} hover`} className="hover-img" />
                <span className="bedge">New {index + 1}</span>
              </div>
              <div className="best-new-desc">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>
                  <span>{product.price.toLocaleString()}원</span>
                  {product.discountprice.toLocaleString()}원
                </h4>
                <ul className="colors">
                  {product.colors.map((color, index) => (
                    <li key={index}>
                      <span style={{ backgroundColor: color }}></span>
                    </li>
                  ))}
              </ul>
                <div className="product-icon">
                  {product.isBest && (
                    <img src="/assets/images/product/ico_product_recommended.gif" alt="추천 아이콘" />
                  )}
                  {product.isNew && (
                    <img src="/assets/images/product/ico_product_new.gif" alt="신상품 아이콘" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestNewProducts;