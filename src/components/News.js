import React, { Component } from 'react'
import NewsElement from './NewsElement'

export class News extends Component {
  constructor(){
    super();
   //console.log("hello i'm a constructor from news component");
    this.state = {
      articles : [],
      loading :  false
    }
   }

   async componentDidMount(){
    //console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c8ac59d1aac74c8b96b814fd08d8c8d4";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles})
   }


  render() {
    return (
      <div className='container my-3'>
        <h2>NewsPool Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsElement title={element.title?element.title:""} 
          description={element.description?element.description:""} 
          imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
          
        </div>
        
      </div>
    )
  }
}

export default News


