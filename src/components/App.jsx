import { useEffect, useState } from 'react';
import axios from 'axios';
import PostsList from './PostsList';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import db from '../fauxdb.json'

export default function App() {
  const [postsList, setPostsList] = useState(db.posts)
  const [reactionTypes, setReactionTypes] = useState(db.reaction_types)
  
  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/posts'),
  //     axios.get('/api/reaction_types')
  //   ])
  //     .then(([posts, reaction_types]) => {
  //       setPosts(posts.data);
  //       setReactionTypes(reaction_types.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [])

  // checkForUnprofessionalLanguage, return true if spicy language present

  // convertToServerReadableFormat function that outputs data in format server is expecting

  const savePost = (newPost) => {
    // Check for spicy language in post text
    // Insert form data into db-friendly format
    // POST new post to db
    // .then Add full post entry to local state
    setPostsList([newPost, ...postsList])
    // return axios.post(`/api/posts`, post)
    // .then(() => {
    //   setPostsList([newPost, ...postsList])
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  }

  // 
  const handleReactionCount = (postIndex, newReaction) => {
    const postsClone = [...postsList]
    const post = postsClone[postIndex]
    const existingReaction = post.user_reaction;
    // If user's existing reaction is an index of reaction_counts and that count isn't about to go negative, subtract 1
    if (existingReaction >= 0 && existingReaction < post.reaction_counts.length && post.reaction_counts[existingReaction] >=1) {
      post.reaction_counts[existingReaction] =- 1
    }
    // If user has clicked their existing reaction, set it to null
    if (existingReaction === newReaction) {
      post.user_reaction = null
    } else {
      // add 1 to count of the reaction just clicked
      post.reaction_counts[newReaction] += 1
      // set user's reaction to index of reaction just clicked
      post.user_reaction = newReaction
    }
    postsClone[postIndex] = post
    setPostsList(postsClone)
  }

  return (
    <main className='App'>
      ##info icon w collapsable plea to not abuse an app with no auth##
      <Form savePost={savePost}/>
      <Filters />
      {postsList && reactionTypes && <PostsList
        postsList={postsList} 
        reactionTypes={reactionTypes}
        handleReactionCount={handleReactionCount}
      />}
    </main>
  );
}
