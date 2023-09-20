/* 'use client' 라고 선언한 후 만든건 client component */

import age from "./data";

export default function Cart() {
  return (
    <div>
      {age}
      <h4 className="title">Cart</h4>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
    </div>
  );
}
