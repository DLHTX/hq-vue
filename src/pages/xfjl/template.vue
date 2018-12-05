<template>
       <div class="content xfjl">
            <div class="screen-search">
                <div class="screen">
                    <span>筛选</span>
                    <ul class="screen-ul">
                        <li class="active"><a href="#">全部</a></li>
                        <li><a href="#">时间</a></li>
                        <li><a href="#">房型</a></li>
                        <li><a href="#">状态</a></li>
                    </ul>
                </div>
            </div>
            <div class="table-box">
                <table class="table">
                    <thead>
                    <tr>
                        <th>选择</th>
                        <th>订单号</th>
                        <th>消费用户</th>
                        <th>手机号码</th>
                        <th>入住时间</th>
                        <th>离店时间</th>
                        <th>时长</th>
                        <th>房型</th>
                        <th>支付方式</th>
                        <th>消费金额</th>
                        <th>操作员</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1234567893</td>
                        <td>老干妈</td>
                        <td>18646461212</td>
                        <td>2018-11-02</td>
                        <td>2018-11-03</td>
                        <td>1晚</td>
                        <td>标准房</td>
                        <td>网络消费</td>
                        <td>420</td>
                        <td>徐老师</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1234567893</td>
                        <td>老干妈</td>
                        <td>18646461212</td>
                        <td>2018-11-02</td>
                        <td>2018-11-03</td>
                        <td>1晚</td>
                        <td>标准房</td>
                        <td>网络消费</td>
                        <td>420</td>
                        <td>徐老师</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="bottom-ope clearfix">
                <div class="left-btn">
                    <input type="checkbox" class="allCheckbox">
                    <span>全选</span>
                    <button class="btn btn-export">导出</button>
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
</template>

<script>
export default {
    name:'Xfjl'
}
</script>

<style>
@import "../../assets/common.less";
@import "../cygl/template.less";
.xfjl{padding: 20px 20px 0 20px;}
.xfjl>.screen-search{background-color: white;border-bottom: 0;padding: 8px 0;box-shadow: 0 0 8px 1px rgba(0,0,0,0.1);}
.table-box{background-color: white;padding:0 30px 60px 30px;box-shadow: 0 0 8px 1px rgba(0,0,0,0.1);}
.table{width: 100%;max-width: 100%;margin-bottom: 20px;border-spacing: 0;border-collapse: collapse;}
.table>thead>tr>th{border-bottom:1px solid #77a6fe;font-size: 14px;color:#111111;line-height: 52px;text-align: center;}
.table>tbody>tr>td{line-height: 50px;border-bottom:1px solid #e0eafe;text-align: center;font-size: 14px;color: #666666;}
.btn-export{background-color: #fda813;}

.tip-modal{position:fixed;left: 20px;z-index: 999;width:280px;height: 160px;box-shadow: 0 0 6px 2px rgba(119, 166, 254, 0.4);padding:30px 10px 0 10px;background-color: white;cursor: pointer;}
.tip-modal>.tip-item{font-size: 14px;margin-bottom: 10px;}
.tip-modal>.tip-item>img{float:left;margin: 3px 8px 0 0;}
.tip-modal>.tip-item>span{color: #36c0fb;font-weight: bold;}
.tip-modal>.tip-item>.tip-text{float:right;width: 66%;}
.tip-modal>.alarm{position: absolute;left: -10px;top: -38px;}
.tip-modal>.xddtz{position: absolute;left: 64px;top: -21px;}

</style>
