// pages/cart/index.js
import asyncWx from '../../utils/asyncWx.js';
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalSelectedGoodsNum:0
  },
  onLoad:function(options) {
    //
  },
  onShow() {
    // 因为用户很有可能多次打开购物车页面，所以获取收货地址的逻辑放在onShow方法里
    const address = wx.getStorageSync('address');
    // 筛选出购物车里已勾选的商品
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter((val, i) => {return val['is_cart_selected'];});
    let totalPrice = 0, totalSelectedGoodsNum = 0;
    cart.forEach((val, i, self) => {
      totalPrice += val['in_cart_number'] * val['goods_price'];
      totalSelectedGoodsNum++;
    });
    this.setData({address, cart, totalPrice, totalSelectedGoodsNum});
  },
  onTapOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({url:'/pages/auth/index'});
      return;
    }
    // 支付成功后从购物车中移除商品
    let newCart = wx.getStorageSync('cart') || [];
    newCart = newCart.filter((val, i) => {return !val['is_cart_selected'];});
    wx.setStorageSync('cart', newCart);
  }
});