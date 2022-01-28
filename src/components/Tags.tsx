import React from "react";
import Tag from "./Tag";

import './Tags.scss'

export default function Tags (props:any) {
  return (
    <div className='tags'>
      <Tag tag={props.tags} />
    </div>
  )
}

