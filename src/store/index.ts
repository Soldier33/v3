import { createStore } from 'vuex';

export default createStore({
  state: {
    username: '',
    school: '',
    role: '',
  },
  mutations: {
    setMsg(state, payload) {
      state.username = payload.username
      state.school = payload.school,
      state.role = payload.role
    }
  },
  actions: {},
  modules: {},
})
