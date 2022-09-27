import productModule from './products/index';
import { createStore } from "vuex";
const store = createStore({
  modules: {
    products: productModule,
  },
  state() {
    return {
      serverURL: "http://localhost:8888", //default url
    };
  },
  actions: {
    setServerUrl(context, data) {
        
      let serverURL;
      if (data) { // True = live mode
        serverURL = "";
      } else {
        serverURL = "http://localhost:8888";
      }
      
      context.commit("setServerUrl", serverURL);
    },
  },
  getters: {
    getServerUrl(state) {
      return state.serverURL;
    },
  },
  mutations: {
    setServerUrl(state, payload) {
      return (state.serverURL = payload);
    },
  },
});


export default store;