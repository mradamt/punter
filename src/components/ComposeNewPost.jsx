import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

// import './sass-styles/Form.scss'

export default function ComposeNewPost (props) {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState('If puns were given the respect they deserve,')
  const [author, setAuthor] = useState('TED')

  const username = "ABC"

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
        <Form.Group className="mb-3" controlId="newPost.ControlTextarea1">
          <Form.Label>{prompt}</Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPost.UserName">
          <Form.Label>Author</Form.Label>
          <Form.Control plaintext readOnly defaultValue={username} rows={2} />
        </Form.Group>


        
        <Button as="input" type="submit" value="Submit" size='lg'/>{' '}
      </Form>
    </section>
  )
}
