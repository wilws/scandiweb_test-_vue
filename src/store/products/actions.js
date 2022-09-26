
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

  async createItem(context,payload){
    const keys = ["sku","name", "price","spec","productType"];
    const product = [];
    keys.forEach((key) => {
      product[key] = payload.data[key];
    });
    
    
    try{
      const id = await context.dispatch("writeToDatabase", product);
      product['id'] = id;
      await context.commit("createItem", product);
      return {
        status: "success",
        data: {
            product:product,
            message:`Product '${product['name']}' (id=${product['id']}) is created. `
        },
      };
    } catch(err) {
        const error = err; // prevent " error  Unnecessary try/catch wrapper "
        return {
            status:'error',
            message:error
        }
    }
  },

  async writeToDatabase(context, data){

    const formData = {
        sku:data.sku,
        name:data.name,
        price:data.price ,
        spec:data.spec,
        productType:data.productType,
     };
 
    const api = "/product/create-product";
    const url = context.rootGetters["getServerUrl"] + api;


    try{
        const resData = await fetch(url,{
            method: "POST",                              
            headers:{
                'Content-Type':'application/json'         
            },
            body:JSON.stringify(formData),
            // credentials: 'include'
        });

        const res = await resData.json();  

 
        if (resData.status !== 200) {         // Check if return status 200
            const error = new Error();
            error.statusCode = resData.status;
            throw error;
        } 

        if (res.status !== 'success') {
            const error = new Error(res.message);
            error.statusCode = resData.status;
            throw error;
        }

        return res.data.id;  // Return the newly inserted ID

    } catch(err){
        
        const error = err // prevent " error  Unnecessary try/catch wrapper "
        throw error;
    }
  }
};
