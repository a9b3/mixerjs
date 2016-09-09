export default class UI {
  state = {}

  register(key) {
    state[key] = state[key] || {}
  }
}
