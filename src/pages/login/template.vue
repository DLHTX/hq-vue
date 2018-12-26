<template>
<div style="height: 100%;transition:all .5s" :style="fontStyle">
    <div class="navbar">
		<nav class="nav__mobile"></nav>
		<el-header style="height: 55px;line-height: 55px;">
            <a href="#" class="logo">
                <img src="../../assets/img/logo.png">
                <img src="../../assets/img/logo_text.png">
            </a>
        </el-header>
	</div>
	<!-- Authentication pages -->
	<div class="auth">
		<div class="container">
			<div class="auth__inner">
				<div class="auth__media">
					<img src="../../assets/img/undraw_selfie.svg" class="svg">
				</div>
				<div class="auth__auth">
                    <el-color-picker v-model="fontStyle.background" size="mini" style="margin-bottom: 15px;"></el-color-picker>
					<h1 class="auth__title" style="font-family: BMYH;transfrom:translateX(-20px)" id='code'>南京航空航天大学后勤管理平台</h1>
					<p style="font-family: BMYH;">登录页面</p>
					<div class="form">
						<input class="fakefield">
						<label class='hvr-forward'>用户名</label>
						<input type="text" autocomplete="on" placeholder="请输入用户名" v-model="username" name="email">
						<label class='hvr-forward'>密码</label>
						<input type="password" placeholder="请输入密码"  v-model="password" >
						<button style='border-color:transparent;width:100px;' :style='divStyle'  @mousemove="enter($event)" class="button button__accent hvr-grow"  @click='onLogin()' v-loading.fullscreen.lock="fullscreenLoading" >登录</button>
					</div>
				</div>
			</div>
		</div>
	</div>
     <div class="bottom">Powered by Yumoo!  © 2012-2018 Yumoo Inc.</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setLocalStorage } from '../../helpers/locTime';
import anime from 'animejs'//anime库

export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            fullscreenLoading :false,
            fontStyle:{
                'background':'#ffffff',
            },
            divStyle:{
                 'background': 'radial-gradient(circle at '+'0'+'px '+'0'+'px'+',#968fff, #06d19c)'
            },
            res:'南京航空航天大学后勤管理平台'
        }
    },
    watch:{
        'fontStyle.background':{
            handler(res){
                console.log(res)
                localStorage.setItem('color',res)
            },
            deep:true
        }
    },
    mounted(){
        this.anime()
    },
    created(){
        this.checkLogin()
        this.onCheckLogin()
        //this.$router.push({path: this.$route.query.redirect || '/index'})
    },
    methods:{
        ...mapActions([
            'getGrxx',
            'login',
            'checkLogin',
        ]),
        enter(event){
            this.divStyle.background = 'radial-gradient(circle at '+event.offsetX+'px '+event.offsetY+'px'+', #968fff, #06d19c)'
        },
        onCheckLogin(){
            if(localStorage.getItem('color')){
                this.fontStyle.background = localStorage.getItem('color')
            }//判断用户设置的背景色
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
        anime(){
            var n= 0
            var timer = setInterval(()=>{
                n+=1
                code.innerHTML = this.res.substring(0,n)
                if(n>=this.res.length){
                    console.log('清除')
                    window.clearInterval(timer)
                    var cssSelector = anime({
                        targets: '#code',
                        translateX:20,
                        duration: 2000    
                    });
                }
            },200)
        }
        
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user',
        ]),
        handerColor:()=>{
        }
    }
}
</script>


<style scoped lang="less" src="./template.less"></style>
<style>
.data span{
   background-color: #a5a5a5;
}
.auth__auth{
    font-family: BMYH!important;
}
*{
    -moz-user-select: none; 
    -o-user-select:none; 
    -khtml-user-select:none; 
    -webkit-user-select:none; 
    -ms-user-select:none; 
    
}
input:-webkit-autofill {
    background-color: #FAFFBD;
    background-image: none;
    -webkit-box-shadow: 0 0 0 1000px white inset;
border: 1px solid #CCC!important;

}
input:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
.bottom{
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #dadada;
    font-family: BMYH!important;
    height: 28px;
    line-height: 28px;
}
</style>
