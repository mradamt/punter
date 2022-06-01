import classNames from 'classnames'
import './sass-styles/Button.scss'

export default function Button (props) {
  const buttonClass = classNames('button', {
    'button--language': props.language,
    'button--date': props.date
  })

  return (
      <button className={buttonClass} onClick={props.onClick}>
        {props.children}
      </button>
  )
}
