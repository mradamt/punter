import PostItem from './PostItem';
import './sass-styles/Posts.scss';

export default function PostsList(props) {
  // Add reaction types and handleReactionCount function to each PostItem component
  const postItemArray = props.posts.map((post, index) => {
    return (
      <PostItem
        key={index}
        post={post}
        reactionTypes={props.reactionTypes}
        handleReactionCount={props.handleReactionCount}
      />
    )
  })

  return (
    <section className='posts'>
      {postItemArray}
    </section>
  )
}
