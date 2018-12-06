import { COMMENT_FETCHED, COMMENT_ADDED, COMMENT_UPDATED } from '../Helpers/Const';

const INITIAL_STATE = { comments: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMENT_FETCHED:
      return { ...state, comments: action.payload.data };
    case COMMENT_ADDED:
      const comments = { ...state };
      console.log(comments);
      //console.log(action.payload.data);
      //comments.push(action.payload.data);

      return { ...state, comments: [...state.comments, action.payload.data] };
    case COMMENT_UPDATED:
      return { ...state };
    default:
      return state;
  }
}