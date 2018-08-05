import firebase from 'firebase'

export default class UserService {
  constructor(user) {
    this.user = user;
  }

  save() {
    // userId using current date as integer
    let userId = new Date().getTime();
    this.user["createdAt"] = new Date().toISOString();
    return firebase.database().ref('users/' + userId).set(this.user);
  }
}
