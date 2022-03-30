import Content from './Content';
import Reaction from './Reaction';
import './sass-styles/Post.scss'

export default function Post (props) {
  const {post, reactionTypes, handleReactionCount, prompt} = props;

  // Calc age (days) of new Date() object or time in milliseconds
  const calculateAge = ms => Math.floor((Date.now() - ms) / 1000 / 60 / 60 / 24)

  // Combine reaction counts and types into an array of Reaction components
  const reactions = Object.entries(post.reaction_counts)
    .map(([id, count]) => {
      if (!reactionTypes[id]) {
        console.log(`Error: reaction id '${id}' not a valid index of reaction_types`);
        return "[error]"
      }
      return (
        <Reaction
          key={id}
          count={count} 
          icon={reactionTypes[id].icon}
          label={reactionTypes[id].label}
          onClick={() => handleReactionCount(post, id)}
          isUserReaction={post.user_reaction_index===id}
        />
      )
    })

  return (
    <div className='post'>
      <div className="content">
        <p className="content-text">
          {prompt.text}
          <br />
          {post.text}
        </p>
      </div>
      <div className='metadata'>
        <div className='reactions'>
          {reactions}
        </div>
        <div className='author'>
          <div>'{post.author.username}'</div>
          <div>{calculateAge(new Date(String(post.creation_date)))} days ago</div>
        </div>
      </div>
    </div>
  )
}
