// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    tabs:[
      {id:0, value:'体验问题', isActive:true},
      {id:1, value:'商品、商家投诉', isActive:false}
    ],
    feedbackText:'',
    chooseImgsPath:[]
  },
  onChangeTabsItem(ev) {
    // 获取组件事件参数
    const {index} = ev.detail;
    let {tabs} = this.data;
    tabs.forEach((val, i, self) => i === index ? val.isActive = true : val.isActive = false);
    this.setData({tabs});
  },
  onInputFeedback(ev) {
    this.setData({feedbackText:ev.detail.value});
  },
  onTapChooseImg(ev) {
    wx.chooseImage({
      // 同时选中的图片数量
      count:9,
      // 图片压缩  original原图  compressed压缩
      sizeType:['original', 'compressed'],
      // 图片来源  album相册  camera照相机
      sourceType:['album', 'camera'],
      success:result => {
        console.log('选择的图片', result);
        // 拼接选择的图片的数组
        this.setData({chooseImgsPath:[...this.data.chooseImgsPath, ...result['tempFilePaths']]});
      },
      fail:err => {},
      complete:() => {}
    });
  },
  onTapRemoveImg(ev) {
    const {index} = ev.currentTarget.dataset;
    let {chooseImgsPath} = this.data;
    chooseImgsPath.splice(index, 1);
    this.setData({chooseImgsPath});
  },
  onTapSubmit(ev) {
    // 校验表单
    let {feedbackText, chooseImgsPath} = this.data;
    if (!feedbackText.trim()) {
      wx.showToast({title:'请输入您要反馈的问题', icon:'none', mask:true});
      return;
    }
    if (chooseImgsPath.length > 0) {
      // 暂时不做图片上传功能
      return;
      // 上传图片
      chooseImgsPath.forEach((val, i, self) => {
        wx.uploadFile({
          // 文件上传地址
          url:'',
          // 被上传的文件路径
          filePath:val,
          // 文件的字段名称
          name:'file',
          // 顺带的文本信息
          formData:{},
          success:result => {
            console.log(result);
            let url = JSON.parse(result['data']);
          },
          fail:err => {},
          complete:() => {
            wx.navigateBack({delta:1});
          }
        });
      });
    } else {
      console.log('只提交反馈文本');
      // 返回到上一个页面
      wx.navigateBack({delta:1});
    }
  }
});