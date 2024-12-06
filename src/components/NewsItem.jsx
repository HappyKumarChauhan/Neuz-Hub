import React, { Component } from 'react'
import './css/NewsItem.css'

export default class NewsItem extends Component {
  formatDate=(dateString)=>{
    const date=new Date(dateString);
    return date.toLocaleDateString("en-US")+" "+date.toLocaleTimeString("en-US");
  }
  render() {
    const {title,description,imageUrl,url,source,publishedAt}=this.props;
    return (
      <>
        <div className="col-md-4 mb-4">
          <div
            className="card h-100 shadow-sm border-0"
            style={{ borderRadius: '15px', overflow: 'hidden' }}
          >
            <div className="position-relative">
              <span className='text-white p-1 source-name'>{source.name}</span>
              <img
                src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1MiBflN17NfMjCKamD-u31XZFSWnelPtYKQ&s"}
                className="card-img-top"
              />
              <div className="card-img-overlay d-flex align-items-end p-0">
                <div
                  className="w-100 text-white bg-dark bg-opacity-50 p-2"
                  style={{
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                  }}
                >
                  <h5 className="card-title m-0">{title.length>80?title.slice(0,80):title}...</h5>
                </div>
              </div>
            </div>
            <div className="card-body bg-dark text-light">
              <p className="card-text" style={{minHeight:'80px'}}>
                {description&&description.length>120?description.slice(0,120):description}
              </p>
              <div className='d-flex justify-content-between align-items-center'>
              <a
                href={url}
                className="btn btn-outline-primary btn-sm"
                target='_blank'
              >
                Read More
              </a>
              <p style={{fontSize:'0.8rem'}} className='text-secondary'>Published at: {this.formatDate(publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
