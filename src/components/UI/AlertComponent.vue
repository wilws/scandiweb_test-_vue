<template>
    <div class="alert-section" @click="confirm">

        <div class="alert-card">
            <i class="fa-solid fa-circle-xmark"></i>
            <p v-html="msg"></p>

            <button @click="confirm">{{ btnContent }}</button>
        </div>
    </div>
</template>

<script>

export default {
    props:['msg','btnContent'],
    methods:{
        confirm(){
             this.$emit('confirm');
        }
    }
}
</script>

<style lang="scss">
    .alert-section{
        position:fixed;
        width:100vw;
        height:100vh;
        z-index: 3;
        left:0;
        top:0;
        background-color: rgb(37, 37, 37);
        display: flex;
        justify-content: center;
        align-items: center;
        

        .alert-card{
            position: relative;
            width:50%;
            padding:4rem;
            background-color: rgb(255, 255, 255);
            color: black;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            gap:2rem;
            z-index: 3;
            font-family: $primary-font;
            border-radius: 15px;
            box-shadow: .3rem .3rem .6rem rgba(190, 178, 178, 0.822);

            i{
                color:red;
                font-size: 3rem;
            }

            p{
                letter-spacing: .01rem;
                text-align: center;
            }

            button{
                
                background-color: white;
                height:1.5rem;
                border-radius: 5px;
                line-height: 1.5rem;
                width:2.5rem;
                /* padding:1rem 2rem; */
                text-align: center;
                border: black solid thin;


                &:hover{
                    background-color: black;
                    color:white;
                }

            }
        
        }
    }
</style>