import React, { useState } from 'react';
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState('If puns were given the respect they deserve,')
  const [author, setAuthor] = useState('TED')

  // Trigger savePost function on (text, prompt) and clear form's textbox
  const submitPost = (event) => {
    event.preventDefault()
    props.savePost(text, prompt)
    // setText('')
  }
  
  return (
    <section className='submission-form'>
      <form action='/posts' method='POST' onSubmit={submitPost}>
        <div className='prompt'>
          {prompt}
          <span className='submission-form-text'>
            <input 
              value={text} 
              onChange={event => setText(event.target.value)} 
              placeholder="there'd be [blank]"
              />
          </span>
        </div>
        <span className='submission-form-author'>
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder={author}
          />
        </span>
        <button type='submit'>Post</button>
      </form>
    </section>
  )
}
