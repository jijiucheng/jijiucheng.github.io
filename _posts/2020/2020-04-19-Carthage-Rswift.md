---
layout: post
title: 【iOS】使用 Carthage 管理 R.Swift 库
categories: iOS
description: Carthage 安装配置
keywords: iOS, iOS配置, Carthage
topmost: false
---

**导读：** 
本篇文章主要介绍 `Carthage` 的基本使用及 `R.Swift` 库的配置问题。

> 声明：本篇文章只用于记录配置笔记！！！

# 一、配置 Carthage

### 1、在工程目录下添加 `Cartfile` 文件

```
## cd 到项目根目录
mxgx:~ mxgx$ cd /Users/mxgx/Documents/GitHub/MyGitHub/JJCListeningBook 
## 创建并编辑 Cartfile 文件
mxgx:JJCListeningBook mxgx$ vim Cartfile
```

### 2、编辑 `Cartfile` 文件

**2020.06.06 - 新增 R.swift 一些介绍**

首先需要说明一下有关 `R.swift` 的一些事情：
- `R.swift` 官方是有两个版本的，分别是 [R.swift - https://github.com/mac-cain13/R.swift](https://github.com/mac-cain13/R.swift) 和 [R.swift.Library - https://github.com/mac-cain13/R.swift.Library](https://github.com/mac-cain13/R.swift.Library)；
- 两个版本都是支持 `iOS、tvOS、watchOS` 三个平台的；
- 两者都是支持 `CocoaPods` 方式添加依赖；
- 但是 `R.swift` 不支持 `Carthage` 方式添加依赖，`R.swift.Library` 支持 `Carthage`；
- `R.swift.Library` 支持 `SPM（Swift Package Manager）`，`R.swift` 未明确表明支持，需要验证；
- 官方已说明为何 `R.swift` 不支持 `Carthage` 方式：
  - > Note on Carthage: R.swift is a tool used in a build step, it is not a dynamic library. Therefore it is not possible to install it with Carthage.
  - 主要原因就是 `R.swift` 并不是动态库，因此并不可能使用 `Carthage` 方式。



> 通过 `vim Cartfile` 指令打开 `Cartfile` 文件后：
> - 点按 `i` 按键开启编辑功能，点按 `esc` 按键关闭编辑功能；
> - 点按 `Shift + :` 按键，并输入 `wq` 回车可退出编辑界面。

```swift
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

```swift
/// 2022.06.06 - 示例，添加了固定版本
github "Alamofire/Alamofire" "5.6.1"
github "onevcat/Kingfisher" "7.2.2"
github "alibaba/HandyJSON" "5.0.2"
github "SnapKit/SnapKit" "5.6.0"
github "pkluz/PKHUD" "5.4.0"
github "mac-cain13/R.swift.Library" "v5.4.0"
github "hackiftekhar/IQKeyboardManager" "v6.5.10"
```

### 3、`clone` 并编译 `framework` 文件

```swift
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

**2022.06.06 - 新增其它指令**

```swift
/// 移除缓存
rm -rf ~/Library/Caches/carthage/
rm -rf ~/Library/Caches/org.carthage.CarthageKit/
```

# 二、在 Xcode 中配置 R.Swift 库

### 1、链接静态库

![链接静态库](https://images.xiaozhuanlan.com/photo/2020/7d17ba7af30439ba3fb032d07f163dcf.png)

### 2、配置 `Run Script`

![配置 `Run Script`](https://images.xiaozhuanlan.com/photo/2020/d892127cb175a0ae1c382b6f684e9c16.png)

> 第五处：`/usr/local/bin/carthage copy-frameworks`
> 第六处：`$(SRCROOT)/Carthage/Build/iOS/Rswift.framework`

**2022.06.06 - 新增**

当遇到依赖的三方库过多时，通过此种方式添加就显得过于繁琐，所以就有了下面这种方式：
- 在项目根目录下新增 `input.xcfilelist` 文件；
- 并将上面所添加的文件路径，全部移入到该文件内部；
- 在 `Run Script` 下的 `Input File Lists` 一栏中，记住不是 `Input Files`，引入该文件路径，如：`$(SRCROOT)/input.xcfilelist` 即可。

```swift
/// input.xcfilelist - 三方库路径
$(SRCROOT)/Carthage/Build/iOS/Alamofire.framework
$(SRCROOT)/Carthage/Build/iOS/HandyJSON.framework
$(SRCROOT)/Carthage/Build/iOS/IQKeyboardManagerSwift.framework
$(SRCROOT)/Carthage/Build/iOS/Kingfisher.framework
$(SRCROOT)/Carthage/Build/iOS/PKHUD.framework
$(SRCROOT)/Carthage/Build/iOS/Rswift.framework
$(SRCROOT)/Carthage/Build/iOS/SnapKit.framework
```

![多库配置方式](/images/iOS/2020-04-19-Carthage-Rswift-07.png)

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

> **2022.06.06 - 新增：**
> 由于 `R.generated.swift` 文件每次编译的时候都会重新生成覆盖，所以在多人协作开发的时候，很容易产生代码提交冲突问题，故建议将 `*.generated.swift` 加入到 `.gitignore` 忽略文件中。

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

### 2、have the same architectures (arm64) and can't be in the same fat output file

#### 错误内容

```swift
*** Building scheme "Alamofire iOS" in Alamofire.xcworkspace
A shell task (/usr/bin/xcrun lipo -create /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Intermediates.noindex/ArchiveIntermediates/Alamofire\ iOS/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/Alamofire.framework/Alamofire /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Products/Release-iphonesimulator/Alamofire.framework/Alamofire -output /Users/mxgx/Desktop/DDY_Education/DDYEducation/Carthage/Build/iOS/Alamofire.framework/Alamofire) failed with exit code 1:
fatal error: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/lipo: /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Intermediates.noindex/ArchiveIntermediates/Alamofire iOS/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/Alamofire.framework/Alamofire and /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Products/Release-iphonesimulator/Alamofire.framework/Alamofire have the same architectures (arm64) and can't be in the same fat output file

Building universal frameworks with common architectures is not possible. The device and simulator slices for "Alamofire" both build for: arm64
Rebuild with --use-xcframeworks to create an xcframework bundle instead.
```
![报错信息](/images/iOS/2020-04-19-Carthage-Rswift-01.png)

#### 错误原因

根据报错信息显示 `have the same architectures (arm64) and can't be in the same fat output file`，以及下面的报错信息 `Building universal frameworks with common architectures is not possible. The device and simulator slices for "Alamofire" both build for: arm64`，可以看到主要是因为在 `模拟器 simulator` 同时具备了 `arm64` 架构引起的。

主要是因为 `Xcode 12` 以后模拟器编译生成的 `framework` 中也会包含`arm64`，因此在合并的时候就会出现 `have the same architectures (arm64) and can't be in the same fat output file` 的报错。

#### 解决办法

虽然知道了原因，但是根据现有网上的教程基本上都是在 `Target -> Build Setting -> Architectures -> Excluded Architectures` 中，在 `Any iOS Simulator SDK` 一栏中添加 `arm64` 即可。然而在实际测试中，发现此种方法并不能解决由 `Carthage` 编译引起的这个报错问题。

后来去了 `Carthage` 的 `Github` 官网，查到了一些解决办法，经实测可以成功：

- [Github - Carthage - Carthage builds fail at xcrun lipo on Xcode 12 beta (3,4,5...) #3019](https://github.com/Carthage/Carthage/issues/3019#issuecomment-664099506)

步骤如下：

- 1、在项目根目录下创建一个 `tmp.xcconfig` 文件，并打开文件填写如下内容：
```swift
EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64=arm64 arm64e armv7 armv7s armv6 armv8
EXCLUDED_ARCHS=$(inherited) $(EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_$(EFFECTIVE_PLATFORM_SUFFIX)__NATIVE_ARCH_64_BIT_$(NATIVE_ARCH_64_BIT))
```
- 2、然后通过终端到项目根目录，执行如下指令：
```swift
export XCODE_XCCONFIG_FILE=$PWD/tmp.xcconfig
```
- 3、最后先移除 `Carthage` 文件夹，并清除相关缓存，然后执行更新命令：
```swift
/// 清除 carthage 缓存
rm -rf ~/Library/Caches/carthage/
rm -rf ~/Library/Caches/org.carthage.CarthageKit/

/// 执行更新下载命令
carthage update --platform iOS --no-use-binaries --cache-builds
```

![问题解决](/images/iOS/2020-04-19-Carthage-Rswift-02.png)

### 3、The linked framework 'Kingfisher.framework' is missing one or more architectures required by this target: armv7.

#### 错误内容

![报错内容](/images/iOS//2020-04-19-Carthage-Rswift-03.png)

#### 错误原因

还是因为编译架构问题，需要不包括 `armv7` 架构才可以。

#### 解决办法

此处的解决方案，经测试则是使用在 `Target -> Build Setting -> Architectures -> Excluded Architectures` 后面直接添加 `armv7` 即可。

![解决办法](/images/iOS//2020-04-19-Carthage-Rswift-06.png)

### 4、Building for iOS, but the linked and embedded framework 'Kingfisher.framework' was built for iOS + iOS Simulator.

#### 错误内容

![报错内容](/images/iOS//2020-04-19-Carthage-Rswift-04.png)

#### 错误原因

在引入 `framework` 时对于 `Embed` 设置不正确引起的。

#### 解决办法

![解决办法](/images/iOS//2020-04-19-Carthage-Rswift-05.png)

## 参考链接

- [GitHub - mac-cain13 - R.swift](https://github.com/mac-cain13/R.swift)
- [GitHub - mac-cain13 - R.swift.Library](https://github.com/mac-cain13/R.swift.Library)
- [简书 - 门前的那颗樱桃树 - R.swift的使用和安装](https://www.jianshu.com/p/78508ed5739a)
- [简书 - 牵线小丑 - 使用 Carthage 安装 R.swift](https://www.jianshu.com/p/b7702627bcb8)
- [----------]()
- [Code码农网 - 解决 LLDB 出现 “Couldn't IRGen expression” 的问题](https://www.codercto.com/a/29825.html)
- [Github - Carthage - Carthage builds fail at xcrun lipo on Xcode 12 beta (3,4,5...) #3019](https://github.com/Carthage/Carthage/issues/3019#issuecomment-664099506)
- [CSDN - embedded framework is missing one or more architectures required by this target: arm64.](https://blog.csdn.net/yuanya/article/details/119739891)
- [CSDN - Xcode 12打包framework 报错：have the same architectures (arm64) and can‘t be in the same fat output file](https://blog.csdn.net/zhanglei5415/article/details/122327512)
- [简书 - child_cool - 打包问题](https://www.jianshu.com/p/522dcc445d11)
- [简书 - 新生代农民工No1 - CocoaPods私有库制作](https://www.jianshu.com/p/0da5a4710850)

## 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】使用 Carthage 管理 R.Swift 库](https://jijiucheng.github.io/2020/04/19/Carthage-Rswift/)
> 
> **发表日期**：2020/04/19 17:00:00
> 
> **更新日期**：2022/06/06 20:30:00
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
> 
> **公众号**：[微信 - 苜蓿小站](#)
> 
> **小程序**：[微信 - 苜蓿小站](#)


