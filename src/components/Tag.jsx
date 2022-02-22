import React from "react";
import './sass-styles/Tag.scss';

export default function Tag (props) {
  return (
    <div className='tag'>
      {props.tag}
    </div>
  )
}
