import React from 'react';
import Content from './Content';
import Reaction from './Reaction';
import './sass-styles/Post.scss'

export default function Post (props) {
  const calculateAge = ms => Math.floor((Date.now() - ms) / 1000 / 60 / 60 / 24)

  const reactionsArray = props.reactionCounts.map((count, index) => {
    return <Reaction 
      count={count} 
      icon={props.reactionTypes[index].icon}
      label={props.reactionTypes[index].label}
      onClick={() => props.toggleReaction(props.postIndex, index)}
      isReaction={props.userReaction===index}
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
          <div>'{props.author}'</div>
          <div>{calculateAge(props.timestamp)} days ago</div>
        </div>
      </div>
    </div>
  )
}
