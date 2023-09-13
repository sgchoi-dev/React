import { useContext, useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Context1 } from "./../App";

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

const Detail = () => {
  let { 재고, shoes } = useContext(Context1);

  let { id } = useParams();
  let matchedItem = shoes.find((x) => {
    return x.id.toString() === id;
  });
  let [alertVisible, setAlertVisible] = useState(true);
  let [inputAlertVisible, setInputAlertVisible] = useState(false);
  let [num, setNum] = useState("");
  let [count, setCount] = useState(0);
  let [tab, setTab] = useState(0);
  let [variable, setVariable] = useState("");

  useEffect(() => {
    setVariable("loaded");

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
    <div className={"container " + variable}>
      {재고}
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

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link0">
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="link1">
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="link2">
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} />
    </div>
  );
};

function TabContent({ tab }) {
  let { 재고 } = useContext(Context1);
  let [fade, setFade] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
