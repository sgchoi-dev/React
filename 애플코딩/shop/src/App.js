import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import data from "./data";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bg from "./img/bg.png";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";

const ItemList = ({ index, shoes }) => {
  return (
    <div className="col-md-4">
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

const MainContents = ({ shoes }) => {
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
    </>
  );
};

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
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
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainContents shoes={shoes} />} />
        <Route path="/detail" element={<Detail />} />
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
