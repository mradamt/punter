import React from 'react';
import Content from './Content';
import Reaction from './Reaction';
import './sass-styles/Post.scss'

export default function Post (props) {
  // calculateAge accepts timestamp as milliseconds or new Date() object, returns age in days
  const calculateAge = ms => Math.floor((Date.now() - ms) / 1000 / 60 / 60 / 24)

  // NOTE reactionCounts and reactionTypes arrays must be equal length
  // else map function will fail and app will not display
  const reactionsArray = props.reactionCounts.map((count, index) => {
    return <Reaction 
      count={count} 
      icon={props.reactionTypes[index] ? props.reactionTypes[index].icon : 'null'}
      label={props.reactionTypes[index] ? props.reactionTypes[index].label : 'null'}
      onClick={() => props.handleReactionCount(props.postIndex, index)}
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
          <div>{calculateAge(new Date(String(props.creation_date)))} days ago</div>
        </div>
      </div>
    </div>
  )
}
