import { useState } from 'react';
import Posts from './Posts';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import db from '../fauxdb.json'

export default function App() {
  const [data, setData] = useState(db.posts)
  
  const savePost = (post) => {
    setData([post, ...data])
  }

  const toggleReaction = (postIndex, reactionIndex) => {
    const post = {...data[postIndex]}
    // Update reaction_counts array: -1 at index of prev user's reaction if not null
    if (post.user_reaction) {
      post.reaction_counts[post.user_reaction] -= 1
    }
    // Update reaction_counts array: +1 at index just clicked by user
    post.reaction_counts[reactionIndex] += 1
    // Update user_reaction to index just clicked
    post.user_reaction = reactionIndex
    
    const nData = [...data]
    nData[postIndex] = post
    setData(nData)
  }

  return (
    <main className='App'>
      <Form savePost={savePost}/>
      <Filters />
      <Posts 
        posts={data} 
        reactionTypes={db.reaction_types}
        toggleReaction={toggleReaction}
      />
    </main>
  );
}
