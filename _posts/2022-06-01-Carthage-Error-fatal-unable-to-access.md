---
layout: post
title: 【Git】fatal unable to access 'xxxxxx' LibreSSL SSL_connect SSL_ERROR_SYSCALL in connection to github.com443 报错
categories: Git
description: 【Git】fatal: unable to access 'xxxxxx': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 报错
keywords: iOS, Xcode, Git，Carthage
topmost: false
---

**导读：** 
此处记录一下开发过程中遇到的一个使用 `Carthage` 遇到的报错问题。

# 报错

当在添加了 `Cartfile` 文件后，通过如下指令：

```swift
/// Cartfile 文件
github "Alamofire/Alamofire"
github "onevcat/Kingfisher"
github "alibaba/HandyJSON"
github "SnapKit/SnapKit"
github "pkluz/PKHUD"
github "mac-cain13/R.swift.Library"
github "hackiftekhar/IQKeyboardManager"
```

```swift
/// 方式一：全平台
carthage update
/// 方式二：进编译 ios 平台
carthage update --platform ios
/// 方式三：不使用 binaries
carthage update --platform ios --no-use-binaries
/// 方式四：使用 xcframeworks
carthage update --platform ios --use-xcframeworks
```

进行安装更新的时候，会突然报如下错误：

```swift
{22-06-01 10:58}[ruby-3.0.0]jcji:~/Desktop/DDY_Education/DDYEducation@master✗✗✗✗✗✗ mxgx% carthage update --platform ios
*** Fetching Alamofire
*** Fetching PKHUD
*** Fetching IQKeyboardManager
*** Fetching HandyJSON
A shell task (/usr/bin/env git fetch --prune --quiet https://github.com/alibaba/HandyJSON.git refs/tags/*:refs/tags/* +refs/heads/*:refs/heads/* (launched in /Users/mxgx/Library/Caches/org.carthage.CarthageKit/dependencies/HandyJSON)) failed with exit code 128:
fatal: unable to access 'https://github.com/alibaba/HandyJSON.git/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
```

![问题报错](/images/Git/2022-06-01-Carthage-Error-fatal-unable-to-access-01.png)

# 问题解决

根据报错信息可以看到，尤其是砍刀 `github.com:443`，一般都是由于网络问题引起的无法正常关联下载。

当然也不排除有些公司的内网屏蔽问题。

根据报错信息首先就尝试了 `科学上网`，然而发现并没有任何用，仍旧会报相同的错误；也曾尝试过 `热点` 和 `非公司网络`，发现仍不能解决相关问题。

后来查询了一下相关资料，发现网上虽然有很多相关解释，但是基本上都是关于 `CocoaPods` 的，并非关于 `Carthage` 的。

可以经常看到网上一些介绍是：

- 1、可以在 `Podfile` 文件中添加 `source 'https://github.com/CocoaPods/Specs.git'` 的，确实可以解决 `CocoaPods`，但是不适用于 `Carthage`；
- 2、可以将 `http` 或 `https` 换成 `git` 也能解决，这个我曾经也遇到过，但是是用于解决 `git clone` 的，并非关于此处问题的；
- 3、其他的还有一些是设置 `SSH` 令牌的，但是貌似没啥子用。

虽然明知道是因为网络问题，但是仍无法解决。甚至一度也怀疑 `科学上网` 也不好用了。

实际上，使用 `代理` 或 `科学上网` 的方式是可以解决的，只不过是没有设置正确。

正确的方式是可以通过 **`代理 + Git Proxy`** 的方式：

- 1、需要自己先查询一下自己的代理地址和端口号：比如 `127.0.0.1:7890`；
- 2、通过 `git config --global --list` 查询当前配置：

```swift
core.excludesfile=/Users/mxgx/.gitignore_global
difftool.sourcetree.cmd=opendiff "$LOCAL" "$REMOTE"
difftool.sourcetree.path=
mergetool.sourcetree.cmd=/Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh "$LOCAL" "$REMOTE" -ancestor "$BASE" -merge "$MERGED"
mergetool.sourcetree.trustexitcode=true
http.postbuffer=524288000
http.sslverify=false
user.name=xxx
user.email=xxx@.qq.com
commit.template=/Users/mxgx/xxxx
push.default=simple
init.templatedir=/Users/mxgx/.git-template
```

- 3、由于各自电脑环境配置的不同，此处显示的也不尽相同；主要查询是否有 `http.proxy` 和 `https.proxy` 两项；
- 4、如果已经存在，看是否和上面自己查询的代理地址和端口一致，如果一致则不需要更改，如果不一致则需要更改：

```swift
/// 可以先卸载之前的配置
git config --global --unset http.proxy
git config --global --unset https.proxy

/// 设置自己的 socks5 地址和端口，通过终端连续执行两次
git config --global http.proxy 'socks5://127.0.0.1:7890'
git config --global https.proxy 'socks5://127.0.0.1:7890'
```

- 5、使用完后可以进行移除；
- 6、有的说需要使用全局代理，本人测试没有使用全局也是可以的。
- 7、最终结果：

```swift
/// 可以使用如下两种指令，根据三方库视情况而定
carthage update --platform ios
carthage update --platform ios --use-xcframeworks
```

```swift
{22-06-01 11:31}[ruby-3.0.0]jcji:~/Desktop/DDY_Education/DDYEducation@master✗✗✗✗✗✗ mxgx% carthage update --platform ios
*** Fetching IQKeyboardManager
*** Fetching Kingfisher
*** Fetching SnapKit
*** Fetching Alamofire
*** Fetching PKHUD
*** Fetching R.swift.Library
*** Fetching HandyJSON
*** Checking out HandyJSON at "5.0.2"
*** Checking out R.swift.Library at "v5.4.0"
*** Checking out Alamofire at "5.6.1"
*** Checking out SnapKit at "5.6.0"
*** Checking out PKHUD at "5.4.0"
*** Checking out Kingfisher at "7.2.2"
*** Checking out IQKeyboardManager at "v6.5.10"
*** xcodebuild output can be found in /var/folders/px/lgdtcwcs5b14w74s845np6pw0000gn/T/carthage-xcodebuild.dCMNIG.log
*** Downloading Kingfisher binary at "7.2.2 - Rainy Season"
*** Building scheme "Alamofire iOS" in Alamofire.xcworkspace
A shell task (/usr/bin/xcrun lipo -create /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Intermediates.noindex/ArchiveIntermediates/Alamofire\ iOS/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/Alamofire.framework/Alamofire /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Products/Release-iphonesimulator/Alamofire.framework/Alamofire -output /Users/mxgx/Desktop/DDY_Education/DDYEducation/Carthage/Build/iOS/Alamofire.framework/Alamofire) failed with exit code 1:
fatal error: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/lipo: /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Intermediates.noindex/ArchiveIntermediates/Alamofire iOS/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/Alamofire.framework/Alamofire and /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/13.1_13A1030d/Alamofire/5.6.1/Build/Products/Release-iphonesimulator/Alamofire.framework/Alamofire have the same architectures (arm64) and can't be in the same fat output file

Building universal frameworks with common architectures is not possible. The device and simulator slices for "Alamofire" both build for: arm64
Rebuild with --use-xcframeworks to create an xcframework bundle instead.
{22-06-01 11:32}[ruby-3.0.0]jcji:~/Desktop/DDY_Education/DDYEducation@master✗✗✗✗✗✗ mxgx% carthage update --platform ios --use-xcframeworks
*** Fetching IQKeyboardManager
*** Fetching HandyJSON
*** Fetching SnapKit
*** Fetching R.swift.Library
*** Fetching Alamofire
*** Fetching PKHUD
*** Fetching Kingfisher
*** Checking out Kingfisher at "7.2.2"
*** Checking out PKHUD at "5.4.0"
*** Checking out Alamofire at "5.6.1"
*** Checking out R.swift.Library at "v5.4.0"
*** Checking out IQKeyboardManager at "v6.5.10"
*** Checking out HandyJSON at "5.0.2"
*** Checking out SnapKit at "5.6.0"
*** xcodebuild output can be found in /var/folders/px/lgdtcwcs5b14w74s845np6pw0000gn/T/carthage-xcodebuild.BgY7QL.log
*** Downloading Kingfisher binary at "7.2.2 - Rainy Season"
*** Building scheme "Alamofire iOS" in Alamofire.xcworkspace
*** Building scheme "HandyJSON iOS" in HandyJSON.xcodeproj
*** Building scheme "IQKeyboardManager" in IQKeyboardManager.xcodeproj
*** Building scheme "IQKeyboardManagerSwift" in IQKeyboardManager.xcodeproj
*** Building scheme "Kingfisher" in Kingfisher.xcworkspace
*** Building scheme "PKHUD" in PKHUD.xcodeproj
*** Building scheme "Rswift-iOS" in R.swift.Library.xcodeproj
*** Building scheme "SnapKit" in SnapKit.xcworkspace
```


# 总结

在此记录一下，便于日常学习。

# 参考链接

- [CSDN - fatal: unable to access ‘https://github.com/CocoaPods/Specs.git/‘](https://yoohoeh.blog.csdn.net/article/details/103564182)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【Git】fatal unable to access 'xxxxxx' LibreSSL SSL_connect SSL_ERROR_SYSCALL in connection to github.com443 报错](https://jijiucheng.github.io/2022/06/01/Carthage-Error-fatal-unable-to-access/)
> 
> **发表日期**：2022/06/01 17:00:00
> 
> **更新日期**：2022/06/01 17:00:00
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


