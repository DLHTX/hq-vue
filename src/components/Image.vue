<template>
    <div>
        <img :src='url' alt="" @load="imageLoaded" v-show="isLoad" style="height: 200px;width: 260px;border-radius: 6px 6px 0 0;">
        <img src='../assets/img/nopic.png' alt="" v-show="!isLoad" style="height: 200px;width: 260px;border-radius: 6px 6px 0 0;">
    </div>
</template>

<script>
import axios from 'axios'
import { setLocalStorage,isQuotaExceeded,getLocalStorage } from '../helpers/locTime'

export default {
    data(){
        return {
            sysV : this.sys,
            keyV : this.keys,
            typeV : this.type,
            isLoad: false,
            url: axios.defaults.baseURL + 'xydc/app/common/attachmentDownload?type='+this.type+'&isStream=1&sys='+this.sys +'&key='+this.keys+'&_token='+getLocalStorage("token")
        }
    },
    props:['sys','keys','type'],
    created(){
        //console.log(axios.defaults.baseURL, getLocalStorage("token"))
    },
    methods:{
        imageLoaded(){
            console.log('图片已加载')
            this.isLoad = true
        }
    }
}
</script>
