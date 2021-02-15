// pages/goods_list/index.js
import {mockQuest} from '../../utils/mockQuest.js';// export const mockQuest = params => {}
Page({
  data:{
    tabs:[
      {id:0, value:'综合', isActive:true},
      {id:1, value:'销量', isActive:false},
      {id:2, value:'价格', isActive:false}
    ],
    catId:0,
    keyword:'',
    goodsList:[],
    elePager:{curPage:1, pageSize:10, totalRows:0}
  },
  onLoad:function(options) {
    // 获取URL参数
    console.log('URL参数', options);// {catId:5}
    this.setData({'elePager.curPage':1, catId:parseInt(options['cat_id'])});
    this.searchGoodsList();
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.setData({goodsList:[], 'elePager.curPage':1});
    this.searchGoodsList();
  },
  // 页面触底事件
  onReachBottom() {
    console.log('页面触底了');
    this.setData({'elePager.curPage':this.data.elePager.curPage + 1});
    this.searchGoodsList();
  },
  // 分页加载数据的逻辑：页面加载时，直接请求数据。点击搜索按钮时，重置页码为1，然后请求数据。跳转到指定页码时，更新到目标页码，然后请求数据。修改每页条数时，重置页码为1，重置每页条数为目标数值，然后请求数据。
  searchGoodsList() {
    let params = {keyword:this.data.keyword, curPage:this.data.elePager.curPage, pageSize:this.data.elePager.pageSize, catId:this.data.catId};
    mockQuest({url:'WeChat_Goods_searchGoodsList', data:params})
      .then(result => {
        wx.stopPullDownRefresh();// 收起下拉刷新组件
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Object]' && JSON.stringify(resData) !== '{}') {
          console.log('resData', resData);
          if (Object.prototype.toString.call(resData['goods']) === '[object Array]' && resData['goods'].length > 0) {
            // 追加商品到页面
            this.setData({goodsList:[...this.data.goodsList, ...resData['goods']], 'elePager.totalRows':resData['totalRows']});
          } else {
            this.setData({'elePager.curPage':resData['curPage'] - 1, 'elePager.totalRows':0});
            wx.showToast({title:'没有更多数据了'});
          }
        }
      })
      .catch(err => {
        wx.stopPullDownRefresh();
      });
  },
  onChangeTabsItem(ev) {
    // 获取组件事件参数
    const {index} = ev.detail;
    let {tabs} = this.data;
    tabs.forEach((val, i, self) => i === index ? val.isActive = true : val.isActive = false);
    this.setData({tabs});
  }
});