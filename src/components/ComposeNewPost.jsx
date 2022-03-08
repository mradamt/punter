import React, { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';

// import './sass-styles/Form.scss'

export default function ComposeNewPost (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState('If puns were given the respect they deserve,')
  const [author, setAuthor] = useState('ABC')

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
  const handleSubmit = (event) => {
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
      <Form action='/posts' method='POST' onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-1" controlId="newPost.ControlTextarea1">
          <Form.Label>{prompt}</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder={"there'd be a company that..."} 
            rows={2} 
          />
        </Form.Group>
        <Button as="input" type="submit" value="Submit"/>{' '}
      </Form>
    </section>
  )
}
