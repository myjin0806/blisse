import React from 'react';
import MainVisual from '../components/MainVisual';
import OurProduct from '../components/OurProduct';
import MakeupLook from '../components/MakeupLook';
import ProductSlider from '../components/ProductSlider';
import MDpickItem from '../components/MDpickItem';
import Review from '../components/Review';

const MainPage = () => {
  return (
    <main>
      <MainVisual />
      <OurProduct />
      <MakeupLook />
      <ProductSlider />
      <MDpickItem />
      <Review />
    </main>
  );
};

export default MainPage;