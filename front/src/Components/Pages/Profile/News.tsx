import React, { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [allNews, setAllNews] = useState<[]>();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "https://bing-news-search1.p.rapidapi.com/news/search",
          {
            params: {
              q: "cycling & cyclisme",
              safeSearch: "Off",
              textFormat: "Raw",
              freshness: "Day",
              mkt: "fr-BE",
            },
            headers: {
              "x-bingapis-sdk": "true",
              "x-rapidapi-key":
                "6205d94368msh2e1adee21ece6fap1aec50jsncf03455acd4c",
              "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            },
          },
        );
        setAllNews(res.data.value);
        console.log(res.data.value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="container">
      <div className="grid">
        {allNews?.map((el: any) => {
          return (
            <div className="grid__item">
              <div className="card" key={el.name}>
                {/* { el.image ? (<img
                  className="card__img"
                  src={el.image.thumbnail.contentUrl}
                  alt={el.name}
                />) : null } */}
              <img
                  className="card__img"
                  src={el.image ? el.image.thumbnail.contentUrl :
                     "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=980&q=80"}
                  alt={el.name}
                />
                <div className="card__content">
                  <h3 className="card__header">{el.name}</h3>
                  <p className="card__text">{el.description}...</p>
                  <button className="card__btn">
                    <a href={el.url} target="_blank" rel="noreferrer">
                      Voir <span>&rarr;</span>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
