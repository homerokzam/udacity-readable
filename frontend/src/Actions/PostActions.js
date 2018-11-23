import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { BASE_URL, headers, POSTS_FETCHED, POSTS_SORT_BY, POST_VOTED, POST_ADDED, POST_DELETED } from '../Helpers/Const';

export async function getPosts() {
  const url = `${BASE_URL}/posts`;
  const request = await axios.get(url, { headers });
  //toastr.success('Sucesso', 'Operação realizada com sucesso (Posts)!');

  return {
      type: POSTS_FETCHED,
      payload: request
  }
}

export function sortPostsBy(sorting) {
  return({
    type: POSTS_SORT_BY,
    payload: sorting  
  });
}

export function vote(id, option) {
  const url = `${BASE_URL}/posts/${id}`;
  const request = axios.post(url, { option: option }, { headers });
  return {
      type: POST_VOTED,
      payload: request
  }
}

export const addPost = async (post) => {
  const url = `${BASE_URL}/posts`;
  const request = await axios.post(url, post, { headers });
  toastr.success('Sucesso', 'Post incluído com sucesso!');

  return {
      type: POST_ADDED,
      payload: request
  }
}

export function deletePost(id) {
  const url = `${BASE_URL}/posts/${id}`;
  const request = axios.delete(url, { headers });
  return {
      type: POST_DELETED,
      payload: request
  }
}