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
  import UserService from '../services/user-service';
const user = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  createdAt: ''
}

export default {
  name: 'register',
  data: () => {
    return {
      loading: false,
      errors: [],
      valid: false,
      user: user,
      users: []
    }
  },
  methods: {
    checkForm: function (e) {
      console.log(this.user.username);
      if ( this.user.username &&
           this.validUsername(this.user.username) &&
           this.user.email &&
           this.validEmail(this.user.email) &&
           this.user.password &&
           this.validPassword(this.user.password) &&
           this.user.passwordConfirmation &&
           (this.user.password === this.user.passwordConfirmation)) {
        this.valid = true;
      }

      this.errors = [];

      if (!this.user.username) {
        this.errors.push('Username required.');
      } else if (!this.validUsername(this.user.username)) {
        this.errors.push('Username must have between 6 and 12 characters and can not contain white spaces or non alpha numerical characters.');
      }
      if (!this.user.email) {
        this.errors.push('E-mail required.');
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.user.password) {
        this.errors.push('Password required.');
      } else if (!this.validPassword(this.user.password)) {
        this.errors.push('Password must have at least 4 characters, including a number and at least one uppercase letter.');
      }
      if (!this.user.passwordConfirmation) {
        this.errors.push('Password confirmation required.');
      }
      if (this.user.password !== this.user.passwordConfirmation) {
        this.errors.push('Password and Confirmation does not match.');
      }

      e.preventDefault();
    },
    validPassword: function (password) {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{4,}/
      return regex.test(password);
    },
    validUsername: function (username) {
      let regex = /\w{6,12}/
      return regex.test(username);
    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    resetModel: function() {
      this.user = user;
    },
    saveUser: function (e) {
      if (!this.valid) return;
      let newUser = new UserService(this.user)
      console.log(newUser.save());
      e.preventDefault();
    },
    usersEmpty: function () {
      return this.users.length == 0;
    }
  }
}
</script>
