import axios from 'axios';

import { BASE_URL, COMMENT_FETCHED, COMMENT_ADDED } from '../Helpers/Const';

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

export function addComment(data) {
  const url = `${BASE_URL}/comments`;
  //return axios.post(url, data, { headers });
  const request = axios.post(url, data, { headers });
  return {
      type: COMMENT_ADDED,
      payload: request
  }
}