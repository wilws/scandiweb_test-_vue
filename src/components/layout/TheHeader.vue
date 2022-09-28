<template>
    <div class="header-section">
        
        <div class="header" id="titleInsertPoint">
            <span v-for="(title,index) in titleArr" :key="index" v-html="title.char"
                :style="{animationDelay:title.delayValue}"
            ></span>
        </div>
        <div class="buttons-wrapper">
            <button @click="leftBtnFunc">{{leftBtnName}}</button>
            <button @click="rightBtnFunc">{{rightBtnName}}</button>
        </div>
    </div>
</template>

<script>
export default {
    props:["title", "leftBtnName", "rightBtnName"],
    emits: ['leftBtnEvent','rightBtnEvent'],
    activated(){
        this.showTitle();
    },
    data(){
        return{
            titleArr : []
        }
    },
    methods:{
        leftBtnFunc(){
            this.$emit('leftBtnEvent');
        },
        rightBtnFunc(){
            this.$emit('rightBtnEvent');
        },

        showTitle(){
            let char = "";
            let delayValue = 0;
            [...this.title].forEach((c)=>{               // break the title string in to single characters 
                if (c == "_"){
                    char = "&nbsp;"                     
                } else {
                    char = c
                }
                delayValue += 0.1;                       // animation delay time for every characters
                this.titleArr.push({
                    char : char,
                    delayValue : `${delayValue}s`
                });
            });
        },
    }
}
</script>


<style lang="scss" scoped>

 

    .header-section{

        width:90%;
        height:6rem;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: rgb(59, 59, 59) solid .15rem;
        padding: 20px 1rem .3rem 1rem;


         @media(max-width:540px){
             height:auto;
             flex-direction: column;
        }

        .header{
            display: flex;
            flex-direction: row;
            font-family: $primary-font;
            vertical-align: bottom;
            @media(max-width:540px){
                width:100%;
                text-align: center;    
            }
            span{
                width:auto;
                font-size: 2rem;
                transform: translateY(-200%);
                animation: jumpEffect .5s forwards;
            }
             @keyframes jumpEffect {
                0%{
                    transform: translateY(-200%);
                }
                50%{
                    transform: translateY(3%);
                }
                100%{
                    transform: translateY(-20%);
                }
            } 
        }

        
        .buttons-wrapper{
            /* border:red thin solid; */
            position: relative;
            padding-bottom:.3rem;

            @media(max-width:540px){
                display: flex;
                justify-content: space-between;
                width:100%;
            }

            button{
                padding: 2px 6px;
                font-family: $primary-font;
                background-color: white;
                box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.945);
                margin-left:2rem;
                border-radius: .2rem;
                transition: transform .1s;

                &:hover{
                    transform: scale(1.1) rotateZ(5deg);
                }
                @media(max-width:540px){
                    margin-left:unset;
                }
            }
        }
    }

</style>