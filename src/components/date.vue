 <!--日期选择插件(自写)-->
<template>
    <div class="screen-search change-date">
        <div class="screen">
            <span>日期</span>
            <ul class="screen-ul">
                <li class='hvr-shadow-radial' style='width: 110px;height: 36px;' :class="[{'active':(menuIndex==index)}]" v-for="(data,index) in dataList" :key='index' @click='changeType(index,data)'><a href="#" :class="{'today':(today==data.date)}"><span>{{data.week}} </span><span>{{data.date}}</span></a></li>
            </ul>
        </div>
        <div class="search-group">
            <button class="btn btn-last-week" @click='lastWeek()'> 上一周 </button><span @click='toToday()' style="cursor: pointer;" class="toToday">{{today2}}</span><button class="btn btn-next-week"  @click='nextWeek()'>下一周 > </button>
        </div>
    </div>

</template>

<script>
import Vue from 'vue';

export default {
    data(){
        return {
            dataList:[],
            whichWeek:0,
            DayStemp:[],
            today2:new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(),
            today: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            menuIndex:0,
            todayYcrq:null,
            todayYcrq2:null,//'2019-01-02'
        }
    },
    // props:['Balcony'],
    created(){
        this.forEachData(this.whichWeek)
        let month = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
        let date1 = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
        
        this.todayYcrq = new Date().getFullYear() + '' + month + date1//设置当天时间
        this.todayYcrq2= new Date().getFullYear() + '-' + month + '-' + date1
        this.$emit('ycrqDate',this.todayYcrq)
        this.$emit('ycrqDate2',new Date(this.todayYcrq2))
    },
    methods:{
        toToday(){
            this.whichWeek = 0
            this.menuIndex = 0
            this.forEachData(this.whichWeek)
            this.$emit('ycrqDate',this.todayYcrq) //发送当天时间
            this.$emit('ycrqDate2',new Date(this.todayYcrq2))
        },
        forEachData(whichWeek){
            let today = new Date().getTime()
            this.DayStemp = []
            for(var i = 1 + 7 * whichWeek;  i <= 7 + 7 * whichWeek;  i++) {
                this.DayStemp.push( new Date((24 * 60 * 60 * 1000) * (i-1) + today)) //1-7天的时间
            }
            this.setDate()
        },
        setDate(){
            // this.$set(vm.items, indexOfItem, newValue)
            //vue响应式原理 当直接通过某个键改变值 数据不会发生响应 所以要使用 this.$set()
            for(var i=1; i <= 7;  i++){
                this.$set(this.dataList,i-1,{'week':this.setWeek(this.DayStemp[i-1].getDay()),'date':this.DayStemp[i-1].getFullYear() + '-' + (this.DayStemp[i-1].getMonth() + 1) + '-' + this.DayStemp[i-1].getDate()})
            }
        },
        setWeek(week){
            switch(week){
                case 0:
                    return '星期日'
                    break
                case 1:
                    return '星期一'
                    break
                case 2:
                    return '星期二'
                    break
                case 3:
                    return '星期三'
                    break
                case 4:
                    return '星期四'
                    break
                case 5:
                    return '星期五'
                    break
                case 6:
                    return '星期六'
                    break
            }   
        },
        nextWeek(){
            this.whichWeek = this.whichWeek + 1
            this.forEachData(this.whichWeek)
            console.log(this.whichWeek)
        },
        lastWeek(){
            this.whichWeek = this.whichWeek - 1
            this.forEachData(this.whichWeek)
            console.log(this.whichWeek)
        },
        changeType(index,date){
            this.menuIndex = index
            let  ycrqDate = new Date(date.date)
            let month = (ycrqDate.getMonth() + 1) < 10 ? '0' + (ycrqDate.getMonth() + 1) : (ycrqDate.getMonth() + 1)
            let date1 = ycrqDate.getDate() < 10 ? '0' + ycrqDate.getDate() : ycrqDate.getDate()
            let ycrq = ycrqDate.getFullYear() + '' + month + date1
            let ycrq2= ycrqDate.getFullYear() + '-' + month + '-' + date1
            this.$emit('ycrqDate',ycrq)
            this.$emit('ycrqDate2',new Date(ycrq2)) //'2019-01-02'
            //toUTCString()如何使用 toUTCString() 将当日的日期（根据 UTC）转换为字符串。 Fri, 14 Dec 2018 03:42:29 GMT
        }
      
    }
}
</script>
<style scoped lang="less" src="../pages/cygl/template.less"></style>
<style>
.today{
        background-color: #fd6666!important;
        color:white!important;
}
.toToday{
    transition: all .2s;
}
.toToday:hover{
    background-color: #fd6666!important;
    transition: all .2s;
}
</style>
