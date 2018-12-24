<template>
  <div class="app" v-if='user'>
    <el-container style="height:100%">
        <el-header style="height: 55px;line-height: 55px;">
            <a href="#" class="logo">
                <img src="../../assets/img/logo.png">
                <img src="../../assets/img/logo_text.png">
            </a>
            <ul class="header-ul">
                <li><a href="#"><img src="../../assets/img/alarm.png"><span class="badge">15</span></a></li>
                <li @click='onLogout' v-if='user.xb==="男"'><a href="#"><img src="../../assets/img/head_portrait_boy.png" style="height: 28px;">{{user.xm}}</a></li>
                <li @click='onLogout' v-if='user.xb==="女"'><a href="#"><img src="../../assets/img/head_portrait_gril.png" style="height: 28px;">{{user.xm}}</a></li>
                <!-- <li><a href="#"><img src="../../assets/img/switch.png">门店切换</a></li> -->
                <el-dropdown  v-if="menuNameIndex=='餐饮管理'">
                    <el-button type="primary" style="background-color: transparent;border: none;">
                        <img src="../../assets/img/switch.png">  门店切换
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native='onGetList(shop.id)' v-for="shop in shopList" :key='shop.name' v-if="shopList">{{shop.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown  v-if="menuNameIndex=='宾馆预订'">
                    <el-button type="primary" style="background-color: transparent;border: none;">
                        <img src="../../assets/img/switch.png">  门店切换
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="hotel in hotelList" :key='hotel.name' v-if="hotelList">{{hotel.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </ul>
        </el-header>
        <el-container>
            <el-aside style="width: 130px;">
                <ul class="menu">
                    <li v-for='(name,index) in menuName' :key="name" @click='changeType(index,name)' :class='{true:"active"}[menuIndex===index]'><a href="javascript:void(0);">{{name}}</a></li>
                    <!-- <li>宾馆预订</li>
                    <li>消费记录</li> -->
                </ul>
            </el-aside>
            <el-main>
                <Cygl v-if="menuNameIndex=='餐饮管理'" ref='onGetList' :currentTreenode='currentTreenode'></Cygl>
                <Bgyd v-if="menuNameIndex=='宾馆预订'" ref='onGetHotelList' :currentHotelTreenode='currentHotelTreenode'></Bgyd>
                <Xfjl v-if="menuNameIndex=='消费记录'"></Xfjl>
            </el-main>
        </el-container>
    </el-container>
    <tipModel v-on:showTipModel='newMessage($event)' :class="{true:'tipModelActive'}[showTipModel]"></tipModel>
  </div>
</template>


<script>
import Bgyd from '../bgyd/template.vue';
import Cygl from '../cygl/template.vue';
import Xfjl from '../xfjl/template.vue';
import tipModel from '../../components/tip-model/tip-model.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'index',
  components: {
	  Bgyd,
      Cygl,
      Xfjl,
      tipModel
  },
  data(){
	return{
		menuName:[
			'消费记录'
        ],
        menuIndex:0,
        menuNameIndex:'',
        showTipModel:false,
        shopList:[],
        hotelList:[],
        currentTreenode:null,
        currentHotelTreenode:null,
        shopAuthList:[
            {'name':'东苑餐厅','id':1,'auth':'dyct:1'},
            {'name':'西苑餐厅','id':2,'auth':'xyct:2'},
        ],
        hotelAuthList:[{'name':'御园宾馆','id':19,'auth':'yybg:19'},]   
	}
  },
  created(){
    this.onCheckLogin()
  },
  methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),
     
        onCheckLogin(){
            if(!this.isLogin){
                this.$router.push({path: this.$route.query.redirect || '/'})
            }else{
                this.checkPermissions()
            }
        },//判断登录状态

        checkPermissions(){
            this.shopAuthList.forEach(item=>{
                //mapActions中获取权限
                this.getPermissions(item.auth).then(res=>{
                    if(res){
                        this.shopList.push(item)
                    }
                })//查询餐厅权限
            })
            this.hotelAuthList.forEach(item=>{
                this.getPermissions(item.auth).then(res=>{
                    if(res){
                        this.hotelList.push(item)
                    }
                })//查询宾馆权限
            })
            if(!(this.shopList===[])){
                this.menuName.unshift('餐饮管理') //配置第一模块权限
                setTimeout(()=>{
                    this.currentTreenode = this.shopList[0].id
                },300)
                
            }
            if(!(this.hotelList===[])){
                this.menuName.unshift('宾馆预订') //配置第二模块权限
                setTimeout(()=>{
                    this.currentHotelTreenode = this.hotelList[0].id
                },300)
            }
        },

        changeType(index,name){
            this.menuIndex = index
            this.menuNameIndex = name
        },

        newMessage(data){
            if(this.showTipModel){this.showTipModel = false}else{
                this.showTipModel = data
                console.log(this.showTipModel)
            }
        },//消息提示

        onLogout(){
            this.logout()
            this.$message({message: '注销成功!',type: 'success'});
            this.$router.push({path: this.$route.query.redirect || '/'})
        },//注销

        // onGetList() {
        //     console.log('1111111111')
        //     // this.currentTreenode = treeNode
        //     this.$refs.onGetList.onGetList(this.currentTreenode)
        // },//默认载入餐厅

        // onGetHotelList(){

        // }

    
  },
  computed:{
      ...mapGetters([
          'isLogin',
          'user',
      ])
  }
}
</script>

<style lang="less">
@import "../../assets/common.less";
.app{
    height: 100%;
    position: relative;
    overflow: hidden;
}
.el-main {
    padding: 0;
}
body > .el-container {
    margin-bottom: 40px;
}
.tipModelActive{
    top: 753px!important;
    left: 20px!important;
    transition: all .5s;
}
.el-dropdown {
    vertical-align: top;
}
.el-dropdown + .el-dropdown {
    margin-left: 15px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
