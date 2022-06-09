import Reaction from './Reaction';
import './sass-styles/PostItem.scss'

export default function Post (props) {
  const {post, reactionTypes, handleReactionCount, prompt} = props;

  // Calc age (days) of new Date() object or time in milliseconds
  const calculateAge = ms => Math.floor((Date.now() - ms) / 1000 / 60 / 60 / 24)

  /* Create array of Reaction components. Arrays 'reactionTypes' and
   * 'reaction_counts' are equal length, 'counts' effectively an extension
   * of 'types' since server constructs both from one list of IDs */
  const reactions = reactionTypes.map((r, i) => {
      if (isNaN(post.reaction_counts[i])) {
        console.log(`Error: reaction index '${i}' not a valid index of reaction_counts array`);
        return "[error]"
      }
      return (
        <Reaction
          key={i}
          count={post.reaction_counts[i]} 
          icon={r.icon}
          label={r.label}
          onClick={() => handleReactionCount(post, i, r.id)}
          isUserReaction={post.user_reaction_id===r.id}
        />
      )
    })

  return (
    <div className='postItem'>
      <div className="postItem-content">
        <span className="postItem-content-prompt">{prompt.text}</span>
        <span className="postItem-content-text">{post.text}</span>
      </div>
      <div className='postItem-metadata'>
        <div className='postItem-metadata-left'>
          <div className='postItem-metadata-left-auth'>{post.author.username}</div>
          <div className='postItem-metadata-left-date'>
            {calculateAge(new Date(String(post.creation_date)))} days ago
          </div>
        </div>
        <div className='postItem-metadata-right'>{reactions}</div>
      </div>
    </div>
  )
}
