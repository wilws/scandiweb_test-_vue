import productModule from './products/index';
import { createStore } from "vuex";
const store = createStore({
    modules:{
        products: productModule,
           },
    state(){
        return{
          
        }
    }

});


export default store;