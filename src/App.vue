<template>
<section id="app">
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view></router-view>
  <footer>
    <p>All right reserved to Rafael B. Tauil. This application is just a study case.</p>
  </footer>
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
  color: #2c3e50;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.2em;
  margin: 0 0 1em;
}
.flex-grid {
  display: flex;
}
.col {
  flex: 1;
  background: #eee;
  padding: 2em;
}
.col:first-child {
  margin-right: 1px;
}
table {
  width: 100%;
}
table th, table td {
  padding: .5em;
  border-bottom: 1px dotted #ccc;
  text-align: left;
}
table .placeholder {
  text-align: center;
  line-height: 15em;
}
form {
  width: 50%;
  margin: 0 auto;
}
form input {
  font-size: 1em;
  outline: none;
  padding: .5em;
  width: 100%;
  box-sizing: border-box;
}
form input[type="submit"] {
  background: #333;
  color: #fff;
  border: 1px solid #000;
}
form label {
  display: block;
}
.error-message {
  color: #df0000;
}
footer {
  text-align: center;
}
</style>
