import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

function App() {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일

  let todayDate = year + "-" + month + "-" + date;
  let yesterDayDate = year + "-" + month + "-" + (date - 1);

  let [articleTitle, setArticleTitle] = useState([
    "React blog 예시 타이틀 4",
    "React blog 예시 타이틀 3",
    "React blog 예시 타이틀 2",
    "React blog 예시 타이틀 1",
  ]);
  let [articleDate, setArticleDate] = useState(
    articleTitle.map(() => {
      return yesterDayDate;
    })
  );
  let [title, setTitltle] = useState(0);
  let [like, setLike] = useState(
    articleTitle.map(() => {
      return 0;
    })
  );
  let [modal, setModal] = useState(false);
  let [inputData, setInputData] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <div className="list-wrap">
        {articleTitle.map((it, index) => {
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
                  className="btn-like"
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...like];
                    copy[index] = parseInt(copy[index]) + 1;
                    setLike(copy);
                  }}
                >
                  👍 좋아요
                </span>
                <span className="like-count">{like[index]}</span>
              </h4>
              <p>{articleDate[index]} 발행</p>
              <button
                onClick={() => {
                  let copy = [...articleTitle];
                  copy.splice(index, 1);
                  setArticleTitle(copy);
                }}
              >
                🗑️ 삭제하기
              </button>
            </div>
          );
        })}
      </div>

      <div className="enroll-article-area">
        <textarea
          placeholder="발행할 글을 적어주세요"
          onChange={(e) => {
            setInputData(e.target.value);
          }}
        ></textarea>
        <button
          type="button"
          onClick={() => {
            let copy = [inputData, ...articleTitle];
            setArticleTitle(copy);

            let dateCopy = [todayDate, ...articleDate];
            setArticleDate(dateCopy);

            let likeCopy = [0, ...like];
            setLike(likeCopy);
          }}
        >
          글 발행
        </button>
      </div>

      {/* {modal ? (
        <Modal color={"skyblue"} articleTitle={articleTitle} title={title} />
      ) : null} */}
    </div>
  );
}

function Modal({ articleTitle, color, title }) {
  return (
    <div className="modal" style={{ background: color }}>
      <h4>{articleTitle[title]}</h4>
      <p>2023-09-07</p>
      <p>상세내용영역</p>
    </div>
  );
}

export default App;
