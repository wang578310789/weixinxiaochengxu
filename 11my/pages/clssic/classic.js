import { ClassicModel } from "../../models/classic";
import { LikeModel } from "../../models/like";
const classicModel = new ClassicModel();
const likeModel = new LikeModel();
Page({
  data: {
    classic: {},
    isLatest: true,
    isFirst: false
  },
  onLoad: function (options) {
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        like: res.like_status,
        count: res.fav_nums
      })
    })
  },
  onLike(e) {
    var behavior = e.detail.behavior;
    var id = this.data.classic.id;
    var type = this.data.classic.type;
    likeModel.getLike(behavior, id, type);
  },
  onPrev() {
    this._updateData("previous");
  },
  onNext() {
    this._updateData("next");
  },
  _updateData(nextOrprevious) {
    classicModel.getClassic(this.data.classic.index, nextOrprevious, res => {
      /* 解决缓存带来的点赞问题 */
      likeModel.getLikeStatus(res.type, res.id, res => {
        this.setData({
          like: res.like_status,
          count: res.fav_nums
        })
      })
      this.setData({
        classic: res,
        isFirst: classicModel.isFirst(res.index),
        isLatest: classicModel.isLatest(res.index)
      })
    })
  }
})