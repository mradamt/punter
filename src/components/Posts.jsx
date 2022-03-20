import React from "react";
import Post from './Post';
import './sass-styles/Posts.scss';

export default function Posts(props) {
  // render Post component for every post in props.posts, send each Post the array of ReactionTypes
  const posts = props.posts.map((post, index) => <Post 
    key={index}
    postIndex={index}
    content={post.content}  
    userReaction={post.user_reaction}
    reactionCounts={post.reaction_counts}
    reactionTypes={props.reactionTypes}
    handleReactionCount={props.handleReactionCount}
    author={post.author}
    creation_date={post.creation_date}
  />)

  return (
    <section className='posts'>
      {posts}
    </section>
  )
}
