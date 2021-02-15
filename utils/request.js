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
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 隐藏Loading
          wx.hideLoading();
        }
      }
    });
  });
};