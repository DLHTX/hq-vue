<template>
    <div class="tip-modal">
        <div class="tip-item clearfix">
            <img src="../../assets/img/horn.png">
            <span>包厢预定：</span>
            <div class="tip-text">维多利亚（11月20号晚餐已被预定）</div>
        </div>
        <div class="tip-item clearfix">
            <img src="../../assets/img/horn.png">
            <span>包厢预定：</span>
            <div class="tip-text">维多利亚（11月21号晚餐已被预定）</div>
        </div>
        <img src="../../assets/img/tip_icon.png" class="alarm" @click='tipModel()'>
        <img src="../../assets/img/xddtz.png" class="xddtz">
    </div>
</template>

<script>
export default {
    name:'tipModel',
    data(){
        return{
            showTipModel:true
        }
    },
    methods:{
        tipModel(){
            this.$emit('showTipModel',this.showTipModel)
        }
    }
}
</script>


<style>
.tip-modal{top:997px;left:20px;transition:all .5s;position:fixed;left: 20px;z-index: 999;width:280px;height: 160px;box-shadow: 0 0 6px 2px rgba(119, 166, 254, 0.4);padding:30px 10px 0 10px;background-color: white;cursor: pointer;}
.tip-modal>.tip-item{font-size: 14px;margin-bottom: 10px;}
.tip-modal>.tip-item>img{float:left;margin: 3px 8px 0 0;}
.tip-modal>.tip-item>span{color: #36c0fb;font-weight: bold;}
.tip-modal>.tip-item>.tip-text{float:right;width: 66%;}
.tip-modal>.alarm{position: absolute;left: -10px;top: -38px;}
.tip-modal>.xddtz{position: absolute;left: 64px;top: -21px;}
</style>
