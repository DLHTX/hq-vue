<template>
    <div class="content">
        <div class="second-menu">
            <ul class="second-ul">
                <li v-for='(name,index) in menuName' :key="name" @click='changeType(index)' :class='{true:"active"}[menuIndex===index]'>{{name}}</li>
            </ul>
        </div>
        <!--section1-->
        <div class="section section1 clearfix" v-if='menuIndex===0'
        v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
            <div class="left">
                <Date v-on:ycrqDate='setChooseTime($event)' v-on:ycrqDate2='setChooseTime2($event)' ></Date>
                <div class="room-list clearfix">
                    <div class="room-item" v-for='(hotel,index) in hotelList' :key='index'>
                        <div class="real-room">
                            <div class="room-type">{{hotel.typ}} <button class="btn btn-delete hvr-fade" @click='deleteRoom(hotel.id)'>删除</button></div>
                            <div class="money" style=" color: #fd6666;">RMB {{hotel.price}}</div>
                            <div class="population">{{hotel.total-hotel.odd}}/{{hotel.total}}</div>
                            <button class="btn room-have hvr-round-corners" v-if='!(hotel.odd === null)' @click='orderForRooms(hotel.id)'>有房</button>
                            <button class="btn room-full"  v-if='hotel.odd === null'>满房</button>
                        </div>
                    </div>

                    <div class="room-item">
                        <div class="real-room">
                            <a href="#" class="bxyd-add" @click='addRoom()'><img src="../../assets/img/bgyd_add.png" width="100%" height="100%"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--section2-->
        <div class="section section2 clearfix" v-if='menuIndex===1'
        v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)"
        >
            <!-- <div class="screen-search">
                <div class="screen">
                    <span>筛选</span>
                    <ul class="screen-ul">
                        <li class="active"><a href="#">全部</a></li>
                        <li><a href="#">预订订单</a></li>
                        <li><a href="#">入住订单</a></li>
                        <li><a href="#">退房订单</a></li>
                    </ul>
                </div>
                <div class="search-group">
                    <span class="search-group-addon"><img src="../../assets/img/search.png"></span>
                    <input type="text" placeholder="搜索" id="search">
                </div>
            </div> -->
            <div class="ydgl-list" style="height:85%;overflow-y:scroll;">
                <div class="ydgl-item ydgl-yu" v-for='order in orderList' :key='order.id' >
                    <img src="../../assets/img/ydgl1.png" class="ydgl-img">
                    <div class="ydgl-content">
                        <div>
                            <span class="name">{{order.orderId.ydr}}</span>
                            <span class="phone">{{order.orderId.phone}}</span>
                            <span>{{new Date(order.orderId.kssj).getFullYear()+'-'+ (new Date(order.orderId.kssj).getMonth()+1) +'-' + new Date(order.orderId.kssj).getDate()}}</span>
                            <span class="to small-font">至</span>
                            <span>{{new Date(order.orderId.jssj).getFullYear()+'-' + (new Date(order.orderId.jssj).getMonth()+1) +'-' + new Date(order.orderId.jssj).getDate()}}</span>
                        </div>
                        <div>
                            <span class="small-font" v-if='order.orderId.fkfs=="JZ"'>记账支付 </span>
                            <span class="small-font" v-if='order.orderId.fkfs=="WX"'>微信支付 </span>
                        </div>
                        <div>
                            <span class="small-font ddbh">订单编号</span>
                            <span class="small-font bh">{{order.orderId.ddbh}}</span>
                            <span class="small-font zwddsj">最晚到店时间</span>
                            <span class="small-font">{{new Date(order.orderId.jssj).getFullYear()+'-' + (new Date(order.orderId.jssj).getMonth()+1) +'-' + new Date(order.orderId.jssj).getDate()}} 23:30</span>
                        </div>
                    </div>
                    <span class="price">￥{{order.orderId.zje}}</span>
                    <button class="btn btn-check-in" v-if='order.orderId.fkfs=="JZ"'>记账支付</button>
                    <button class="btn btn-check-in" v-if='order.orderId.fkfs=="WX"'>微信支付</button>
                </div>
                <!-- <div class="ydgl-item ydgl-zhu">
                    <img src="../../assets/img/ydgl1.png" class="ydgl-img">
                    <div class="ydgl-content">
                        <div>
                            <span class="name">羊星星</span>
                            <span class="phone">156****6616</span>
                            <span>2018-11-02</span>
                            <span class="to small-font">至</span>
                            <span>2018-11-03</span>
                        </div>
                        <div>
                            <span class="small-font">网络预订 （含早 | 已支付 | 2间1晚）</span>
                        </div>
                        <div>
                            <span class="small-font ddbh">订单编号</span>
                            <span class="small-font bh">12345678258369</span>
                            <span class="small-font zwddsj">最晚到店时间</span>
                            <span class="small-font">2018-11-02 23:30</span>
                        </div>
                    </div>
                    <span class="price">￥620</span>
                    <button class="btn btn-check-in">退房</button>
                </div>
                <div class="ydgl-item ydgl-tui">
                    <img src="../../assets/img/ydgl1.png" class="ydgl-img">
                    <div class="ydgl-content">
                        <div>
                            <span class="name">羊星星</span>
                            <span class="phone">156****6616</span>
                            <span>2018-11-02</span>
                            <span class="to">至</span>
                            <span>2018-11-03</span>
                        </div>
                        <div>
                            <span class="small-font">网络预订 （含早 | 已支付 | 2间1晚）</span>
                        </div>
                        <div>
                            <span class="small-font ddbh">订单编号</span>
                            <span class="small-font bh">12345678258369</span>
                            <span class="small-font zwddsj">最晚到店时间</span>
                            <span class="small-font">2018-11-02 23:30</span>
                        </div>
                    </div>
                    <div class="check-out-detail">
                        <div><img src="../../assets/img/time.png" class="time">11-02 10:22<span class="to">至</span>11-03 10:30</div>
                        <div>共一晚</div>
                        <div class="price">￥620</div>
                    </div>
                </div> -->
            </div>
            <div class="bottom-ope clearfix">
                    <ul class="paging" style="position: absolute;right: 20px;top: 50%;transform: translateY(-14px);">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        background
                        :page-size="rows"
                        :page-sizes="[10, 15, 20, 25]"
                        layout="sizes,total,prev, pager, next, jumper"
                        :total="total"
                        ></el-pagination>
                    </ul>
            </div>
        </div>
        <!--提示信息框-->
        <div class="modal" id="modal" :class="{true:'modal-in'}[showModel]">
            <div class="modal-title">
                <div class="title">添加房间</div>
                <a href="javascript:void(0);" class="close" @click="modalClose()"><img src="../../assets/img/close.png"></a>
            </div>
            <div class="modal-content">
                <el-form
                ref="hotelForm"
                label-width="80px"
                :model="hotelForm"
                :hide-required-asterisk="true"
                :rules="rules"
                >

                <el-form-item label="添加房型" >
                    <el-input placeholder="请输入内容" v-model="roomType" clearable class="input-with-select">
                        <el-button slot="append" icon="el-icon-check" @click="saveRoomType(roomType)"></el-button>
                    </el-input>
                </el-form-item>
                
                <el-form-item label="房间价格" :required="true" prop="price">
                    <el-input v-model="hotelForm.price" clearable></el-input>
                </el-form-item>

                <el-form-item label="房间数量" :required="true">
                      <el-input-number v-model="hotelForm.count" :min="1" :max="1000" ></el-input-number>
                </el-form-item>

                <el-form-item label="选择房型" prop="type">
                    <el-select placeholder="请选择房型" v-model="hotelForm.type" :required="true" >
                        <el-option
                        v-for="item in hotelRoomType"
                        :key="item.type"
                        :label="item.type"
                        :value="item.id"
                        style="padding-left: 10px;"
                        ></el-option>
                    </el-select>
                    <el-tooltip class="item" effect="dark" content="删除此房型" placement="top"  v-if="hotelForm.type">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="hotelForm.type" @click='deleteType(hotelForm.type)'></el-button>
                    </el-tooltip>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="btn btn-makeSure1" @click='save(hotelForm)'>确定</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showModel]"></div>
        <!--提示信息框-->
    </div>
</template>

<script>
import auth from '../../api/auth'
import bgyd from '../../api/bgyd'
import Date from "../../components/date.vue";

export default {
    name: 'Bgyd',
    components:{
        Date
    },
    data (){
        return{
            menuName:[
                '房间管理',
                '预定管理'
            ],
            roomType:'',
            menuIndex:0,
            showModel:false,
            loading:false,
            chooseTime:null,
            chooseTime2:null,//new date格式 请求需要用到
            hotelList:[],
            hotelRoomType:[],
            hotelForm:{
                price:'',
                ssbg:this.currentHotelTreenode,
                type:null,
                count:1,    
            },
            rules: {
                price: [{ required: true, message: "请输入房间价格", trigger: "blur" }],
                type:  [{ required: true, message: "请选择房间类型", trigger: "change" }]
            },


            total: null,
            rows: 10,
            currentPage: 1,
            orderList:[],
        }
        },
        props:['currentHotelTreenode'],
        created(){
            // auth.test()
            // this.getHotelList()
            console.log(this.currentHotelTreenode)
        },
        methods:{
            setChooseTime($event){
                this.chooseTime = $event
                this.getHotelList()
            },
            setChooseTime2($event){
                this.chooseTime2 = $event
            },//设置new date()格式的当前时间
            getHotelList(currentHotelTreenode){
                this.loading=true
                if(currentHotelTreenode!=null){
                    console.log('当前truenode',currentHotelTreenode)
                    this.currentHotelTreenode = currentHotelTreenode
                }
                bgyd.getList(this.currentHotelTreenode,this.chooseTime).then(res=>{
                    console.log(res)
                    this.loading=false
                    this.hotelList =res.data.list
                })
            },//查询所有房间
            orderForRooms(id){
                 this.$confirm('此操作将设置为满房, 是否确认?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bgyd.orderForRooms(id,this.currentHotelTreenode,this.chooseTime2,null).then(res=>{
                        console.log(res)
                         if(res.success){
                            this.$message({
                                type: 'success',
                                message: '设置成功!'
                            });
                            this.getHotelList()
                        }else{
                            this.$message.error('出现问题,请重新操作!')
                        }
                    }).catch(()=>{
                        this.$message.error('出现问题,请重新操作!')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            saveRoomType(fx){
                if(fx==''){
                   return   
                }else{
                    bgyd.saveRoomType(this.currentHotelTreenode,fx).then(res=>{
                        console.log(res)
                        if(res.success){
                            this.$message.success("添加房型成功!");
                            this.selectRoomType()
                        }
                    })
                }
            },//添加房间类型
            deleteRoom(id){
                this.$confirm('此操作将删除所有房间, 是否确认?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bgyd.deleteRooms(id,this.currentHotelTreenode).then(res=>{
                        console.log(res)
                        if(res.success){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getHotelList()//重新请求
                        }
                    }).catch(()=>{
                        this.$message.error('该房间已被引用,无法删除!')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },//删除所有房间
            deleteType(ids){
                console.log(ids)
                this.$confirm('此操作将删除该房型, 是否确认?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let idsList = []
                    idsList.push(ids)
                    console.log(idsList)
                    bgyd.deleteRoomType(idsList).then(res=>{
                        console.log(res)
                        if(res.success){
                            this.selectRoomType()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.hotelForm.type = null //删除完了 要去掉选择的值
                            this.showModel=false
                        }else{
                            this.$message.error('该房型已被引用,无法删除!')
                        }
                    }).catch(()=>{
                        this.$message.error('该房型已被引用,无法删除!')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },//删除房间类型
            changeType(index){
                this.menuIndex = index
                if(index==1){
                    this.getOrderList()
                }
            },
            addRoom(){
                this.showModel=true
                this.selectRoomType()
            },//添加房间
            selectRoomType(){
                bgyd.selectRoomType().then(res=>{
                    this.hotelRoomType = res.data.list
                })
            },//查找房型
            modalClose(){
                this.showModel=false
            },
            save(hotelForm){
                this.$refs.hotelForm.validate(valid => {
                    if (valid) {
                        console.log(this.hotelForm)
                        bgyd.saveRooms(this.hotelForm).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.$message.success("添加成功!");
                                this.getHotelList();
                                this.showModel = false;
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                })
            },//保存form表单
            
            //以上是第一模块的方法
            getOrderList(){
                console.log('a')
                this.loading=true
                bgyd.findOrderList(this.currentPage,this.rows).then(res=>{
                    if(res.success){
                        this.loading = false
                        this.orderList = res.data.list
                        this.total = res.data.size
                    }
                })
            },
            handleSizeChange(val) {
                this.rows = val;
                this.getOrderList();
            },//分页插件 size变化
            handleCurrentChange(val) {
                this.getOrderList();
            },//分页插件
        },
}
</script>


<style lang="less" src="./template.less"></style>
<style lang='less'>

</style>

