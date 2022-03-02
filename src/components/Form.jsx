import React, { useState } from 'react';
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState('If puns were given the respect they deserve,')
  const [author, setAuthor] = useState('TED')

  const formatPost = (text, prompt, author) => {
     return (
      {
        "content": {
          "text": text,
          "prompt": prompt
        },
        "reaction_counts": [0,0,0,0,0],
        "created_by": {
          "author": author,
          "timestamp": Date.now()
        }
      }
     )
  }

  // Validate text isn't offensive then submit to DB
  const submitPost = (event) => {
    event.preventDefault()
    console.log(`post 'posted': ${text}`);
    // validate post
    // verify post
    // execute 'add post' function to add to main state
    props.savePost(formatPost(text, prompt, author))
    setText('')
  }

  // Validate author (check availability, offensiveness)

  // Submit new prompt -- future

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
