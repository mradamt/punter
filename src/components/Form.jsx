import React, { useState } from 'react';
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState('')
  const [promptId, setPromptId] = useState('If puns were given the respect they deserve,')

  // Trigger savePost function on (text, prompt) and clear form's textbox
  const submitPost = (event) => {
    event.preventDefault()
    props.savePost(text, promptId)
    // setText('')
  }

  return (
    <section className='submission-form'>
      <form action='/posts' method='POST' onSubmit={submitPost}>
        <div className='prompt'>
          {props.blankForm.prompt}
          <span className='submission-form-text'>
            <input 
              value={text} 
              onChange={event => setText(event.target.value)} 
              placeholder="there'd be [blank]"
              />
          </span>
        </div>
        <span className='submission-form-author'>
          {props.blankForm.author.username}
        </span>
        <button type='submit'>Post</button>
      </form>
    </section>
  )
}
