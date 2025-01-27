import React from 'react';
import '../styles/components/DetailMenu.scss';

const DetailMenu = ({ onMenuClick, activeTab }) => {
  const tabs = [
    { name: 'DETAILS', id: 'details' },
    { name: 'SHOPPING INFO', id: 'shopping-info' },
    { name: 'REVIEW', id: 'review' },
    { name: 'QNA', id: 'qna' },
  ];

  return (
    <ul className="detail-menu">
      {tabs.map((tab) => (
        <li key={tab.id} className={activeTab === tab.id ? 'active' : ''}>
          <button onClick={() => onMenuClick(tab.id)}>{tab.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default DetailMenu;
