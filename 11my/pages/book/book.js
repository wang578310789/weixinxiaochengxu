import { BookModel } from "../../models/book";
const bookModel = new BookModel();
Page({

  data: {
    books: []
  },
  onLoad: function (options) {
    bookModel.getHotBook().then(res => {
      console.log(res)
      this.setData({
        books: res
      })
    })
  },
  onSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  }
})