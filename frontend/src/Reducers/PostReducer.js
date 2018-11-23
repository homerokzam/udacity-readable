import { POSTS_FETCHED, POSTS_SORT_BY, POST_VOTED, POST_DELETED } from '../Helpers/Const';

const INITIAL_STATE = { categories: [], posts: [], sorting: 'timestamp' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POSTS_FETCHED:
      return { ...state, posts: action.payload.data };
    case POSTS_SORT_BY:
      const posts = sortBy(state.posts, action.payload);
      return { ...state, posts: posts, sorting: action.payload }
    case POST_VOTED:
      const postsVote = updateVote(state.posts, action.payload.data);
      return { ...state, posts: postsVote };
    case POST_DELETED:
      return state;     
    default:
      return state;
  }
}

function sortBy(dados, sorting) {
  const dados1 = [...dados];
  return dados1.sort((a, b) => a[sorting] - b[sorting]);
}

// function updateVote(posts, post) {
//   const index = posts.map(p => p.id).indexOf(post.id);
//   posts[index] = {  ...posts[index], voteScore: post.voteScore };
//   return posts;
// }

function updateVote(posts, post) {
  return posts.map(p => {
    if(p.id === post.id) {
      p = {
        ...p,
        voteScore: post.voteScore
      }
    }
    return p;
  });
}