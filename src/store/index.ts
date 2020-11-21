import { createStore } from 'vuex';

export default createStore({
  state: {
    username: '',
    school: '',
    role: '',
    schoolId: '',
    currentWeek: 0
  },
  mutations: {
    setMsg(state, payload) {
      state.username = payload.username
      state.school = payload.school,
      state.schoolId = payload.schoolId,
      state.role = payload.role
    },
    setCurrentWeek(state, payload) {
      if (payload === -1)
      payload = 1
      state.currentWeek = payload
    }
  },
  actions: {},
  modules: {},
})
