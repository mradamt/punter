import React from "react";
import './sass-styles/Reaction.scss';

export default function Reaction (props) {
  return (
    <div className='reaction'>
      <div className="reaction-count">
        {props.count}
      </div>
      <div className="reaction-icon">
        <img src={props.icon} alt={props.icon} />
      </div>
      <div className="reaction-label">
        {props.label}
      </div>
    </div>
  )
}
