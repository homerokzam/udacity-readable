import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { BASE_URL, CATEGORIES_FETCHED } from '../Helpers/Const';

const headers = {
  Authorization: 'whatever-i-want'
};

export async function getCategories() {
  const url = `${BASE_URL}/categories`;
  const request = await axios.get(url, { headers });
  //toastr.success('Sucesso', 'Operação realizada com sucesso (Categoria)!');
  
  return {
      type: CATEGORIES_FETCHED,
      payload: request
  }
}