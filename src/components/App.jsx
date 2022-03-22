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

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/posts'),
  //     axios.get('/api/reaction_types')
  //     axios.get('/api/prompts')
  //   ])
  //     .then(([posts, reaction_types, prompts]) => {
  //       setPosts(posts.data);
  //       setReactionTypes(reaction_types.data);
  //       setPrompts(prompts.data);
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

  // Adjust array of numbers by +/-1, min output num = 0
  const incrementArray = (arr, i, increment = true) => {
    // return arr.map((num, index) => {
      // if (index !== i) return num;
      if (increment) arr[i] += 1;
      if (arr[i] >= 1) arr[i] -= 1;
    // })
    return arr;
  }

  // if (prevUserReaction === null) {
  //   // AA Set user_reaction_index to userReaction
  //   saveUserReaction(userReaction)
  //   // CC Add 1 to count @ userReaction
  // }

  // if (prevUserReaction === userReaction) {
  //   // AB Toggle user_reaction_index to null
  //   saveUserReaction(null)
  //   // BB Subtract 1 from prev count, count can't be negative
  // }

  // if (prevUserReaction >= 0) {
  //   // AA Set user_reaction_index to userReaction
  //   saveUserReaction(userReaction)
  //   // BB Subtract 1 from prev count, count can't be negative    
  //   // CC Add 1 to count @ userReaction
  // }

  // A: 
  // const saveUserReaction = reaction => {
  //   postItem.user_reaction_index = reaction
  // }

  // AA:
  //   // AA Set user_reaction_index to userReaction
  //   user_reaction_index = userReaction

  // AB:
  //   // AB Toggle user_reaction_index to null
  //   user_reaction_index = null

  // BB:
  //   // BB Subtract 1 from count, count can't be negative
  //   if (reaction_counts[userReaction] >= 1) {
  //     reaction_counts[userReaction] -= 1
  //   }

  // CC:
  //   // CC Add 1 to count @ userReaction
  //   reaction_counts[userReaction] += 1

  

  // Manage reaction counts and user's reaction when a reaction is clicked
  const handleReactionCount = (postItem, userReaction) => {
    const prevUserReaction = postItem.user_reaction_index;
    
    // Do AB or AA:
    if (prevUserReaction === userReaction) {
      postItem.user_reaction_index = null
    } else {
      
      postItem.user_reaction_index = userReaction
      // Do CC:
      postItem.reaction_counts[userReaction] += 1
    }
    
    // Do BB: Subtract 1 from prevCount if prevUserReaction was a number
    if (prevUserReaction >= 0 && postItem.reaction_counts[userReaction] >= 1) {
        postItem.reaction_counts[prevUserReaction] -= 1
    }

    const postsListClone = [...postsList].map((p) => {
      if (p.id === postItem.id) return postItem;
      return p;
    })

    // console.log(postsListClone);

    setPostsList(postsListClone)
  }

  return (
    <main className='App'>
      ##info icon w collapsable plea to not abuse an app with no auth##
      <Form 
        prompts={prompts} // TODO:: replace 'null' w array of 'prompt' objects
        author={author}
        savePost={savePost}
      />
      <Filters />
      {postsList && reactionTypes && <PostsList
        postsList={postsList} 
        reactionTypes={reactionTypes}
        handleReactionCount={handleReactionCount}
      />}
    </main>
  );
}
