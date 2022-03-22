import PostItem from './PostItem';
import './sass-styles/Posts.scss';

export default function PostsList(props) {
  // Add reaction types and handleReactionCount function to each PostItem component
  const postItemArray = props.postsList.map((post, postItemIndex) => {
    return (
      <PostItem
        key={postItemIndex}
        post={post}
        reactionTypes={props.reactionTypes}
        handleReactionCount={props.handleReactionCount}
        // prompts={props.prompts}
      />
    )
  })

  return (
    <section className='posts'>
      {postItemArray}
    </section>
  )
}
