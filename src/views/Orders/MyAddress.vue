<template>
    <div class="myAddress">
        <Header :isLeft="true" :title="title"/>
        <!--我的收货地址-->
        <div class="address-view">
            <div class="address-card"
                 v-for="(item,index) in allAddress" :key="index">
                <div class="address-card-select">
                    <i class="fa fa-check-circle" v-if="selectIndex == index"></i>
                </div>
                <div class="address-card-body" @click="setAddressInfo(item,index)">
                    <p class="address-card-title">
                        <span class="username">
                            {{item.name}}
                        </span>
                        <span v-if="item.sex" class="gender">{{item.sex}}</span>
                        <span class="phone">{{item.phone}}</span>
                    </p>
                    <p class="address-card-address">
                        <span class="tag" v-if="item.tag">{{item.tag}}</span>
                        <span class="address-text">{{item.address}}</span>
                    </p>
                </div>
                <div class="address-card-edit">
                    <i @click="handleEdit(item)" class="fa fa-edit"></i>
                    <i @click="handleDelete(item,index)" class="fa fa-close"></i>
                </div>
            </div>
        </div>
        <!--新增收货地址-->
        <div class="address-view-bottom" @click="addAddress">
            <i class="fa fa-plus-circle"></i>
            <span>新增收获地址</span>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header"
    export default {
        name: "myAddress",
        components:{
            Header
        },
        data(){
            return{
                title:"我的地址",
                allAddress:[],
                selectIndex: 0
            }
        },
        beforeRouteEnter(to,from,next){
        //   每次进入此路由，让他执行此处代码
            next(vm => vm.getData())
        },
        methods:{
            addAddress(){
                this.$router.push({
                    name:'addAddress',
                    params:{
                        title:"添加地址",
                        addressInfo: {
                            name:"",
                            sex:"",
                            phone:"",
                            address:"",
                            bottom:" ",
                            tag:""
                        }
                    }})
            },
            getData(){
                this.$axios(`/api/user/user_info/${localStorage.ele_login}`)
                    .then( res => {
                        // console.log(res.data)
                        this.allAddress = res.data.myAddress
                    })
            },
            handleEdit(item){
                // console.log(item)
                this.$router.push(
                    {
                        name:"addAddress",
                        params:{title:"编辑地址",addressInfo:item}
                    })
            },
            handleDelete(item,index){
                this.$axios.delete(`/api/user/address/${localStorage.ele_login}/${item._id}`)
                    .then( res => {
                        // console.log(res.data)
                        this.allAddress.splice(index,1)
                    })
            },
            setAddressInfo(item,index) {
                this.selectIndex = index
                //将选择的地址信息item存储到vue里
                this.$store.dispatch("setUserInfo",item)
                this.$router.push('/settlement')
            }
        }
    }
</script>

<style scoped>
    .myAddress {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 45px;
    }

    .address-view-bottom {
        position: fixed;
        height: 13.866667vw;
        bottom: 0;
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.266667vw solid #ddd;
        color: #3190e8;
        font-size: 1rem;
    }
    .address-view-bottom > i {
        font-size: 1.3rem;
        margin-right: 8px;
    }

    .address-view {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 13.866667vw;
    }
    .address-card {
        background-color: #fff;
        padding: 4vw;
        border-bottom: 1px solid #ddd;
        display: flex;
        min-height: 18.133333vw;
    }
    .address-card-body {
        flex: 1;
        overflow: hidden;
    }
    .address-card-title {
        font-size: 1rem;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 1.066667vw;
    }
    .address-card-title .username {
        color: #333;
        font-weight: 700;
    }
    .address-card-title .gender {
        padding: 0 1.6vw 0 0.8vw;
    }
    .address-card-address {
        color: #666;
        font-size: 0.84rem;
        display: flex;
        align-items: center;
    }
    .address-card-address .tag {
        display: inline-block;
        position: relative;
        margin-right: 0.8vw;
        padding: 0.533333vw;
        color: #ff5722;
        white-space: nowrap;
        border: 1px solid #ff5722;
        border-radius: 0.133333vw;
        font-size: 0.6rem !important;
        line-height: 2.666667vw;
    }
    .address-text {
        line-height: 4.533333vw;
    }

    /* 编辑和删除 */
    .address-card-edit {
        flex-basis: 13.066667vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .address-card-edit > i {
        color: #aaa;
        font-size: 1.2rem;
    }

    /*  选中图标 */
    .address-card-select {
        flex-basis: 7.333333vw;
        min-width: 7.333333vw;
        display: flex;
        align-items: center;
    }
    .address-card-select > i {
        font-size: 1.5rem;
        color: #4cd964;
    }
</style>