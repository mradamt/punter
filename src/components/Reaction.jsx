import React from "react";
import './sass-styles/Reaction.scss';

export default function Reaction (props) {
  return (
    <div className='reaction'>
      {props.count}
      {props.icon}
      {props.label}
    </div>
  )
}
