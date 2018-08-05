import firebase from 'firebase'

export default class UserService {
  static list() {
    return firebase.database().ref('users/');
  }

  static save(user) {
    // userId using current date as integer
    let userId = new Date().getTime();
    user["createdAt"] = new Date().toISOString();
    return firebase.database().ref('users/' + userId).set(user);
  }
}
