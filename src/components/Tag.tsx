import React from "react";

import './Tag.scss';

export default function Tag (props:any) {
  return (
    <div className='tag'>
      Tag: {props.tag}
    </div>
  )
}
