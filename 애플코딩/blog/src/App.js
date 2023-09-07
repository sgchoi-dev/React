import { render } from "@testing-library/react";
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

function App() {
  let post = "강남 우동 맛집";
  let [글제목, 글제목바꾸기] = useState([
    "남자 코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);
  let [title, setTitltle] = useState(0);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [입력값, 입력값변경] = useState("");

  /* const 함수 = (index) => {
    let 새로운따봉배열 = [...따봉];
    새로운따봉배열[index] = parseInt(새로운따봉배열[index]) + 1;
    따봉변경(새로운따봉배열);
  }; */

  /*function 함수(index) {
    let 새로운따봉배열 = [...따봉];
    새로운따봉배열[index] = parseInt(새로운따봉배열[index]) + 1;
    따봉변경(새로운따봉배열);
  }*/

  function 첫글제목바꾸기() {
    let 새로운글제목배열 = [...글제목];
    새로운글제목배열[0] = "여자코트 추천";
    글제목바꾸기(새로운글제목배열);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>ReactBlog</h4>
      </div>

      <button
        onClick={() => {
          let sortedArr = [...글제목];
          글제목바꾸기(sortedArr.sort());
        }}
      >
        가나다순정렬 버튼
      </button>

      {글제목.map((it, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitltle(index);
              }}
            >
              {it}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let 새로운따봉배열 = [...따봉];
                  새로운따봉배열[index] = parseInt(새로운따봉배열[index]) + 1;
                  따봉변경(새로운따봉배열);
                }}
              >
                👍
              </span>
              {따봉[index]}
            </h4>
            <p>2월 17일 발행</p>
            <button
              onClick={() => {
                let 새로운글배열 = [...글제목];
                새로운글배열.splice(index, 1);
                글제목바꾸기(새로운글배열);
              }}
            >
              삭제하기
            </button>
          </div>
        );
      })}

      <input
        type="text"
        onChange={(e) => {
          입력값변경(e.target.value);
        }}
      />
      <button
        onClick={() => {
          let 새로운글배열 = [입력값, ...글제목];
          글제목바꾸기(새로운글배열);
        }}
      >
        글 발행
      </button>

      {modal ? (
        <Modal
          color={"skyblue"}
          글제목={글제목}
          첫글제목바꾸기={첫글제목바꾸기}
          title={title}
        />
      ) : null}

      <Modal2 />
    </div>
  );
}

function Modal({ 글제목, color, 첫글제목바꾸기, title }) {
  return (
    <div className="modal" style={{ background: color }}>
      <h4>{글제목[title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={첫글제목바꾸기}>글수정</button>
    </div>
  );
}

class Modal2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "kim",
      age: 20,
    };
  }
  render() {
    return (
      <div>
        안녕{this.state.age}
        <button
          onClick={() => {
            this.setState({ age: 21 });
          }}
        >
          버튼
        </button>
      </div>
    );
  }
}

export default App;
