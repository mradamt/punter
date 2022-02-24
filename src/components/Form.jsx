import React, { useState } from "react";
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState()

  const formatPost = (text, template, tags, author) => {
     
  }

  const submitPost = (event) => {
    event.preventDefault()
    console.log(`post 'posted': ${text}`);
    // validate post?
    // execute 'add post' function to add to main state
  }

  return (
      <form action="POST" onSubmit={submitPost}>
        <div className="prompt">
          <span>If </span>
          <textarea 
            value={text} 
            onChange={event => setText(event.target.value)} 
            placeholder="be funny here?" 
          />
          <span> doesn't exist, capitalism has failed us</span>
        </div>
        <button type="submit">Post</button>
      </form>
  )
}
