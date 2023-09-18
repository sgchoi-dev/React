import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/useSlice";
import { changeCount, deleteItem } from "../store";
import { memo, useState } from "react";

let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>자식임</div>;
});

function Cart() {
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return (
    <div>
      <Child></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        렌더링테스트
      </button>
      {state.user.name} {state.user.age} 의 장바구니
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량변경</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.stock.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(changeCount(item.id));
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(deleteItem(item.id));
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
