import React from "react";
import './sass-styles/Content.scss'

export default function Content (props: any) {


  return (
    <div className="content">
      <p className="content-text">
        {props.content}
      </p>
    </div>
  )
}