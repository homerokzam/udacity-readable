import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import PostReducer from './PostReducer';
import CategoryReducer from './CategoryReducer';
import CommentReducer from './CommentReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  categories: CategoryReducer,
  comments: CommentReducer,
  toastr: toastrReducer
})

export default rootReducer;