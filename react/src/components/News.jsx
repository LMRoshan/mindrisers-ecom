import React, { useContext, useEffect } from "react";
import NewsContext from "../context/NewsContext";

const News = () => {
  const { article, news, image } = useContext(NewsContext);
  // console.log(article);

  useEffect(() => {
    news();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Here are the news:</h1>
      <div className="row">
        {article &&
          article.map((news) => (
            <div className="col-md-3 mb-3 mt-3" key={news.url}>
              <div className="card" style={{ width: "18rem" }}>
                <img src={news.urlToImage} className="card-img-top" alt={image}/>
                <div className="card-body">
                  <h5 className="card-title">{news.title.slice(0, 20)}</h5>
                  <h6>{news.author}</h6>
                  <p className="card-text">{news.description.slice(0, 69)}</p>
                  <a href={news.url} className="btn btn-primary">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;
