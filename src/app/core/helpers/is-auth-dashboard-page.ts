export default class IsAuthDashboardPage {
  static check(url) {
    return /auth|admin|partner|customers|employee/.test(url);
  }
}
