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

  const toLocalFormat = (partialPost) => {
    const reaction_counts = {}
    for (const id in reactionTypes) {reaction_counts[id] = 0}
    return ({
      ...partialPost,
      user_reaction_index: null,
      author: author.author,
      reaction_counts
    })
  }

  const savePost = (text, promptId) => {
    const spicy_language = isProfane(text)
    // TODO // If spicy_language, confirm its use is deliberate & note it'll be filtered out of posts by default
    const postData = {
      user_id: author.author.id,
      prompt_id: promptId,
      text,
      spicy_language
    }
    axios.post('/api/posts', postData)
    .then((res) => {
      setPostsList([toLocalFormat(res.data), ...postsList])
    })
    .catch(err => {
      console.log(err);
    })
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
    const reactionData = {
      userId: author.author.id,
      postId: p.id,
      reactionId: p.user_reaction_index
    }
    axios.put('/api/user_post_reaction', reactionData)
    .then(({data}) => {
      if (data[0].post_id === p.id && data[0].reaction_type_id === p.user_reaction_index) {
        setPostsList(postsListClone)
      } else {
        console.log('ERROR: server did not update data correctly')
      }
    })
    .catch(err => console.log(err))
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
