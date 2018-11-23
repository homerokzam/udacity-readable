import { CATEGORIES_FETCHED } from '../Helpers/Const';

const INITIAL_STATE = { categories: [] }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATEGORIES_FETCHED:
      return { ...state, categories: action.payload.data.categories };
    default:
      return state;
  }
}