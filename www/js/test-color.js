

$(function(){
  // var NewApiRootUrl = 'http://120.132.22.7:8888/xcx/api/';
  var NewApiRootUrl = 'https://wechatmini.giorgioarmanibeauty.cn/xcx/api/';
  var GoodsDetail = NewApiRootUrl + 'makeup/detailInfo';  //获得商品的详情
  var CartTotal = NewApiRootUrl + 'makeup/total'; // 获取购物车 数量
  var CartAdd = NewApiRootUrl + 'makeup/add'; // 添加商品到购物车
  var Collect =  NewApiRootUrl + 'makeup/collect'; // 切换收藏

  var options = {};
  // var carouselList = [] // 轮播
  var detailInfo = {}  // 商品信息
  var imgsinfos = [] // 详情长图
  var specifications = [] // 规格
  var recommendGoods = [] // 推荐商品
  var products = [] // 商品
  // var ecCarouselList = [] // 轮播
  var selectObj = {} // 选中的商品
  var specificationArr = [] // 选中的商品规格 id
  var selectSpecification = [] // 选中的规格 对象
  var total = 0 // 购物车数量
  var prevSale = [] // 预售信息
  var quadCta = false // 是否点击了四宫格
  var openId = ''
  var timer = null;
  var timeMs = 1500;
  var onPhoto = false; // 上传的照片是否在线


  // 获取url 参数
  getOptions();
  console.log(options)

  // 页面初始化
  init();
  
  // 整理页面 传过来的参数
  function getOptions() {
    var strSearch = window.location.search;
    if (strSearch.indexOf('?') != -1) {
      var arrStr = [];
      arr = strSearch.substring(1).split('&')
      for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split('=')[0]
        var value = arr[i].split('=')[1]
        options[key] = value
      }
    }
  }

  function init() {
    getDetails();
    getTotal();
  }

  // 获取详情信息
  function getDetails() {
    // $.ajax({
    //   type: "POST",
    //   url: GoodsDetail,
    //   contentType: "application/json; charset=utf-8",
    //   data: JSON.stringify({
    //     goodsId: options.goodsId,
    //     userId: options.userId
    //   }),
    //   dataType: "json",
    //   success: function(res){
    //     console.log(res, 90909090)
    //     setDom(res);
    //   },
    //   error: function (err) {
    //     console.log(err)
    //   }
    // });
    setTimeout(()=>{
      let res = {"errno":0,"data":{"goodsNumber":383,"goodsBrief":"黑管","id":30092,"proName":"阿玛尼漆光迷情唇釉","goodsDesc":"阿玛尼漆光迷情唇釉","proPrice":310.00,"listImg":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E9%BB%91%E7%AE%A1.jpg","originprice":310.00,"detailPrimaryImg":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E9%BB%91%E7%AE%A1.jpg","detailImgs":["https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%201.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%202.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%203.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%204.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%205.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%206.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%208.jpg","https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E7%B2%BE%E8%87%B4%E5%94%87%E5%A6%86%E6%90%AD%E6%A1%A3.png"],"products":[{"id":30145,"updateTime":"2019-09-03 17:11:00","goodsId":30092,"goodsSpecificationIds":"30193","goodsSn":"W-L8006800U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23402.jpg","goodsNumber":38,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23402.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 402 6ml","productType":0,"isCollect":0},{"id":30153,"updateTime":"2019-08-05 14:44:21","goodsId":30092,"goodsSpecificationIds":"30201","goodsSn":"W-L8050400U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-506.jpg","goodsNumber":1,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-506.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 506 6ml","productType":0,"isCollect":0},{"id":30155,"updateTime":"2019-01-30 15:32:43","goodsId":30092,"goodsSpecificationIds":"30203","goodsSn":"W-L8050600U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-603.jpg","goodsNumber":0,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-603.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 603 6ml","productType":0,"isCollect":0},{"id":30146,"updateTime":"2019-08-22 11:26:24","goodsId":30092,"goodsSpecificationIds":"30194","goodsSn":"W-L8006900U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-201.jpg","goodsNumber":1,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-201.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 201 6ml","productType":0,"isCollect":0},{"id":30147,"updateTime":"2019-09-03 17:13:28","goodsId":30092,"goodsSpecificationIds":"30195","goodsSn":"W-L8007000U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-300.jpg","goodsNumber":8,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-300.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 300 6ml","productType":0,"isCollect":0},{"id":30148,"updateTime":"2019-09-03 17:13:43","goodsId":30092,"goodsSpecificationIds":"30196","goodsSn":"W-L8007100U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23505.jpg","goodsNumber":5,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23505.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 505 6ml","productType":0,"isCollect":0},{"id":30150,"updateTime":"2019-07-26 15:14:47","goodsId":30092,"goodsSpecificationIds":"30198","goodsSn":"W-L8007300U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-504.jpg","goodsNumber":2,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-504.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 504 6ml","productType":0,"isCollect":0},{"id":30151,"updateTime":"2019-09-03 17:03:33","goodsId":30092,"goodsSpecificationIds":"30199","goodsSn":"W-L8007600U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-401.jpg","goodsNumber":14,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-401.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 401 6ml","productType":0,"isCollect":0},{"id":30152,"updateTime":"2019-09-03 17:02:52","goodsId":30092,"goodsSpecificationIds":"30200","goodsSn":"W-L8007700U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23302.jpg","goodsNumber":59,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23302.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 302 6ml","productType":0,"isCollect":0},{"id":30143,"updateTime":"2019-09-03 17:17:17","goodsId":30092,"goodsSpecificationIds":"30190","goodsSn":"W-L8007800U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-200.jpg","goodsNumber":6,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-200.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 200 6ml","productType":0,"isCollect":0},{"id":30144,"updateTime":"2019-09-03 16:55:01","goodsId":30092,"goodsSpecificationIds":"30192","goodsSn":"W-L8007900U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-400.jpg","goodsNumber":75,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-400.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 400 6ml","productType":0,"isCollect":0},{"id":30154,"updateTime":"2019-07-18 10:46:46","goodsId":30092,"goodsSpecificationIds":"30202","goodsSn":"W-L8050500U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-601.jpg","goodsNumber":1,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-601.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 601 6ml","productType":0,"isCollect":0},{"id":30158,"updateTime":"2019-09-03 16:59:36","goodsId":30092,"goodsSpecificationIds":"30206","goodsSn":"W-L9039900U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23500.jpg","goodsNumber":75,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23500.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 500 6ml","productType":0,"isCollect":0},{"id":30156,"updateTime":"2019-08-05 14:43:46","goodsId":30092,"goodsSpecificationIds":"30204","goodsSn":"W-L9040700U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/750X750/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-503.jpg","goodsNumber":39,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/320X320/%E5%94%87%E5%A6%86/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE/%E9%BB%91%E7%AE%A1%E9%80%89%E8%89%B2%E5%9B%BE-503.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 503 6ml","productType":0,"isCollect":0},{"id":30157,"updateTime":"2019-09-03 17:23:13","goodsId":30092,"goodsSpecificationIds":"30205","goodsSn":"W-L9040800U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23501.jpg","goodsNumber":11,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23501.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 501 6ml","productType":0,"isCollect":0},{"id":30149,"updateTime":"2019-08-05 14:43:33","goodsId":30092,"goodsSpecificationIds":"30197","goodsSn":"W-L8007200U","imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-750/%23502.jpg","goodsNumber":48,"retailPrice":310.00,"marketPrice":310.00,"shareUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/GA_0111/%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81500X400/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE%E9%BB%91%E7%AE%A1.jpg","cartUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/0131GAC/%E9%BB%91%E7%AE%A1-320/%23502.jpg","letterState":0,"productName":"阿玛尼漆光迷情唇釉 502 6ml","productType":0,"isCollect":0}],"specifications":[{"name":"色号","value":[{"specification_id":30206,"value":"#500 金闪锦鲤色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-500.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270980589","shadeArray":"{\"color_g\":15,\"color_a\":1,\"gamma\":2.5,\"color_r\":182,\"color_b\":0}","support3D":0},{"specification_id":30192,"value":"#400 阿玛尼红","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-400.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619564","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":116,\"color_b\":0}","support3D":0},{"specification_id":30193,"value":"#402 红橘色调","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-402.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619595","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":176,\"color_b\":0}","support3D":0},{"specification_id":30205,"value":"#501 斩男桃花色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-501.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270980572","shadeArray":"{\"color_g\":41,\"color_a\":1,\"gamma\":2.5,\"color_r\":255,\"color_b\":56}","support3D":0},{"specification_id":30190,"value":"#200","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-200.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619557","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":93,\"color_b\":0}","support3D":0},{"specification_id":30194,"value":"#201","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-201.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619601","shadeArray":"{\"color_g\":7,\"color_a\":1,\"gamma\":2.5,\"color_r\":80,\"color_b\":4}","support3D":0},{"specification_id":30195,"value":"#300","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-300.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619618","shadeArray":"{\"color_g\":30,\"color_a\":1,\"gamma\":2.45,\"color_r\":223,\"color_b\":0}","support3D":0},{"specification_id":30196,"value":"#505 梅子色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-505.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619625","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":155,\"color_b\":18}","support3D":0},{"specification_id":30197,"value":"#502 人鱼姬色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-502.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270619632","shadeArray":"{\"color_g\":12,\"color_a\":1,\"gamma\":2.45,\"color_r\":167,\"color_b\":37}","support3D":0},{"specification_id":30198,"value":"#504","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-504.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270620010","shadeArray":"{\"color_g\":7,\"color_a\":1,\"gamma\":2.5,\"color_r\":157,\"color_b\":57}","support3D":0},{"specification_id":30199,"value":"#401","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-401.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270620041","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":144,\"color_b\":0}","support3D":0},{"specification_id":30200,"value":"#302 星辰锦鲤色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-302.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270620058","shadeArray":"{\"color_g\":21,\"color_a\":1,\"gamma\":2.5,\"color_r\":159,\"color_b\":0}","support3D":0},{"specification_id":30201,"value":"#506","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-506.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270651502","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.45,\"color_r\":206,\"color_b\":62}","support3D":0},{"specification_id":30202,"value":"#601","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-601.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270651519","shadeArray":"{\"color_g\":29,\"color_a\":0.8,\"gamma\":5,\"color_r\":130,\"color_b\":63}","support3D":0},{"specification_id":30203,"value":"#603","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-603.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270651526","shadeArray":"{\"color_g\":0,\"color_a\":1,\"gamma\":2.5,\"color_r\":105,\"color_b\":13}","support3D":0},{"specification_id":30204,"value":"#503 烟熏豆沙色","name":"色号","pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/3%20%E4%BA%A7%E5%93%81%E8%89%B2%E5%8F%B7%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E8%89%B2%E5%8F%B7-%E9%BB%91%E7%AE%A1-503.jpg","is_full_gift":1,"makeupType":1,"upc":"3614270980565","shadeArray":"{\"color_g\":12,\"color_a\":1,\"gamma\":2.5,\"color_r\":153,\"color_b\":22}","support3D":0}]}],"kvImgs":["https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/1%20%E5%94%87%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E9%BB%91%E7%AE%A1.jpg"],"goodsType":1,"isShow":1,"imgsinfos":[{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%201.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%202.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%203.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%204.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%205.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%206.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1PDP-750-1220%208.jpg"},{"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/7-1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E7%B2%BE%E8%87%B4%E5%94%87%E5%A6%86%E6%90%AD%E6%A1%A3.png"}],"goodsListVos":[{"id":30096,"category_id":1005000,"goods_sn":"GACSN007","name":"阿玛尼轻垫精华粉底液","goods_number":351,"keywords":"红垫，红气垫，粉底液，底妆，轻垫","goods_brief":"红气垫","goods_desc":"阿玛尼轻垫精华粉底液","is_on_sale":1,"sort_order":4,"is_delete":0,"counter_price":630.00,"is_new":1,"primary_pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/2%20%E7%B2%89%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E7%BA%A2%E6%B0%94%E5%9E%AB.jpg","list_pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/2%20%E7%B2%89%E5%A6%86/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E7%BA%A2%E6%B0%94%E5%9E%AB.jpg","market_price":630.00,"retail_price":630.00,"cart_num":0,"type":"1"},{"id":30107,"category_id":1005000,"goods_sn":"GACSN017","name":"光钥新肌光润塑颜眼唇乳","goods_number":3,"keywords":"眼唇乳，护肤","goods_brief":"眼唇乳","goods_desc":"光钥新肌光润塑颜眼唇乳","is_on_sale":1,"sort_order":34,"is_delete":0,"counter_price":480.00,"is_new":1,"primary_pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/3%20%E9%BB%91%E9%92%A5%E5%8C%99%E6%8A%A4%E8%82%A4/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E5%85%89%E9%92%A5%E5%8C%99%E7%9C%BC%E5%94%87%E4%B9%B3.jpg","list_pic_url":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/3%20%E5%85%A8%E9%83%A8%E5%95%86%E5%93%81460x460/3%20%E9%BB%91%E9%92%A5%E5%8C%99%E6%8A%A4%E8%82%A4/%E4%BA%A7%E5%93%81%E5%9B%BE-460x460-%E5%85%89%E9%92%A5%E5%8C%99%E7%9C%BC%E5%94%87%E4%B9%B3.jpg","market_price":480.00,"retail_price":480.00,"cart_num":0,"type":"1"}],"letterState":0,"ecCarouselList":[{"id":1016,"sortOrder":1,"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/6.19/PDP/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1%E6%A9%B1%E7%AA%97%E5%9B%BE-1.jpg","type":1,"remarkId":30092},{"id":1017,"sortOrder":2,"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/2%20%E6%A9%B1%E7%AA%97%E8%BD%AE%E6%92%AD%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1%E6%A9%B1%E7%AA%97%E5%9B%BE-2.jpg","type":1,"remarkId":30092},{"id":1018,"sortOrder":3,"imgUrl":"https://gacecminiprogramstorage.blob.core.chinacloudapi.cn/gacpic/gac/pdp/2%20%E6%A9%B1%E7%AA%97%E8%BD%AE%E6%92%AD%E5%9B%BE/1%20%E5%94%87%E5%A6%86%E8%A1%A3%E6%A9%B1/3%20%E9%BB%91%E7%AE%A1/%E9%BB%91%E7%AE%A1%E6%A9%B1%E7%AA%97%E5%9B%BE-3.jpg","type":1,"remarkId":30092}],"makeupType":1,"openId":"oKQ1d5VyF0F_hTwGbfkU2HtjF6Ho"}}
      setDom(res);
    },1)
  }
  // 获取购物车数量
  function getTotal() {
    // $.ajax({
    //   type: "POST",
    //   url: CartTotal,
    //   contentType: "application/json; charset=utf-8",
    //   data: JSON.stringify({
    //     userId: options.userId
    //   }),
    //   dataType: "json",
    //   success: function(res){
    //     total = res.data;
    //     total ? $('#cartNum').text(total).show() : $('#cartNum').hide();
    //   },
    //   error: function (err) {
    //     console.log(err)
    //   }
    // });
    setTimeout(()=>{
      let res = {"errno":0,"data":0,"errmsg":"执行成功"}
      total = res.data;
      total ? $('#cartNum').text(total).show() : $('#cartNum').hide();
    },1)
  }


  function setDom(res) {
    // 请求成功
    if (!+res.errno) {
      detailInfo = res.data;

      specifications = detailInfo.specifications;
      products = detailInfo.products;
      ecCarouselList = detailInfo.ecCarouselList;
      imgsinfos = detailInfo.imgsinfos;
      goodsListVos = detailInfo.goodsListVos;
      prevSale = (detailInfo.message || '').split('，')
      openId = detailInfo.openId;

      // 选中的规格 _ 连接  split 为数组
      if (options.specification_id && options.specification_id !== 'undefined') {
        specificationArr = options.specification_id.split('_');
      } else {
        specificationArr = specifications.length > 1 ? 
          [ specifications[0].value[0].specification_id, specifications[1].value[0].specification_id ]
          :
          [specifications[0].value[0].specification_id];
      }

      // 选中的产品  对象
      for (var i = 0; i< products.length; i++) {
        if (products[i].goodsSpecificationIds == specificationArr.join('_')) {
          selectObj = products[i]
        }
      }
      /* selectObj = products.find(item => {
        return item.goodsSpecificationIds == specificationArr.join('_');
      }) */

      // 选中的 规格 数组  数组 里面是对象   可能  1个  可能两个 跟 specificationArr 对应
      for (var i = 0; i < specificationArr.length; i++) {
        for (var j = 0; j < specifications[i].value.length; j++) {
          if (specifications[i].value[j].specification_id == specificationArr[i]) {
            selectSpecification.push(specifications[i].value[j])
          }
        }
      }
      /* specificationArr.forEach((item, index) => {
        selectSpecification.push(
          specifications[index].value.find(item => {
            return +item.specification_id == +specificationArr[index];
          })
        )
      }) */

      // 初始化 试色框架
      initTestColorFrame();

      // 渲染 DOM页面  只有单规格 ，不能出现双规格 试装
      // 渲染 选中内容
      $('.title-wrapper .title').text('选择'+ specifications[0].name +'：' +selectSpecification[0].value)

      // 渲染规格
      var $chooseList = $('.choose-list');
      for(var i = 0; i < specifications[0].value.length; i++) {
        // data-id="'+UPC[i]+'"\
        var specificationItem = specifications[0].value[i];
        var $str = $('<div class="temp-wrap '+ ( specificationItem.specification_id == specificationArr[0] ? 'active' : '' ) +'"\
                      data-specification_id="'+ specificationItem.specification_id +'"\
                      <div class="temp-wrap-inner">\
                        <img class="" src="'+ specificationItem.pic_url +'"></img>\
                      </div>\
                    </div>');
        $chooseList.append($str);
      }
      // 渲染 预售信息
      if (detailInfo.isPresell) {
        $('.prev-sale .des span').eq(0).text(prevSale[0]).siblings().text(prevSale[1])
      }
      // 渲染 底部信息
      setBottomDom();
      
      // 在线试色 点击
      $('#live').off('click').on('click', function() {
        if (!specificationArr.length) {
          $('#normal-err-msg').text('未选中商品，请选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
          return;
        }
        /* if (options.platform == 'android') {
          // 如果是android机，直接web-view 进行 3D试色
          MF_CHANNEL_PARENT.send({ 
            event: 'mode_change',
            data: {
              mode: 'live'
            }
          }, 'mf_ppa_frame');
          $('#mf_container').removeClass('none')
          $('.position-frame').addClass('none');
          return;
        } */
        var goodsId = selectObj.goodsId
        var goodsSpecificationIds = selectObj.goodsSpecificationIds
        wx.miniProgram.navigateTo({
          url: '/package3DColor/pages/3DhaveColor/3DhaveColor?id='+goodsId+'&specification_id='+goodsSpecificationIds
        })
      })
      
      // 上传图片点击
      // helper functions
      $('#upload_button').off('click').on('click', function() {
        // $('#error-img').addClass('none');
        $('#upload').trigger('click')
      })
      $('#upload_button').on('dragover', function(e) {
        e.preventDefault();
      })
      $('#upload_button').on('drop', function(e) {
        e.preventDefault();
        $('#upload')[0].files = e.originalEvent.dataTransfer.files;
      })
      $('#upload').off('change').on('change', function() {
        // $('#error-img').addClass('none');
        if(this.value===''){
          return;
        }
        var file = this.files[0];
        // convert to base64
        var reader = new FileReader();
        reader.onload = function () {
          $('#error-img').attr('src', reader.result)
          MF_CHANNEL_PARENT.send({
            event: 'mode_change',
            data: {
              mode: 'upload',
              img: reader.result
            }
          }, 'mf_ppa_frame');
          $('#mf_container').removeClass('none')
          $('.position-frame').addClass('none');
          onPhoto = true;
          console.log('埋点2D试色sku')
        };
        reader.readAsDataURL(file);
        // 重置 图片value 为空 ，传同一张图片两次 监测不到change
        this.value = '';
        // 四宫格状态重置为false
        quadCta = false;
      })
      
      // 选中规格切换
      $('.temp-wrap').off('click').on('click', function() {
        var specification_id = $(this).data('specification_id');
        if (specificationArr[0] == specification_id) {
          // 如果当前是四宫格状态 点击选中 按钮无反应
          if (quadCta) {
            return;
          }
          // 如果点击的是当前选中的规格
          // 试色 取消当前换色 并且清空选中规格和内容
          MF_CHANNEL_PARENT.send({
            event: 'upc_change',
            data: {
              remove: true
            }
          }, 'mf_ppa_frame');
          $(this).removeClass('active');
          // 处理逻辑  补充
          specificationArr = [];
          selectObj = {};
          selectSpecification = [];
          $('.title-wrapper .title').text('选择'+ specifications[0].name +'：')
          // 切换规格后 重新渲染底部信息
          $('.collect img').eq(0).show().siblings().hide();
          $('.collect-text').text('收藏')
          // 普通按钮 还是 特殊按钮
          if (detailInfo.isPresell) {
            $('.right .prev-sale').show().siblings().hide();
          } else {
            $('.right .prev-sale').hide().siblings().show();
          }
          // 售罄 还是 立即购买
          // $('.buy-now div').eq(0).show().siblings().hide();
          $('.buy-now .buy').show().siblings().hide();

          return;
        }

        $(this).addClass('active').siblings().removeClass('active');

        specificationArr[0] = specification_id;
        
        /* let selectObj = products.find(item => {
          return item.goodsSpecificationIds == specificationArr.join('_');
        }) */
        // 选中的产品  对象
        for (var i = 0; i< products.length; i++) {
          if (products[i].goodsSpecificationIds == specificationArr.join('_')) {
            selectObj = products[i]
          }
        }
        
        // 选中的 规格 数组  数组 里面是对象   可能  1个  可能两个 跟 specificationArr 对应
        selectSpecification = [];
        for (var i = 0; i < specificationArr.length; i++) {
          for (var j = 0; j < specifications[i].value.length; j++) {
            if (specifications[i].value[j].specification_id == specificationArr[i]) {
              selectSpecification.push(specifications[i].value[j])
            }
          }
        }
        // 如果是 不支持 3D试色，去掉实时试色 按钮
        if (!selectSpecification[0].support3D) {
          // 如果不支持试色，则去掉实时试色按钮
          // $('#live').remove();
          $('#live').addClass('none')
          $('.btn-wrapper').addClass('only-one')
        } else {
          $('#live').removeClass('none')
          $('.btn-wrapper').removeClass('only-one')
          // $('.btn-wrapper').append($('<div id="live">实时试色</div>'))
        }
        $('.btn-wrapper').removeClass('none')
        // 渲染 DOM页面  只有单规格 ，不能出现双规格 试装
        // 渲染 选中内容 选中的信息 value
        $('.title-wrapper .title').text('选择'+ specifications[0].name +'：' +selectSpecification[0].value)


        // 切换规格后 重新渲染底部信息
        setBottomDom();

        // 试色 换内容
        MF_CHANNEL_PARENT.send({
          event: 'upc_change',
          data: {
            // upc: "3614271385703", // 兰蔻
            // upc: '3605521677365', // 阿玛尼
            upc: selectSpecification[0].upc,
            shadeName : '阿玛尼 ' + detailInfo.goodsBrief, // 色号
            prodName: selectSpecification[0].value, // 色号
            // upcUrl: '',
            eventType: 'click',
            // upcParams: {}
          }
         }, 'mf_ppa_frame');
         if (onPhoto) {
         }
      })

      // 加入购物车 点击
      $('.add-cart').off('click').on('click', function () {
        if (!specificationArr.length) {
          $('#normal-err-msg').text('未选中商品，请选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
          return;
        }
        if ( selectObj.goodsNumber <= 0 ) {
          $('#normal-err-msg').text('所选商品已售罄，请重新选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
        } else {
          add();
        }
      })
      // 立即购买 点击
      $('.buy').off('click').on('click', function() {
        if (!specificationArr.length) {
          $('#normal-err-msg').text('未选中商品，请选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
          return;
        }
        if ( selectObj.goodsNumber <= 0 ) {
          $('#normal-err-msg').text('所选商品已售罄，请重新选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
        } else {
          if (detailInfo.isPresell) {
            // 如果是预售 + 小胖丁 立即购买  直接跳转 到 结算页面
            let data = {
              checkedGoods: [{
                productId: selectObj.id,
                retail_price: selectObj.retailPrice,
                number: 1
              }],
              checkCouponGift: [],
              checkMoneyGift: []
            }
            console.log(JSON.stringify(data), 898989)
            // tar_event, tar_token, tar_oid, tar_key, app_url
            wx.miniProgram.navigateTo({
              url: '/pages/shopping/checkout/checkout?type=1&originType=h5&data=' + JSON.stringify(data)
            })
            return;
          }
          // 如果是普通商品 立即购买 加入购物车  跳转到 购物车 页面
          add(1);
        }
      })

      // 点击弹窗关闭按钮
      /* $('#error_close').on('click', function() {
        $('#error_popup, #mf_container').addClass('none');
      }) */

      // 跳转小程序首页
      $('.go-index').off('click').on('click', function() {
        wx.miniProgram.switchTab({
          url: '/pages/index/index'
        });
      })
      // 跳转小程序购物车
      $('.cart').off('click').on('click', function() {
        wx.miniProgram.switchTab({
          url: '/pages/cart/cart'
        });
      })
      // 切换收藏
      $('.collect').off('click').on('click', function() {
        if (!specificationArr.length) {
          $('#normal-err-msg').text('未选中商品，请选择');
          $('.normal-pop').show().removeClass('add-icon');
          timer && clearTimeout(timer)
          timer = setTimeout(function() {
            $('.normal-pop').hide();
          }, timeMs)
          return;
        }
        $.ajax({
          type: "POST",
          url: Collect,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({
            userId: options.userId,
            productId: selectObj.id,
            isCollect: +selectObj.isCollect ? 0 : 1  // 1收藏，0 不收藏
          }),
          dataType: "json",
          success: function(res){
            if (res.errno === 0) {
              $('#normal-err-msg').text(+selectObj.isCollect ? '取消收藏成功' : '收藏成功');
              $('.normal-pop').show().addClass('add-icon');
              timer && clearTimeout(timer)
              timer = setTimeout(function() {
                $('.normal-pop').hide();
              }, timeMs)
              /* $(products).each(function(index, item){
                if (+item.id === +selectObj.id) {
                  item.isCollect = +item.isCollect ? 0 : 1
                }
              }) */
              selectObj.isCollect = +selectObj.isCollect ? 0 : 1;
              // 收藏
              if (!selectObj.isCollect) {
                $('.collect img').eq(0).show().siblings().hide();
              } else {
                $('.collect img').eq(1).show().siblings().hide();
              }
              $('.collect-text').text( selectObj.isCollect ? '已收藏' : '收藏')
            }
          },
          error: function (err) {
            console.log(err)
          }
        });
      })
      // 下载关闭按钮
      $('#down-img-wrapper .close').off('click').on('click', function() {
        $('.iframe-wrapper').removeClass('none');
        $('#down-img-wrapper').addClass('none');
      })
    }

    // 渲染底部DOM结构
    function setBottomDom() {
      // 收藏
      if (!selectObj.isCollect) {
        $('.collect img').eq(0).show().siblings().hide();
      } else {
        $('.collect img').eq(1).show().siblings().hide();
      }
      $('.collect-text').text( selectObj.isCollect ? '已收藏' : '收藏')

      // 普通按钮 还是 特殊按钮
      if (detailInfo.isPresell) {
        $('.right .prev-sale').show().siblings().hide();
      } else {
        $('.right .prev-sale').hide().siblings().show();
      }
      // 售罄 还是 立即购买
      if (selectObj.goodsNumber > 0) {
        // $('.buy-now div').eq(0).show().siblings().hide();
        $('.buy-now .buy').show().siblings().hide();
      } else {
        // $('.buy-now div').eq(1).show().siblings().hide();
        $('.buy-now .buy').hide().siblings().show();
      }
    }
    // 加入购物车请求
    function add(type = 0) {
      /* wx.showLoading({
        title: '添加中',
      }) */
      let apiObj = {
        userId: options.userId,
        goodsSn: selectObj.goodsSn,
        goodsDiyCard: '',
        goodsDiyPack: ''
      }
      // type =1 时 ，点击 立即购买 加入购物车，购物车 当前商品 选中，其他 不选中
      if (type) {
        apiObj.type = type;
      }
      $.ajax({
        type: "POST",
        url: CartAdd,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(apiObj),
        dataType: "json",
        success: function(res){
          if (res.errno === 0) {
            // 埋点
            // tar_event, tar_token, tar_oid, tar_key, app_url
            /* wx.showToast({
              icon: 'success',
              title: '添加购物车成功'
            }); */
            $('#normal-err-msg').text('添加购物车成功');
            $('.normal-pop').show().addClass('add-icon');
            timer && clearTimeout(timer)
            timer = setTimeout(function() {
              $('.normal-pop').hide();
            }, timeMs)
            total++;
            total ? $('#cartNum').text(total).show() : $('#cartNum').hide();
            // 如果是立即购买 添加购物车，添加成功后，直接跳到购物车页面
            if (type) {
              wx.miniProgram.switchTab({
                url: '/pages/cart/cart' //直接购买成功后跳转到购物车 页面
              });
            }
          }
        },
        error: function (err) {
          console.log(err)
        }
      });
    }
  }

  function initTestColorFrame() {
    var upcList = [];
    $(specifications[0].value).each(function (index, item) {
      upcList.push(item.upc)
    })
    // 初始化试色
    MF_CHANNEL_PARENT.addFrame({
      frameName : 'mf_ppa_frame',
      divId : 'mf_container',
      zIndex : '22',
      // publisherId : '5c2d01f092bf1f112b6e19978c434eca', // 开发环境
      // publisherId: '6a2bc58cbd05a1160917c0ae7125cac2',  // 兰蔻
      publisherId: '01d89b4deeeee1090a81f5d126aa0570', // 阿玛尼
      category : 'lipcolor',
      selectedUpc : {
        upc: selectSpecification[0].upc,
        shadeName : '阿玛尼 ' + detailInfo.goodsBrief, // 色号
        prodName: selectSpecification[0].value, // 色号
        // upcUrl : '新菁纯柔润丝绒唇膏'
      },
      upcList : upcList,
      country : "CN",
      cmsCountry : "GLOBAL",
      language : "zh",
      text: {
        "shareButton": "分享",
        "shareLabel": "分享",
        "adjustTitleLips": "调整您的唇部试色范围",
        "adjustTitleLeftEye": "调整您的左眼部试色范围",
        "adjustTitleRightEye": "调整您的右眼部试色范围",
        "adjustTextMouthOpened": "图像是否已张嘴？",
        "adjustTextMouthClosed": "图像是否未张嘴？",
        "adjustButtonResetDots": "重置调整",
        "adjustButtonSave": "确认调整",
        "adjustButtonCancel": "取消调整",
        "shareCopy": { 
          "twitter": { 
            "body": { 
              "appendShadeName": true
            }
          },
          "pinterest": {
            "body": {
              "appendShadeName": true
            }
          },
          "facebook": {
            "body": {
              "appendShadeName": true
            },
            "title": {
              "appendShadeName": true
            }
          },
          "download": {
            "fileName": {
              "appendShadeName": true,
              "text": "armani_ar"
            }
          }
        },
        'iosDownloadPopupInstText': '长按图片存储图像'
      },
      // shareURL: 'https://www.baidu.com',
      // shareCaptureCount: 3,
      useStandardTaggingPlan: false,
      uxWrapper: false,
      service: 'wechat'
    });

    // listeners
    MF_CHANNEL_PARENT.listen('exit', function(){
      quadCta = false
      $('#mf_container').addClass('none');
      $('.position-frame').removeClass('none');
      $('#error-img').addClass('none');
    });
    window.onmessage = (a=>console.log(1111111111111,a))
    MF_CHANNEL_PARENT.listen('frame_ready', function(data){
      console.log("frame_ready");
      // 上传图片 + 在线试色   选择色号 按钮 都显示
      $('#iframe_loader').addClass('none');
      $('.position-frame, .goods-choose, .bottom').removeClass('none');
      // 是否 显示 在线试色按钮
      if(data.tryOnSupport) {
        if(data.liveModeSupport){
          // show live and upload buttons
          // $('#live').removeClass('none')
        } else {
          // show upload button
          // $('#live').addClass('none')
          // $('#live').remove();
        }
        if (!selectSpecification[0].support3D) {
          // 如果不支持试色，则去掉实时试色按钮
          // $('#live').remove();
          $('#live').addClass('none')
          $('.btn-wrapper').addClass('only-one')
        }
        $('.btn-wrapper').removeClass('none')
      } else { // try-on iFrame doesn’t support UPCs from this product page
        // hide try-on buttons and deactivate function calls i.e. upc_change
      }
    });
    MF_CHANNEL_PARENT.listen('error', function(data){
      var error_message_title = "";
      var error_message_content = "";
      var error_button = "";
      var click_fcn = function() {
        $('#upload').trigger('click');
        $('#error_popup').addClass('none');
        $('#error-img').addClass('none');
      };
      switch(data.error) {
        case "large_dimension":
          // alert("IMAGE DIMENSION IS TOO LARGE, Please try a smaller image.");
          error_message_title = '图像尺寸太大';
          error_message_content = '请尝试较小的图像.';
          error_button = "重新上传";
          onPhoto = false;
          break;
        case "large_file":
          // alert("FILE SIZE IS TOO LARGE, Please upload an image no larger than 20 MB.");
          error_message_title = '文件太大';
          error_message_content = '请上传不超过20MB的图片.';
          error_button = "重新上传";
          onPhoto = false;
          break;
        case "incompatible_file":
          // alert("INCOMPATIBLE FILE, Please select an image with an extension of .jpg, .jpeg, or .png.");
          error_message_title = '不兼容的文件类型';
          error_message_content = '请选择图片文件，格式包含.jpg, .jpeg, or .png.';
          error_button = "重新上传";
          onPhoto = false;
          break;
        case "no_face":
          // alert("NO FACE DETECTED, Please try another image.");
          error_message_title = '没有检测到面部特征';
          error_message_content = '请更换其他面部图片重试';
          error_button = "重新上传";
          onPhoto = false;
          break;
        case "upc_unavailable":
          error_message_title = "选择的色号 (" + data.shadeName + ") 暂不支持试妆";
          // error_message_content = '请换一张图片，重新尝试.';
          error_button = "知道了";
          click_fcn = function() {
            $('#error_popup').addClass('none');
          };
          break;
        case "webcam_unavailable":
          // alert("webcam unavailable");
          error_message_title = "摄像头不可用";
          error_button = "知道了";
          click_fcn = function() {
            $('#error_popup').addClass('none');
          };
          break;
        case "invalid_custom_look":
          error_message = "自定义错误: " + data.errorDetail;
          if(data.errorDetail === "invalid_product") {
              error_message += "<br>";
              error_message += data.errorData.category + ":" + data.errorData.upc + ":" + data.errorData.colorId;
          } else if(data.errorDetail === "invalid_placement") {
              error_message += "<br>";
              error_message += data.errorData.category + ":" + data.errorData.upc + ":" + data.errorData.colorId + ":" + data.errorData.placement;
          } 
          error_button = "知道了";
          click_fcn = function() {
            $('#error_popup').addClass('none');
          };
          break;
      }
      // hide iframe
      $('#mf_container').addClass('none');
      $('.position-frame').removeClass('none');
      // show error message
      $('#error_message').html('');
      if (error_message_title) {
        $('#error_message').append($('<p class="title">'+ error_message_title +'</p>'))
      }
      if (error_message_content) {
        $('#error_message').append($('<p class="title">'+ error_message_content +'</p>'))
      }
      // $('#error_message')[0].innerHTML = error_message;
      $('#error_button')[0].innerHTML = error_button;
      $('#error_button').off('click').on('click', click_fcn)
      $('#error_popup').removeClass('none');
      // 如果有的话，隐藏小弹窗
      $('.normal-pop').hide();
      timer && clearTimeout(timer)
      if (error_message_title == '没有检测到面部特征') {
        $('#error-img').removeClass('none');
      } else {
        $('#error-img').addClass('none');
      } 
    });
    // 点击下载 进行图片下载
    MF_CHANNEL_PARENT.listen('send_image_data', function(data){
      // save the base64 data as image file, eventType can be share or star
      var base64Image = data.img;
      var eventType = data.tag;
      var imgType = data.imgType; //can be ‘quad’ or ‘single’
      var upc = data.upc; //can be undefined;
      // display the brand’s social sharing icons in the designated location
      // console.log(imgType, base64Image, 909090)
      $('.down-img').attr('src', base64Image);
      $('.iframe-wrapper').addClass('none');
      $('#down-img-wrapper').removeClass('none');
      /* wx.downloadImage({
        serverId: base64Image, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var localId = res.localId; // 返回图片下载后的本地ID
        }
      }); */
      // download(base64Image)
      /* wx.miniProgram.postMessage({
        data: {
          imgType: imgType,
          base64Image: base64Image
        }
      }) */
    });
    if(!window.useStandardTaggingPlan) {
      MF_CHANNEL_PARENT.listen('event_tracking', function(data){
        console.log('event_tracking data',data, data.trackingType, 89898);
        switch(data.trackingType) {
          case 'exitCta':
            onPhoto = false;
            quadCta = false
            // X号按钮
            break;
          case 'adjustCta':
            quadCta = false
            // 调整唇部按钮
            break;
          case 'quadCta':
            quadCta = true
            // 四宫格按钮
            break;
          case 'compareCta':
            quadCta = false
            // 色号对比
            break;
          case 'shareCta':
            // 右方 下载
            break;
          case 'shareDownload':
            // 长条下载按钮
            break;
          case 'backCta':
            // 《 四宫格返回按钮
            quadCta = false
            break;
          case 'exitCta':
            // X号按钮
            break;
          case 'exitCta':
            // X号按钮
            break;
          case 'exitCta':
            // X号按钮
            break;
          case 'exitCta':
            // X号按钮
            break;
          case 'exitCta':
            // X号按钮
            break;
          case 'exitCta':
            // X号按钮
            break;
          default:
            break;
        }
      });
    }
  }
})