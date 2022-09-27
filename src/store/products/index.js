
import mutations from './mutations.js';
import actions from './actions.js'
import getters from './getters.js'

export default{

    namespaced:true,

    state( ){
        return {
          removeList: [],
          products: [
            // {
            //   id: "1",
            //   sku: "1",
            //   name: "what a good book",
            //   price: "9",
            //   productType: "Book",
            //   spec: "50",
            // },
            // {
            //   id: "2",
            //   sku: "2",
            //   name: "what a good DVD",
            //   price: "9",
            //   productType: "DVD",
            //   spec: "20",
            // },
            // {
            //   id: "3",
            //   sku: "3",
            //   name: "what a Furniture",
            //   price: "9",
            //   type: "DVD",
            //   spec: "50",
            // },
            // {
            //   id: "4",
            //   sku: "4",
            //   name: "dog",
            //   price: "9",
            //   type: "DVD",
            //   spec: "50",
            // },
            // {
            //   id: "5",
            //   sku: "5",
            //   name: "cat",
            //   price: "9",
            //   type: "Furniture",
            //   spec: "34x34x89",
            // },
            // {
            //   id: "6",
            //   sku: "6",
            //   name: "glass",
            //   price: "9",
            //   type: "Furniture",
            //   spec: "14x14x29",
            // },
            // {
            //   id: "7",
            //   sku: "7",
            //   name: "TV",
            //   price: "9",
            //   type: "DVD",
            //   spec: "78",
            // },
            // {
            //   id: "8",
            //   sku: "8",
            //   name: "i duno",
            //   price: "9",
            //   type: "DVD",
            //   spec: "56",
            // },
            // {
            //   id: "9",
            //   sku: "9",
            //   name: "table",
            //   price: "9",
            //   type: "Book",
            //   spec: "98",
            // },
            // {
            //   id: "10",
            //   sku: "10",
            //   name: "chair",
            //   price: "9",
            //   type: "Furniture",
            //   spec: "1x2x10",
            // },
            // {
            //   id: "11",
            //   sku: "11",
            //   name: "machine",
            //   price: "9",
            //   type: "Book",
            //   spec: "45",
            // },
            // {
            //   id: "12",
            //   sku: "12",
            //   name: "car",
            //   price: "9",
            //   type: "Furniture",
            //   spec: "12x3x65",
            // },
          ],
        };
    },
                                             //  can be just written like: 
    mutations: mutations,    //  mutations,
    actions:actions,              //  actions,
    getters:getters,              //  getters,
}

