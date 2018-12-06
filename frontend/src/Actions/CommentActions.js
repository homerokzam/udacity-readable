import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { BASE_URL, COMMENT_FETCHED, COMMENT_ADDED, COMMENT_UPDATED } from '../Helpers/Const';

import { updateCommentCount } from './PostActions';

const headers = {
  Authorization: 'Teste'
};

export function getComments(parentId) {
  const url = `${BASE_URL}/posts/${parentId}/comments`;
  const request = axios.get(url, { headers });
  return {
      type: COMMENT_FETCHED,
      payload: request
  }
}

export function addComment(post, data) {
  return async dispatch => {
    const url = `${BASE_URL}/comments`;
    //return axios.post(url, data, { headers });
    const request = await axios.post(url, data, { headers });
    toastr.success('Sucesso', 'Comment adicionado com sucesso!');

    // return {
    //     type: COMMENT_ADDED,
    //     payload: request
    // }

    //console.log('CommentActions.addComment');

    dispatch([
      getComments(data.parentId),
      updateCommentCount(post, true)
    ]);
  }
}

export const updateComment = async (comment) => {
  //console.log('PostActions.updatePost');
  //console.log(post);
  const url = `${BASE_URL}/comments/${comment.id}`;
  const request = await axios.put(url, comment, { headers });
  toastr.success('Sucesso', 'Comment atualizado com sucesso!');

  return {
      type: COMMENT_UPDATED,
      payload: request
  }
}

export const deleteComment = (post, id, parentId) => {
  return async dispatch => {
    const url = `${BASE_URL}/comments/${id}`;
    const request = await axios.delete(url, { headers });
    toastr.success('Sucesso', 'Comment excluído com sucesso!');
    // return {
    //     type: COMMENT_DELETED,
    //     payload: request
    // }
    dispatch([
      getComments(parentId),
      updateCommentCount(post, false)
    ]);
  }
}