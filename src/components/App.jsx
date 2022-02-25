import { useState } from 'react';
import Posts from './Posts';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import db from '../fauxdb.json'

function App() {
  const [data, setData] = useState(db.posts)

  const submitPost = (post) => {
    setData([
      ...data,
      post
    ])
  }

  return (
    <main className='App'>
      <Form submitPost={submitPost}/>
      <Filters />
      <Posts posts={data}/>
    </main>
  );
}

export default App;
