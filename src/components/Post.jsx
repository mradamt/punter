import React from 'react';
import Content from './Content';
import Tags from './Tags';
import './sass-styles/Post.scss'

export default function Post (props) {
  return (
    <div className='post'>
      <Content text={props.text} />
      <div className='metadata'>
        <Tags tags={props.tags} />
        <div className='author'>
          <span>
            Posted by '{props.author}' on '{props.timestamp}'
          </span>
        </div>
      </div>
    </div>
  )
}
