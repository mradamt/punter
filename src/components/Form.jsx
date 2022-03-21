import React, { useState } from 'react';
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState(props.prompts[0])

  // Trigger savePost function on (text, prompt) and clear form's textbox
  const submitPost = (event) => {
    event.preventDefault()
    props.savePost(text, prompt.id)
    // setText('')
  }

  return (
    <section className='submission-form'>
      <form action='/posts' method='POST' onSubmit={submitPost}>
        <div className='prompt'>
          {prompt.text}
          <span className='submission-form-text'>
            <input 
              value={text} 
              onChange={event => setText(event.target.value)} 
              placeholder="there'd be [blank]"
              />
          </span>
        </div>
        <span className='submission-form-author'>
          {props.author.author.username}
        </span>
        <button type='submit'>Post</button>
      </form>
    </section>
  )
}
