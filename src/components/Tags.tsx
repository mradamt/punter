import React from "react";
import Tag from "./Tag";
import './sass-styles/Tags.scss'

export default function Tags (props:any) {
  const tagsList = props.tags.map((tag:string) => <Tag tag={tag} />)

  return (
    <div className='tags'>
      {tagsList}
    </div>
  )
}
