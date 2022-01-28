import React from "react";

import './Content.scss'

export default function Content (props: any) {


  return (
    <div className="content">
      <p className="content-text">
        I AM CONTENT
      </p>
      {props.content}
    </div>
  )
}