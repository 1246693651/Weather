//index.js
Page({
  data: {
    city: "",
    today: {},
    futher: {}
  },
  //事件处理函数
  onLoad: function(options) {
    console.log('onLoad');
    this.loadInfo();
  },
  loadInfo: function() {
    var page = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(res);
        page.loadCity(latitude, longitude);
      }
    })
  },
  loadCity: function(latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/',
      data: {
        ak: 'X9KPdCyZlDTXlimEplzUDU04izBnfIUZ',
        location: latitude + ',' + longitude,
        output: 'json'
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "");
        page.setData({
          city: city
        });
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function(city){
  }
})