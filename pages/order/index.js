// pages/order/index.js
import {mockQuest} from '../../utils/mockQuest.js';// export const mockQuest = params => {}
Page({
  data:{
    tabs:[
      {id:0, value:'全部', isActive:true},
      {id:1, value:'待付款', isActive:false},
      {id:2, value:'待发货', isActive:false},
      {id:3, value:'退款/退货', isActive:false}
    ],
    orderList:[]
  },
  onShow:function() {
    let pages = getCurrentPages(), options = pages[pages.length - 1]['options'];
    console.log(parseInt(options['type']));
    this.changeTabByIndex(parseInt(options['type']));
  },
  onChangeTabsItem(ev) {
    // 获取组件事件参数
    const {index} = ev.detail;
    this.changeTabByIndex(index);
  },
  changeTabByIndex(index) {
    let {tabs} = this.data;
    tabs.forEach((val, i, self) => i === index ? val.isActive = true : val.isActive = false);
    this.setData({tabs});
    this.queryOrder(index);
  },
  queryOrder(type) {
    this.setData({orderList:[]});
    let params = {type:type};
    mockQuest({url:'WeChat_Goods_getOrderList', data:params})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Array]' && resData.length > 0) {
          console.log('orderList', resData);
          this.setData({orderList:resData});
        }
      })
      .catch(err => {
        //
      });
  }
});