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
  DELETETYPE:'bgyd/app/bg/deleteRoomType',
  DELETEROOMS:'bgyd/app/bg/deleteRooms',
  ORDERFORROOMS:'bgyd/app/bg/OrderForRooms',
  FINDORDERLIST:'bgyd/app/bg/findOrderList'
}

export default {
    getList(hotelId,time) {
        return request(URL.GET_LIST, 'POST', formatData({hotelId,time}))
    },//获取宾馆列表
    saveRoomType(hotelId,type) {
        return request(URL.SAVEROOMTYPE, 'POST', formatData({hotelId,type}))
    },//保存宾馆类型
    saveRooms(form) {
        return request(URL.SAVEROOM, 'POST', formatData(form))
    },//保存房间
    selectRoomType(){
        return request(URL.SELECTROOMTYPE, 'POST', formatData({}))
    },//获取宾馆类型
    deleteRoomType(ids){
        return request(URL.DELETETYPE, 'POST', formatData({ids}))
    },//删除宾馆类型
    deleteRooms(type,refe){
        return request(URL.DELETEROOMS, 'POST', formatData({type,refe}))
    },//删除宾馆房间
    orderForRooms(type,refe,time,count){
        return request(URL.ORDERFORROOMS, 'POST', formatData({type,refe,time:time+'',count}))
    },//设置满房
    findOrderList(page,rows){
        return request(URL.FINDORDERLIST, 'POST', formatData({page,rows}))
    }//查找订单列表

}