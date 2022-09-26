export default {
  addItemsToRemoveList(state, payload) {
    state.removeList.push(payload);
  },

  removeItemsFromRemoveList(state, payload) {
    const newProductList = state.removeList.filter(
      (product) => product != payload
    );
    state.removeList = newProductList;
  },

  clearRemoveList(state) {
    state.removeList = [];
  },

  removeSeletedItems(state) {
      
    const removeList = state.removeList;
    if (removeList.length == 0) {
      return;
    }
    const newProductList = state.products.filter(
      (product) => !removeList.includes(product.id)
    );
    state.removeList = [];
    state.products = newProductList;
  },

    createItem(state,payload){
      const newProductList = [...state.products];
      newProductList.push(payload);
      state.products = newProductList;
  }
};

