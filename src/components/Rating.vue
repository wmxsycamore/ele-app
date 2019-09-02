<template>
    <div class="Rating-gray">
        <i v-for="(item,index) in itemClasses" :key="index"
            class="fa"
           :class="item"
        ></i>
    </div>
</template>

<script>
    //星星长度
    const LENGTH = 5
    //星星对应的class
    const CLS_ON = "fa-star" //全星
    const CLS_HALF = "fa-star-half-empty" //半星
    const CLS_OFF = "fa-star-o" //灰星

    export default {
        name:"rating",
        props:{
            rating: Number
        },
        computed:{
            itemClasses(){
                //4-4.5分：4颗星；>=4.5：4颗半
                let result = []
                //向下取0.5的整数
                let score = Math.floor(this.rating*2)/2
                //控制半星
                let hasDecicimal = score % 1 !==0
                //控制全星
                let integer = Math.floor(score)

                //全星放入数组中
                for(let i =0; i<integer; i++){
                    result.push(CLS_ON)
                }
                //半星
                if(hasDecicimal){
                    result.push(CLS_HALF)
                }
                //补齐
                while(result.length < LENGTH){
                    result.push(CLS_OFF)
                }
                return result
            }


        }
    }
</script>

<style scoped>
    .Rating-gray {
        margin-right: 1.066667vw;
        color: #ffbe00;
        display: inline-block;
    }

</style>