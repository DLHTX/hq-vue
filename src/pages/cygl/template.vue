<template>
  <div class="content">
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
              @click="searchLb(cuisineLb.id,index)"
              :class="{true:'active'}[cplbIndex===index]"
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
          :order="index">
          <div class="cuisine-item">
            <div class="cuisine-item-top">
              <!-- <img src="../../assets/img/cuisine1.png"> -->
              <AliImage
                :keys="item.tp"
                :type="imgValue.type"
                :sys="imgValue.sys"
                style="border-radius: 6px 6px 0 0;"
              ></AliImage>
              <div class="trade-name">品名：{{item.mc}}</div>
            </div>
            <div class="cuisine-item-bottom">
              <div class="type-price">
                <span class="type">菜品类别：小炒</span>
                <span class="price">¥20</span>
              </div>
              <div class="introduce" v-if="item.bz">简介:{{item.bz}}</div>
              <div class="switch-div" style="margin-top: 10px;">
                <span>是否可预订</span>
                    <el-switch
                        v-model="item.sfkyd"
                        active-color="#8ba8fe"
                        inactive-color="#a5a5a5">
                    </el-switch>
                <!-- <div class="switch-wrap active">
                  <span></span>
                </div> -->
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
          <input type="checkbox" class="allCheckbox">
          <span>全选</span>
          <button class="btn btn-tjcp" @click="addCp()">添加菜品</button>
          <button class="btn btn-cpdr">菜品导入</button>
          <button class="btn btn-tpdr">图片导入</button>
          <button class="btn btn-sc">删除</button>
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
    <div class="section section2 clearfix" v-if="menuIndex===1">
      <div class="right">
        <div class="right-top">
          <img src="../../assets/img/myxx_logo.png" class="myxx" style="display: none;">
          <img src="../../assets/img/myxx_text.png" class="myxx" style="display: none;">
          <div class="bjxx">
            <p>
              <b>预订信息--</b> （晚餐）
            </p>
            <p>
              <b>姓名：</b>许老师
            </p>
            <p>
              <b>手机号：</b>18266411212
            </p>
            <p>
              <b>预订时间：</b>2018-12-03 17:30
            </p>
          </div>
          <div class="box-number">包厢/桌号
            <input type="text" class="bxzh">
          </div>
        </div>
        <div class="right-list">
          <ul class="list-type clearfix">
            <li>品名</li>
            <li>数量</li>
            <li>金额</li>
          </ul>
          <div class="menu-detail-box">
            <div class="menu-detail">
              <div>鱼香肉丝</div>
              <div>1</div>
              <div>39</div>
            </div>
            <div class="menu-detail">
              <div>鱼香肉丝</div>
              <div>1</div>
              <div>39</div>
            </div>
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
        <!-- <div class="screen-search change-date">
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
        </div>-->
        <Date></Date>
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
              <a href="#" class="bxyd-add">
                <img src="../../assets/img/bxyd_add.png" width="100%" height="100%">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--section3-->
    <div class="section section3 clearfix" v-if="menuIndex===2"></div>
    <!--提示信息框-->
    <div class="modal" id="modal" :class="{true:'modal-in'}[showModel]">
      <div class="modal-title">
        <div class="title">添加菜品</div>
        <a href="javascript:void(0);" class="close" @click="modalClose()">
          <img src="../../assets/img/close.png">
        </a>
      </div>
      <div class="modal-content">
        <el-form ref="form" label-width="80px" :model='form' :hide-required-asterisk='true' :rules="rules" >  
            <el-upload
            class="avatar-uploader"
            :action="attachImg"
            :on-success="handleSuccess"
            name='myfiles'
            list-type="picture-card"
            :multiple='false'
            :before-upload="beforeUpload"
            :show-file-list="false">
            <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" style="max-width: 144px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <el-form-item label="菜品名称"  :required='true' prop="mc">
                <el-input v-model='form.mc'></el-input>
            </el-form-item>

            <el-form-item label="菜品价格"  :required='true' prop='jg'>
                <el-input v-model='form.jg'></el-input>
            </el-form-item>

            <el-form-item label="菜品类别" prop='lb' :required='true'>
                <el-select placeholder="请选择类别" v-model='form.cplb'>
                <el-option
                    v-for="item in cuisineLbList"
                    :key="item.mc"
                    :label="item.mc"
                    :value="item.id"
                    style="padding-left: 10px;"
                ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="菜品简介">
                <el-input type="textarea" v-model="form.bz"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save(form)">确定</el-button>
            </el-form-item>
            <!-- <button class="btn btn-makeSure" >确定</button> -->
       </el-form>
      </div>
    </div>
    <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showModel]"></div>
    <!--提示信息框-->
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
import { setLocalStorage,isQuotaExceeded,getLocalStorage } from "../../helpers/locTime";
import axios from "axios";
import Date from "../../components/date.vue";



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
        menuName: ["菜品管理", "包厢预订", "场地预订"],
        cuisineList: [],
        cuisineLbList: [],
        sfkyd:true,
        currentPage: 1,
        rows: 10,
        menuIndex: 0,
        cplbIndex: -1,
        shopList: this.$parent.shopList,
        Treenode: this.currentTreenode,
        dialogImageUrl: "",
        cuisineLb: "",
        input: "",
        imgValue: { type: "stcp", sys: "xydc" },
        total: null,
        loading: true,
        showModel: false,
        attachImg: axios.defaults.baseURL + "xydc/app/stct/filesUpload?_token=" + getLocalStorage("token"),
        form: {
            mc:'',
            cplb:'',
            bz:'',
            sfkyd:true,
            jg:'',
            refe:this.currentTreenode,
            tp:''
        },
        rules: {
            mc: [
                { required: true, message: '请输入菜品名称', trigger: 'blur' },
                { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
            ],
            jg:[
                { required: true, message: '请输入菜品价格', trigger: 'blur' }
            ],
            lb:[
                { required: true, message: '请选择菜品类别', trigger: 'change' }
            ]
        },
    };
  },
  created() {
    this.onGetList();
    console.log(this.Treenode);
  },
  methods: {
    ...mapActions(["getGrxx", "login"]),
    handleSuccess(res, file) {
      console.log(res, file);
      this.dialogImageUrl = axios.defaults.baseURL+ 'xydc/upload/'+ res.data.list;
      this.form.tp = res.data.list
    },
    beforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
    },
    save(form){
         this.$refs[form].validate((valid) => {
          if (valid) {
            alert('submit!');
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // cygl.save(this.form).then(res=>{
        //         console.log(res)
        // })
    },
    addCp() {
      this.showModel = true;
    },
    modalClose() {
      this.showModel = false;
    },
    changeType(index) {
      this.menuIndex = index;
    },
    onGetList(treeNode = this.currentTreenode, cplbId = null, mc = null) {
      this.loading = true;
      cygl
        .getList(this.currentPage, this.rows, treeNode, cplbId, mc)
        .then(res => {
          this.cuisineList = res.data.cbList; //菜品list
          if (this.currentPage === 1) {
            this.cuisineLbList = res.data.lbList; //分类
          }
          this.total = res.data.total; //总数
          this.loading = false; //载入动画
        });
    },
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
    },
    searchCp(val) {
      if (!val) {
        this.$message.error("输入内容不可为空");
      } else {
        this.onGetList(this.currentTreenode, null, val);
      }
    },
    searchAll() {
      this.loading = true;
      this.cplbIndex = -1;
      this.onGetList();
    },
    handleSizeChange(val) {
      this.rows = val;
      this.onGetList();
    },
    handleCurrentChange(val) {
      this.onGetList();
    }
  },
  computed: {}
};
</script>



<style scoped lang="less" src="./template.less"></style>
<style lang="less" scoped>
.screen .screen-ul a {
  font-family: "微软雅黑";
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
.el-loading-spinner .el-loading-text {
  color: #ffffff;
}
.el-loading-spinner i {
  color: #ffffff;
}
.el-form-item{
    margin: 20px 0 20px 0;
}

</style>
