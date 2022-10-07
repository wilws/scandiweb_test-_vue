<template>
    <div class="product-add-section">
        <alert-component v-show="showAlert"
            :msg="errorMsg"
            :btnContent="alertBtnNamae"
            @confirm="closeAlert"
        ></alert-component>
        <header-layout 
            :title="title" 
            :leftBtnName="leftBtnName"
            :rightBtnName="rightBtnName"
            @leftBtnEvent="saveItem"
            @rightBtnEvent="cancel"
        ></header-layout>
        <products-add-frame ref="productAddFrame" />     
    </div>
</template>


<script>

import HeaderLayout from "../components/layout/TheHeader.vue";
import ProductsAddFrame from "../components/ProductAddComponents/ProductsAddFrame.vue"
import FormValidation from "../mixins/FormValidation.vue";
import AlertComponent from "../components/UI/AlertComponent.vue"

export default {
    components:{HeaderLayout,ProductsAddFrame,AlertComponent},
    mixins:[FormValidation],                                  // import mixins function to validae user input
    data(){
        return {
            title : "Product_Add",             // Set page title                            
            leftBtnName : "Save",              // Set header left button's name
            rightBtnName : "Cancel",           // Set header right button's name
            showAlert:false,                   // "true" = show alert component 
            errorMsg: "",                      // "erroMSg" in the alert
            alertBtnNamae : "OK"               // name for the button in alert ot dismiss the alert compnent
        }
    },
    methods:{

        async saveItem(){                                          // When "save" button is clicked
            const re = this.getInputValues();                      // Trigger "getInputValues()"" to get and validate inputs
           
            if (re.status !== 'success'){                          // if "error", mean validation fail. show alert component
                this.showAlert = true;  
                this.errorMsg = re.message;

            } else {                                                // if "success", pass the validation in vue. 
                const result = await this.$store.dispatch({         // Try to create object in vuex and database
                    type:"products/createItem",
                    data:re.data
                });
                if (result.status === 'success'){                   // if creation success
                    this.$router.push('/');                         // return to "Product List" page
                } else {
                    this.showAlert = true;                          // if creation faile, show alert component
                    this.errorMsg = result.message;                     
                }
            }
        },
        closeAlert(){
            this.showAlert = false;
            this.errorMsg = "";
        },

        cancel(){
            this.$router.push('/');
        },
 
        getInputValues(){               

            const inputValue = this.$refs.productAddFrame.returnInputValue();             // it ask the child to retrun input value
            let values = {};                                                              // store the newly created item
            let result =[];                                                               // store result and return to "saveItem". 
            let errMsg = "";                                                              // error message,if any, during the create process
       
            for (const [key, value] of Object.entries(inputValue)) {         
                let v = this.validation(key,value)                           // validating data, return error message (String) if not valid
                if (v){
                    errMsg += v;                                             // if v contains error message, store in "errMsg".
                } else {
                    values[key] = value;                                     // if valid, store value in "values"
                }
            }
           
            // After looping complete, check is there any errMsg
            
            if (!errMsg) {     
                // values['spec'] = ""                                                         // if no error message, 
                // if (values.height){                                                         // if values has key "heigh" = Type must be "furniture"
                //     values['spec'] =`${values.height}x${values.width}x${values.length}`;    //  construct the data "spec" for product type "Furniture"
                // } else {
                //      values['spec'] = (!values.weight) ? values.size : values.weight;       // if no "heigh", either "weight" and "size" should be available
                // }
                result = {
                    status:'success',
                    data: values
                }
            } else {                            // if err, return status 
                result = {
                    status:'error',
                    message: errMsg
                }
            }
            return result;
        },

        resetForm(){
            this.$refs.productAddFrame.resetInputValue();  // Reset all the input value. 
                                                           // Since the input fields are in child component. 
                                                           // It calls child's reset method. 
        }
    },

    beforeRouteLeave(to,from,next){
        this.resetForm();  // reset the form before leave this page
        this.title=""      // reset the header title 
        next();
    }
}
</script>

<style lang="scss">
.product-add-section{
    @include pageSetting();
}
</style>