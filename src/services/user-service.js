export default class UserService {
  constructor(user) {
    this.user = user;
  }

  save() {
    console.log('Save user:', this.user);
  }
}
