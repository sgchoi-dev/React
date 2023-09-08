import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button`
  background: ${(props) => (props.bg ? props.bg : "yellow")};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

let NewBtn = styled.button(YellowBtn);

const Detail = ({ shoes }) => {
  let { id } = useParams();
  let matchedItem = shoes.find((x) => {
    return x.id.toString() === id;
  });
  let [alertVisible, setAlertVisible] = useState(true);
  let [inputAlertVisible, setInputAlertVisible] = useState(false);
  let [num, setNum] = useState("");
  let [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);

    return () => {
      // unmount 될 때 실행
      // useEffect 동작 전에 실행되는 부분 (기존 코드 치우는 내용을 여기 주로 적음)
    };
  }, []); // [] : mount 시 한 번만 실행

  useEffect(() => {
    if (isNaN(num)) {
      setInputAlertVisible(true);
    } else {
      setInputAlertVisible(false);
    }
  }, [num]);

  return (
    <div className="container">
      <Box>
        <YellowBtn>버튼</YellowBtn>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <NewBtn>버튼</NewBtn>
      </Box>

      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
      >
        버튼
      </button>

      <div>
        {alertVisible ? (
          <div className="alert alert-warning">2초 이내 구매 시 할인</div>
        ) : null}
      </div>

      <div>
        {inputAlertVisible ? (
          <div className="alert alert-danger">경고: 숫자만 입력하세요</div>
        ) : null}
      </div>

      <div>
        <input
          onChange={(e) => {
            setNum(e.target.value);
          }}
          type="text"
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{matchedItem.title}</h4>
          <p>{matchedItem.content}</p>
          <p>{matchedItem.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
