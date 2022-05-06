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
      axios.get(`/api/posts/${author.author.id}`),
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
      user_reaction_id: null,
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

  const handleReactionCount = (p, newI, newR) => {
    // Constants for old reaction_type_id & index of reaction arrays
    const prevR = p.user_reaction_id;
    const prevI = reactionTypes.findIndex(r => r.id === prevR)
    /* Update user_reaction_type & reaction_counts arrays
     * 1. prevReaction===newReaction: reaction->null, -1 from prev min 0
     * 2. prevReaction===null: reaction->newR, +1 to new count
     * 3. Otherwise: reaction->newR, +1 to new count, -1 from prev min 0 */
    if (prevR === newR) {
      p.user_reaction_id = null
    } else {
      p.user_reaction_id = newR
      p.reaction_counts[newI] += 1
    }
    if (prevR && p.reaction_counts[prevI] > 0) {
      p.reaction_counts[prevI] -= 1
    }
    // Create server-readable object to update reactions data
    const reactionData = {
      userId: author.author.id,
      postId: p.id,
      reactionId: p.user_reaction_id
    }
    // Update server & on return update local
    axios.put('/api/user_post_reaction', reactionData)
    .then(({data}) => {
      const d = data[0];
      // Check returned data matches what was intended; update local state 
      if (p.user_reaction_id === d.reaction_type_id && p.id === d.post_id) {
        setPostsList([...postsList].map((post) => {
          if (post.id === p.id) return p;
          return post;
        }))
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
