import React, { useState } from "react";
import NewsContext from "./NewsContext";

const NewsState = (props) => {
  // news api
  const [article, setArticle] = useState([]);

  const news = async () => {
    try {
      const res = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=d5f3e408f4e545219f73b3ca7e10fd8d"
      );
      if (!res.ok) {
        throw new Error(res.status);
      }
      const data = await res.json();
      setArticle(data.articles);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const image = {
    img: "https://imgs.search.brave.com/IpAIo46vb_93n79Wu8Cv_mHkZP16QyCANQgtkyERFs0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8zNi8zMC9t/aXNzaW5nLWltYWdl/LW5vLWF2YWlsYWJs/ZS1jb25jZXB0LXZl/Y3Rvci0yMzYyMzYz/MC5qcGc",
  };

  return (
    <div>
      <NewsContext.Provider value={{ article, news, image }}>
        {props.children}
      </NewsContext.Provider>
    </div>
  );
};

export default NewsState;
