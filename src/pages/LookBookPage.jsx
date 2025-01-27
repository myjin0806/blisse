import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import lookbookData from '../data/LookBookData.json';
import '../styles/pages/LookBookPage.scss';

const LookBookPage = () => {
  const calculateLayout = () => {
    const items = document.querySelectorAll('.look-item');
    const container = document.querySelector('.look-list');

    // mediaQuery
    const containerWidth = container.offsetWidth;
    const columnCount = containerWidth > 1024 ? 3 : containerWidth > 768 ? 2 : 1; 
    const columnHeights = Array(columnCount).fill(0); // 각 열의 현재 높이 저장
    const columnGap = 16;

    items.forEach((item) => {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const x = (containerWidth / columnCount) * columnIndex;
      const y = columnHeights[columnIndex];

      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      columnHeights[columnIndex] += item.offsetHeight + columnGap;
    });

    container.style.position = 'relative';
    container.style.height = `${Math.max(...columnHeights)}px`;
  };

  useEffect(() => {
    const handleImagesLoaded = () => {
      calculateLayout();
    };
  
    // load
    const images = document.querySelectorAll('.look-item img');
    let loadedCount = 0;
    const totalCount = images.length;
  
    images.forEach((img) => {
      if (img.complete) {
        loadedCount += 1;
      } else {
        img.addEventListener('load', () => {
          loadedCount += 1;
          if (loadedCount === totalCount) {
            handleImagesLoaded();
          }
        });
      }
    });
  
    // resize
    if (loadedCount === totalCount) {
      handleImagesLoaded();
    }
  
    window.addEventListener('resize', calculateLayout);
  
    return () => {
      window.removeEventListener('resize', calculateLayout);
    };
  }, []);
  

  return (
    <section className="lookbook-page">
      <ul className="look-list">
        {lookbookData.map((look) => (
          <li key={look.id} className="look-item">
            <Link to={`/lookbook/${look.id}`}>
              <div className="look-img">
                <img src={look.representativeImage} alt={look.title} />
              </div>
              <div className="look-info">
                <h3 className="look-tit">{look.title}</h3>
                <p className="look-desc">{look.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LookBookPage;
