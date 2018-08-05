<template>
<section id="app">
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view></router-view>
</section>
</template>

<script>
import VueRouter from 'vue-router'
import Register from './components/Register.vue'

const routes = [
  { path: '/', component: Register }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default {
  name: 'app',
  components: {},
  router: router
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex-grid {
  display: flex;
}
.col {
  flex: 1;
}
.panel {
  border: 1px solid #eee;
}
table {
  width: 100%:
}
</style>
