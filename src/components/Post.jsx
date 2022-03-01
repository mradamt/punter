import React from 'react';
import Content from './Content';
import Reactions from './Reactions';
import './sass-styles/Post.scss'

export default function Post (props) {
  return (
    <div className='post'>
      <Content content={props.content} />
      <div className='metadata'>
        <Reactions reactions={props.reactions} />
        <div className='author'>
          <span>
            Posted by '{props.author}' on '{props.timestamp}'
          </span>
        </div>
      </div>
    </div>
  )
}
