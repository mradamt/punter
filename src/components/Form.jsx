import React, { useState } from "react";
import './sass-styles/Form.scss'

export default function Form (props) {
  const [text, setText] = useState()

  const formatPost = (text, template, tags, author) => {
     
  }

  return (
    <form action="POST" onSubmit={props.submitPost}>
      <span>If </span>
      <textarea placeholder="monkeys?"/>
      <span> doesn't exist, capitalism has failed us</span>
    </form>
  )
}
