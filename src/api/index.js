import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://api.github.com',
});
export default {
  getRepo() {
    return apiRequest.get('/users/vuejs/repos');
  },
};
