/*餐饮管理api的页面*/
import request from '@/helpers/request'
import querystring from 'querystring' //序列化请求参数
let formatData = (data)=>{
  return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  GET_LIST: 'xydc/app/stct/pageList1',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPLOADIMG: 'xydc/app/stct/filesUpload',
  DELETE: '/blog/:blogId'
}

export default {
  getList(page,rows,treeNode,cplb,mc) {
    return request(URL.GET_LIST, 'POST', formatData({ page,rows,treeNode,cplb,mc}))
  },
  uploadImg(myfiles) {
    return request(URL.UPLOADIMG, 'POST', myfiles)
  },
  // getIndexBlogs({ page=1 } = { page: 1}) {
  //   return this.getBlogs({ page, atIndex: true })
  // },

  // getBlogsByUserId(userId, { page=1, atIndex } = { page: 1}) {
  //   return this.getBlogs({ userId, page, atIndex })
  // },

  // getDetail({ blogId }) {
  //   return request(URL.GET_DETAIL.replace(':blogId', blogId))
  // },

  // updateBlog({ blogId }, { title, content, description, atIndex }) {
  //   return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
  // },

  // deleteBlog({ blogId }) {
  //   return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  // },

  // createBlog({ title = '', content = '', description = '', atIndex = false} = { title: '', content: '', description: '', atIndex: false}) {
  //   return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  // }

}