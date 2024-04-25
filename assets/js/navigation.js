fetch('../assets/json/navigation.json')
  .then(res => res.json())
  .then(data => {
    console.log('获取导航数据成功 --- ', data);
    createHTMLElementUI(data)
  })
  .catch(err => {
    console.log('获取导航数据失败 --- ', err);
  });

  // 创建界面标签元素
  function createHTMLElementUI(data) {
    var $naviWrapper = $(document).find('.navigation-wrapper')
    if ($naviWrapper) {
      $naviWrapper.append(`<div class='left-navi'></div>`)
      $naviWrapper.append(`<div class='right-content'>222</div>`)

      // 添加左侧导航
      var $leftNavi = $naviWrapper.find('.left-navi')
      if ($leftNavi) {
        $.each(data, (index, item) => {
          $leftNavi.append(`<div class='left-navi-item'>${item.title}</div>`)
        })
      }
    }
    console.log('元素标签 --- ', $naviWrapper)
  }