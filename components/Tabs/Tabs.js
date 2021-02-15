// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties:{tabs:{type:Array, value:[]}},

  /**
   * 组件的初始数据
   */
  data:{},

  /**
   * 组件的方法列表
   */
  methods:{
    onTapItem(ev) {
      // 获取元素属性
      const {index} = ev.currentTarget.dataset;
      // 向父组件传递事件
      this.triggerEvent('ChangeTabsItem', {index});
    }
  }
});