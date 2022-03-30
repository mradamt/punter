import { useEffect, useState } from "react";
import axios from "axios";

import db from '../dataFromDB.json'


export default function useApplicationData() {
  const [postsList, setPostsList] = useState(db.posts)
  const [reactionTypes, setReactionTypes] = useState(db.reaction_types)
  const [prompts, setPrompts] = useState(db.prompts)
  const [author, setAuthor] = useState({
      "author": {
        "id": 10, // logged in user_id
        "username": "TED" // logged in username
      }
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/posts'),
      axios.get('/api/reaction_types'),
      axios.get('/api/prompts'),
    ])
      .then(([posts, reaction_types, prompts]) => {
        // setPostsList(posts.data);
        // setReactionTypes(reaction_types.data);
        // setPrompts(prompts.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  // checkForUnprofessionalLanguage, return true if spicy language present

  // convertToServerReadableFormat function that outputs data in format server is expecting

  const savePost = (newPost) => {
    // Check for spicy language in post text
    // Insert form data into db-friendly format
    // POST new post to db
    // .then Add full post entry to local state
    setPostsList([newPost, ...postsList])
    // return axios.post(`/api/posts`, post)
    // .then(() => {
    //   setPostsList([newPost, ...postsList])
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  }

  /* Manage reaction counts and stored user_reaction when reaction clicked
   * ... updates user_reaction_index and reaction_counts array as follows:
   * 1. If prevReaction = newReaction: reaction->null, -1 from count
   * 2. If prevReaction = null: update reaction, +1 to new count
   * 3. If prevReaction != null: update reaction, +1 to new count, -1 from old count min value 0 */
  const handleReactionCount = (p, newR) => {
    const prevR = p.user_reaction_index;
    if (prevR === newR) {
      p.user_reaction_index = null
    } else {
      p.user_reaction_index = newR
      p.reaction_counts[newR] += 1
    }
    if (p.reaction_counts[prevR] && p.reaction_counts[newR] >= 1) {
      p.reaction_counts[prevR] -= 1
    }
    const postsListClone = [...postsList].map((post) => {
      if (post.id === p.id) return p;
      return post;
    })
    setPostsList(postsListClone)
  }

  return ({
    postsList,
    reactionTypes,
    prompts,
    author,
    savePost,
    handleReactionCount
  })
}
