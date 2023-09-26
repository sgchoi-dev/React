import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [articleArr, setArticleArr] = useState([]);
  let [allChkBox, setAllChkBox] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setArticleArr(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        //console.log("always executed");
      });
  }, []);

  useEffect(() => {
    setAllChkBox(
      Object.values(
        document.querySelectorAll(".my-table tbody input[type='checkbox']")
      )
    );
  }, [articleArr]);

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      allChkBox.map((item) => {
        item.checked = true;
      });
    } else {
      allChkBox.map((item) => {
        item.checked = false;
      });
    }
  };

  const selectList = (e) => {
    let allCheckbod = document.querySelector(".my-table thead .all-checkbox");
    let checkedCount = Object.values(
      document.querySelectorAll(
        ".my-table tbody input[type='checkbox']:checked"
      )
    );
    if (checkedCount.length === allChkBox.length) {
      allCheckbod.checked = true;
    } else {
      allCheckbod.checked = false;
    }
  };

  return (
    <div className="App">
      <table className="my-table">
        <thead>
          <tr>
            <th>
              <input
                onClick={selectAll}
                className="all-checkbox"
                type="checkbox"
                id="all-checkbox"
              />
              <label htmlFor="all-checkbox"></label>
            </th>
            <th>차례</th>
            <th>내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {articleArr.map((item, index) => {
            return (
              <tr key={index}>
                <td className="checkbox-cell">
                  <input
                    onClick={selectList}
                    id={`checkbox${item.id}`}
                    className="checkbox"
                    type="checkbox"
                  />
                  <label htmlFor={`checkbox${item.id}`}></label>
                </td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button
                    onClick={() => {
                      let copy = [...articleArr];
                      console.log(copy);

                      //setArticleArr();
                    }}
                  >
                    삭제하기
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
