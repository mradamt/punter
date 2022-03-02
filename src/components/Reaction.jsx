import React from "react";
import './sass-styles/Reaction.scss';

export default function Reaction (props) {
  return (
    <div className='reaction'>
      <div>{props.count}-</div>
      <div>{props.icon}-</div>
      <div>{props.label}</div>
    </div>
  )
}
