import React, { Component } from "react";

export class NewsElement extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl?imageUrl:"https://i.pinimg.com/originals/58/13/bb/5813bb127dda2b7f283247caf059d837.jpg"} className="card-img-top" alt="..." />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsElement;
