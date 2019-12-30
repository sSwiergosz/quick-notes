import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [
      {
        id: 1,
        title: 'delectus aut autem',
        content: 'Lorem ipsum',
        status: 'New',
      },
      {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        content: 'Lorem ipsum',
        status: 'Completed',
      },
      {
        id: 3,
        title: 'fugiat veniam minus',
        content: 'Lorem ipsum',
        status: 'Not completed',
      },
    ],
  },
  mutations: {
    addNote(state, note) {
      state.notes.push(note);
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getNotes(state) {
      return state.notes;
    },
  },
});
