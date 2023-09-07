import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  // 방법1
  /* useEffect(async () => {
    // method1
    //axios({
    //  method: "GET",
    //  url: "https://jsonplaceholder.typicode.com/photos",
    //}).then((response) => setPosts(response.data));

    // method2
    //axios
    //  .get("https://jsonplaceholder.typicode.com/photos")
    //  .then((response) => setPosts(response.data));
  }); */

  // 방법2
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPosts(response.data);
    };

    fn();
  });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <div>{post.title}</div>
          <div>
            <img src={post.thumbnailUrl} alt="" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default App;
