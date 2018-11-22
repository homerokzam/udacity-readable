import axios from 'axios';

import { BASE_URL, ROOT_CATEGORIES_FETCHED, ROOT_POSTS_FETCHED, SORT_POSTS_BY, POST_VOTED } from '../Helpers/Const';

const headers = {
  Authorization: 'whatever-i-want'
};

export function getCategories() {
  const url = `${BASE_URL}/categories`;
  const request = axios.get(url, { headers });
  return {
      type: ROOT_CATEGORIES_FETCHED,
      payload: request
  }
}

export function getPosts() {
  const url = `${BASE_URL}/posts`;
  const request = axios.get(url, { headers });
  return {
      type: ROOT_POSTS_FETCHED,
      payload: request
  }
}

export function sortPostsBy(sorting) {
  return({
    type: SORT_POSTS_BY,
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