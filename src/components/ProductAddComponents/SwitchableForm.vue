<template>
    <div class="switchable-form-section">
     
        <div class="switcher-input">
            <label for="productType">Type Switcher </label>
            <select name="type" id="productType" v-model="selectedItem">
                <option  value="Book">Book</option>
                <option value="DVD">DVD</option>
                <option value="Furniture">Furniture</option>
            </select>
        </div>

        <div class="spec-input">
            <div  v-show="type.DVD" id="DVD">
                <base-input
                    :labelName="'Size (MB)'"
                    :key="'size'"
                    :type="'number'"
                    :name="'DVD[size]'"
                    :id="'size'"
                    :placeholder="''"
                    :value="''"
                    :min="0"
                />
                <p>Please provide size (MB)</p>
            </div>

            <div  v-show="type.Furniture" id="Furniture">
                <base-input
                    :labelName="'Height (CM)'"
                    :key="'height'"
                    :type="'number'"
                    :name="'Furniture[height]'"
                    :id="'height'"
                    :placeholder="''"
                    :value="''"
                    :min="0"
                />
                <br>
                <base-input
                    :labelName="'Width (CM)'"
                    :key="'width'"
                    :type="'number'"
                    :name="'Furniture[width]'"
                    :id="'width'"
                    :placeholder="''"
                    :value="''"
                    :min="0"
                />
                <br>

                <base-input
                    :labelName="'Length (CM)'"
                    :key="'length'"
                    :type="'number'"
                    :name="'Furniture[length]'"
                    :id="'length'"
                    :placeholder="''"
                    :value="''"
                    :min="0"
                />
                <p>Please provide dimensions in HxWxL format</p>
            </div>

            <div v-show="type.Book" id="Book">
                <base-input
                    :labelName="'Weight (KG)'"
                    :key="'weight'"
                    :type="'number'"
                    :name="'Book[weight]'"
                    :id="'weight'"
                    :placeholder="''"
                    :value="''"
                    :min="0"
                />
                <p>Please provide Weight (KG)</p>
            </div>
        </div>
    </div>



</template>

<script>
import BaseInput from "../UI/BaseInput.vue";
export default {
    components:{BaseInput},
    data(){
        return{
            selectedItem:"Book",                            // Pre-set value as Book
            type:{                                          // Pre-set value as Book
                Book:true,
                DVD:false,
                Furniture:false,
            }
        }
    },
    watch:{
        selectedItem(t){
           this.switcher(t);        // Monitor the state of  "selectedItem".  Perform switcher() when state change
        },
    },
    methods:{
        switcher(t){
            for (let k in this.type ){      
                if (k == t){                
                    this.type[t] = true;    // Set the current type to true (show it)
                } else {                        
                    this.type[k] = false;   // Set other types to false (hidde it)
                }
                this.setInputValue(k,null);  // Re-Set all the input value when switching. second arg is the value that to be set
            }
            
        },

        setInputValue(id,val){
            let inputs = document.querySelectorAll(`#${id} .base-input input`)
            inputs.forEach((i)=>{
                i.value = val;
            });
        },

        resetAllInputValue(){     
            this.selectedItem = 'Book';             // Cannot alter selectedItem to triger watcher 
            this.setInputValue('Book',null);        //  Because this function is triggered from parent 
        },

        returnInputValue(){
            let value ={};
            let inputs = document.querySelectorAll(`#${this.selectedItem} .base-input input`)
            inputs.forEach((e)=>{
                value[e.id] = e.value
            })
            value['productType'] = this.selectedItem;
            return value;
        }
    }
    
}
</script>


<style lang="scss" scoped>
.switchable-form-section{
    /* !!! */
    /* The margin-top is controlled by parent "ProductAddFrame.vue" */
    /* Not doing here to avoid out-putting of strange position when resue of the component.  */
    /* !!! */

    .switcher-input{
        width:50%;
        display: flex;
        justify-content: space-between;
        @media(max-width:787px){
                 width:90%;
        }
        @media(max-width:492px){
            flex-wrap: wrap;
        }

        label{
            font-family: $primary-font;
            font-weight: bold;
            margin-right: 3rem;
            width:30%;
             /* border:red thin solid; */

            @media(max-width:936px){
                font-size:0.8rem;
            }
             @media(max-width:787px){
                 width:40%;
            }
             @media(max-width:492px){
                 margin-bottom: .3rem;;
                 font-size:0.7rem;
            }
        }

        select{
            border:black solid .15rem;
            border-radius: 6px;
            width:70%;
            height:2rem;
            text-align: center;
            transition:border .3s;
             /* border:red thin solid; */
              @media(max-width:787px){
                 width:100%;
            }
        }
    }
    .spec-input{
        width:100%;
        /* border:thin red solid; */
        margin-top:2rem;

    
        div p{
            margin-top:1rem;
            color:gray;
            font-family: $primary-font;
            font-weight: bold;
            font-size: .7rem;
        }
    }
}
</style>