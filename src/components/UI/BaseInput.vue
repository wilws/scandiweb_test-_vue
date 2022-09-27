<template>
    <div class="base-input">
        <label :for="id">{{ labelName }}</label>
        <input 
            :key="id"
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="value"
            :min="min"
        />
    </div>
</template>

<script>
export default {
    props:['id','labelName','type','name','placeholder','value','min']
}
</script>


<style lang="scss">
    .base-input{
        font-family: $primary-font;
        font-weight: bold;
        font-size: .9rem;
        
        /* border: brown thin solid; */
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
            margin-right: 3rem;
            width:30%;
            @media(max-width:450px){
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

        input{
            border:black solid .15rem;
            border-radius: 6px;
            width:70%;
            height:2rem;
            transition:border .3s;
             @media(max-width:787px){
                 width:100%;
            }

            &:focus{
                border: rgba(11, 137, 187, .6) 4px solid;
                /* background-color: rgb(193, 215, 248); */
                color:rgb(37, 35, 35);
            }
        }
    }
</style>