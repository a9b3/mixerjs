import { observable } from 'mobx'

const types = {
  add: {
    display: 'Add Channel',
    key: 'add',
  },
}

export default class ActionModals {
  @observable stack = []

  peek() {
    return this.stack[this.stack.length - 1]
  }

  showModal(type) {
    if (!types[type]) return
    this.stack.push(types[type])
  }

  closeModal() {
    this.stack.pop()
  }
}
