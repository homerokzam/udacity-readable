import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { BASE_URL, headers, POSTS_FETCHED, POSTS_SORT_BY, POST_VOTED, POST_UPDATE_COMMENTS } from '../Helpers/Const';

export async function getPosts() {
  const url = `${BASE_URL}/posts`;
  const request = await axios.get(url, { headers });
  //toastr.success('Sucesso', 'Operação realizada com sucesso (Posts)!');

  return {
      type: POSTS_FETCHED,
      payload: request
  }
}

export async function getPost(id) {
  const url = `${BASE_URL}/posts/${id}`;
  const request = await axios.get(url, { headers });
  return request.data;
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
  return async dispatch => {
    const url = `${BASE_URL}/posts`;
    const request = await axios.post(url, post, { headers });
    toastr.success('Sucesso', 'Post incluído com sucesso!');

    // return {
    //     type: POST_ADDED,
    //     payload: request
    // }
    dispatch([
      getPosts()
    ]);
  }
}

export const updatePost = async (post) => {
  return async dispatch => {
    //console.log('PostActions.updatePost');
    //console.log(post);
    const url = `${BASE_URL}/posts/${post.id}`;
    const request = await axios.put(url, post, { headers });
    toastr.success('Sucesso', 'Post atualizado com sucesso!');

    // return {
    //     type: POST_UPDATED,
    //     payload: request
    // }
    dispatch([
      getPosts()
    ]);
  }
}

export const deletePost = (id) => {
  return async dispatch => {
    const url = `${BASE_URL}/posts/${id}`;
    const request = await axios.delete(url, { headers });
    toastr.success('Sucesso', 'Post excluído com sucesso!');
    // return {
    //     type: POST_DELETED,
    //     payload: request
    // }
    dispatch([
      getPosts()
    ]);
  }
}

export const updateCommentCount = (post, isAdd) => {
  //console.log('PostActions.updateCommentCount');
  return {
    type: POST_UPDATE_COMMENTS,
    payload: post,
    isAdd: isAdd
  }
}