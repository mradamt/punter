import PostItem from './PostItem';
import './sass-styles/Posts.scss';

export default function PostsList(props) {
  // Add reaction types and handleReactionCount function to each PostItem component
  const postItemArray = props.postsList.map((post) => {
    return (
      <PostItem
        key={post.id}
        post={post}
        reactionTypes={props.reactionTypes}
        handleReactionCount={props.handleReactionCount}
        prompt={props.prompts[post.prompt_id]}
      />
    )
  })

  return (
    <section className='posts'>
      {postItemArray}
    </section>
  )
}
