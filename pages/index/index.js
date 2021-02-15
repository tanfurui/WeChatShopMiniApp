import {request} from '../../utils/request.js';
import {mockQuest} from '../../utils/mockQuest.js';
// Page Object
Page({
  data:{
    // 轮播图数组
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  // options(Object)
  onLoad:function(options) {
    this.getSwiperList();
    this.getCateGridList();
    this.getFloorList();
  },
  getSwiperList() {
    mockQuest({url:'WeChat_Index_swiperImgList'})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        console.log('轮播图', result);
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Array]' && resData.length > 0) {
          this.setData({swiperList:resData});
        }
      });
  },
  getCateGridList() {
    mockQuest({url:'WeChat_Index_cateGridList'})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        console.log('分类导航', result);
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Array]' && resData.length > 0) {
          this.setData({cateList:resData});
        }
      });
  },
  getFloorList() {
    mockQuest({url:'WeChat_Index_floorList'})
      .then(result => {
        // 获取业务数据
        let resCode = result['code'], resData = result['data'];
        console.log('楼层列表', result);
        if (resCode === 200 && Object.prototype.toString.call(resData) === '[object Array]' && resData.length > 0) {
          this.setData({floorList:resData});
        }
      });
  }
});