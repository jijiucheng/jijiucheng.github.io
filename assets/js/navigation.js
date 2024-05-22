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
      this.clickLeftNaviItem(index, true)
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

      var $linksContentWrapper = $(`<div class="links-content-wrapper${item.selectSubIndex === subIndex ? ' show' : ''}"></div>`)
      // 创建右侧导航单个大类底部链接区域
      $.each(subItem.list, (linkIndex, link) => {
        var $linkItem = $(`<a class="link-item hover-bg" href="${link.url}" title="${link.url}" target="_blank"></a>`)
        var $linkItemIcon = $(`<img class="link-item-icon" src="${link.icon}" />`)
        var $linkItemTitle = $(`<span class="link-item-title">${link.title}</span>`)
        $linkItem.append($linkItemIcon)
        $linkItem.append($linkItemTitle)
        $linksContentWrapper.append($linkItem)
        $linksWrapper.append($linksContentWrapper)
      })
    })

    $rightContentItem.append($subNaviWrapper)
    $rightContentItem.append($linksWrapper)
    $('.right-content').append($rightContentItem)
  })
}

// 滚动到顶部
function clickGoTop() {
  $("body,html").animate({
    scrollTop: 0
  }, 300)
}

// 滚动到指定位置
function clickLeftNaviItem(index, isScroll) {
  if (this.selectIndex === index) return
  // 更换选中对象
  this.selectIndex = index
  var $navItems = $('.left-navi-item')
  $navItems.filter('.active').removeClass('active')
  $navItems.eq(this.selectIndex).addClass('active')
  if (isScroll) {
    // 滚动到指定位置
    $('html, body').animate({
      scrollTop: $(`#left_navi_${index}`).offset().top
    }, 300)
  }
}

// 点击右侧每个分类的子级导航
function clickSubNaviItem(index, subIndex) {
  if (this.selectIndex === index && this.list[index].selectSubIndex === subIndex) return
  this.clickLeftNaviItem(index, false)
  this.list[index].selectSubIndex = subIndex
  // 右侧子级容器
  var $rightContentItem = $('.right-content-item').eq(index)
  // 更新子级导航选中
  var $subNaviItems = $rightContentItem.find('.subNavi-item')
  $subNaviItems.filter('.active').removeClass('active')
  $subNaviItems.eq(subIndex).addClass('active')
  // 更新链接页面
  var $linksContentWrapper = $rightContentItem.find('.links-content-wrapper')
  $linksContentWrapper.filter('.show').removeClass('show')
  $linksContentWrapper.eq(subIndex).addClass('show')
}