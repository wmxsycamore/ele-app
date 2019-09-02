<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="输入城市名" v-model="city_val">
            </div>
            <button @click="$router.push({name: 'address',params: {city: city}})">取消</button>
        </div>
        <div  style="height: 100%;" v-if="searchList.length ===0">
            <div class="location">
                <Location :address="city" @click="searchCity({name: city})"></Location>
            </div>
            <Alphabet @selectCity="selectCity" :cityInfo="cityInfo" :keys="keys" ref="allcity"></Alphabet>
        </div>
        <div class="search_list" v-else>
            <ul>
                <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Location from '../components/Location'
    import Alphabet from '../components/Alphabet'

    export default {
        name:"city",
        components:{
            Location,
            Alphabet,
        },
        data(){
            return {
                city_val:'',
                cityInfo:null,
                keys:[],
                //allCities:用于接收cityInfo里的name即城市名
                allCities:[],
                //searchList:用于接收根据关键字检索出来的所有城市
                searchList:[]
            }
        },
        computed:{
            city(){
                return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
            }
        },
        created() {
            this.getCityInfo();
        },
        watch:{
           city_val(){
               // console.log(this.city_val)
               this.searchCity();
           }
        },
        methods:{
            getCityInfo(){
                this.$axios("/api/posts/cities")
                    .then(res =>{
                        // console.log(res)
                        this.cityInfo = res.data
                        //Object.keys获取res.data所有的key值
                        this.keys = Object.keys(res.data)
                        //移除hotcities这个key
                        this.keys.pop()
                        //keys排序
                        this.keys.sort()
                        this.$nextTick(() => {
                            this.$refs.allcity.initScroll();
                        })

                    //    存储所有城市，用来搜索过滤
                        this.keys.forEach(key => {
                            // console.log(key)
                            this.cityInfo[key].forEach(city => {
                                // console.log(city)
                                this.allCities.push(city)
                            })

                        })

                    })
                    .catch(err => {
                        console.log(err)
                })
            },
            selectCity(city){
                // console.log(city)
                this.$router.push({name: "address", params: {city: city.name}})
            },
            searchCity(){
                if(!this.city_val){
                    this.searchList = []
                }else {

                    //根据输入的关键字搜索城市并放入searchList中
                    this.searchList = this.allCities.filter(item =>{
                        return item.name.indexOf(this.city_val) !== -1

                    })
                    console.log(this.searchList)
                }
            }
        }
    }
</script>

<style scoped>
    .city {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .search_wrap {
        position: fixed;
        top: 0;
        height: 45px;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 3px 16px;
        display: flex;
        justify-content: space-between;
    }
    .search {
        background-color: #eee;
        border-radius: 10px;
        line-height: 40px;
        width: 85%;
        box-sizing: border-box;
        padding: 0 16px;
    }
    .search input {
        background: #eee;
        outline: none;
        border: none;
        margin-left: 5px;
    }
    .search_wrap button {
        outline: none;
        color: #009eef;
        border: none;
        background: #fff;
    }

    .location {
        background: #fff;
        padding: 8px 16px;
        height: 65px;
        box-sizing: border-box;
    }

    .search_list {
        background: #fff;
        padding: 5px 16px;
    }
    .search_list li {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
</style>