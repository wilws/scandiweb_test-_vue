<template>
    <div>
    <select name="type" id="productType" v-model="selectedItem">
        <option  value="Book">Book</option>
        <option value="DVD">DVD</option>
        <option value="Furniture">Furniture</option>
    </select>

    <div  v-show="type.DVD" id="DVD">
        <base-input
            :labelName="'Size (MB)'"
            :key="'size'"
            :type="'number'"
            :name="'DVD[size]'"
            :id="'size'"
            :placeholder="''"
            :value="''"
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
        />
        <p>Please provide dimensions in HxxWxL format</p>
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
        />
        <p>Please provide Weight (KG)</p>
    </div>
    </div>



</template>

<script>
import BaseInput from "../UI/BaseInput.vue";
export default {
    components:{BaseInput},
    data(){
        return{
            selectedItem:"Book",
            type:{
                Book:true,
                DVD:false,
                Furniture:false,
            }
        }
    },
    watch:{
        selectedItem(t){
            // If type change, trigger switcher func
           this.switcher(t);
        },
    },
    methods:{
        switcher(t){
            for (let k in this.type ){
                if (k == t){       
                    this.type[t] = true;    // Set the current type to true (show it)
                } else {                        
                    this.type[k] = false;  
                }
                this.setInputValue(k,null);  // Re-Set the input value .
            }
            
        },

        setInputValue(id,val){
            let inputs = document.querySelectorAll(`#${id} input`)
            inputs.forEach((i)=>{
                i.value = val;
            });
        },

        resetAllInputValue(){
            this.switcher('Book');
        },

        returnInputValue(){
            let value ={};
            let inputs = document.querySelectorAll(`#${this.selectedItem} input`)
            inputs.forEach((e)=>{
                value[e.id] = e.value
            })
            value['productType'] = this.selectedItem;
            return value;
        }
    }
    
}
</script>