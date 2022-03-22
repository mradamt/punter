import { useEffect, useState } from 'react';
import axios from 'axios';
import PostsList from './PostsList';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import db from '../fauxdb.json'
// import templates from '../templates/datastructureTemplates.json'

export default function App() {
  const [postsList, setPostsList] = useState(db.posts)
  const [reactionTypes, setReactionTypes] = useState(db.reaction_types)
  const [prompts, setPrompts] = useState(db.prompts)
  const [author, setAuthor] = useState({
      "author": {
        "id": 10, // logged in user_id
        "username": "TED" // logged in username
      }
  })

  useEffect(() => {
    Promise.all([
      // axios.get('/api/posts'),
      // axios.get('/api/reaction_types'),
      // axios.get('/api/prompts'),
      // axios.get(`/api/user_reactions/1`)
    ])
      .then(([response]) => {
        console.log('server response:', response.data);
        // setPostsList(posts.data);
        // setReactionTypes(reaction_types.data);
        // setPrompts(prompts.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

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

  /* Manage reaction counts and stored user_reaction when a reaction is clicked
     Handles updates to user_reaction_index and reaction_counts array:
     1. If prevReaction = newReaction: toggle reaction 'off' (to null), -1 from count
     2. If prevReaction = null: update reaction, +1 to new count
     3. If prevReaction != null: update reaction, +1 to new count, -1 from old count avoiding negative counts
  */
  const handleReactionCount = (postItem, newR) => {
    const prevR = postItem.user_reaction_index;
    if (prevR === newR) {
      postItem.user_reaction_index = null
    } else {
      postItem.user_reaction_index = newR
      postItem.reaction_counts[newR] += 1
    }
    if (prevR >= 0 && postItem.reaction_counts[newR] >= 1) {
        postItem.reaction_counts[prevR] -= 1
    }
    const postsListClone = [...postsList].map((p) => {
      if (p.id === postItem.id) return postItem;
      return p;
    })
    setPostsList(postsListClone)
  }

  // console.log('prompts:', prompts);

  return (
    <main className='App'>
      ##info icon w collapsable plea to not abuse an app with no auth##
      <Form 
        prompts={prompts}
        author={author}
        savePost={savePost}
      />
      <Filters />
      {postsList && reactionTypes && <PostsList
        postsList={postsList} 
        reactionTypes={reactionTypes}
        handleReactionCount={handleReactionCount}
        prompts={prompts}
      />}
    </main>
  );
}
