import React from "react";
import './sass-styles/Form.scss'

export default function Form (props) {
  return (
    <section className='form'>
      <form action="POST" onSubmit={props.submitPost}>
        IAMA form
      </form>
    </section>
  )
}
