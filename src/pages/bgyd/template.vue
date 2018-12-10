<template>
    <div class="content">
        <div class="second-menu">
            <ul class="second-ul">
                <li v-for='(name,index) in menuName' :key="name" @click='changeType(index)' :class='{true:"active"}[menuIndex===index]'>{{name}}</li>
            </ul>
        </div>
        <!--section1-->
        <div class="section section1 clearfix" v-if='menuIndex===0'>
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
                        <button class="btn btn-last-week"> 上一周</button><span>2018/12/03</span><button class="btn btn-next-week">下一周 > </button>
                    </div>
                </div>
                <div class="room-list clearfix">
                    <div class="room-item active">
                        <div class="real-room">
                            <div class="room-type">标准房/双床 <button class="btn btn-delete">删除</button></div>
                            <div class="money">RMB 300</div>
                            <div class="population">6/8</div>
                            <button class="btn room-have">有房</button>
                        </div>
                    </div>
                    <div class="room-item">
                        <div class="real-room">
                            <div class="room-type">商务套房 <button class="btn btn-delete">删除</button></div>
                            <div class="money">RMB 300</div>
                            <div class="population">6/6</div>
                            <button class="btn room-full">满房</button>
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
        <div class="section section2 clearfix" v-if='menuIndex===1'>
            <div class="screen-search">
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
            </div>
            <div class="ydgl-list">
                <div class="ydgl-item ydgl-yu">
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
                    <button class="btn btn-check-in">入住</button>
                </div>
                <div class="ydgl-item ydgl-zhu">
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
                </div>
            </div>
            <div class="bottom-ope clearfix">
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
        <!--提示信息框-->
        <div class="modal" id="modal" :class="{true:'modal-in'}[showModel]">
            <div class="modal-title">
                <div class="title">编辑</div>
                <a href="javascript:void(0);" class="close" @click="modalClose()"><img src="../../assets/img/close.png"></a>
            </div>
            <div class="modal-content">
                <form id="form">
                    <div class="input-group">
                        <label class="control-label">价格</label>
                        <input type="text" id="jg" name="jg" class="form-control">
                        <label class="control-label">间数</label>
                        <input type="text" id="js" name="js" class="form-control">
                    </div>
                    <div class="input-group">
                        <div class="t-a-l">房型选择</div>
                        <div class="fxzz-div">
                            <button class="btn btn-fxxz">标准房</button>
                            <button class="btn btn-fxxz">商务套房</button>
                            <button class="btn btn-fxxz active">豪华套房</button>
                        </div>
                    </div>
                    <button class="btn btn-makeSure" onclick="save(modal)">确定</button>
                </form>
            </div>
        </div>
        <div class="modal-backdrop" :class="{true:'modal-in modal-backdrop-active'}[showModel]"></div>
        <!--提示信息框-->
    </div>
</template>

<script>
import auth from '../../api/auth'

export default {
    name: 'Bgyd',
    data (){
            return{
                menuName:[
                '房间管理',
                '预定管理'
                ],
                menuIndex:0,
                showModel:false
            }
        },
        created(){
            auth.test()
        },
        methods:{
            changeType(index){
                this.menuIndex = index
            },
            addRoom(){
                this.showModel=true
            },
            modalClose(){
                this.showModel=false
            }
        },
        computed:{

        }
}
</script>

<style lang='less'>
@import "../../assets/common.less";
@import "../cygl/template.less";

.room-list{margin-left: -10px;margin-right: -10px;}
.room-list>.room-item{float: left;width: 160px;height:120px;padding-right: 10px;padding-left: 10px;box-sizing: border-box;margin-bottom:20px;}
.room-list>.room-item>.real-room{background-color: white;box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);border-radius: 6px;cursor: pointer;height: 100%;padding:4px;font-size: 14px;}
.room-list>.room-item.active>.real-room{box-shadow: 0 0 2px 2px #77a6fe;}
.real-room>div{line-height: 27px;color: gray;}
.btn-delete{border:1px solid #77a6fe;color: #77a6fe;width:40px;border-radius: 20px;float:right;font-size: 12px;line-height: 20px;margin-top: 3px;}
.room-type{color: black !important;}
.real-room>button{width:130px;height: 30px;line-height: 30px;margin-top:8px;}
.room-full{background-color: #ff6c6c;}
.room-have{background-color: #77a6fe;}
.t-a-l{text-align: left;}

.ydgl-item{background-color: white;padding:15px 30px;height: 70px;box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);border-radius:4px;margin-bottom:20px;position: relative;background-repeat: no-repeat;background-position: 64% 0;}
.ydgl-item>.ydgl-content{display: inline-block;margin-left:30px;font-size: 14px;color: #000000;}
.ydgl-item>.ydgl-content>div{margin-bottom:7px;}
.ydgl-item>.ydgl-content>div:last-child{margin-bottom:0;}
.ydgl-item>.ydgl-img{margin-top:-50px;}
.ydgl-item>.ydgl-content>div>.name{font-weight: bold;margin-right:40px;}
.ydgl-item>.ydgl-content>div>.phone{margin-right:40px;}
.to{margin:0 10px;}
.small-font,.to{color:#999999;font-size: 12px;}
.ydgl-item>.ydgl-content>div>.ddbh{margin-right:18px;}
.ydgl-item>.ydgl-content>div>.bh{margin-right:40px;}
.ydgl-item>.ydgl-content>div>.zwddsj{margin-right:15px;}
.ydgl-item>.btn-check-in{width:100px;line-height: 30px;background-color: #77a6fe;position: absolute;right: 30px;bottom:15px;}
.ydgl-item>.price{font-size: 16px;color: #ff4f4f;position: absolute;right: 60px;top: 24px;font-weight: bold;}
.check-out-detail{float: right;}
.check-out-detail>div{margin-bottom:7px;font-size: 14px;color: #77a6fe;text-align: right;}
.check-out-detail>div:last-child{margin-bottom:0;}
.check-out-detail>.price{font-size: 22px;color: #ff4f4f;font-weight: bold;}
.check-out-detail>div>.time{margin-right: 8px;}
.ydgl-tui{background-image: url("../../assets/img/tui.png");}
.ydgl-zhu{background-image: url("../../assets/img/zhu.png");}
.ydgl-yu{background-image: url("../../assets/img/yu.png");}
//提示信息框
/**弹框*/
.modal{
    position: fixed;
    z-index: 10000;
    top: 40%;
    left: 50%;
    display: none;
    overflow: hidden;
    -webkit-transition-property: -webkit-transform,opacity;
    transition-property: transform,opacity;
    -webkit-transform: translate3d(-50%,-50%,0) scale(1.185);
    transform: translate3d(-50%,-50%,0) scale(1.185);
    text-align: center;
    opacity: 0;
    color: #000;
    border-radius: 4px;
    background-color: white;
}
.modal.modal-in{
    display: block;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    -webkit-transform: translate3d(-50%,-50%,0) scale(1);
    transform: translate3d(-50%,-50%,0) scale(1);
    opacity: 1;
}
.modal-backdrop{
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    opacity: 0;
    background: rgba(0,0,0,.4);
    display: none;
}
.modal-backdrop.modal-backdrop-active{
    opacity: 1;
    display: block;
}
.modal-title{
    line-height: 34px;
    height: 34px;
    padding:0 20px;
    background-color: #77a6fe;
    color: white;
}
.modal-title>.title{
    float: left;
    font-size: 16px;
}
.modal-title>.close{
    float: right;
}
.modal-content{
    padding: 30px 28px 20px 28px;
}
.modal-content .form-control{
    margin-bottom: 25px;
    padding: 0 12px;
    border: none;
    width: 120px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    line-height: 24px;
}
.btn-makeSure{
    background:url("../../assets/img/make_sure.png") no-repeat;
    width: 180px;
    height: 30px;
    line-height: 30px;
    color: white;
    padding: 0;
}
.input-group .control-label{
    width: 45px;
    display: inline-block;
    text-align: left;
}
.fxzz-div{
    text-align: left;
    margin: 15px 0 30px 0;
}
.fxzz-div>.btn-fxxz{
    width:100px;
    height: 28px;
    background-color: #f6f6f6;
    color: #999999;
    margin-right: 17px;
}
.fxzz-div>.btn-fxxz:last-child{
    margin-right:0;
}
.fxzz-div>.active{
    background-color: #77a6fe;
    color: white;
}
//提示信息框
</style>

