import React from "react";
import './sass-styles/Post.scss'

export default function Content (props) {

  return (
    <div className="content">
      <p className="content-text">
        {props.text}
      </p>
    </div>
  )
}