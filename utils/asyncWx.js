export default {
  getSetting:() => {
    return new Promise((resolve, reject) => {
      // 获取用户的授权设置信息
      wx.getSetting({
        success:resSetting => {
          console.log('获取用户的授权设置', resSetting);
          resolve(resSetting);
        },
        fail:err => {
          console.log('获取用户的授权设置失败', err);
          reject(err);
        }
      });
    });
  },
  openSetting:() => {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success:resOpenSet => {
          console.log('授权设置页面', resOpenSet);
          resolve(resOpenSet);
        },
        fail:err => {
          console.log('打开授权设置页面失败', err);
          reject(err);
        }
      });
    });
  },
  chooseAddress:() => {
    return new Promise((resolve, reject) => {
      wx.chooseAddress({
        success:resChooseAddr => {
          console.log('用户选择的收货地址信息', resChooseAddr);
          resolve(resChooseAddr);
        },
        fail:err => {
          console.log('用户拒绝授权获取收货地址', err['errMsg']);
          reject(err);
        }
      });
    });
  },
  showModal:params => {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title:params['title'] || '提示',
        content:params['content'],
        success:res => {
          resolve(res);
        },
        fail:err => {
          reject(err);
        }
      });
    });
  },
  login:() => {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout:10000,
        success:result => {
          resolve(result);
        },
        fail:err => {
          reject(err);
        }
      });
    });
  },
  payment:pay => {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...pay,
        success:result => {
          resolve(result);
        },
        fail:err => {
          reject(err);
        }
      });
    });
  }
};