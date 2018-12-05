<template>
        <div class="content">
            <div class="second-menu">
                <ul class="second-ul">
                 <li v-for='(name,index) in menuName' :key="name" @click='changeType(index)' :class='{true:"active"}[menuIndex===index]'>{{name}}</li>
                </ul>
            </div>
            <!--section1-->
            <div class="section section1 clearfix" v-if='menuIndex===0'>
            <div class="screen-search">
                <div class="screen">
                    <span>筛选</span>
                    <ul class="screen-ul">
                        <li class="active"><a href="#">全部</a></li>
                        <li><a href="#">小炒</a></li>
                        <li><a href="#">干锅</a></li>
                        <li><a href="#">汤羹</a></li>
                        <li><a href="#">凉菜</a></li>
                        <li><a href="#">特色小吃</a></li>
                        <li><a href="#">米粉面点</a></li>
                        <li><a href="#">精美点心</a></li>
                    </ul>
                </div>
                <div class="search-group">
                    <span class="search-group-addon"><img src="../../assets/img/search.png"></span>
                    <input type="text" placeholder="搜索" id="search">
                </div>
            </div>

                <div class="cuisine">
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine1.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap active">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine2.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap inactive">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine3.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap inactive">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine4.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap inactive">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine5.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap inactive">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <div class="cuisine-item-top">
                                <img src="../../assets/img/cuisine6.png">
                                <div class="trade-name">品名：xxxx</div>
                            </div>
                            <div class="cuisine-item-bottom">
                                <div class="type-price"><span class="type">菜品类别：小炒</span><span class="price">¥20</span></div>
                                <div class="introduce">简介：色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全色香味俱全</div>
                                <div class="switch-div">
                                    <span>是否可预订</span>
                                    <div class="switch-wrap inactive">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cuisine-box">
                        <div class="cuisine-item">
                            <a href="#" class="cptj"><img src="../../assets/img/cptj.png" width="100%" height="100%"></a>
                        </div>
                    </div>
                </div>

                <div class="bottom-ope clearfix">
                    <div class="left-btn">
                        <input type="checkbox" class="allCheckbox">
                        <span>全选</span>
                        <button class="btn btn-cpdr">菜品导入</button>
                        <button class="btn btn-tpdr">图片导入</button>
                        <button class="btn btn-sc">删除</button>
                    </div>
                    <ul class="paging">
                        <li><a href="javascript:void(0)">2/10</a></li>
                        <li><a href="javascript:void(0)">上一页</a></li>
                        <li><a href="javascript:void(0)">1</a></li>
                        <li><a href="javascript:void(0)">2</a></li>
                        <li><a href="javascript:void(0)">3</a></li>
                        <li><a href="javascript:void(0)">4</a></li>
                        <li><a href="javascript:void(0)">5</a></li>
                        <li><a href="javascript:void(0)">下5页</a></li>
                        <li><a href="javascript:void(0)">下一页</a></li>
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
        </div>
    <!--提示信息框-->

    <!--提示信息框-->

</template>

<script src="./template.js"></script>
<script>
export default {
    name: 'Cygl',
    data (){
        return{
         	menuName:[
			'菜品管理',
			'包厢预订',
			'场地预订'
            ],
            menuIndex:0
        }
    },
     created(){

    },
    methods:{
        changeType(index){
            this.menuIndex = index
        }
    },
    computed:{

    }

}

</script>



<style scoped lang="less" src="./template.less"></style>
