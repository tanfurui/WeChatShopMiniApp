// pages/login/index.js
Page({
  data:{},
  onLoad:function(options) {
  },
  onGetUserInfo(ev) {
    console.log('登录信息', ev);
    const {userInfo} = ev.detail;
    // // 获取登录成功之后的code
    // const {code} = await asyncWx.login();
    // console.log('code值', code);
    // const params = {encryptedData, rawData, iv, signature, code};
    // const {token} = await request({url:'/users/wxlogin', data:params, method:'post'});
    wx.setStorageSync('userInfo', userInfo);
    // 返回到上一个页面
    wx.navigateBack({delta:1});
  }
});