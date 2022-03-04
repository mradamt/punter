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

  const toggleReaction = (i, add) => {
    console.log('reaction to post', i);
    // const nPost = {...data[i]}
    // let nReactionCounts = [...nPost.reaction_counts];
    // nReactionCounts[i] += add ? 1 : -1;
    // nPost.reaction_counts = nReactionCounts
    // savePost(nPost);
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
