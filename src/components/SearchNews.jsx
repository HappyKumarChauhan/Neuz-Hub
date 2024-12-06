import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import spinner from './spinner.gif'
import { useLocation } from 'react-router-dom'

export default function SearchNews(props) {
    const pageSize=9;
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)
    const location=new useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query=queryParams.get('q');
    const updatePage = async () => {
        props.setProgress(10)
        let url=`https://newsapi.org/v2/everything?q=${query}&apiKey=c80d427fbeee453dbab4a4e63d40bb5f&pageSize=${pageSize}&page=${page}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(100)
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      }
      const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=c80d427fbeee453dbab4a4e63d40bb5f&pageSize=${pageSize}&page=${page+1}`
        setPage(page+1)
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
      }
      useEffect(() => {
        updatePage()
      }, [])
      
  return (
    <div className="container py-4">
        <div className='d-flex justify-content-between align-items-center mt-5 mb-3'>
          <h1 className="text-light">
            Top News:- {query}
          </h1>
          <form className="col-md-3" role="search" action='/searchNews' method='get'>
          <div className='d-flex'>
          <input
            name='q'
            className="form-control me-2"
            type="search"
            placeholder="Search for News"
            aria-label="Search"
          />
          <button className="btn btn-danger" type="submit">
            Search
          </button>
        </div>
        </form>
        </div>
        <InfiniteScroll
          className="container"
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className="text-center">
              <img src={spinner} />
            </div>
          }
        >
          <div className="row">
            {articles.map((element) => {
              return (
                <NewsItem
                  key={element.url}
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  url={element.url}
                  source={element.source}
                />
              )
            })}
          </div>
        </InfiniteScroll>
      </div>
  )
}
