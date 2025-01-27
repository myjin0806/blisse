import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom'; 
import MainPage from './pages/MainPage'; 
import LookBookPage from './pages/LookBookPage'; 
import LookBookDetailPage from './pages/LookBookDetailPage';
import LoginPage from './pages/LoginPage'; 
import OrderPage from './pages/OrderPage'; 
import JoinPage from './pages/JoinPage'; 
import MyPage from './pages/MyPage'; 
import CartPage from './pages/CartPage';

/* products */
import EyesPage from './pages/EyesPage'
import LipPage from './pages/LipPage'
import FacePage from './pages/FacePage'
import ProductDetailPage from './pages/ProductDetailPage'

/* community */
import NoticePage from './pages/NoticePage';

// CartContext
import { CartProvider } from './components/CartContext';

// localStrorage
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('토큰 확인:', token);
  return !!token;
};

// myPage
const PrivateRoute = ({ children }) => {
  if (isAuthenticated()) {
    console.log('인증됨: MyPage로 이동');
    return children;
  } else {
    console.log('비인증 상태: Login으로 이동');
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/eyes" element={<EyesPage />} />
          <Route path="/products/lip" element={<LipPage />} />
          <Route path="/products/face" element={<FacePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/lookbook" element={<LookBookPage />} />
          <Route path="/lookbook/:id" element={<LookBookDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/mypage" element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          } />
          <Route path="/community/:id" element={<NoticePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;