import { combineReducers } from 'redux';

import RootReducer from './RootReducer';
import CommentReducer from './CommentReducer';

const rootReducer = combineReducers({
  root: RootReducer,
  comment: CommentReducer
})

export default rootReducer;