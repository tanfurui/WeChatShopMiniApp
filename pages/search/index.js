// pages/search/index.js
import {mockQuest} from '../../utils/mockQuest.js';// export const mockQuest = params => {}
Page({
  data:{
    keyword:'',
    goods:[],
    isInputText:false
  },
  Timer:-1,
  onInput(ev) {
    const {value} = ev.detail;
    if (!value.trim()) {
      this.setData({isInputText:false, goods:[]});
      return;
    }
    this.setData({isInputText:true});
    // 防抖(防止短时间内发送大量请求)
    clearTimeout(this.Timer);
    this.Timer = setTimeout(() => {
      // 请求数据
      let params = {keyword:value};
      mockQuest({url:'WeChat_Goods_quickSearch', data:params})
        .then(result => {
          // 获取业务数据
          let resCode = result['code'], resData = result['data'];
          if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Array]' && resData.length > 0) {
            console.log('快速搜索', resData);
            this.setData({goods:resData});
          } else {
            this.setData({goods:[]});
          }
        })
        .catch(err => {
          //
        });
    }, 1000);
  },
  onTapEmptyKeyword(ev) {
    this.setData({keyword:'', isInputText:false, goods:[]});
  }
});