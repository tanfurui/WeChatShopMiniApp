import mockData from './mockData.json.js';// export default {}

let mockAjaxTimes = 0;
export const mockQuest = params => {
  mockAjaxTimes++;
  // 显示Loading
  wx.showLoading({title:'正在加载', mask:true});
  let result = {code:200, msg:'请求成功', data:null}, url = params['url'].toString(), data = params['data'] || null;
  if (url.indexOf('WeChat_Index_swiperImgList') > -1) {
    result.data = [
      {goods_id:1, image_src:'https://img.alicdn.com/imgextra/i2/189/O1CN01sQ6YZg1DGbTqhwNQh_!!189-0-luban.jpg'},
      {goods_id:2, image_src:'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'},
      {goods_id:3, image_src:'https://aecpm.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg'},
      {goods_id:4, image_src:'https://img.alicdn.com/imgextra/i1/121/O1CN01XpbGnY1ClSY34QqKv_!!121-0-luban.jpg'},
      {goods_id:5, image_src:'https://gw.alicdn.com/imgextra/i1/148/O1CN01CTcmXa1CxpExx1O8q_!!148-0-lubanu.jpg'}
    ];
  }
  if (url.indexOf('WeChat_Index_cateGridList') > -1) {
    result.data = [
      {name:'分类', image_src:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png', open_type:'switchTab', navigator_url:'/pages/category/'},
      {name:'秒杀拍', image_src:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/143365/25/1824/3716/5efbf3c0E5175e1fb/88f6227257a29f1d.png', open_type:'switchTab', navigator_url:'/pages/category/'},
      {name:'超市购', image_src:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png', open_type:'switchTab', navigator_url:'/pages/category/'},
      {name:'母婴品', image_src:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png', open_type:'switchTab', navigator_url:'/pages/category/'}
    ];
  }
  if (url.indexOf('WeChat_Index_floorList') > -1) {
    result.data = mockData.indexFloorList;
  }
  if (url.indexOf('WeChat_Index_categoryList') > -1) {
    result.data = {
      productCategoryLeftmenuList:mockData.productCategoryLeftmenuList,
      productCategoryList:mockData.productCategoryList
    };
  }
  if (url.indexOf('WeChat_Goods_searchGoodsList') > -1) {
    let keyword = data['keyword'], curPage = data['curPage'], pageSize = data['pageSize'], catId = data['catId'];
    let startRow = (curPage - 1) * pageSize + 1, endRow = curPage * pageSize;
    let goods = mockData.goods;
    let returnGoods = [];
    for (let i = startRow; i <= endRow; i++) {
      if (i <= goods.length) {
        returnGoods.push(goods[i - 1]);
      }
    }
    console.log('后端接收到的参数：关键字', keyword, 'curPage', curPage, 'pageSize', pageSize, 'catId', catId);
    result.data = {
      goods:returnGoods,
      curPage:curPage,
      pageSize:pageSize,
      totalRows:goods.length
    };
  }
  if (url.indexOf('WeChat_Goods_getGoodsDetail') > -1) {
    let goodsId = parseInt(data['goods_id']), goodsSelect = mockData.goods.filter((val, i) => {return val['goods_id'] === goodsId;}), goodsInfo = goodsSelect ? goodsSelect[0] : {};
    result.data = {
      goods_id:goodsInfo['goods_id'],
      cat_id:goodsInfo['cat_id'],
      goods_title:goodsInfo['goods_title'],
      goods_price:goodsInfo['goods_price'],
      goods_number:goodsInfo['goods_number'],
      goods_weight:100,
      goods_introduce:'<div moduleid="R0503002_3" modulename="商品详情"><p><img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/cvtkJQ8WSDsc0Xmm-Xa-0A.jpg" alt="55M9S_01" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/pQlSo7x5lEt7UR_GOKAewg.jpg" alt="55M9S_02" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/QBhHQ5blUsGJxHt3nEO7Eg.jpg" alt="55M9S_03" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/8E6MugsF8s3txSd4SqsBQQ.jpg" alt="55M9S_04" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/kEHcXcWTa2SpR3wH21xGXg.jpg" alt="55M9S_05" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/zYBxtl3SM7zwuLmci_E1aQ.jpg" alt="55M9S_06" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/aAi94asSMF6ETL7dWe9EnA.jpg" alt="55M9S_07" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/BTSeru6GdX3Tno0bnsFK7w.jpg" alt="55M9S_08" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/14xjSnPKw6VPk5-oBoaImQ.jpg" alt="55M9S_09" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/s_1dRvNniAx8702p8Pzwew.jpg" alt="55M9S_12" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/wMV5wtD6rF9i7l5JISvjsQ.jpg" alt="55M9S_13" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/nlu9d2DfUkzuEG1t14DgUA.jpg" alt="55M9S_14" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/YWwicYjYLqIdA0hjmIrWJg.jpg" alt="55M9S_15" style="display: block; width: 100%; height: auto;"> <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/vtBZk7-8HvebDi_Z_1t0hQ.jpg" alt="55M9S_16" style="display: block; width: 100%; height: auto;"></p></div>',
      goods_big_img:goodsInfo['goods_small_img'],
      goods_small_img:goodsInfo['goods_small_img'],
      goods_state:'',
      is_del:0,
      create_time:1516509864,
      update_time:1516509864,
      delete_time:null,
      cat_one_id:1,
      cat_two_id:3,
      cat_three_id:5,
      goods_cat:'1,3,5',
      imgs:[
        {img_id:180132, goods_id:goodsId, goods_big_img:goodsInfo['goods_small_img'], goods_middle_img:goodsInfo['goods_small_img'], goods_small_img:goodsInfo['goods_small_img']},
        {img_id:180133, goods_id:goodsId, goods_big_img:goodsInfo['goods_small_img'], goods_middle_img:goodsInfo['goods_small_img'], goods_small_img:goodsInfo['goods_small_img']},
        {img_id:180134, goods_id:goodsId, goods_big_img:goodsInfo['goods_small_img'], goods_middle_img:goodsInfo['goods_small_img'], goods_small_img:goodsInfo['goods_small_img']},
        {img_id:180135, goods_id:goodsId, goods_big_img:goodsInfo['goods_small_img'], goods_middle_img:goodsInfo['goods_small_img'], goods_small_img:goodsInfo['goods_small_img']},
        {img_id:180136, goods_id:goodsId, goods_big_img:goodsInfo['goods_small_img'], goods_middle_img:goodsInfo['goods_small_img'], goods_small_img:goodsInfo['goods_small_img']}
      ]
    };
  }
  if (url.indexOf('WeChat_Goods_getOrderList') > -1) {
    let type = parseInt(data['type']);
    let orders = [
      {type:1, order_number:'HMDD20190812000000001104', order_price:13618, create_time:1565616985},
      {type:1, order_number:'HMDD20190809000000001069', order_price:6809, create_time:1565348879},
      {type:2, order_number:'HMDD20190809000000001068', order_price:4699, create_time:1565347865},
      {type:2, order_number:'HMDD20190809000000001067', order_price:6809, create_time:1565347820},
      {type:3, order_number:'HMDD20190809000000001066', order_price:6809, create_time:1565347381}
    ];
    result.data = type === 0 ? orders : orders.filter((val, i) => {return val['type'] === type;});
  }
  if (url.indexOf('WeChat_Goods_quickSearch') > -1) {
    let keyword = data['keyword'];
    let goods = mockData.goods;
    result.data = goods.filter(val => val['goods_title'].indexOf(keyword) > -1);
  }
  return new Promise((resolve, reject) => {
    // 模拟真实的网络请求效果，随机1-4秒返回数据 Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      resolve(result);
      mockAjaxTimes--;
      if (mockAjaxTimes === 0) {
        // 隐藏Loading
        wx.hideLoading();
      }
    }, 1000 * Math.floor(Math.random() * (3 - 1 + 1) + 1));
  });
};