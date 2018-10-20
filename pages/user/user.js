const app = getApp();
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    messageArray:[],
    unreadQuantity:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    wx.request({
      method:'POST',
      url: app.globalData.requestUrl+'/sm/message/all',
      data:{
        currentPage:1,
        pageSize:20
      },
      header:{'cookie':wx.getStorageSync('requestSession')},
      success:res=>{
        if(res.data.status === 0){
          this.setData({
            messageArray:res.data.data.data
          });
          let quantity = 0;
          for(let i of this.data.messageArray){
            if(i.status === '未读'){
              quantity++;
            }
          }
          this.setData({
            unreadQuantity: quantity
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})