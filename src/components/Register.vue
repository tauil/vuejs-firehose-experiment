<template>
<section class="flex">
  <h1>Register</h1>

  <section class="flex-grid">
    <section class="col">
      <div class="panel">
        <form id="app" @submit="checkForm" @submit.prevent="saveUser" method="post">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="(error) in errors" :key="error.id">{{ error }}</li>
            </ul>
          </p>

          <p>
            <label for="username">Username</label>
            <input id="username" v-model="user.username" type="text" name="username" autocomplete="off">
          </p>

          <p>
            <label for="email">Email</label>
            <input id="email" v-model="user.email" type="text" name="email" autocomplete="off">
          </p>

          <p>
            <label for="password">Password</label>
            <input id="password" v-model="user.password" type="password" name="password">
          </p>

          <p>
            <label for="password">Password Confirmation</label>
            <input id="password-confirmation" v-model="user.passwordConfirmation" type="password" name="passwordConfirmation">
          </p>

          <p>
            <input type="submit" value="Submit">
          </p>
        </form>
      </div>
    </section>
    <section class="col">
      <div class="panel">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>E-mail</th>
              <th>Created at</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.username">
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td>{{user.createdAt}}</td>
            </tr>

            <tr v-if="loading">
              <td>Loading...</td>
            </tr>

            <tr v-if="usersEmpty">
              <td colspan="3">No users registered yet.</td>
            </tr>
          </tbody>
      </table>
      </div>
    </section>
  </section>
</section>
</template>

<script>
  export default {
    name: 'register',
    data: () => {
      return {
        loading: false,
        errors: [],
        user: {
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          createdAt: ''
        },
        users: []
      }
    },
    methods: {
      checkForm: () => {

      },
      saveUser: () => {

      },
      usersEmpty: () => {
        return this.users.length == 0;
      }
    }
  }
</script>

<style>

</style>
