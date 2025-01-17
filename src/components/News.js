import React, { Component } from 'react'
import Spinner from './Spinner'
import NewsElement from './NewsElement'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(){
    super();
   //console.log("hello i'm a constructor from news component");
    this.state = {
      articles : [],
      loading :  false,
      page : 1
    }
   }

   async componentDidMount(){
    //console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c8ac59d1aac74c8b96b814fd08d8c8d4&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults})
   }

   handlePreviousClick =async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c8ac59d1aac74c8b96b814fd08d8c8d4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
   }

   handleNextClick = async() => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/3))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c8ac59d1aac74c8b96b814fd08d8c8d4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      //this.setState({loading: false});
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
    })
    }
   }




  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin: '25px 0px'}}>NewsPool Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsElement title={element.title?element.title:""} 
          description={element.description?element.description:""} 
          imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News


