<template>
  <div>
    Total: {{ reposData.length }}
    <div class="content" @scroll="handleScroll">
      <h1>franklion repo list: </h1>
      <ul>
        <li v-for="(item) in reposData" :key="item.id">
          <title>{{ item.name }}</title>
          <div class="description">{{ item.description }}</div>
          <a :href="item.html_url" class="url" target="_blank">{{ item.html_url }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import api from './api';

export default ({
  setup() {
    const state = reactive({
      repos: [],
      reposData: [],
    });
    const getRepoData = async () => {
      const { data } = await api.getRepo();
      state.repos = data;
      state.reposData = state.repos.splice(0, 6);
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          state.reposData.push(...state.repos.splice(0, 6));
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    const handleScroll = () => {
      const Lis = document.querySelector('.content').querySelectorAll('li');
      if (Lis.length === 0) return;
      const Lis1 = Lis[Lis.length - 1];
      observer.observe(Lis1);
    };
    onMounted(() => {
      getRepoData();
    });
    return { ...toRefs(state), handleScroll };
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
  height: 720px;
  background: #fafafa;
  overflow-y: scroll;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
}

ul {
  li {
    list-style-type: none;
    background: #fff;
    box-shadow: 0px 1px 2px 1px #c2c2c2;
    margin-bottom: 15px;
    padding: 20px 15px;
    line-height: 22px;

    title {
      font-size: 16px;
      display: block;
      font-weight: 600;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
