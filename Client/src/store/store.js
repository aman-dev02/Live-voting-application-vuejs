// store.js

import { createStore } from 'vuex'
import { actions } from './action'

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

const store = createStore({
  state: {
    user: loadUserFromLocalStorage(),
    allUsers: [],
    polls: [],
    myPolls:[]
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser(state) {
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    setAllUsers(state, users) {
      state.allUsers = users
    },
    SET_POLLS(state, poll) { 
      state.polls.push(poll);
    },
    REMOVE_POLL(state, pollId) {
      state.polls = state.polls.filter((poll) => poll.id !== pollId);
    },
    SET_MY_POLLS(state, myPolls) {
      state.myPolls = myPolls;
    },
  },
  actions,
  getters: {
    isLoggedIn: (state) => {
      return !!state.user
    },
    userId: (state) => {
      return state.user ? state.user._id : null
    }
  }
})

export default store
