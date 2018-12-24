/*餐饮管理api的页面*/
import request from '@/helpers/request'
import querystring from 'querystring' //序列化请求参数
let formatData = (data)=>{
  return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  GET_LIST: 'bgyd/app/bg/seectByIdAndTime',
  SAVEROOMTYPE:'bgyd/app/bg/saveRoomType',
  SAVEROOM:'bgyd/app/bg/saveRooms',
  SELECTROOMTYPE:'bgyd/app/bg/selectRoomType',
  DELETETYPE:'bgyd/app/bg/deleteRoomType '
}

export default {
    getList(hotelId,time) {
        return request(URL.GET_LIST, 'POST', formatData({hotelId,time}))
    },
    saveRoomType(hotelId,type) {
        return request(URL.SAVEROOMTYPE, 'POST', formatData({hotelId,type}))
    },
    saveRooms(form) {
        return request(URL.SAVEROOM, 'POST', formatData(form))
    },
    selectRoomType(){
        return request(URL.SELECTROOMTYPE, 'POST', formatData({}))
    },
    deleteRoomType(ids){
        return request(URL.DELETETYPE, 'POST', formatData({ids:JSON.stringify(ids)}))
    }

}