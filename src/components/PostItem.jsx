import Content from './Content';
import Reaction from './Reaction';
import './sass-styles/Post.scss'

export default function Post (props) {
  const {post, reactionTypes, handleReactionCount, prompt} = props;

  // Calc age (days) of new Date() object or time in milliseconds
  const calculateAge = ms => Math.floor((Date.now() - ms) / 1000 / 60 / 60 / 24)

  // Create array of Reaction components using reaction_counts & reaction_types
  const reactions = post.reaction_counts.map((count, i) => {
      if (!reactionTypes[i]) {
        console.log(`Error: reaction index '${i}' not a valid index of reaction_types`);
        return "[error]"
      }
      return (
        <Reaction
          key={i}
          count={count} 
          icon={reactionTypes[i].icon}
          label={reactionTypes[i].label}
          onClick={() => handleReactionCount(post, i)}
          isUserReaction={post.user_reaction_id===reactionTypes[i].id}
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
