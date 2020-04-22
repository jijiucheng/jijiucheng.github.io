---
layout: post
title: 【iOS】使用 Carthage 管理 R.Swift 库
categories: iOS
description: Carthage 安装配置
keywords: iOS, iOS配置, Carthage
topmost: false
---

## 前言

> 声明：本篇文章只用于记录配置笔记！！！

## 一、配置 Carthage

### 1、在工程目录下添加 `Cartfile` 文件

```
## cd 到项目根目录
mxgx:~ mxgx$ cd /Users/mxgx/Documents/GitHub/MyGitHub/JJCListeningBook 
## 创建并编辑 Cartfile 文件
mxgx:JJCListeningBook mxgx$ vim Cartfile
```

### 2、编辑 `Cartfile` 文件

> 通过 `vim Cartfile` 指令打开 `Cartfile` 文件后：
> - 点按 `i` 按键开启编辑功能，点按 `esc` 按键关闭编辑功能；
> - 点按 `Shift + :` 按键，并输入 `wq` 回车可退出编辑界面。

```
## Cartfile 文件内容，格式：github "库作者名/库名称"
github "Alamofire/Alamofire"
github "SwiftyJSON/SwiftyJSON"
github "ReactiveX/RxSwift"
github "onevcat/Kingfisher"
github "SnapKit/SnapKit"
github "pkluz/PKHUD"
github "mac-cain13/R.swift.Library"
github "hackiftekhar/IQKeyboardManager"
github "scinfu/SwiftSoup"
```

### 3、`clone` 并编译 `framework` 文件

```
mxgx:JJCListeningBook mxgx$ carthage update --platform ios
*** Fetching SwiftyJSON
*** Fetching IQKeyboardManager
*** Fetching RxSwift
*** Fetching SnapKit
*** Fetching R.swift.Library
*** Fetching Kingfisher
*** Fetching Alamofire
*** Fetching SwiftSoup
*** Fetching PKHUD
*** Checking out PKHUD at "5.3.0"
*** Checking out SwiftSoup at "2.3.0"
*** Checking out Alamofire at "5.0.4"
*** Checking out Kingfisher at "5.13.2"
*** Checking out R.swift.Library at "v5.1.0"
*** Checking out SnapKit at "5.0.1"
*** Checking out RxSwift at "5.1.0"
*** Checking out IQKeyboardManager at "v6.5.5"
*** Checking out SwiftyJSON at "5.0.0"
*** xcodebuild output can be found in /var/folders/21/dw30m9y11l3gnc9v7n2qbcd80000gn/T/carthage-xcodebuild.KkAW9u.log
*** Downloading Kingfisher.framework binary at "5.13.2 - KFImage Orientation"
*** Downloading RxSwift.framework binary at "Catalyst"
*** Building scheme "Alamofire iOS" in Alamofire.xcworkspace
*** Building scheme "IQKeyboardManager" in IQKeyboardManager.xcodeproj
*** Building scheme "IQKeyboardManagerSwift" in IQKeyboardManager.xcodeproj
*** Building scheme "KingfisherSwiftUI" in Kingfisher.xcworkspace
*** Building scheme "Kingfisher" in Kingfisher.xcworkspace
*** Building scheme "PKHUD" in PKHUD.xcodeproj
*** Building scheme "Rswift-iOS" in R.swift.Library.xcodeproj
*** Building scheme "SnapKit" in SnapKit.xcworkspace
*** Building scheme "SwiftSoup-iOS" in SwiftSoup.xcodeproj
*** Building scheme "SwiftyJSON iOS" in SwiftyJSON.xcworkspace
```

## 二、在 Xcode 中配置 R.Swift 库

### 1、链接静态库

![链接静态库](https://images.xiaozhuanlan.com/photo/2020/7d17ba7af30439ba3fb032d07f163dcf.png)

### 2、配置 `Run Script`

![配置 `Run Script`](https://images.xiaozhuanlan.com/photo/2020/d892127cb175a0ae1c382b6f684e9c16.png)

> 第五处：`/usr/local/bin/carthage copy-frameworks`
> 第六处：`$(SRCROOT)/Carthage/Build/iOS/Rswift.framework`

### 3、配置专属 `R.Swift` 库的 `Run Script`

> 运行编译，保证定义函数 `R`

[R.Swift - rswift 资源文件链接](https://github.com/mac-cain13/R.swift/releases)

![项目目录结构](https://images.xiaozhuanlan.com/photo/2020/8be7a963dff85bbc20b49f2cddf50ff4.png)
![所要下载的资源文件](https://images.xiaozhuanlan.com/photo/2020/0c0620598917e3ae627ed1f46231cc7d.png)
![R.Swift 所需配置的运行脚本参数](https://images.xiaozhuanlan.com/photo/2020/e01cbe572eddf059f6450a2b2cdf9566.png)

```
## R.Swift 所需配置的运行脚本参数:
## 此处的  $SRCROOT/rswift 就是对应的 rswift 文件路径
"$SRCROOT/rswift" generate "$SRCROOT/R.generated.swift"

$TEMP_DIR/rswift-lastrun
$SRCROOT/R.generated.swift
```

### 4、`Command + B` 编译

> 编译完成之后，会在项目的根目录下生成一个 `R.generated.swift` 文件，将该文件拖入到项目中再次运行即可。

![添加 R.generated.swift 文件](https://images.xiaozhuanlan.com/photo/2020/220f016bdb13114ceecb24ff8de6bc5b.png)

## 三、报错解决办法

### 1、error: Couldn't IRGen expression, no additional error。

#### 错误内容

```
(lldb) po self
error: Couldn't IRGen expression, no additional error
```

#### 错误原因

> 这个问题主要是直接使用了 Carthage 从官方网站下载的二进制 Framework 导致的，比如我使用了 RxSwift，我没有使用自己编译的 RxSwift，而是用 Carthage 默认的设置使用了官方下载的 RxSwift，于是就会有这个问题。

#### 解决办法

```
##使用这个参数来更新，即不要使用现成的二进包：
carthage update --platform iOS --no-use-binaries
```

#### 参考链接

- [Code码农网 - 解决 LLDB 出现 “Couldn't IRGen expression” 的问题](https://www.codercto.com/a/29825.html)

## 参考链接

- [GitHub - mac-cain13 - R.swift](https://github.com/mac-cain13/R.swift)
- [GitHub - mac-cain13 - R.swift.Library](https://github.com/mac-cain13/R.swift.Library)
- [简书 - 门前的那颗樱桃树 - R.swift的使用和安装](https://www.jianshu.com/p/78508ed5739a)
- [简书 - 牵线小丑 - 使用 Carthage 安装 R.swift](https://www.jianshu.com/p/b7702627bcb8)
- [----------]()
- [Code码农网 - 解决 LLDB 出现 “Couldn't IRGen expression” 的问题](https://www.codercto.com/a/29825.html)

## 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】使用 Carthage 管理 R.Swift 库](https://jijiucheng.github.io/2020/04/19/Carthage-Rswift/)
> 
> **发表日期**：2020/04/19 17:00:00
> 
> **更新日期**：2020/04/22 17:30:00
> 
> -
> 
> **GitHub**：[GitHub - jijiucheng](https://github.com/jijiucheng)
> 
> **个人博客**：[GitHub.io - 苜蓿鬼仙](https://jijiucheng.github.io)
> 
> **小专栏**：[小专栏 - 苜蓿鬼仙](https://xiaozhuanlan.com/u/6667468960)
> 
> **掘金**：[掘金 - 苜蓿鬼仙](https://juejin.im/user/5a31e95c51882533d023137d)
> 
> **微博**：[微博 - 苜蓿鬼仙](https://weibo.com/u/1585459545)


