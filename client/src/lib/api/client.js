import axios from 'axios';

const client = axios.create();

/*
  //global setting example:
  
  client.defaults.baseURL = 'https://external-api-server.com/' 

  // set header
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // set intercepter
  axios.intercepter.response.use(\
    response => {
      // success
      return response;
    }, 
    error => {
      // failure
      return Promise.reject(error);
    }
  })  
*/

export default client;
