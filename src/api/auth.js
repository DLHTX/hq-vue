/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1IbY7yNTPlF/lJtYwP7R3o/t+/hgjgl5vUBlSKx1smWhxg93kffLvezB9N8e7c3fADfHRqimi+/8WLXkYfAmQcDrfvXWg3ngsDH8gxxzw8+n6KQqTCeDpJsgqFnk6HIOBgbDlz8yIA7y910SGr4/LAd4nxtr7lpSw2px40kRRWQIDAQAB";
const systemType = '@db9596' 
let encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  REGISTER: '/auth/register',
  LOGIN: 'platform/app/login',
  GET_GRXX: 'jcpt/app/common/grxx',
  TEST: 'bgyd/app/hotel/pageList1',
}

export default {
  register({username, password}) {
    return request(URL.REGISTER, 'POST', { username, password })
  },
  login({username,password}) {
    // console.log(password)
    let user =  { 
      'username': username + systemType, 
      'password':encrypt.encrypt(password),
      'clientType':'iOS',
      'loginType':'3'
    }
    let _token = {"_token": JSON.stringify(user)}
    localStorage.setItem('_token',JSON.stringify(user))
    // console.log(user.password)
    return request(URL.LOGIN,'POST',querystring.stringify(_token))
  },
  getGrxx(username){
    return request(URL.GET_GRXX,'GET')
  },
  test(){
    return request(URL.TEST,'POST',formatData({'page':1,'rows':3}))
  },

}