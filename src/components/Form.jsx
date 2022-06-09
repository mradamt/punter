import React, { useState } from 'react';
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState(props.prompts["1"])

  // Trigger savePost function on (text, prompt) and clear form's textbox
  const submitPost = (event) => {
    event.preventDefault()
    props.savePost(text, prompt.id)
      .then(() => {
        setText('')
      })
      .catch(err => console.log(err))
  }

  return (
    <section className='form'>
      <form action='/posts' method='POST' onSubmit={submitPost}>
        <div className='form-l-side'>
          <div className='form-prompt'>
            {prompt.text}
          </div>
          <div className='form-input'>
            <input
              value={text} 
              onChange={event => setText(event.target.value)} 
              placeholder="there'd be..."
              />
          </div>
        </div>
        <div className='form-r-side'>
          <span className='form-author'>{props.author.author.username}</span>
          <button type='submit'>Post</button>
        </div>
      </form>
    </section>
  )
}
