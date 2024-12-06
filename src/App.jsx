import './App.css'
import React, { Component } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar'
import News from './components/News'
import About from './components/About'
import SearchNews from './components/searchNews'

export default class App extends Component {
  constructor(){
    super()
    this.state={
      progress:0
    }
  }
  setProgress=(prog)=>{
    this.setState({
      progress:prog
    })
  }
  render() {
    return (
      <div className='bg-gradient'>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} key="general" pageSize={6} category="general"/>}/>
          <Route exact path='/about' element={<About setProgress={this.setProgress}/>}/>
          <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={6} category="business"/>}/>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} category="entertainment"/>}/>
          <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={6} category="health"/>}/>
          <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={6} category="science"/>}/>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={6} category="sports"/>}/>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={6} category="technology"/>}/>
          <Route exact path='/searchNews' element={<SearchNews setProgress={this.setProgress}/>}/>
        </Routes>
        
      </div>
    )
  }
}
