let ajaxTimes = 0;
export const request = config => {
  // 全局统一处理请求的URL前缀
  // config.url = `${api.base}${config.url}`;
  if (config.params) {
    config.data = config.params;
  }
  if (config.loading) {
    ajaxTimes++;
    wx.showLoading({title:'正在加载', mask:true});
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success:result => {
        resolve(result);
      },
      fail:err => {
        reject(err);
      },
      complete() {
        // 每请求完成一次，就对当前请求数量进行自减，当请求数量为0时隐藏Loading
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 隐藏Loading
          wx.hideLoading();
        }
      }
    });
  });
};