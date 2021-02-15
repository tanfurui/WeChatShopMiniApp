// pages/user/index.js
Page({
  data:{
    userInfo:{},
    favoritesNum:0
  },
  onLoad:function(options) {
    //
  },
  onShow:function() {
    const userInfo = wx.getStorageSync('userInfo');
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({userInfo, favoritesNum:favorites.length});
  }
});