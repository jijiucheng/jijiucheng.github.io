---
layout: post
title: 【iOS】升级 Xcode12 配置变更问题
categories: iOS
description: 【iOS】升级 Xcode12 配置变更问题
keywords: iOS, AutoLayout, Masonry, SnapKit
topmost: false
---

# 前言

随着 `iOS14` 和 `Xcode12` 的更新到来，又一波的升级适配需要搞起来了，昨天开始着手升级了一下 `Xcode12`，但是发现原本使用 `Carthage` 配置的第三方库管理，编译出现了失败：

```
Module compiled with Swift 5.2.4 cannot be imported by the Swift 5.3 compiler:/Users/mxgx/Documents/GitHub/MyGitHub/JJCAppStoreProjects/JJCComicBook/JJCComicBook/Carthage/Build/iOS/SnapKit.framework/Modules/SnapKit.swiftmodule/x86_64-apple-ios-simulator.swiftmodule
```

![无法编译 SnapKit 库报错信息](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-01)

# 初次问题解决

最开始认为是因为升级 `Xcode12`，导致了编译的 Swift 版本由 `Swift 5.2.4` 升级为 `Swift 5.3` 引起的；所以就删除了 `Carthage` 编译的 `framework` 库文件，尝试重新编译，但是发现又再次出现了其他的问题：

```
*** Building scheme "Alamofire iOS" in Alamofire.xcworkspace
Build Failed
	Task failed with exit code 1:
	/usr/bin/xcrun lipo -create /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/12.0_12A7209/Alamofire/5.0.5/Build/Intermediates.noindex/ArchiveIntermediates/Alamofire\ iOS/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/Alamofire.framework/Alamofire /Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/12.0_12A7209/Alamofire/5.0.5/Build/Products/Release-iphonesimulator/Alamofire.framework/Alamofire -output /Users/mxgx/Documents/GitHub/MyGitHub/JJCAppStoreProjects/JJCComicBook/JJCComicBook/Carthage/Build/iOS/Alamofire.framework/Alamofire

This usually indicates that project itself failed to compile. Please check the xcodebuild log for more details: /var/folders/kt/pbq7yrws4xz_kspt99zyc9lc0000gn/T/carthage-xcodebuild.kLdrkn.log
```

![删除 framework 库后再次编译报错问题](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-02)

根据报错的信息，只能看出大概是编译配置出问题了，尝试看一下 `log` 日志文件：

```
/var/folders/kt/pbq7yrws4xz_kspt99zyc9lc0000gn/T/carthage-xcodebuild.kLdrkn.log
```

![carthage-xcodebuild.kLdrkn.log 日志文件](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-03)

但是发现完全看不懂。

![吐血](/images/Emoji/Emoji-hematemesis.png)

# 再次尝试

因为看到报错信息里有涉及到 `Caches` 的字样，担心是因为缓存问题影响了升级的配置，所以就尝试了删除以下目录下的文件：

```
// 目录1：DerivedData 子文件夹
/Users/mxgx/Library/Caches/org.carthage.CarthageKit/DerivedData/

// 目录2：项目根目录下 Carthage 文件夹和 Cartfile.resolved 文件
/Users/mxgx/Documents/GitHub/MyGitHub/JJCAppStoreProjects/JJCComicBook/JJCComicBook/

// 目录3：Xcode 的 Derived Data 编译缓存文件
/Users/mxgx/Library/Developer/Xcode/DerivedData/
```

当清除完后，再次使用命令进行更新编译：

```
carthage update --platform ios
```

但是最终发现仍是有同样的问题。

![内心崩溃](/images/Emoji/Emoji-Heart-breakdown.png)

# 最后解决

最后再技术群里咨询了一位大佬，给了个解决的方案：

[Carthage builds fail at xcrun lipo on Xcode 12 beta (3,4,5...) #3019](https://github.com/Carthage/Carthage/issues/3019)

![配置脚本编译](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-04)

**脚本如下：**

```
#!/usr/bin/env bash

# carthage-build.sh
# Usage example: ./carthage-build.sh --platform iOS
# https://github.com/Carthage/Carthage/issues/3019

set -euo pipefail

xcconfig=$(mktemp /tmp/static.xcconfig.XXXXXX)
trap 'rm -f "$xcconfig"' INT TERM HUP EXIT

# For Xcode 12 make sure EXCLUDED_ARCHS is set to arm architectures otherwise
# the build will fail on lipo due to duplicate architectures.
# Xcode 12 Beta 3:
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A8169g = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig
# Xcode 12 beta 4
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A8179i = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig
# Xcode 12 beta 5
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A8189h = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig
# Xcode 12 beta 6
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A8189n = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig
# Xcode 12 GM (12A7208)
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A7208 = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig
# Xcode 12 GM (12A7209)
echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_12A7209 = arm64 arm64e armv7 armv7s armv6 armv8' >> $xcconfig

echo 'EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200 = $(EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_simulator__NATIVE_ARCH_64_BIT_x86_64__XCODE_1200__BUILD_$(XCODE_PRODUCT_BUILD_VERSION))' >> $xcconfig
echo 'EXCLUDED_ARCHS = $(inherited) $(EXCLUDED_ARCHS__EFFECTIVE_PLATFORM_SUFFIX_$(EFFECTIVE_PLATFORM_SUFFIX)__NATIVE_ARCH_64_BIT_$(NATIVE_ARCH_64_BIT)__XCODE_$(XCODE_VERSION_MAJOR))' >> $xcconfig

export XCODE_XCCONFIG_FILE="$xcconfig"
carthage build "$@"
```

当使用指令：(本人将 .sh 脚本放到了项目根目录中)

```
./carthage-build.sh --platform iOS
```

运行成功后，再次 `Command + B` 编译 `Xcode12`，发现一切正常了。 

![脚本执行结果](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-05)

# 总结

而按照：

[Carthage builds fail at xcrun lipo on Xcode 12 beta (3,4,5...) #3019](https://github.com/Carthage/Carthage/issues/3019)

![问题原因](/images/iOS/2020-09-22-Carthage-UpdateToXcode12-06)

里面的各位大佬的问题反馈，应该是 `AppleSilicon` 上的 `iPhoneSimulator` 是 `arch arm64`，而 `iPhoneSimulator` 则与同一 `arch arm64` 上的 `iPhoneOS` 库有冲突，所以出现了这种问题。

在此记录一下，便于日常学习。

# 参考链接

- [Carthage builds fail at xcrun lipo on Xcode 12 beta (3,4,5...) #3019](https://github.com/Carthage/Carthage/issues/3019)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】升级 Xcode12 配置变更问题](https://jijiucheng.github.io/2020/09/22/Carthage-UpdateToXcode12/)
> 
> **发表日期**：2020/09/22 10:00:00
> 
> **更新日期**：2020/09/22 10:00:00
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


