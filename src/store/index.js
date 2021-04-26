import { createStore } from "vuex";

export default createStore({
  state: {
    totalFromVueX: 30,
    username: "example",
    password: "mypassword",
    admin_username: "adminuser",
    admin_password: "adminpass",
    isloggedin: false
  },
  getters: {
    doubleDuTotal(state){
      return state.totalFromVueX * 2;
    }
  },
  mutations: {
    setTotalFromVueX(state, nouvelle_valeur){
      state.totalFromVueX = nouvelle_valeur;
    },
    incrementTotalFromVueX(state, incrementation){
      state.totalFromVueX = state.totalFromVueX+incrementation;
    },
    saveUser(state, username){
      state.username = username;
    },
    savePassword(state, password){
      state.password = password;
    },
    saveAdminUser(state, username){
      state.admin_username = username;
    },
    saveAdminPassword(state, password){
      state.admin_password = password;
    },
    updateLoggin(state){
      if(state.admin_username == state.username && state.admin_password == state.password){
        state.isloggedin = true;
      }
    }
  },
  actions: {

  },
  modules: {

  },
});
