import {
  lazy,
  Suspense,
  createContext,
  useEffect,
  useState,
  useTransition,
  useDeferredValue,
} from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import data from "./data";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bg from "./img/bg.png";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const Detail = lazy(() => import("./pages/Detail"));
const Cart = lazy(() => import("./pages/Cart"));

export let Context1 = createContext();

const ItemList = ({ index, shoes }) => {
  let navigate = useNavigate();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        navigate("/detail/" + index);
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/img/shoes" + (index + 1) + ".jpg"}
        alt=""
        width="80%"
      />
      <h4>{shoes[index].title}</h4>
      <p>{shoes[index].content}</p>
    </div>
  );
};

const MainContents = ({ shoes, setShoes }) => {
  let [btnClickCnt, setBtnClickCnt] = useState(0);

  return (
    <>
      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>
      <div className="container">
        <div className="row">
          {shoes.map((item, index) => {
            return <ItemList key={index} index={index} shoes={shoes} />;
          })}
        </div>
      </div>
      {btnClickCnt < 2 ? (
        <button
          onClick={() => {
            if (btnClickCnt < 2) {
              axios
                .get(
                  `https://codingapple1.github.io/shop/data${
                    btnClickCnt + 2
                  }.json`
                )
                .then((response) => {
                  let copy = [...shoes, ...response.data];
                  setShoes(copy);
                })
                .catch(() => {
                  console.log("실패");
                });
            }
            setBtnClickCnt(btnClickCnt + 1);
          }}
        >
          더보기
        </button>
      ) : null}
    </>
  );
};

function App() {
  /* let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let output = localStorage.getItem("data");
  console.log(JSON.parse(output)); */

  /* axios.get("https://codingapple1.github.io/userdata.json").then((a)=>{
    a.data
  }) */

  let result = useQuery("작명", () => {
    return (
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        return a.data;
      }),
      { staleTime: 2000 }
    );
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("watched")).length === 0) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let [재고] = useState([10, 11, 12]);
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  /* 성능개선 연습
  
  let a = new Array(10000).fill(0);
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name); // 괄호 안의 state는 변동사항이 생기면 늦게 처리해줌*/

  return (
    <div className="App">
      {/*  성능개선 연습
      
      <input
        type="text"
        onChange={(e) =>
          startTransition(() => {
            setName(e.target.value);
          })
        }
      />
      {a.map((item, index) => {
        return <div key={index}>{name}</div>;
      })} */}

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto welcomeTxt">
            {result.isLoading ? "로딩중" : result.data.name}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={<MainContents shoes={shoes} setShoes={setShoes} />}
          />
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart />}></Route>

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>member에요</div>} />
          </Route>
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route path="*" element={<div>없는페이지요</div>} />
          {/* *: 위에 적어준 것 외에 모든 것(오타포함) - 404페이지 */}
        </Routes>
      </Suspense>
    </div>
  );
}

const About = () => {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
};

const Event = () => {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
