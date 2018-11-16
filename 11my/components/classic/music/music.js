// components/classic/music/music.js
const audio = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    content: String,
    music: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
    play: "images/play.png",
    stop: "images/stop.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMusic() {
      if (this.data.isPlay) {
        audio.pause();
        this.setData({
          isPlay: false
        });
      } else {
        audio.title = this.properties.title;
        audio.src = this.properties.music;
        this.setData({
          isPlay: true
        })
      }
    },
    _recoveryMusic() {
      if (audio.src == this.properties.music) {
        this.setData({
          isPlay: true
        })
      }
      if (audio.paused) {
        this.setData({
          isPlay: false
        })
      }
    }
  },
  attached() {
    this._recoveryMusic();

    audio.onPlay(() => {
      this.setData({
        isPlay: true
      })
    })

    audio.onPause(() => {
      this.setData({
        isPlay: false
      })
    })

    audio.onStop(() => {
      this.setData({
        isPlay: false
      })
    })

    audio.onEnded(() => {
      this.setData({
        isPlay: false
      })
    })
  }
})
