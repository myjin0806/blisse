import React, { useState } from "react";
import "../styles/pages/CartPage.scss";
import { useCart } from "../components/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [activeTab, setActiveTab] = useState("domestic");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempQuantities, setTempQuantities] = useState({});

  // 체크박스 상태 관리
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // 수량 증가/감소 처리
  const handleQuantityChange = (id, delta) => {
    setTempQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1), // 최소 수량 1
    }));
  };

  // 변경 버튼 클릭 시 수량 업데이트
  const handleApplyChanges = (id) => {
    const quantity = tempQuantities[id];
    if (quantity) {
      updateQuantity(id, quantity);
    }
  };

  // 선택 상품 삭제
  const handleDeleteSelected = () => {
    selectedItems.forEach((id) => removeFromCart(id));
    setSelectedItems([]);
  };

  const domesticItems = cartItems.filter((item) => item.shipping === "국내배송");
  const internationalItems = cartItems.filter((item) => item.shipping === "해외배송");

  // 총 상품금액 계산
  const totalProductPrice = domesticItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 총 배송비 계산 (예시: 무료)
  const totalShippingFee = 0;

  // 합계 계산
  const totalAmount = totalProductPrice + totalShippingFee;


  // 장바구니 전체 비우기
const clearCart = () => {
  cartItems.forEach((item) => removeFromCart(item.id));
};

// 견적서 출력 (예시: PDF 생성)
const generateQuotation = () => {
  const quotation = cartItems.map(
    (item) =>
      `상품명: ${item.name}, 수량: ${item.quantity}, 금액: ${(
        item.price * item.quantity
      ).toLocaleString()}원`
  );
  const blob = new Blob([quotation.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "견적서.txt";
  a.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="cart-page">
      <div className="cart-content">
        <div className="cart-header">
          <h1>CART</h1>
        </div>
        <div className="cart-container">
          <div className="cart-tabs">
            <button
              className={activeTab === "domestic" ? "active" : ""}
              onClick={() => setActiveTab("domestic")}
            >
              국내배송 상품 ({domesticItems.length})
            </button>
            <button
              className={activeTab === "international" ? "active" : ""}
              onClick={() => setActiveTab("international")}
            >
              해외배송 상품 ({internationalItems.length})
            </button>
          </div>

          {/* 일반상품 표시 */}
          <div className="general-products">
            <span>일반상품({domesticItems.length})</span>
          </div>

          {/* 상품 테이블 */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedItems(
                        e.target.checked ? domesticItems.map((item) => item.id) : []
                      )
                    }
                    checked={
                      selectedItems.length === domesticItems.length &&
                      domesticItems.length > 0
                    }
                  />
                </th>
                <th>이미지</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>상품구매금액</th>
                <th>할인금액</th>
                <th>적립금</th>
                <th>배송구분</th>
                <th>배송비</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === "domestic" ? (
                domesticItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>
                      <img src={item.imageUrl} alt={item.name} />
                    </td>
                    <td>
                      <div className="product-info">
                        <p>{item.name}</p>
                        <p className="options">
                          [옵션:{" "}
                          {item.colors && (
                            <span>{item.colors.map((color) => color).join(", ")}</span>
                          )}
                          {item.size && <span>{item.size}</span>}
                          {item.subCategory && <span>{item.subCategory}</span>}
                          ]
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-control">
                        <div className="input-group">
                          <input
                            type="number"
                            value={tempQuantities[item.id] || item.quantity}
                            onChange={(e) =>
                              setTempQuantities({
                                ...tempQuantities,
                                [item.id]: Math.max(parseInt(e.target.value, 10) || 1, 1),
                              })
                            }
                            min="1"
                          />
                          <div className="arrow-buttons">
                            <button onClick={() => handleQuantityChange(item.id, 1)}>▲</button>
                            <button onClick={() => handleQuantityChange(item.id, -1)}>▼</button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApplyChanges(item.id)}
                          className="apply-btn"
                        >
                          변경
                        </button>
                      </div>
                    </td>
                    <td>{(item.price * item.quantity).toLocaleString()}원</td>
                    <td>-</td> {/* 할인금액 */}
                    <td>-</td> {/* 적립금 */}
                    <td>기본배송</td> {/* 배송구분 */}
                    <td>무료</td> {/* 배송비 */}
                    <td>
                      <div className="action-buttons">
                        <button className="order-btn">주문하기</button>
                        <button className="wishlist-btn">관심상품등록</button>
                        <button
                          className="delete-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          상품삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    해외배송 상품이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 합계 부분 */}
          <div className="cart-summary">
            <div className="summary-row">
              <span className="shipping-info">[기본배송]</span>
              <div className="price-summary">
                <span>상품구매금액 <em>{totalProductPrice.toLocaleString()}</em></span>
                <span>+ 배송비 0(무료)</span>
                <span>= 합계: <em>{totalAmount.toLocaleString()}원</em></span>
              </div>
            </div>
          </div>

          <div className="cart-message">
            <img src="/assets/images/product/ico_info.gif" alt="ico_info" />
            <p>할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.</p>
          </div>

          {/* 버튼 섹션 */}
          <div className="cart-buttons">
            {/* 왼쪽 버튼 그룹 */}
            <div className="left-buttons">
              <p>선택상품을</p>
              <button
                onClick={handleDeleteSelected}
                className="primary"
              >
                삭제하기
              </button>
              <button
                onClick={() => setActiveTab("international")}
                className="secondary"
              >
                해외배송상품 장바구니로 이동
              </button>
            </div>

            {/* 오른쪽 버튼 그룹 */}
            <div className="right-buttons">
              <button
                onClick={() => clearCart()}
                className="secondary"
              >
                장바구니 비우기
              </button>
              <button
                onClick={() => generateQuotation()}
                className="secondary"
              >
                견적서 출력
              </button>
            </div>
          </div>

          {/* 총합 */}
          <table className="cart-summary2">
            <thead>
              <tr>
                <th>총 상품금액</th>
                <th>총 배송비</th>
                <th>결제예정금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalProductPrice.toLocaleString()}원</td>
                <td>+ 0 <span>원</span></td>
                <td>{totalAmount.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>

          <div className="cart-buttons-bottom">
          <div className="left-buttons">
            <button className="primary">전체상품주문</button>
            <button className="select">선택상품주문</button>
          </div>
          <div className="right-buttons">
            <button className="primary">쇼핑계속하기</button>
          </div>
          </div>

          {/* 이용안내 */}
          <div className="cart-info">
            <h3>이용안내</h3>
            <div className="info">
              <h4>장바구니 이용안내</h4>
              <ol>
                <li className="item">해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
                <li className="item">해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
                <li className="item">선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
                <li className="item">[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
                <li className="item">장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
                <li className="item">파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
              </ol>
              <h4>무이자할부 이용안내</h4>
              <ol>
                <li className="item">상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
                <li className="item">[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
                <li className="item">단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
                <li className="item">무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에 표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.<br/>
                실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서 하단의 배송비 정보를 참고해주시기 바랍니다.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;