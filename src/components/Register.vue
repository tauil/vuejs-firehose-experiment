<template>
<section class="flex">
  <h1>Register User</h1>

  <section class="flex-grid">
    <section class="col">
      <div class="panel">
        <h2>New User</h2>
        <form id="app" @submit="checkForm" @submit.prevent="saveUser" method="post">
          <p v-if="success" class="success-message">User registered successfully!</p>

          <p v-if="errors.length" class="error-message">
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
        <h2>Latest Registered Users</h2>
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
              <td><input type="button" @click="removeUser(user.id)" value="Remove" /></td>
            </tr>

            <tr v-if="loading">
              <td colspan="3" class="placeholder">Loading...</td>
            </tr>

            <tr v-if="!loading && usersEmpty">
              <td colspan="3" class="placeholder">No users registered yet.</td>
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

export default {
  name: 'register',
  data: () => {
    return {
      loading: false,
      errors: [],
      valid: false,
      success: false,
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
  computed: {
    usersEmpty: function () {
      return this.users.length == 0;
    }
  },
  created: function () {
    this.loadUsers();
  },
  methods: {
    checkForm: function (e) {
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
      this.user = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        createdAt: ''
      };
    },
    loadUsers: function () {
      let component = this;
      UserService.list().on('value', function(snapshot) {
        let usersArray = []
        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          userData["id"] = childSnapshot.key;
          usersArray.push(userData);
        });
        
        component.users = usersArray;
        component.loading = false;
      });
    },
    saveUser: function (e) {
      if (!this.valid) return;
      let component = this;
      component.loading = true;
      UserService.save(this.user).then(
        function () {
          component.loading = false;
          component.resetModel();
          component.success = true;
        },
        function () {
          component.loading = false;
          component.errors.push('An error occured while trying to save into the database.');
        }
      );
      e.preventDefault();
    },
    removeUser: function (userId) {
      let component = this;
      component.loading = true;
      UserService.remove(userId).then(
        function () {
          component.loading = false;
        },
        function () {
          component.loading = false;
          component.errors.push('An error occured while trying to save into the database.');
        }
      );
    }
  }
}
</script>
