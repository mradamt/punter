import React from 'react';
import Content from './Content';
import Tags from './Tags';
import './sass-styles/Post.scss'

const dummyTags = ["tag a", "tag b"]

export default function Post (props:any) {
  return (
    <div className='post'>
      <Content text={props.text} />
      <Tags tags={dummyTags} />
      <div className='author'>
        Posted by [placeholder user] on [placeholder date]
      </div>
    </div>
  )
}
