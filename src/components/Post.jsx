import React from 'react';
import Content from './Content';
import Reaction from './Reaction';
import './sass-styles/Post.scss'

export default function Post (props) {
  const reactionsArray = props.reactionCounts.map((count, index) => {
    return <Reaction 
      count={count} 
      icon={props.reactionTypes[index].icon}
      label={props.reactionTypes[index].label}
    />
  })

  return (
    <div className='post'>
      <Content content={props.content} />
      <div className='metadata'>
        <div className='reactions'>
          {reactionsArray}
        </div>
        <div className='author'>
          <span>
            Posted by '{props.author}' on '{props.timestamp}'
          </span>
        </div>
      </div>
    </div>
  )
}
