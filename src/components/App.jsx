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
    filters,
    savePost,
    handleReactionCount,
    handleFilters
  } = useApplicationData()
  
  return (
    <main className='App'>
      ##info icon w collapsable plea to not abuse an app with no auth##
      {prompts && 
        <Form 
          prompts={prompts}
          author={author}
          savePost={savePost}
        />
      }

      {postsList && 
        <Filters 
          filters={filters}
          handleFilters={handleFilters}
        />
      }

      {postsList && reactionTypes && prompts &&
        <PostsList
          postsList={postsList} 
          reactionTypes={reactionTypes}
          handleReactionCount={handleReactionCount}
          prompts={prompts}
          filters={filters}
        />
      }
    </main>
  );
}
