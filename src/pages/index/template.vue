<template>
  <div class="app" v-if='user'>
    <el-container style="height:100%">
        <el-header style="height: 55px;line-height: 55px;">
            <a href="#" class="logo">
                <img src="../../assets/img/logo.png">
                <img src="../../assets/img/logo_text.png">
            </a>
            <ul class="header-ul">
                <li><a href="#" @click='newMessage()'><img src="../../assets/img/alarm.png"><span class="badge">15</span></a></li>
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
                    <el-dropdown-item @click.native='onGetHotelList(hotel.id)' v-for="hotel in hotelList" :key='hotel.name' v-if="hotelList">{{hotel.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </ul>
        </el-header>
        <el-container>
            <el-aside style="width: 130px;">
                <ul class="menu">
                    <li v-for='(name,index) in menuName' :key="name" @click='changeType(index,name)' :class='{true:"active"}[menuNameIndex===name]'><a href="javascript:void(0);">{{name}}</a></li>
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
		menuName:[],
        menuIndex:0,
        menuNameIndex:'',
        showTipModel:false,
        shopList:[],
        hotelList:[],
        shopNum:0,
        hotelNum:0,
        currentTreenode:null,
        currentHotelTreenode:null,
        shopAuthList:[
            {'name':'东苑餐厅','id':1,'auth':'dyct:1'},
            {'name':'西苑餐厅','id':2,'auth':'xyct:2'},
        ],//餐厅权限列表
        hotelAuthList:[
            {'name':'御园宾馆','id':19,'auth':'yybg:19'},
            {'name':'明御楼宾馆','id':20,'auth':'mylbg:20'},
        ]//宾馆权限列表
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
            this.hotelAuthList.forEach(item=>{
                this.getPermissions(item.auth).then(res=>{
                    if(res){
                        this.hotelList.push(item)
                        this.setMenuNameHotel()
                    }
                })//查询宾馆权限
            })

            this.shopAuthList.forEach(item=>{
                //mapActions中获取权限
                this.getPermissions(item.auth).then(res=>{
                    if(res){
                        this.shopList.push(item)
                        this.setMenuNameShop()
                    }
                })//查询餐厅权限
            })
        },
        setMenuNameHotel(){
            this.hotelNum++
            if(this.hotelNum == 1){
                this.menuName.push('宾馆预订') //配置宾馆预订是否显示
                setTimeout(()=>{
                    this.currentHotelTreenode = this.hotelList[0].id //默认treenode
                },300)
            }
            if(this.menuNameIndex==''){
                this.menuNameIndex = '宾馆预订' //配置登录后载入界面
            }
        },

        setMenuNameShop(){
            this.shopNum++
            if(this.shopNum == 1){
                this.menuName.push('餐饮管理') //配置餐饮管理是否显示
                setTimeout(()=>{
                    this.currentTreenode = this.shopList[0].id //默认treenode
                },300)
            }
            if(this.menuNameIndex==''){
                console.log('餐饮管理',this.menuName[0])
                this.menuNameIndex = '餐饮管理' //配置登录后载入界面
            }
        },

        changeType(index,name){
            this.menuIndex = index
            this.menuNameIndex = name
        },

        newMessage(){
            if(this.showTipModel){this.showTipModel = false}else{
                this.showTipModel = true
                // console.log(this.showTipModel)
            }
        },//消息提示

        onLogout(){
            this.logout()
            this.$message({message: '注销成功!',type: 'success'});
            this.$router.push({path: this.$route.query.redirect || '/'})
        },//注销

        onGetList(treeNode) {
            console.log(treeNode)
            this.currentTreenode = treeNode
            this.$refs.onGetList.onGetList(this.currentTreenode)
        },//默认载入餐厅

        onGetHotelList(treeNode){
            console.log('当前',this.currentHotelTreenode)
            this.currentHotelTreenode = treeNode
            this.$refs.onGetHotelList.getHotelList(this.currentHotelTreenode)
        }//默认载入宾馆
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
