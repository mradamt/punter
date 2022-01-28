import React from 'react';
import Content from './Content';
import Tags from './Tags';

import './Post.scss'

export default function Post (props: any) {

  return (
    <div className='post'>
      <Content content='content placeholder'/>
      <Tags tags='tags placeholder' />
      Posted by [placeholder user] on [placeholder date]
    </div>
  )
}
