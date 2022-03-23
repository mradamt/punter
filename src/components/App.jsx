import PostsList from './PostsList';
import Form from './Form';
import Filters from './Filters';
import './sass-styles/App.scss';

import useApplicationData from 'hooks/useApplicationData';

export default function App() {
  const {
    postsList,
    reactionTypes,
    prompts,
    author,
    savePost,
    handleReactionCount
  } = useApplicationData()
  
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
