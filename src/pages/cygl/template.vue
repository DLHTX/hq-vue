<template>
  <div class="content" style="height: 99%;">
    <div class="second-menu">
      <ul class="second-ul">
        <li
          v-for="(name,index) in menuName"
          :key="name"
          @click="changeType(index)"
          :class="{true:'active'}[menuIndex===index]"
        >{{name}}</li>
      </ul>
    </div>
    <!--section1-->
    <div
      class="section section1 clearfix"
      v-if="menuIndex===0"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <div class="screen-search">
        <div class="screen">
          <span>筛选</span>
          <ul class="screen-ul" style="font-family:'微软雅黑';">
            <li :class="{true:'active'}[cplbIndex===-1]" @click="searchAll()">
              <a href="javascript:void(0)">全部</a>
            </li>
            <li
                v-for="(cuisineLb,index) in cuisineLbList"
                :key="index"
                :class="{true:'active'}[cplbIndex===index]"
                @click="searchLb(cuisineLb.id,index)"
            >
              <a href="javascript:void(0)">{{cuisineLb.mc}}</a>
            </li>
          </ul>
        </div>
        <div class="search-group">
            <span class="search-group-addon" @click="searchCp(input)">
            <img src="../../assets/img/search.png">
            </span>
            <input type="text" placeholder="搜索" id="search" v-model="input">
            <!-- <el-input id="search" placeholder="请输入内容" v-model="input" clearable></el-input> -->
        </div>
      </div>
      <waterfall
        class="cuisine"
        :line-gap="280"
        :watch="cuisineList"
        style="overflow: scroll;height: 700px;">
        <waterfall-slot
          class="cuisine-box"
          v-for="(item,index) in cuisineList"
          :key="index"
          :width="250"
          :height="270"
          :order="index"
        >
          <div class="cuisine-item" @click='handleChooseCuiItem(index,item.id)' :class="{true:'ChoosedCuiItem'}[chooseCuiItem.indexOf(item.id) > -1]">
            <div class="cuisine-item-top">
              <!-- <AliImage :keys="item.tp" style="border-radius: 6px 6px 0 0;"></AliImage> -->
              <img class="item-pic" v-lazy="imgUrl + item.tp" style="height: 200px;width: 260px;border-radius: 6px 6px 0 0;"/> 
              <div class="trade-name">品名：{{item.mc}}</div>
            </div>
            <div class="cuisine-item-bottom">
              <div class="type-price">
                <span class="type">菜品类别：{{item.cplb.mc}}</span>
                <span class="price">¥{{item.jg}}</span>
              </div>
              <div class="introduce" v-if="item.bz">简介:{{item.bz}}</div>
              <div class="switch-div" style="margin-top: 10px;">
                <span>是否可预订</span>
                  <el-switch
                    v-model="item.sfkyd"
                    active-color="#8ba8fe"
                    inactive-color="#a5a5a5"
                    @click.native.stop="handelUpdate(item.id,item.sfkyd)"
                  ></el-switch>
              </div>
            </div>
          </div>
        </waterfall-slot>
        <!-- <waterfall-slot class="cuisine-box">
                        <div class="cuisine-item">
                            <a href="#" class="cptj"><img src="../../assets/img/cptj.png" width="100%" height="100%"></a>
                        </div>
        </waterfall-slot>-->
      </waterfall>

      <div class="bottom-ope clearfix">
        <div class="left-btn">
          <el-checkbox v-model="allChecked" class="checkBox" style="margin:0 20px;color:#77a6fe!important; ">全选</el-checkbox>
          <button class="btn btn-tjcp" @click="addCp()">添加菜品</button>
          <button class="btn btn-cpdr" @click='importCp()'>菜品导入</button>
          <button class="btn btn-sc" @click="deleteCp()">删除</button>
        </div>
        <ul
          class="paging"
          style="position: absolute;right: 20px;top: 50%;transform: translateY(-14px);"
        >
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
    <!--section2-->
    <div class="section section2 clearfix" v-if="menuIndex===1"  v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <div class="right" v-if="BalconyListDetail">
        <div class="right-top">
          <img src="../../assets/img/myxx_logo.png" class="myxx" style="display: none;">
          <img src="../../assets/img/myxx_text.png" class="myxx" style="display: none;">
          <div class="bjxx">
            <p>
              <b>预订信息--</b> <span v-if="BalconyListDetail"> （{{BalconyListDetail.ycsj}}）</span>
            </p>
            <p>
              <b>姓名：</b>  <span v-if="BalconyListDetail">  {{BalconyListDetail.dcrxm}} </span>
            </p>
            <p>
              <b>手机号：</b>   <span v-if="BalconyListDetail">   {{BalconyListDetail.dcrhm}} </span>
            </p>
            <p>
              <b>预订时间：</b> <span v-if="BalconyListDetail">   {{BalconyListDetail.ydrq}} </span>
            </p>
          </div>
          <div class="box-number">
            包厢/桌号
            <!-- <input type="text" class="bxzh"> -->
            <span class="bxzh" v-if="BalconyListDetail">{{BalconyListDetail.bxck}}</span>
          </div>
        </div>
        <div class="right-list">
          <ul class="list-type clearfix">
            <li>品名</li>
            <li>数量</li>
            <li>金额</li>
          </ul>
          <div class="menu-detail-box" v-if="BalconyListDetail.cpList">
            <div class="menu-detail" v-for='(BalconyListDetailCp,index) in BalconyListDetail.cpList' :key='index'>
              <div>{{BalconyListDetailCp.te.mc}}</div>
              <div>{{BalconyListDetailCp.fs}}</div>
              <div>{{BalconyListDetailCp.te.jg}}</div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="sum clearfix">
            <span>应付款</span>
            <span>¥ {{BalconyListDetail.ycje}}</span>
          </div>
          <div class="two-button">
            <button class="btn">挂单</button>
            <button class="btn">结算打印</button>
          </div>
        </div>
      </div>
      <div class="left">
        <Date v-on:ycrqDate='getBalcony($event)'></Date>
        <div class="box-list clearfix">
          <div class="box-item" v-for='(balcony,index) in BalconyList' :key="index" >
            <div class="real-box" :class="{'BalconyShow':(balcony.sfdc == 0)}">
              <div class="box-state clearfix">
                <span class="state1" @click='queryList(index,sjIndex,balcony.jlid)' v-for='(sj,sjIndex) in balcony.ycsj.split(",")' :key='sjIndex' 
                :class="[{'state3':(sj=='空')},{'state2':(sj=='中餐')},{'state1':(sj=='晚餐')},{'sjActive':(BalconyIndex=== index + '' +sjIndex )}]" >{{sj}}</span>
              </div>
              <div class="box-name">
                  {{balcony.mc}}
                  <div class='sfys' @click='updateStatus(balcony.id,balcony.sfdc)'></div>
                </div>
            </div>
          </div>

          <div class="box-item" @click="addBalcony()">
            <div class="real-box">
              <a href="#" class="bxyd-add">
                <img src="../../assets/img/bxyd_add.png" width="100%" height="100%">
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--section3-->
    <div class="section section3 clearfix" v-if="menuIndex===2">
        <div class="content xfjl">
            <!-- <div class="screen-search">
                <div class="screen">
                    <span>筛选</span>
                    <ul class="screen-ul">
                        <li class="active"><a href="#">全部</a></li>
                        <li><a href="#">时间</a></li>
                        <li><a href="#">房型</a></li>
                        <li><a href="#">状态</a></li>
                    </ul>
                </div>
            </div> -->
            <div class="table-box" style="max-height: 700px;overflow-y: scroll;">
            <el-table
            ref="multipleTable"
            :data="orderList"
            tooltip-effect="dark"
            style="width:100%;"
            stripe
            @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="ddbh"
                    label="订单号"
                    width="120"
                    show-overflow-tooltip>
                </el-table-column>
                    <el-table-column
                    prop="dcrxm"
                    label="消费用户"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="dcrhm"
                    label="手机号码"
                    show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                    prop='ycsj'
                    label="用餐时间"
                    show-overflow-tooltip>
                </el-table-column>
                  <el-table-column
                    prop='ycrs'
                    label="用餐人数"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop='mc'
                    label="包厢名称"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop='ydsj'
                    label="预定时间"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop='ddzt'
                    label="订单状态"
                    show-overflow-tooltip>
                </el-table-column>
                
            </el-table>
            </div>
            <div class="bottom-ope clearfix">
                <div class="left-btn">
                    <input type="checkbox" class="allCheckbox">
                    <span>全选</span>
                    <button class="btn btn-export">导出</button>
                </div>
                <ul
                class="paging"
                style="position: absolute;right: 20px;top: 50%;transform: translateY(-14px);"
                >
                <el-pagination
                @size-change="handleOrderSizeChange"
                @current-change="handleOrderCurrentChange"
                :current-page.sync="currentOrderPage"
                background
                :page-size="orderRows"
                :page-sizes="[10, 15, 20, 25]"
                layout="sizes,total,prev, pager, next, jumper"
                :total="orderTotal"
                ></el-pagination>
                </ul>
            </div>
        </div>
    </div>
    <!--提示信息框 添加菜品start-->
    <div class="modal" id="modal" :class="{true:'modal-in'}[showModel]">
      <div class="modal-title">
        <div class="title">添加菜品</div>
        <a href="javascript:void(0);" class="close" @click="modalClose()">
          <img src="../../assets/img/close.png">
        </a>
      </div>
      <div class="modal-content">
        <el-form
          ref="form"
          label-width="80px"
          :model="form"
          :hide-required-asterisk="true"
          :rules="rules"
        >
          <el-upload
            class="avatar-uploader"
            :action="attachImg"
            :on-success="handleSuccess"
            name="myfiles"
            list-type="picture-card"
            :multiple="false"
            :before-upload="beforeUpload"
            :show-file-list="false"
          >
            <img
              v-if="dialogImageUrl"
              :src="dialogImageUrl"
              class="avatar"
              style="max-width: 144px;"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-form-item label="菜品名称" :required="true" prop="mc">
            <el-input v-model="form.mc"></el-input>
          </el-form-item>

          <el-form-item label="菜品价格" :required="true" prop="jg">
            <el-input v-model="form.jg"></el-input>
          </el-form-item>

        <el-form-item label="菜品类别" >
            <el-input placeholder="请输入添加菜品类别名称" v-model="cpType" clearable class="input-with-select">
                <el-button slot="append" icon="el-icon-check" @click="saveCpType(cpType)"></el-button>
            </el-input>
        </el-form-item>

          <el-form-item label="菜品类别" prop="cplb">
            <el-select placeholder="请选择类别" v-model="form.cplb">
              <el-option
                v-for="item in cuisineLbList"
                :key="item.mc"
                :label="item.mc"
                :value="item.id"
                style="padding-left: 10px;"
              ></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="删除此类别" placement="top"  v-if="form.cplb">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="form.cplb" @click='deleteType(form.cplb)'></el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="菜品简介">
            <el-input type="textarea" v-model="form.bz"></el-input>
          </el-form-item>

          <el-form-item>
                <el-button type="primary" class="btn btn-makeSure" @click="save(form)">确定</el-button>
          </el-form-item>
          <!-- <button class="btn btn-makeSure" @click="save(form)">确定</button> -->
        </el-form>
      </div>
    </div>
    <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showModel]"></div>
    <!--提示信息框 添加菜品end-->


    <!--提示信息框 添加包厢start-->
    <div class="modal" :class="{true:'modal-in'}[showBalconyModel]">
      <div class="modal-title">
        <div class="title">添加包厢</div>
        <a href="javascript:void(0);" class="close" @click="balconyModalClose()">
          <img src="../../assets/img/close.png">
        </a>
      </div>
      <div class="modal-content">
        <el-form
          ref="Balconyform"
          label-width="80px"
          :model="Balconyform"
          :hide-required-asterisk="true"
          :rules="rules2"
        >
          <el-form-item label="包厢名称" :required="true" prop="mc">
            <el-input v-model="Balconyform.mc"></el-input>
          </el-form-item>

          <el-form-item label="容纳人数" :required="true" >
             <el-slider v-model="Balconyform.rnrs" range show-stops :max="10" > </el-slider>
          </el-form-item>

          <el-form-item label="包厢备注">
            <el-input type="textarea" v-model="Balconyform.bz"></el-input>
          </el-form-item>

          <el-form-item>
                <el-button type="primary" class="btn btn-makeSure" @click="saveBalcony(Balconyform)">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showBalconyModel]"></div>
    <!--提示信息框 添加包厢end-->

    <!--提示信息框 添加菜品start-->
    <div class="modal" id="modal" :class="{true:'modal-in'}[showAddModel]">
      <div class="modal-title">
        <div class="title">导入菜品</div>
        <a href="javascript:void(0);" class="close" @click="modalClose()">
          <img src="../../assets/img/close.png">
        </a>
      </div>
      <div class="modal-content" style="width: 400px;min-height:125px;">
        <el-upload v-if='active==0'
        class="upload-demo"
        :multiple="true"
 
        action="${pageContext.request.contextPath}/lookup/editEvidence/123"
        :auto-upload="false"
        :http-request="uploadFile"
        ref="upload"
        >
            <el-button size="small" type="primary" style="height: 33px; width: 90px;margin-bottom: 14px;">选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="subPicForm">上传到服务器</el-button> -->
        </el-upload>

        <el-upload v-if='active==1'
        class="upload-demo"
        :multiple="false"
        action="${pageContext.request.contextPath}/lookup/editEvidence/123"
     
        :auto-upload="false"
        :http-request="uploadExcel"
        ref="upload2"
        >
            <el-button size="small" type="primary" style="height: 33px; width: 90px;margin-bottom: 14px;">选择excel文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="subPicExcel">上传到服务器</el-button> -->
        </el-upload>
        <div @click='download()' v-if='active==1' style="cursor: pointer;">下载模板</div>

         <el-button style="margin-top: 40px;height: 45px;width: 90px;" @click="subPicForm" v-if='active===0'>下一步</el-button>
        <el-button style="margin-top: 40px;height: 45px;width: 90px;" @click="subPicExcel" v-if='active===1'>下一步</el-button>
          <!-- <button class="btn btn-makeSure" @click="save(form)">确定</button> -->

      </div>
    </div>
    <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showAddModel]"></div>
    <!--提示信息框 添加菜品end-->


  </div>
</template>

<script src="./template.js"></script>
<script>
import auth from "../../api/auth";
import cygl from "../../api/cygl";
import { mapGetters, mapActions } from "vuex";
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
import AliImage from "../../components/Image";
import {
  setLocalStorage,
  isQuotaExceeded,
  getLocalStorage
} from "../../helpers/locTime";
import axios from "axios";
import Date from "../../components/date.vue";
import querystring from 'querystring'

export default {
  name: "Cygl",
  props: ["currentTreenode"],
  components: {
    Waterfall,
    WaterfallSlot,
    AliImage,
    Date
  },
  data() {
    return {
        menuName: ["菜品管理", "包厢预订", "订单管理"],
        cpType:null,
        cuisineList: [],
        cuisineLbList: [],
        sfkyd: true,
        allChecked:false,
        currentPage: 1,
        rows: 10,
        menuIndex: 0,
        cplbIndex: -1,
        shopList: this.$parent.shopList,
        form: {
            mc: "",
            cplb: "",
            bz: "",
            sfkyd: true,
            jg: "",
            refe:this.currentTreenode,
            tp: ""
        },
        Treenode: this.currentTreenode,
        dialogImageUrl: "",
        cuisineLb: "",
        input: "",
        total: null,
        loading: false,
        showModel: false,
        showAddModel:false,
        attachImg:axios.defaults.baseURL + "xydc/app/stct/filesUpload?_token=" + getLocalStorage("token"),
        rules: {
            mc: [
            { required: true, message: "请输入菜品名称", trigger: "blur" },
            { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
            ],
            jg: [{ required: true, message: "请输入菜品价格", trigger: "blur" }],
            cplb: [{ required: true, message: "请选择菜品类别", trigger: "change" }]
        },
        rules2: {
            mc: [
                { required: true, message: "请输入包厢名称", trigger: "blur" },
                { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
            ],rnrs: [{ required: true, message: "请选择容纳人数", trigger: "blur" }],
        },// 
        chooseCuiItem:[],
        isLoad : [],
        imgUrl:axios.defaults.baseURL + 'xydc/upload/',
        //以上是第一模块data
        BalconyList:[],
        BalconyListDetail:null,
        BalconyIndex:0,
        BalconyShow:null,
        ycrq:null,
        showBalconyModel:false,
        Balconyform:{
            mc:'',
            rnrs:[1, 5],
            ssst:this.currentTreenode,
            sfdc:true
        },
        imgList:[],
        active: 0,
        //以上是第二模块data
        currentOrderPage: 1,
        orderRows:10,
        orderList:[],
        multipleSelection:[],
        orderTotal:null
    };
  },
  created() {
    // this.form.refe = this.treeNode
    this.onGetList();
    console.log(this.Treenode,this.form.refe);
  },
  methods: {
    ...mapActions(["getGrxx", "login"]),
    imageLoaded(index){
        console.log('图片已加载',index)
        // this.isLoad = true
    },
    deleteCp(){
        if(this.chooseCuiItem.length ===0 ){
            this.$message({
                    type: 'warning',
                    message: '没有选中任何菜品'
            });
        }else{
            this.$confirm('此操作将删除所选文件, 是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cygl.delete(this.chooseCuiItem).then(res=>{
                    console.log(res)
                    if(res.success){
                        this.searchAll()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                    
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        }
    },//删除菜品

    handleChooseCuiItem(index,id){
        if(this.chooseCuiItem.indexOf(id) === -1){
            this.chooseCuiItem.push(id)
        }else{
            this.chooseCuiItem.splice(this.chooseCuiItem.indexOf(id),1)
        }
    },//选择菜品

    handelUpdate(id,sfkyd){
        console.log(id,sfkyd)
        let type = null
        if(sfkyd){
            type = 1
        }else{
            type = 0
        }
        cygl.isOrderUpdate(id,type).then(res=>{
            console.log(res)
            if(res.success){
                this.$message({
                    type: 'success',
                    message: '更改成功!'
                });
            }else{
                this.$message({
                    type: 'info',
                    message: '更改失败!'
                });   
            }
        })
    },//更改是否预定状态
    
    handleSizeChange(val) {
      this.rows = val;
      this.onGetList();
    },//分页插件 size变化

    handleCurrentChange(val) {
      this.onGetList();
    },//分页插件

    handleSuccess(res, file) {
      console.log(res, file);
      this.dialogImageUrl =
        axios.defaults.baseURL + "xydc/upload/" + res.data.list;
      this.form.tp = res.data.list;
    },//图片上传成功回调

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },//图片格式检测函数

    save(form) {
        console.log(this.form.refe)
        this.$refs.form.validate(valid => {
            if (valid) {
            cygl.save(this.form).then(res => {
                console.log(res);
                if (res.success) {
                this.$message.success("添加成功!");
                this.searchAll();
                this.showModel = false;
                }
            });
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },//保存菜品

    addCp() {
      this.showModel = true;
    },//添加菜品按钮

    modalClose() {
      this.showModel = false;
      this.showAddModel = false
    },//关闭菜品model

    changeType(index) {
      this.menuIndex = index;
      if(index==2){
          this.findOrder()//第三模块执行
      }
    },//calss动态变化

    onGetList(treeNode = this.currentTreenode, cplbId = null, mc = null) {
      this.loading = true;
      cygl.getList(this.currentPage, this.rows, treeNode, cplbId, mc).then(res => {
           //菜品list
          this.cuisineList = []
          setTimeout(()=>{
            this.cuisineList = res.data.cbList;
          },300) //图片不刷新的暂时解决办法 哎...

          if (this.currentPage === 1) {
            this.cuisineLbList = res.data.lbList; //分类
          }

          this.total = res.data.total; //总数
          this.loading = false; //载入动画

          //this.$forceUpdate()//强制刷新

          console.log(this.cuisineList)
        });
    },//获取首页的菜品全部信息

    searchLb(cplbId, index) {
      this.loading = true;
      //存在每次查完仍然有菜品类别 所以要重新写cygl.getList
      cygl
        .getList(this.currentPage, this.rows, this.currentTreenode, cplbId)
        .then(res => {
          this.cuisineList = res.data.cbList; //菜品list
          this.total = res.data.total;
          this.loading = false;
        });
      this.cplbIndex = index;
    },//搜索类别

    searchCp(val) {
      if (!val) {
        this.$message.error("输入内容不可为空");
      } else {
        this.onGetList(this.currentTreenode, null, val);
      }
    },//搜索菜品

    searchAll() {
      this.loading = true;
      this.cplbIndex = -1;
      this.onGetList();
    //this.$forceUpdate()//强制刷新
    },//搜索全部
    
    //以上是第一模块method--------------------------

    getBalcony(ycrq){
        this.loading = true
        this.ycrq = ycrq
        console.log(ycrq)
        cygl.getBalcony(this.currentTreenode,ycrq).then(res=>{
            this.loading = false
            console.log(res)
            for(let i=0 ;i <  res.data.list.length;i++){
                if(i!= 0){
                   if( res.data.list[i].id == (res.data.list[i-1].id)){
                        res.data.list[i-1].ycsj =  res.data.list[i-1].ycsj+ ','+ res.data.list[i].ycsj
                        res.data.list[i-1].jlid =   res.data.list[i-1].jlid + ',' + res.data.list[i].jlid
                        res.data.list.splice(i,1)
                    }
                }
            }

            for(let i=0 ;i <  res.data.list.length;i++){
                if( res.data.list[i].ycsj==='中餐'){
                    res.data.list[i].ycsj= '中餐,空'
                    res.data.list[i].jlid = res.data.list[i].jlid + ',' +'null'
                }else if(res.data.list[i].ycsj==='晚餐'){
                    res.data.list[i].ycsj= '空,晚餐'
                    res.data.list[i].jlid ='null' +',' + res.data.list[i].jlid 
                }else if (res.data.list[i].ycsj==='null'){
                    res.data.list[i].ycsj= '空,空'
                    res.data.list[i].jlid ='null' +',' + 'null'
                }
            }
            console.log(res.data.list)
            this.BalconyList = res.data.list
        })
    },
    queryList(index,sjIndex,id){
        this.BalconyIndex = index + '' +sjIndex 
        if(id.split(',')[sjIndex] !== 'null'){
            cygl.queryList(id.split(',')[sjIndex]).then(res=>{
                console.log(res)
                this.BalconyListDetail = res.data.obj
            })
        }else{
            this.BalconyListDetail = null
            // this.$message.error('没有消费记录')
        }
    },
    balconyModalClose(){
        this.showBalconyModel = false
    },
    addBalcony(){
        this.showBalconyModel = true
    },
    updateStatus(id,sfdc){
        this.$confirm('此操作将更改餐厅显示状态, 是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(id,sfdc)
                let type = null
                if(sfdc==0){type=1}else{type=0}
                cygl.updateStatus(id,type).then(res=>{
                    console.log(res)
                    if(res.success){
                        this.$message({
                                type: 'success',
                                message: '更改成功!'
                        });
                        this.getBalcony(this.ycrq)
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '取消更改'
                });  
            });
    },
    saveBalcony(Balconyform){
        console.log(this.Balconyform.rnrs)
        this.$refs.Balconyform.validate(valid => {
            if (valid) {
                this.Balconyform.rnrs = this.Balconyform.rnrs.join('-')
                cygl.saveBox(this.Balconyform).then(res => {
                    console.log(res);
                    if (res.success) {
                    this.$message.success("添加成功!");
                    this.getBalcony(this.ycrq)
                    this.showBalconyModel = false;
                    }
                });
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },
     //以上是第二模块method========================

    importCp(){
        this.active=0//初始化步骤条
        this.showAddModel=true
    },

    uploadFile(file){
        console.log(file)
        this.formDate.append('myfiles', file.file);
        console.log(this.formDate)
    },
    subPicForm(){
        this.formDate = new FormData()
        this.$refs.upload.submit();
        console.log( this.formDate)
        cygl.uploadImg(this.formDate).then(res=>{
            console.log(res)
            if(res.data.list){
                this.imgList = res.data.list
                this.active = 1 //关闭这一步
                this.$refs.upload.clearFiles() //上传成功后清空文件列表
                this.$message.success('图片上传成功,请进行下一步')
            }else{
                this.$message({
                    type: 'warning',
                    message: '您没有选中任何图片啊'
            }   );
            }
            
        })
    },

    uploadExcel(excel){
        this.formexcel.append('file', excel.file);
        // form.append('list', this.imgList);
        console.log(this.formexcel)
      
    },
    subPicExcel(){
        this.formexcel = new FormData()
        this.formexcel.append('list', this.imgList);
        this.$refs.upload2.submit();
        console.log(this.formexcel)
        cygl.importCP(this.formexcel).then(res=>{
            if(res.success){
                console.log(res)
                this.active = 0
                this.$refs.upload2.clearFiles()//上传成功后清空文件列表
                this.showAddModel = false
                this.onGetList();//刷新本页面
                this.$message.success('导入文件成功!')
            }else{
                this.$message.error('操作失败,请重新操作')
            }
        }).catch(res=>{
            this.$message.error('操作失败,请检查上传文件格式!')
        })
    },

    next(){
        if (this.active++ > 1) this.active = 0;
        console.log(this.active)
    },
    download(){
        window.open(axios.defaults.baseURL + 'xydc/app/stct/download'+'?_token=' + getLocalStorage('token'))
        console.log(getLocalStorage('token'))
    },
    saveCpType(mc){
        if(mc==null){
            return   
        }else{
                cygl.saveType(mc,this.currentTreenode).then(res=>{
                if(res.success){
                    this.$message.success("添加菜品类型成功!");
                    this.onGetList();
                }
            })
        }
    },
    deleteType(id){
        console.log(id)
        this.$confirm('此操作将删除该类型, 是否确认?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cygl.deleteType(id).then(res=>{
                    console.log(res)
                    if(res.success){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.form.cplb = null //删除完了 要去掉选择的值
                        this.showModel=false
                        this.onGetList()
                    }else{
                        this.$message.error('该菜品已被引用,无法删除!')
                    }
                }).catch(()=>{
                    this.$message.error('该菜品已被引用,无法删除!')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
    },
    //以上是section2//////////////////////////////////////////////

    findOrder(){
        cygl.findOrder(this.currentTreenode,this.currentOrderPage,this.orderRows).then(res=>{
            console.log(res)
            this.orderTotal = res.data.total
            res.data.ctydxxList.forEach((item,index)=>{
                switch(item.ddzt){
                    case 'YJZ':
                        item.ddzt = '已记账'
                        break;
                    case 'YYD':
                        item.ddzt = '已预订'
                        break;
                    case 'DZF':
                        item.ddzt = "待支付"
                        break;
                    case 'YPJ':
                        item.ddzt = '已评价'
                        break;
                }
            })
            this.orderList = res.data.ctydxxList

        })
    },
    handleOrderSizeChange(val){
        this.orderRows = val;
        this.findOrder();
    },
    handleOrderCurrentChange(){
        this.findOrder();
    },
    handleSelectionChange(val) {
         this.multipleSelection = val;
    }

  },
  computed: {},
  watch:{ //可以使用字符串 对 data中的对象属性进行监听
      cuisineLbList : ()=>{
        // console.log('cuisineLbList数据发生变化')
      },
      allChecked:{
            handler(newVal){
                if(newVal){
                    this.cuisineList.forEach(item=>{
                        this.chooseCuiItem.push(item.id)
                    })
                }else{
                    this.chooseCuiItem=[]
                }
            },   
            deep: true
        }//深度监听allChecked 即可访问data的值

  }
};
</script>



<style scoped lang="less" src="./template.less"></style>
<style lang="less" scoped>

</style>
