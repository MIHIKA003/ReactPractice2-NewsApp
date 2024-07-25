import React, { Component } from 'react'
import NewsElement from './NewsElement'

export class News extends Component {
  render() {
    return (
      <div>
        This is news component.
        <NewsElement/>
      </div>
    )
  }
}

export default News
