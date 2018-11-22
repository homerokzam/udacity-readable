import { ROOT_CATEGORIES_FETCHED, ROOT_POSTS_FETCHED, SORT_POSTS_BY, POST_VOTED } from '../Helpers/Const';

const INITIAL_STATE = { categories: [], posts: [], sorting: 'timestamp' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROOT_CATEGORIES_FETCHED:
      return { ...state, categories: action.payload.data.categories };
    case ROOT_POSTS_FETCHED:
      return { ...state, posts: action.payload.data };
    case SORT_POSTS_BY:
      const posts = sortBy(state.posts, action.payload);
      return { ...state, posts: posts, sorting: action.payload }
    case POST_VOTED:
      const postsVote = updateVote(state.posts, action.payload.data);
      return { ...state, posts: postsVote };
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