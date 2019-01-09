/*餐饮管理api的页面*/
import request from '@/helpers/request'
import querystring from 'querystring' //序列化请求参数
let formatData = (data)=>{
  return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  GET_LIST: 'xydc/app/stct/pageList1',
  GET_DETAIL: '/blog/:blogId',
  UPDATE: 'xydc/app/stct/update',
  UPLOADIMG: 'xydc/app/stct/filesUpload',
  SAVE: 'xydc/app/stct/save',
  DELETE:'xydc/app/stct/deleteById',
  SAVETYPE:'xydc/app/stct/saveType',//添加菜品类别
  DELETETYPE:'xydc/app/stct/deleteType',//删除菜品类别
  //以上是第一模块
  SELECTBOX:'xydc/app/stct/selectBox',
  QUERYLIST:'xydc/app/stct/queryList/',
  UPDATASTATE:'xydc/app/stct/updateStatus/',//更改包厢是否显示
  SAVEBOX:'xydc/app/stct/saveBox', //添加包厢
  IMPORTCP:'xydc/app/stct/importCP', //批量导入
  //以上是第二模块
  PAGE:'xydc/app/stct/pageOderList',
}

export default {
    getList(page,rows,treeNode,cplb,mc) {
        return request(URL.GET_LIST, 'POST', formatData({ page,rows,treeNode,cplb,mc}))
    },//获取餐厅列表
    uploadImg(myfiles) {
        return request(URL.UPLOADIMG, 'POST', myfiles)
    },//上传图片
    save(form) { 
        return request(URL.SAVE, 'POST', formatData(form))
    },//保存餐厅
    isOrderUpdate(id,type){
        return request(URL.UPDATE, 'POST', formatData({id,type}))
    },//是否预定
    delete(ids){
        return request(URL.DELETE, 'POST', formatData({ids:ids.join(',')}))
    },//删除餐厅
    //以上是第一模块
    getBalcony(refe,ycrq){
        return request(URL.SELECTBOX, 'POST', formatData({refe,ycrq}))
    },//获取包厢
    queryList(id){
        return request(URL.QUERYLIST + id, 'GET')
    },
    updateStatus(id,type){
        return request(URL.UPDATASTATE, 'POST', formatData({id,type}))
    },//更新状态
    saveBox(form){
        return request(URL.SAVEBOX, 'POST', formatData(form))
    },
    importCP(form){
        return request(URL.IMPORTCP, 'POST', form)
    },
    saveType(mc,refe){
        return request(URL.SAVETYPE, 'POST',formatData({mc,refe}))
    },
    deleteType(ids){
        return request(URL.DELETETYPE, 'POST',formatData({ids}))
    },
    findOrder(treeNode,page,rows){
        return request(URL.PAGE, 'POST',formatData({treeNode,page,rows}))
    }

}