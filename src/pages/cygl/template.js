import blog from '@/api/blog.js'


export default {
  data () {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },

  created () {
    // this.page = parseInt(this.$route.query.page) || 1
    // blog.getIndexBlogs({ page: this.page }).then(res => {
    //   console.log(res)
    //   this.blogs = res.data
    //   this.total = res.total
    //   this.page = res.page
    // })
  },

  methods: {
    onPageChange (newPage) {
      console.log(newPage)
      blog.getIndexBlogs({ page: newPage }).then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({ path: '/', query: { page: newPage}})
      })
    },
    makeSize(){
      var w=$(window).width();
      var h=$(window).height();
      $('.main-sidebar,.content').height(h-55);
      $('.right').height(h-133);
      $('.menu-detail-box').height(h-477);
      setTimeout("$('.cptj').height($('.cuisine-box:eq(0)').height())",200);
    }
  }
}