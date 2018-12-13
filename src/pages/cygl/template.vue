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
            <div class="screen-search">
                <div class="screen">
                    <span>筛选</span>
                    <ul class="screen-ul" style="font-family:'微软雅黑';">
                        <li :class="{true:'active'}[cplbIndex===-1]" @click='searchAll()'><a href="javascript:void(0)">全部</a></li>
                        <li v-for='(cuisineLb,index) in cuisineLbList' :key="index"  @click="searchLb(cuisineLb.id,index)" :class="{true:'active'}[cplbIndex===index]"><a href="javascript:void(0)">{{cuisineLb.mc}}</a></li>
                    </ul>
                </div>
                <div class="search-group">
                    <span class="search-group-addon" @click='searchCp(input)'><img src="../../assets/img/search.png"></span>
                    <input type="text" placeholder="搜索" id="search" v-model="input">
                    <!-- <el-input id="search" placeholder="请输入内容" v-model="input" clearable></el-input> -->

                </div>
            </div>
                <waterfall class="cuisine" :line-gap="280" :watch="cuisineList" style="overflow: scroll;height: 700px;"  >
                    <waterfall-slot class="cuisine-box" v-for='(item,index) in cuisineList' :key='index' :width='250' :height='260' :order='index'>
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <!-- <img src="../../assets/img/cuisine1.png"> -->
                                <AliImage :keys='item.tp' :type="imgValue.type" :sys='imgValue.sys' style="border-radius: 6px 6px 0 0;" > </AliImage>
                                <div class="trade-name">品名：{{item.mc}}</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce" v-if='item.bz'>简介:{{item.bz}}</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap active">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </waterfall-slot>
                    <!-- <waterfall-slot class="cuisine-box">
                        <div class="cuisine-item">
                            <a href="#" class="cptj"><img src="../../assets/img/cptj.png" width="100%" height="100%"></a>
                        </div>
                    </waterfall-slot> -->
                </waterfall>

                <div class="bottom-ope clearfix">
                    <div class="left-btn">
                        <input type="checkbox" class="allCheckbox">
                        <span>全选</span>
                        <button class="btn btn-tjcp" @click="addCp()">添加菜品</button>
                        <button class="btn btn-cpdr">菜品导入</button>
                        <button class="btn btn-tpdr">图片导入</button>
                        <button class="btn btn-sc">删除</button>
                    </div>
                    <ul class="paging" style="position: absolute;right: 20px;top: 50%;transform: translateY(-14px);">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        background
                        
                        :page-size="rows"
                        :page-sizes="[10, 15, 20, 25]"
                        layout="sizes,total,prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </ul>
                </div>
            </div>
            <!--section2-->
            <div class="section section2 clearfix" v-if='menuIndex===1'>
                <div class="right">
                    <div class="right-top">
                        <img src="../../assets/img/myxx_logo.png" class="myxx" style="display: none;">
                        <img src="../../assets/img/myxx_text.png" class="myxx" style="display: none;">
                        <div class="bjxx">
                            <p><b>预订信息--</b> （晚餐）</p>
                            <p><b>姓名：</b>许老师</p>
                            <p><b>手机号：</b>18266411212</p>
                            <p><b>预订时间：</b>2018-12-03 17:30</p>
                        </div>
                        <div class="box-number">
                            包厢/桌号<input type="text" class="bxzh">
                        </div>
                    </div>
                    <div class="right-list">
                        <ul class="list-type clearfix">
                            <li>品名</li>
                            <li>数量</li>
                            <li>金额</li>
                        </ul>
                        <div class="menu-detail-box">
                            <div class="menu-detail"><div>鱼香肉丝</div><div>1</div><div>39</div></div>
                            <div class="menu-detail"><div>鱼香肉丝</div><div>1</div><div>39</div></div>
                        </div>
                    </div>
                    <div class="right-bottom">
                        <div class="sum clearfix">
                            <span>应付款</span>
                            <span>¥ 78.00</span>
                        </div>
                        <div class="two-button">
                            <button class="btn">挂单</button>
                            <button class="btn">结算打印</button>
                        </div>
                    </div>
                </div>
                <div class="left">
                    <div class="screen-search change-date">
                        <div class="screen">
                            <span>日期</span>
                            <ul class="screen-ul">
                                <li class="active"><a href="#"><span>周一</span><span>2018-12-03</span></a></li>
                                <li><a href="#"><span>周二</span><span>2018-12-04</span></a></li>
                                <li><a href="#"><span>周三</span><span>2018-12-05</span></a></li>
                                <li><a href="#"><span>周四</span><span>2018-12-06</span></a></li>
                                <li><a href="#"><span>周五</span><span>2018-12-07</span></a></li>
                                <li><a href="#"><span>周六</span><span>2018-12-08</span></a></li>
                                <li><a href="#"><span>周日</span><span>2018-12-09</span></a></li>
                            </ul>
                        </div>
                        <div class="search-group">
                            <button class="btn btn-last-week"> 上一周 </button><span>2018/12/03</span><button class="btn btn-next-week">下一周 > </button>
                        </div>
                    </div>
                    <div class="box-list clearfix">
                        <div class="box-item active">
                            <div class="real-box">
                                <div class="box-state clearfix">
                                    <span class="state1">中餐</span>
                                    <span class="state2">晚餐</span>
                                </div>
                                <div class="box-name">维多利亚</div>
                            </div>
                        </div>
                        <div class="box-item">
                            <div class="real-box">
                                <div class="box-state clearfix">
                                    <span class="state2">中餐</span>
                                    <span class="state3">空</span>
                                </div>
                                <div class="box-name">维多利亚</div>
                            </div>
                        </div>
                        <div class="box-item">
                            <div class="real-box">
                                <div class="box-state clearfix">
                                    <span class="state3">空</span>
                                    <span class="state1">晚餐</span>
                                </div>
                                <div class="box-name">维多利亚</div>
                            </div>
                        </div>
                        <div class="box-item">
                            <div class="real-box">
                                <div class="box-state clearfix">
                                    <span class="state3">空</span>
                                    <span class="state3">空</span>
                                </div>
                                <div class="box-name">维多利亚</div>
                            </div>
                        </div>
                        <div class="box-item">
                            <div class="real-box">
                                <a href="#" class="bxyd-add"><img src="../../assets/img/bxyd_add.png" width="100%" height="100%"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--section3-->
            <div class="section section3 clearfix" v-if='menuIndex===2'>
            
            </div>
         <!--提示信息框-->
            <div class="modal" id="modal" :class="{true:'modal-in'}[showModel]">
                <div class="modal-title">
                    <div class="title">编辑</div>
                    <a href="javascript:void(0);" class="close" @click="modalClose()"><img src="../../assets/img/close.png"></a>
                </div>
                <div class="modal-content">
                    <form id="form">
                        <div class="input-group">
                            <!-- <label class="control-label">价格</label>
                            <input type="text" id="jg" name="jg" class="form-control">
                            <label class="control-label">间数</label>
                            <input type="text" id="js" name="js" class="form-control"> -->
                            <el-upload
                                :action="attachImg"
                                :http-request='Upload'
                                :on-success="handleSuccess"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :multiple="false"
                                :limit='1'
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="input-group">
                             <el-select v-model="cuisineLb" placeholder="请选择类别">
                                <el-option
                                v-for="item in cuisineLbList"
                                :key="item.mc"
                                :label="item.mc"
                                :value="item.mc" style="padding-left: 10px;">
                                </el-option>
                            </el-select>
                        </div>
                        <button class="btn btn-makeSure" onclick="save(modal)">确定</button>
                    </form>
                </div>
            </div>
            <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showModel]"></div>
        <!--提示信息框-->
        </div>
</template>

<script src="./template.js"></script>
<script>
import auth from '../../api/auth'
import cygl from '../../api/cygl'
import { mapGetters, mapActions } from 'vuex'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import AliImage from '../../components/Image'
import { setLocalStorage,isQuotaExceeded,getLocalStorage } from '../../helpers/locTime'
import axios from 'axios'


export default {
    name: 'Cygl',
    props:['currentTreenode'],
    components: {
        Waterfall,
        WaterfallSlot,
        AliImage,
        
    },
    data (){
        return{
         	menuName:[
			'菜品管理',
			'包厢预订',
			'场地预订'
            ],
            menuIndex:0,
            shopList: this.$parent.shopList,
            cplbIndex:-1,
            cuisineList:[],
            cuisineLbList:[],
            cuisineLb:'',
            Treenode:this.currentTreenode,
            imgValue:{
                // 'key':'201810191458471539932327320s',
                'type':'stcp',
                'sys':'xydc'
            },
            currentPage:1,
            rows:10,
            total:null,
            loading:true,
            input:'',
            showModel:false,
            dialogImageUrl: '',
            dialogVisible: false,
            attachImg:'/xydc/app/common/attachmentUpload'
        }
    },
    created(){
        this.onGetList()
        console.log(this.Treenode)
    },
    methods:{
        ...mapActions([
            'getGrxx',
            'login'
        ]),
        handleSuccess(res, file){
            console.log(res,file)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        Upload(file){
            console.log(file)
            var param = new FormData()
            param.append("myfiles", file.file)
            cygl.uploadImg(param)
            // var reader = new FileReader();
            // reader.readAsDataURL(file.file);
            // function readerOn(){
            //     return new Promise((resolve,reject)=>{
            //         reader.onload = function(e){
            //             resolve(this.result)
            //         }
            //     })
            // }
            // readerOn().then(res=>{
            //     console.log(res)
            //     cygl.uploadImg(res,'xydc','stcp')
            // })
        },
        addCp(){
            this.showModel = true
        },
        modalClose(){
            this.showModel = false
        },
        changeType(index){
            this.menuIndex = index
        },
        onGetList(treeNode=this.currentTreenode,cplbId=null,mc=null){
            this.loading = true
            cygl.getList(this.currentPage,this.rows,treeNode,cplbId,mc).then(res=>{
                this.cuisineList = res.data.cbList    //菜品list
                if(this.currentPage === 1){
                    this.cuisineLbList = res.data.lbList //分类
                }
                this.total = res.data.total //总数
                this.loading = false //载入动画
            })
        },
        searchLb(cplbId,index){
            this.loading = true
            //存在每次查完仍然有菜品类别 所以要重新写cygl.getList
            cygl.getList(this.currentPage,this.rows,this.currentTreenode,cplbId).then(res=>{
                this.cuisineList = res.data.cbList //菜品list
                this.total = res.data.total
                this.loading = false
            })
            this.cplbIndex = index
        },
        searchCp(val){
            if(!val){
                this.$message.error('输入内容不可为空')
            }else{
                this.onGetList(this.currentTreenode,null,val)
            }
        },
        searchAll(){
            this.loading = true
            this.cplbIndex = -1
            this.onGetList()
        },
        handleSizeChange(val) {
            this.rows = val
            this.onGetList()
        },
        handleCurrentChange(val) {
            this.onGetList()
        },
     
    },
    computed:{

    }

}

</script>



<style scoped lang="less" src="./template.less"></style>
<style lang="less" scoped>
.screen .screen-ul a{
    font-family: '微软雅黑';
}
.el-upload-list__item-actions {
    .el-upload-list__item-preview i{
        display: none;
    }
    .el-upload-list__item-delete {
        position: absolute; 
        left: 0;
        top: 57px;
    }
}

</style>
