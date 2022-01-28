import React from "react";

import './Tags.scss'

export default function Tags (props:any) {
  return (
    <div className='tags'>
      {props.tags}
    </div>
  )
}

