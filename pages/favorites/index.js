// pages/favorites/index.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    tabs:[
      {id:0, value:'商品收藏', isActive:true},
      {id:1, value:'品牌收藏', isActive:false},
      {id:2, value:'店铺收藏', isActive:false},
      {id:3, value:'浏览足迹', isActive:false}
    ],
    favorites:[]
  },
  onShow() {
    let favorites = wx.getStorageSync('favorites') || [];
    this.setData({favorites});
  },
  onChangeTabsItem(ev) {
    // 获取组件事件参数
    const {index} = ev.detail;
    let {tabs} = this.data;
    tabs.forEach((val, i, self) => i === index ? val.isActive = true : val.isActive = false);
    this.setData({tabs});
  }
});