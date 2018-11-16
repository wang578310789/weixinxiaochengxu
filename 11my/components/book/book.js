
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBook(){
      wx.navigateTo({
        url: '../../pages/book/book-detail/book-detail?id='+this.properties.book.id
      })
    }
  }
})
