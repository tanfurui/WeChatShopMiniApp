// pages/cart/index.js
import asyncWx from '../../utils/asyncWx.js';
Page({
  data:{
    address:{},
    cart:[],
    isAllSelected:false,
    totalPrice:0,
    totalSelectedGoodsNum:0
  },
  onLoad:function(options) {
    //
  },
  onShow() {
    // 因为用户很有可能多次打开购物车页面，所以获取收货地址的逻辑放在onShow方法里
    const address = wx.getStorageSync('address');
    this.setData({address});
    const cart = wx.getStorageSync('cart') || [];
    this.updateCartData(cart);
  },
  onTapChooseAddress() {
    wx.chooseAddress({
      success:resChooseAddr => {
        console.log('用户选择的收货地址信息', resChooseAddr);
        let userAddressInfo = resChooseAddr;
        userAddressInfo['fullAddress'] = userAddressInfo.provinceName + userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo;
        wx.setStorageSync('address', resChooseAddr);
      },
      fail:err => {
        console.log('用户取消或拒绝授权获取收货地址', err['errMsg']);
        wx.showToast({title:'您取消授权小程序获取收货地址了', icon:'none', mask:true});
      },
      complete:() => {}
    });
    // // 先获取用户的授权设置信息
    // wx.getSetting({
    //   success:resSetting => {
    //     console.log('获取用户的授权设置', JSON.stringify(resSetting.authSetting));
    //     wx.showToast({title:JSON.stringify(resSetting.authSetting), icon:'none', mask:true});
    //     const authAddress = resSetting.authSetting['scope.address'];
    //     if (authAddress === false) {
    //       console.log('用户曾经拒绝授权小程序获取收货地址信息时，打开授权设置页面');
    //       wx.openSetting({
    //         success:resSettingUI => {
    //           wx.chooseAddress({
    //             success:resChooseAddr => {
    //               console.log('用户选择的收货地址信息', resChooseAddr);
    //               let userAddressInfo = resChooseAddr;
    //               userAddressInfo['fullAddress'] = userAddressInfo.provinceName + userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo;
    //               wx.setStorageSync('address', resChooseAddr);
    //             },
    //             fail:err => {
    //               console.log('用户拒绝授权获取收货地址', err['errMsg']);
    //             },
    //             complete:() => {}
    //           });
    //         }
    //       });
    //     } else if (authAddress === true || authAddress === undefined) {
    //       console.log('用户已经授权或从未授权小程序获取收货地址信息时，调用收货地址接口');
    //       wx.chooseAddress({
    //         success:resChooseAddr => {
    //           console.log('用户选择的收货地址信息', resChooseAddr);
    //           let userAddressInfo = resChooseAddr;
    //           userAddressInfo['fullAddress'] = userAddressInfo.provinceName + userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo;
    //           wx.setStorageSync('address', resChooseAddr);
    //         }
    //       });
    //     }
    //   },
    //   fail:err => {},
    //   complete:() => {}
    // });
    // try {
    //   // 先获取用户的授权设置信息
    //   wxGetSetting()
    //     .then(resSetting => {
    //       const authAddress = resSetting.authSetting['scope.address'];
    //       if (authAddress === false) {
    //         console.log('用户曾经拒绝授权小程序获取收货地址信息时，打开授权设置页面');
    //         wxOpenSetting()
    //           .then(resOpenSet => {
    //             wxChooseAddress().then(resChooseAddr => {
    //               let userAddressInfo = resChooseAddr;
    //               userAddressInfo['fullAddress'] = userAddressInfo.provinceName + userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo;
    //               wx.setStorageSync('address', resChooseAddr);
    //             });
    //           });
    //       } else if (authAddress === true || authAddress === undefined) {
    //         console.log('用户已经授权或从未授权小程序获取收货地址信息时，调用收货地址接口');
    //         wxChooseAddress().then(resChooseAddr => {
    //           let userAddressInfo = resChooseAddr;
    //           userAddressInfo['fullAddress'] = userAddressInfo.provinceName + userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo;
    //           wx.setStorageSync('address', resChooseAddr);
    //         });
    //       }
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  },
  onChangeSelectItem(ev) {
    const goodsId = ev.currentTarget.dataset.id;
    let cart = this.data.cart;
    let index = cart.findIndex(val => val['goods_id'] === goodsId);
    cart[index]['is_cart_selected'] = !cart[index]['is_cart_selected'];
    this.updateCartData(cart);
  },
  onChangeSelectAll() {
    let {cart, isAllSelected} = this.data;
    isAllSelected = !isAllSelected;
    cart.forEach((val, i, self) => {
      val['is_cart_selected'] = isAllSelected;
    });
    this.updateCartData(cart);
  },
  async onTapItemNumEdit(ev) {
    const {id, opera} = ev.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(val => val['goods_id'] === id);
    if (opera === 1 || opera === -1 && cart[index]['in_cart_number'] > 1) {
      cart[index]['in_cart_number'] += opera;
      this.updateCartData(cart);
    } else {
      // wx.showModal({title:'提示', content:'您是否要删除？', success:res => {}});
      const userConfirm = await asyncWx.showModal({content:'您是否要删除？'});
      if (userConfirm.confirm) {
        cart.splice(index, 1);
        this.updateCartData(cart);
      } else if (userConfirm.cancel) {
        // wx.showToast({title:'您取消了删除', icon:'success', mask:true});
      }
    }
  },
  onTapPay() {
    const {address, totalSelectedGoodsNum} = this.data;
    if (!address.userName) {
      wx.showToast({title:'您还没有选择收货地址', icon:'none', mask:true});
      return;
    }
    if (totalSelectedGoodsNum === 0) {
      wx.showToast({title:'您还没有选购商品', icon:'none', mask:true});
      return;
    }
    wx.navigateTo({url:'/pages/pay/index'});
  },
  updateCartData(cart) {
    let isAllSelected = true;
    let totalPrice = 0, totalSelectedGoodsNum = 0;
    cart.forEach((val, i, self) => {
      if (val['is_cart_selected']) {
        totalPrice += val['in_cart_number'] * val['goods_price'];
        totalSelectedGoodsNum++;
      } else {
        isAllSelected = false;
      }
    });
    if (cart.length === 0) {
      isAllSelected = false;
    }
    this.setData({cart, isAllSelected, totalPrice, totalSelectedGoodsNum});
    wx.setStorageSync('cart', cart);
  }
});