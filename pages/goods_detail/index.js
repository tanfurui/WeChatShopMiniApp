// pages/goods_detail/index.js
import {mockQuest} from '../../utils/mockQuest.js';// export const mockQuest = params => {}
Page({
  data:{
    goodsId:0,
    goodsInfo:{},
    isAtFavorites:false
  },
  onShow:function() {
    let pages = getCurrentPages(), options = pages[pages.length - 1]['options'];
    let {goods_id} = options;
    this.setData({goodsId:goods_id});
    this.queryGoodsDetail();
  },
  // 放大预览轮播图
  onTapSwiperItem(ev) {
    const urls = this.data.goodsInfo['imgs'].map((val, i, self) => {return val['goods_middle_img'];});
    wx.previewImage({current:ev.currentTarget.dataset.url, urls:urls});
  },
  onTapAddToCart() {
    let cart = wx.getStorageSync('cart') || [];
    for (let i = 0, len = cart.length; i < len; i++) {
      cart[i]['is_cart_selected'] = false;
    }
    let index = cart.findIndex(v => v.goods_id === this.data.goodsInfo['goods_id']);
    if (index < 0) {
      // 当前商品不在购物车里，首次添加
      this.setData({'goodsInfo.in_cart_number':1, 'goodsInfo.is_cart_selected':true});
      cart.push(this.data.goodsInfo);
    } else {
      // 当前商品已在购物车里，执行加1操作
      cart[index]['in_cart_number']++;
      cart[index]['is_cart_selected'] = true;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({title:'加入成功', icon:'success', mask:true});// 加个遮罩防止用户疯狂点击按钮
  },
  queryGoodsDetail() {
    let params = {goods_id:this.data.goodsId};
    mockQuest({url:'WeChat_Goods_getGoodsDetail', data:params})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Object]' && JSON.stringify(resData) !== '{}') {
          console.log('resData', resData);
          let favorites = wx.getStorageSync('favorites') || [];
          let isAtFavorites = favorites.some(val => val['goods_id'] === resData['goods_id']);
          this.setData({goodsInfo:resData, isAtFavorites});
        } else {
          this.setData({goodsInfo:{}});
          wx.showToast({title:'找不到数据'});
        }
      })
      .catch(err => {
        //
      });
  },
  onTapFavoriteGoods(ev) {
    let isAtFavorites = false;
    let favorites = wx.getStorageSync('favorites') || [];
    let index = favorites.findIndex(val => val['goods_id'] === this.data.goodsInfo['goods_id']);
    if (index > -1) {
      favorites.splice(index, 1);
      isAtFavorites = false;
      wx.showToast({title:'取消成功', icon:'success', mask:true});
    } else {
      favorites.push(this.data.goodsInfo);
      isAtFavorites = true;
      wx.showToast({title:'收藏成功', icon:'success', mask:true});
    }
    wx.setStorageSync('favorites', favorites);
    this.setData({isAtFavorites});
  }
});