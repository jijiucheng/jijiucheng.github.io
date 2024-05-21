// 获取导航数据
// fetch('../_data/navigation.json')
//   .then(res => res.json())
//   .then(data => {
//     console.log('获取导航数据成功 --- ', data)
//   })
//   .catch(err => {
//     console.log('获取导航数据失败 --- ', err)
//   })

// 获取导航数据
function requestNavigationData() {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '../_data/navigation.json', true)
  xhr.responseType = 'json'
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('[测试] 请求成功 --- ', xhr.response)
    } else {
      console.error(xhr.statusText)
    }
  }
  xhr.onerror = function() {
    console.error('[测试] 请求错误 --- ', xhr.statusText)
  }
  xhr.send()
}

requestNavigationData()

// 滚动到顶部
function clickGoTop() {
  $("body,html").animate({
    scrollTop: 0
  }, 300)
}

// 滚动到指定位置
function clickLeftNaviItem(index) {
  $('html, body').animate({
    scrollTop: $(`#left_navi_${index}`).offset().top
  }, 300)
}

function clickSubNaviItem(index, subIndex) {
  console.log('点击右侧导航 --- ', index, subIndex)


}





// // 创建界面标签元素
// function createHTMLElementUI(data) {
//   // 添加左侧导航
//   var $leftNavi = $(document).find('.left-navi')
//   if ($leftNavi) {
//     $.each(data, (index, item) => {
//       $leftNavi.append(`<div class='left-navi-item' index='${index}'>${item.title}</div>`)
//     })

//     // 监听点击事件
//     $leftNavi.on('click', '.left-navi-item', function() {
//       console.log('点击了 1--- ', $(this), $(this).index())
//     })
//   }

//   // 添加右侧内容
//   var $rightContent = $(document).find('.right-content')
//   if ($rightContent) {
//     $.each(data, (index, item) => {
//       $rightContent.append(`<div class='right-content-item' index='${index}}'></div>`)

//       var $rightContentItem = $rightContent.find('.right-content-item')
//       if ($rightContentItem) {

//       }
//     })
//   }
// }