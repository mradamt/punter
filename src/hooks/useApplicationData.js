import { useEffect, useState } from "react";
import axios from "axios";

const spicyWordList = require('badwords-list').array

export default function useApplicationData() {
  const [postsList, setPostsList] = useState()
  const [reactionTypes, setReactionTypes] = useState()
  const [prompts, setPrompts] = useState()
  const [author, setAuthor] = useState({
      "author": {
        "id": 3, // logged in user_id
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
        setPostsList(posts.data);
        setReactionTypes(reaction_types.data);
        setPrompts(prompts.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  // isProfane lifted from: https://github.com/web-mech/badwords/blob/master/lib/badwords.js
  const isProfane = text => {
    return spicyWordList.filter(word => {
      const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
      return wordExp.test(text);
    }).length > 0 || false;
  }

  const savePost = (text, promptId) => {
    // Check for spicy language in post text
    const spicy_language = isProfane(text)
    // If spicy_language, confirm its use is deliberate & note it'll be filtered out of posts by default

    // Insert form data into db-friendly format
    const postData = {
      user_id: author.id,
      prompt_id: promptId,
      text,
      spicy_language
    }
    // POST new post to db
    // .then Add full post entry to local state
    // setPostsList([newPost, ...postsList])
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
