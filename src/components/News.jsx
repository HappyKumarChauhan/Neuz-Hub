import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import spinner from './spinner.gif'
export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      pageSize: props.pageSize,
      page: 1,
      totalResults: 0,
    }
  }
  updatePage = async () => {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=c80d427fbeee453dbab4a4e63d40bb5f&pageSize=${this.state.pageSize}&page=${this.state.page}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(100)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  componentDidMount() {
    this.updatePage()
  }
  capitalizeFLetter(str) {
    return str[0].toUpperCase() + str.substring(1)
  }
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${
      this.props.category
    }&language=en&apiKey=c80d427fbeee453dbab4a4e63d40bb5f&pageSize=${
      this.state.pageSize
    }&page=${this.state.page + 1}`
    this.setState({
      page: this.state.page + 1,
    })
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  render() {
    const {pageSize, category } = this.props
    return (
      <div className="container py-5">
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className="text-light my-5">
            NeuzHub-Top Headlines:- {this.capitalizeFLetter(category)}
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
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="text-center">
              <img src={spinner} />
            </div>
          }
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <NewsItem
                  key={element.url}
                  title={element.title}
                  description={element.description}
                  publishedAt={element.publishedAt}
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
}
