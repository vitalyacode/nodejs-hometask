const UserService = require('./userService');

class AuthService {
  login(userData) {
    const user = UserService.search(userData);
    if (!userData.email || !userData.password) throw new Error('Enter credentials');

    if (!user) {
      throw Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
