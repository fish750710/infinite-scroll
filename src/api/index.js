import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://api.github.com',
});
export default {
  getRepo(p = 1) {
    return apiRequest.get(`/users/vuejs/repos?per_page=6&page=${p}`);
  },
};
