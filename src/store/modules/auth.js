import auth from '@/api/auth'
import { Message } from 'element-ui'
import { rejects } from 'assert';
import { resolve } from 'url';

const state = {
  user: null,
  isLogin: false
}

const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },

  setLogin(state, payload) {
    state.isLogin = payload.isLogin
  }
}

const actions = {
    login({commit},{ username,password }) {
        return auth.login({ username, password })
        .then(res => {
            console.log(res)
            commit('setLogin',{ isLogin: true })
            let _token = JSON.parse(localStorage.getItem('_token'))
            delete _token.password
            _token.loginInfo = res.data.loginInfo
            localStorage.setItem('token',encodeURIComponent(JSON.stringify(_token)) )
        },err=>{
            console.log('用户名或者密码错误')
        }).catch(err=>{
            return Message.error('用户名或密码错误2')
        })
    },
    getGrxx({commit},username){
        return auth.getGrxx(username)
        .then(res=>{
            console.log(res)
            commit('setUser',{ user: res.data.grxx })
        })
    },
    checkLogin({commit}){
        if(localStorage.getItem('token')){
            commit('setLogin',{ isLogin: true })
        }else{
            commit('setLogin',{ isLogin: false })
        }
    },
    logout({commit}){
        localStorage.removeItem('token')
        commit('setLogin',{isLogin:false})
        commit('setUser',{user:null})
    }



  // async register({ commit }, { username, password }) {
  //   let res = await auth.register({ username, password })
  //   commit('setUser', { user: res.data })
  //   commit('setLogin', { isLogin: true })
  //   return res.data
  // },

  // async logout({ commit }) {
  //   await auth.logout()
  //   commit('setUser', { user: null })
  //   commit('setLogin', { isLogin: false })
  // },

  // async checkLogin({ commit, state}) {
  //   if(state.isLogin) return true
  //   let res = await auth.getInfo()
  //   commit('setLogin', { isLogin: res.isLogin })
  //   if(!res.isLogin) return false
  //   commit('setUser', { user: res.data })
  //   return true
  // }

  /*
    this.logout().then(isLogin=>{
    
    })

  */
}

export default {
  state,
  getters,
  mutations,
  actions
}