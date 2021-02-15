// app.js
/*
列表渲染 wx:for="{{数组或对象}}" wx:for-item="循环项的名称，默认为item" wx:for-index="循环项的索引，默认为index" wx:key="用来提高列表渲染性能的唯一值，通常使用数据里的键，也可以使用*this"
<view class="navi" wx:for="{{arrList}}" wx:key="id"></view>
<view class="navi" wx:for="{{arrList}}" wx:for-item="mainItem" wx:for-index="mainIndex" wx:key="mainItem.name"></view>
如果只有一层循环，可以省略wx:for-item和wx:for-index
如果渲染的是对象，最好自定义一下wx:for-item和wx:for-index，免得代码产生歧义
<view class="navi" wx:for="{{dataJson}}" wx:for-item="itemValue" wx:for-index="itemName" wx:key="id"></view>
*/
App({
  // onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  // 应用第一次启动时会触发该事件，此时可以获取用户的个人信息
  onLaunch:function(options) {
    console.log('小程序启动，此时可以获取用户个人信息');
  },
  // 小程序被用户看到时触发该事件
  onShow:function(options) {
    console.log('小程序被用户看到，此时可以重置页面效果');
  },
  onHide:function() {
    console.log('小程序被隐藏，此时可以暂停或清除定时器');
  },
  onError:function(err) {
    console.log('JS代码有错误');
    console.log(err);
  },
  // options(path,query,isEntryPage)
  onPageNotFound:function(options) {
    console.log('找不到入口页面');
  }
});