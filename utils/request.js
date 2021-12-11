// 当前请求数量
let ajaxTimes = 0;
export const request = params => {
  ajaxTimes++;
  // 显示Loading
  wx.showLoading({title:'正在加载', mask:true});
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success:result => {
        resolve(result);
      },
      fail:err => {
        reject(err);
      },
      complete() {
        // 每请求完成一次，就对当前请求数量进行自减，当请求数量为0时则隐藏Loading
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 隐藏Loading
          wx.hideLoading();
        }
      }
    });
  });
};