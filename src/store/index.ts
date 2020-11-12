import { createStore } from 'vuex';

export default createStore({
  state: {
    username: '',
    school: '',
    role: '',
    schoolId: '',
  },
  mutations: {
    setMsg(state, payload) {
      state.username = payload.username
      state.school = payload.school,
      state.schoolId = payload.schoolId,
      state.role = payload.role
    }
  },
  actions: {},
  modules: {},
})
