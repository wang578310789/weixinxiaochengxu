import { BookModel } from "../../../models/book";
const bookModel = new BookModel;
Page({

  data: {
    isShow: false,
    value: null
  },

  onLoad: function (options) {
    this._getNetWorkData(options.id);
  },
  _getNetWorkData(id) {
    const detail = bookModel.getBookDetail(id);
    const comments = bookModel.getBookComment(id);
    const likeStatus = bookModel.getBookLike(id);
    Promise.all([detail, comments, likeStatus]).then(res => {
      let [detail, comments, likeStatus] = res;
      this.setData({
        detail,
        comments: comments.comments,
        likeStatus,
        id
      });
    });
  },
  onTap() {
    this.setData({
      isShow: true
    })
  },
  onStop() {
    this.setData({
      isShow: false
    })
  },
  onConfirm(event) {
    var value = event.detail.value.search;
    if (typeof value == "function") {
      value = event.detail.value;
    }
    if (value) {
      this.data.comments.unshift({
        content: value,
        nums: 1,
      })
      /* 新增短评 */
      bookModel.addNewComment(this.data.id,value).then(res=>{
        wx.showToast({
          title: '评论成功',
          icon: 'none'
        })
      })
    }
    this.setData({
      comments: this.data.comments,
      value: null
    })
    
  }
  // onComment(event){
  //   console.log(event.detail.value);
  // }
});