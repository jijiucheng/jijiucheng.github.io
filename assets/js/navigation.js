let list = []
let selectIndex = 0

// 获取导航数据
fetch('../assets/json/navigation.json')
  .then(res => res.json())
  .then(data => {
    console.log('获取导航数据成功 --- ', data)
    this.list = data
    this.createHTMLElementUI()
  })
  .catch(err => {
    console.log('获取导航数据失败 --- ', err)
  })

// 创建标签
function createHTMLElementUI() {
  $.each(this.list, (index, item) => {
    // 左侧导航
    var $leftItem = $(`<div class="left-navi-item hover-bg${selectIndex === index ? ' active' : ''}">${item.title}</div>`)
    $leftItem.on('click', (event) => {
      event.preventDefault()
      this.clickLeftNaviItem(index)
    })
    $('.left-navi').append($leftItem)

    // 右侧导航单个大类内容
    var $rightContentItem = $(`<div id="left_navi_${index}" class="right-content-item"></div>`)
    // 右侧导航单个大类顶部导航
    var $subNaviWrapper = $(`<div class="subNavi-wrapper"></div>`)
    // 右侧导航单个大类底部链接区域
    var $linksWrapper = $(`<div class="links-wrapper"></div>`)

    $.each(item.list, (subIndex, subItem) => {
      var $subNaviItem = $(`<span class="subNavi-item hover-bg${item.selectSubIndex === subIndex ? ' active' : ''}">${subItem.title}</span>`)
      $subNaviItem.on('click', (event) => {
        event.preventDefault()
        this.clickSubNaviItem(index, subIndex)
      })
      $subNaviWrapper.append($subNaviItem)

      if (item.selectSubIndex === subIndex) {
        $.each(subItem.list, (linkIndex, link) => {
          var $linkItem = $(`<a class="link-item hover-bg" href="${link.url}" title="${link.url}" target="_blank"></a>`)
          var $linkItemIcon = $(`<img class="link-item-icon" src="${link.icon}" />`)
          var $linkItemTitle = $(`<span class="link-item-title">${link.title}</span>`)
          $linkItem.append($linkItemIcon)
          $linkItem.append($linkItemTitle)
          $linksWrapper.append($linkItem)
        })
      }
    })

    $rightContentItem.append($subNaviWrapper)
    $rightContentItem.append($linksWrapper)
    $('.right-content').append($rightContentItem)
  })
}

// 创建右侧导航单个大类底部链接区域
function createRightContentLinks() {
  
}

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