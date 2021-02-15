import {request} from '../../utils/request.js';
import {mockQuest} from '../../utils/mockQuest.js';// export const mockQuest = params => {}
// pages/category/index.js
Page({
  data:{
    leftMenuList:[],
    rightMenuList:[],
    currentLeftmenuIndex:0,
    currentRightMenu:[],
    rightScrollTop:0
  },
  onLoad:function(options) {
    // 先获取缓存数据
    let productCategoryLeftmenuList = wx.getStorageSync('productCategoryLeftmenuList');
    let productCategoryList = wx.getStorageSync('productCategoryList');
    if (!productCategoryLeftmenuList || !productCategoryList) {
      // 不存在缓存，则发送请求获取数据
      console.log('商品分类未缓存，现请求新数据');
      this.getCates();
    } else {
      // 有旧数据
      if (Date.now() - productCategoryLeftmenuList['time'] > 1000 * 10 || Date.now() - productCategoryList['time'] > 1000 * 10) {
        // 旧数据已过期(数据有效期自定义，为了方便测试设为10秒)，重新发送请求获取数据
        console.log('商品分类缓存已过期，现请求新数据');
        this.getCates();
      } else {
        // 旧数据可以使用
        console.log('商品分类缓存未过期，可以使用');
        this.setData({
          leftMenuList:productCategoryLeftmenuList['data'],
          rightMenuList:productCategoryList['data'],
          currentRightMenu:productCategoryList['data'][0]
        });
      }
    }
  },
  onShow:function(options) {
    // this.setData({currentRightMenu:this.rightMenuList[0]});
  },
  getCates() {
    mockQuest({url:'WeChat_Index_categoryList'})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Object]' && JSON.stringify(resData) !== '{}') {
          wx.setStorageSync('productCategoryLeftmenuList', {time:Date.now(), data:resData['productCategoryLeftmenuList']});
          wx.setStorageSync('productCategoryList', {time:Date.now(), data:resData['productCategoryList']});
          this.setData({
            leftMenuList:resData['productCategoryLeftmenuList'],
            rightMenuList:resData['productCategoryList'],
            currentRightMenu:resData['productCategoryList'][0]
          });
          // let list = res['data'];
          // // 让原数组的每一项做计算产生新的数组
          // let leftMenu = list.map((val, i) => {
          //   return val['cat_name'];
          // });
          // // 右侧菜单默认为第一个大类的子菜单
          // this.setData({rightMenuList:list[0]['children']});
        }
      });
  },
  onTapLeftmenu(ev) {
    // 获取自定义标签属性data-index的值
    const {index} = ev.currentTarget.dataset;
    // 用户点击左侧分类时，切换右侧页面内容，并使右侧页面返回顶部
    this.setData({
      currentLeftmenuIndex:index,
      currentRightMenu:this.data.rightMenuList[index],
      rightScrollTop:0
    });
  }
});