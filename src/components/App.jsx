import { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from './Posts';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import db from '../fauxdb.json'

export default function App() {
  const [data, setData] = useState()
  const [reactionTypes, setReactionTypes] = useState()
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/posts'),
      axios.get('/api/reaction_types')
    ])
      .then(([posts, reaction_types]) => {
        setData(posts.data);
        setReactionTypes(reaction_types.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const savePost = (post) => {
    // Check for spicy language in post text
    // Insert form data into db-friendly format
    // POST new post to db
    // .then Add full post entry to local state
    return axios.post(`/api/posts`, post)
    .then(() => {
      setData([post, ...data])
    })
    .catch(err => {
      console.log(err);
    })
  }

  const toggleReaction = (postIndex, reactionIndex) => {
    const nData = [...data]
    const post = nData[postIndex]
    let uR = post.user_reaction;
    // If user_reaction is a number, -1 at reactionIndex of reaction_counts array
    if (uR >= 0) {
      post.reaction_counts[uR] -= 1
    }
    // If prev user_reaction == reactionIndex, toggle reaction to null
    if (uR === reactionIndex) {
      post.user_reaction = null
    } else {
      // +1 at reactionIndex of reaction_counts array
      post.reaction_counts[reactionIndex] += 1
      // Update user_reaction to index just clicked
      post.user_reaction = reactionIndex
    }
    
    nData[postIndex] = post
    setData(nData)
  }

  return (
    <main className='App'>
      ##info icon w collapsable plea to not abuse an app with no auth##
      <Form savePost={savePost}/>
      <Filters />
      {data && reactionTypes && <Posts
        posts={data} 
        reactionTypes={reactionTypes}
        toggleReaction={toggleReaction}
      />}
    </main>
  );
}
