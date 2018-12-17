<template>
<div>
    <input type="text" placeholder="用户名" v-model="username">
    <input type="password" placeholder="密码" v-model="password">
    <button @click='onLogin()'  v-loading.fullscreen.lock="fullscreenLoading">登录</button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            fullscreenLoading :false,
        }
    },
    created (){
        this.checkLogin()
        this.onCheckLogin()
        //this.$router.push({path: this.$route.query.redirect || '/index'})
    },
    methods:{
        ...mapActions([
            'getGrxx',
            'login',
            'checkLogin'
        ]),
        onCheckLogin(){
            if(this.isLogin){
                this.$router.push({path: this.$route.query.redirect || '/index'})
            }
        },
        onLogin(){
            this.fullscreenLoading = true;//loading动画 来自element-ui
            this.login({username:this.username,password:this.password}).then(res=>{
                // console.log('login之后的then得到的res是这个',res)
                this.checkLogin()
                if(this.isLogin){
                    this.getGrxx()//获取user信息
                    this.fullscreenLoading = false;
                    this.$message({message: '登陆成功!',type:'success'});
                    this.$router.push({path: this.$route.query.redirect || '/index'})
                }else{
                    this.fullscreenLoading = false;
                    this.$message.error('用户名或密码错误');
                }
            })
        },
        
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user'
        ])
    }
}
</script>

<style>
.data span{
   background-color: #a5a5a5;
}
</style>
