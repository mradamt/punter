import React from "react";
import Post from './Post';
import './sass-styles/Posts.scss';

export default function Posts(props) {
  // render Post component for every post in props.posts
  const posts = props.posts.map((post, index) => <Post 
    key={index}
    content={post.content}  
    reactionTypes={props.reactionTypes}
    reactionCounts={post.reaction_counts}
    author={post.created_by.author}
    timestamp={post.created_by.timestamp}
  />)

  return (
    <section className='posts'>
      {posts}
    </section>
  )
}
