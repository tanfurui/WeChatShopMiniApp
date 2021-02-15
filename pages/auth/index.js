// pages/auth/index.js
import {request} from '../../utils/request.js';
import asyncWx from '../../utils/asyncWx.js';
Page({
  data:{},
  onLoad:function(options) {
    //
  },
  async onGetUserInfo(ev) {
    try {
      console.log('授权信息', ev);
      const {encryptedData, iv, rawData, signature, userInfo} = ev.detail;
      console.log(ev.detail);
      wx.showToast({title:'您好' + userInfo['nickName'], icon:'success', mask:true});
      // // 获取登录成功之后的code
      // const {code} = await asyncWx.login();
      // console.log('code值', code);
      // const params = {encryptedData, rawData, iv, signature, code};
      // const {token} = await request({url:'/users/wxlogin', data:params, method:'post'});
      // wx.setStorageSync('token', token);
      // wx.navigateBack({delta:1});
    } catch (err) {
      console.log('获取token出错', err);
    }
  }
});