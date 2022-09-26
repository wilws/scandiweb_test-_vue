
export default {

  addItemsToRemoveList(context, payload) {
    // add product id to "RemoveList".
    // Items in "RemoveList" are about to be removed after "Mass Remove" is clicked
    context.commit("addItemsToRemoveList", payload.item);
  },

  removeItemsFromRemoveList(context, payload) {
    // Remove product id from "RemoveList".
    // Items in "RemoveList" are about to be removed after "Mass Remove" is
    context.commit("removeItemsFromRemoveList", payload.item);
  },

  clearRemoveList(context) {
    // Unset Remove list
    context.commit("clearRemoveList");
  },

  removeSeletedItems(context) {
    // Remove items (in RemoveList) from Products list.
    context.commit("removeSeletedItems");
  },

  createItem(context,payload){
    const keys = ["sku","name", "price","spec","productType"];
    const products = [];
    keys.forEach((key) => {
      products[key] = payload.data[key];
    });
    
    products['id'] = Math.floor(Math.random() * 100) + 13;
    context.commit("createItem", products);
  }
};
