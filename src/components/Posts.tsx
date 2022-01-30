import React from "react";
import Post from './Post';
import './sass-styles/Posts.scss';

export default function Posts(props:any) {
  // render Post component for every post in props.posts
  const posts = props.posts.map((post:any, index:number) => <Post 
    key={index}    
    text={post.content.text}
    tags={post.tags}
    author={post.created_by.author}
    timestamp={post.created_by.timestamp}
  />)

  return (
    <section className='posts'>
      {posts}
    </section>
  )
}
