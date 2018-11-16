import { Keyword } from "../../models/keyword";
import { BookModel } from "../../models/book";
const bookModel = new BookModel();
const keyword = new Keyword();
Component({
  properties: {
    topMore:{
      type:Number,
      observer:"onPull"
    },
    bottomMore:{
      type:Number,
      observer:"onBottom"
    }
  },
  data: {
    words: [],
    hots: [],
    books: [],
    isSearch: false,
    isResult: false,
    value: "",
    loading: false,
    isClear:false
  },
  methods: {
    // 下拉刷新
    onPull(){
      this.setData({
        books:[]
      })
      bookModel.getBookSearch(0,this.data.value).then(res=>{
        this.setData({
          books:res.books
        })
      })
    },
    // 上拉刷新
    onBottom(){
      this._loadmore();
    },
    onConfirm(event) {
      let value = event.detail.value;
      wx.showLoading({ title: "加载中" });
      // 只有在服务器上能搜索到的关键词才添加上缓存中
      bookModel.getBookSearch(0, value).then(res => {
        if (res.total) {
          keyword.addHistory(value);
          let words = keyword.getHistory();
          this.setData({
            words,
            books: res.books,
            isSearch: true,
            isResult: false,
            value,
            total: res.total,
            isClear:true
          })
        } else {
          wx.showToast({
            title: '没有搜索到相关内容',
            icon: 'none'
          })
          this.setData({
            isSearch: true,
            isResult: true,
            books: [],
            value
          })
        }
        wx.hideLoading();
      })
    },
    onInput(event){
      if(event.detail.value){
        this.setData({
          isClear:true
        })
      }else{
        this.setData({
          isClear:false
        })
      }
    },
    onClear() {
      this.setData({
        books: [],
        value: "",
        isSearch: false,
        isResult: false,
        isClear:false
      })
    },
    // 组件里上拉刷新
    // onScroll() {
    //   this._loadmore();
    // },
    _loadmore() {
      var start = this.data.books.length;
      var value = this.data.value;
      if (start < this.data.total) {
        this.setData({
          loading: true
        })
        bookModel.getBookSearch(start, value).then(res => {
          let arr = this.data.books.concat(res.books);
          this.setData({
            books: arr,
            loading: false
          })
        })
      }
    },
    onBtn(){
      this.setData({
        isSearch:false
      })
      wx.switchTab({
        url: '/pages/book/book',
      })
    }
  },
  attached() {
    this.setData({
      words: keyword.getHistory()
    })
    keyword.getHotData().then(res => {
      this.setData({
        hots: res.hot
      })
    })
  }
})