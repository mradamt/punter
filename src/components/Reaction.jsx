import classNames from "classnames";
import './sass-styles/Reaction.scss';

export default function Reaction (props) {
  const reactionClass = classNames('reaction', {'reaction--highlight': props.isUserReaction})

  return (
    <button className={reactionClass} onClick={props.onClick}>
      <div className="reaction-label">
        {props.label}
      </div>
      <div className="reaction-icon">
        <img src={props.icon} alt={props.icon} />
      </div>
      <div className="reaction-count">
        {props.count}
      </div>
    </button>
  )
}
