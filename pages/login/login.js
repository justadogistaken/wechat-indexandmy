//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    password:'',
    stuNumber:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // wx.login({
    //   success: res=>{
    //     console.log(res)
    //   }
    // });

    // if (app.globalData.userInfo) {
    //   console.log("has")
    //   wx.checkSession({
    //     success: res => {
    //       wx.getUserInfo({
    //         success: res => {
    //           app.globalData.userInfo = res.userInfo
    //           console.log(res)
    //         }
    //       })
    //       wx.navigateTo({
    //         url: '../index/index',
    //       })
    //     }
    //   })
    // } 
    if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("user")
      app.userInfoReadyCallback = res => {
        console.log("callBack")
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.getStorage({
          key: 'loginsuccess',
          success: function(res) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          },
        })
        
      }
    } 
    // else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       // this.setData({
    //       //   userInfo: res.userInfo,
    //       //   hasUserInfo: true
    //       // })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
    this.login()
  },
  login: function(){
    wx.request({
      method:'POST',
      url: app.globalData.requestUrl +'/sm/login-test',
      data:{
        username:this.stuNumber,
        password:this.password
      },
      success:res=>{
        if(res.data.status === 0){
          // wx.navigateTo({
          //   url: '../index/index',
          // })
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.setStorage({
            key: 'loginsuccess',
            data: true,
          })
          console.log(res.header)
          let session = res.header["Set-Cookie"];
          session = session.substring(0, session.indexOf(';'))
          console.log(session)
          // wx.setStorage({
          //   key: 'requestSession',
          //   data: session,
          // })
          wx.setStorageSync('requestSession', session)
        }
        else{
          this.setData({
            password:'',
            stuNumber:''
          })
          wx.showToast({
            title: '账号或密码错误',
            duration:3000,
            mask:true
          })
        }
      }
    })
  },
  pwdInput: function(pwd){
    this.password = pwd.detail.value;
  },
  numberInput: function(num){
    this.stuNumber = num.detail.value;
  }
})
