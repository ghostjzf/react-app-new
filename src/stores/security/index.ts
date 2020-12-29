class Security {
  currentUser = null;
  token = null;

  get isLogin() {
    return !!this.currentUser;
  }
}

export default new Security();
