// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: 'Ini pesan dari halaman 1',
  },
  mutations: {
    setMessage(state, newMessage) {
      state.message = newMessage;
    },
  },
});
