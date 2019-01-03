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
  //以上是第一模块
  SELECTBOX:'xydc/app/stct/selectBox',
  QUERYLIST:'xydc/app/stct/queryList/',
  UPDATASTATE:'xydc/app/stct/updateStatus/',//更改包厢是否显示
  SAVEBOX:'xydc/app/stct/saveBox' //添加包厢
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
    }

}