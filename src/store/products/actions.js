
export default {
  addItemsToRemoveList(context, payload) {
    // No database involved
    // Add product id to "RemoveList".
    // Items in "RemoveList" are about to be removed after "Mass Remove" is clicked
    context.commit("addItemsToRemoveList", payload.item);
  },

  removeItemsFromRemoveList(context, payload) {
    // No database involved
    // Remove product id from "RemoveList".
    // Items in "RemoveList" are about to be removed after "Mass Remove" is
    context.commit("removeItemsFromRemoveList", payload.item);
  },

  clearRemoveList(context) {
    // No database involved
    // Unset Remove list. Called when user leaves "Product List" page
    context.commit("clearRemoveList");
  },


  // Function that delete data from database
  async deleteItemsFromDatabase(context) {
    const removeList = [...context.getters["getRemoveList"]];
    try {
      const data = await context.dispatch({
        type: "fetchApi",
        data: {
          formData: { removeList: removeList },
          api: "/product/delete-products",
          method: "DELETE",
        },
      });

      await context.commit("removeSeletedItems");  // When deletion succes. Update products list in vuex store
      return {
        status: "success",
        data: { message: data },
      };
    } catch (err) {
      const error = err;
      return {
        status: "error",
        message: error,
      };
    }
  },




  // Function that fetchs data from database
  async fetchProductFromDatabase(context) {
      
    try {
      const data = await context.dispatch({
        type: "fetchApi",
        data: {
          formData: null,
          api: "/product/get-products",
          method: "GET",
        },
      });

 

      await context.commit("updateProductsList", data); // update vuex
      return {
        status: "success",
        data: { message: `Successfully fetch products from database` },
      };
    } catch (err) {
      const error = err;

      return {
        status: "error",
        message: error,
      };
    }
  },




  // Function that writes new record to database
  async createItem(context, payload) {

    const product = payload.data;

    try {
      const data = await context.dispatch({
        type: "fetchApi",
        data: {
          formData: product,
          api: "/product/create-product",
          method: "POST",
        },
      });
      product["id"] = data.id;                      // if success, will return newly inserted id
      await context.commit("createItem", product);  // update vuex
      return {
        status: "success",
        data: {
          product: { product },
          message: `Product '${product["name"]}' (id=${product["id"]}) is created. `,
        },
      };
    } catch (err) {
      const error = err;
      return {
        status: "error",
        message: error,
      };
    }
  },


  

  // Function that dispatchs API to database
  async fetchApi(context, data) {

    const api = data.data.api;
    const url = context.rootGetters["getServerUrl"] + api;
    let fetchPara = {};

    if (!data.data.formData) {
      // if GET method, no body is required
      fetchPara = {
        method: data.data.method,
        headers: {
          "Content-Type": "application/json",
        },
      };
    } else {
      fetchPara = {
        method: data.data.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.data.formData),
      };
    }

    try {
      const resData = await fetch(url, fetchPara);
      const res = await resData.json();

     

      if (resData.status !== 200) {
        // Check if internal or connection error
        const error = new Error();
        error.statusCode = resData.status;
        throw error;
      }

      if (res.status !== "success") {
        // Check if other error, eg: type / input
        const error = new Error(res.message);
        error.statusCode = resData.status;
        throw error;
      }

      return res.data;
    } catch (err) {

      const error = err; // prevent unnecessary "try/catch wrapper"
      throw error;
    }
  },
};
