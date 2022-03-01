import React from "react";
import Reaction from "./Reaction";
import './sass-styles/Reactions.scss'

export default function Reactions (props) {
  const tagsList = props.tags.map((tag) => <Reaction tag={tag} />)

  return (
    <div className='tags'>
      {tagsList}
    </div>
  )
}
