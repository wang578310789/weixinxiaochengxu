// components/classic/data/data.js
Component({
  properties: {
    index:{
      type:Number
    }
  },
  data: {
    year:0,
    month:0
  },
  methods: {

  },
  attached(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year,
      month
    })
  
  }
})
