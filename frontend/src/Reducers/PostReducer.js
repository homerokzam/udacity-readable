import { POSTS_FETCHED, POSTS_SORT_BY, POST_VOTED, POST_UPDATED, POST_DELETED } from '../Helpers/Const';

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
    case POST_UPDATED:
      //const postsUpdated = updatePost(state.posts, action.payload.data);
      //console.log('PostReducer.POST_UPDATED');
      //console.log(action.payload.data);
      //console.log(state.posts);
      return { ...state };//, posts: postsUpdated };
  case POST_DELETED:
      console.log(action.payload);
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

function updatePost(posts, post) {
  return posts.map(p => {
    if(p.id === post.id) {
      p = {
        ...p,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      }
    }
    return p;
  });
}