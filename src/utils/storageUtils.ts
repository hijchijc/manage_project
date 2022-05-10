import store from 'store'

const USER_KEY = 'user_key'

const utils =  {
  saveUser(user: string):void {
    store.set(USER_KEY, user)
  },
  getUser() {
    return store.get(USER_KEY) || {}
  },
  removeUser(): void {
    store.remove(USER_KEY)
  }
}

export default utils