---
layout: post
title: 【iOS】真机调试报 Could not launch "xxx" 错误
categories: iOS
description: 【iOS】真机调试报 Could not launch "xxx" 错误
keywords: iOS, Xcode
topmost: false
---

**导读：** 
本篇文章主要介绍真机调试时出现 `Could not launch "xxx"` 错误的解决方案。

# 前言

最近开发项目一直使用的是 `Xcode` 的模拟器，昨天处理一个内测出现在真机上的 bug 时，需要通过真机进行调试，然而发现编译成功出现 `Build Success` 后，又弹出了一个警示弹框而中断了 App 的运行：

![Could not launch "xxx" 报错](/images/iOS/2021-03-25-Xcode-Could-not-launch-01.png)

> 备注声明：
> 
> 此图片为网络图片，非本人当时截图，主要是当时忘记截图了。

明明都编译成功了，却又报错，什么鬼？闹呢？

![内心崩溃](/images/Emoji/Emoji-hematemesis.png)

# 尝试问题解决

考虑到可能是 `Xcode` 运行缓存的问题，进行了常规 `Xcode` 报错解决三步走：

**步骤一：**

```
/// 1、常规清理缓存
Commod + Shift + K 

/// 2、清理 Xcode 编译缓存
/Users/xxx/Library/Developer/Xcode/DerivedData/
```

**步骤二：**

```
1、执行 步骤一
2、完全退出 Xcode，并非仅仅点击 Xcode 左上角的 ❌ 按钮
```

**步骤三：**

```
1、执行 步骤一、步骤二
2、关机重启
```

然而近乎万能的解决方法，在此却没有任何效果！！！

![吐血](/images/Emoji/Emoji-hematemesis.png)

# 最后解决

最后通过 `Google` 大法，也是搜索了一些解决方法，大多和 `Xcode 报错解决三步走` 大同小异，但是并非我所想要的。

同时也有一些 `猿友` 提醒说是证书相关问题，然后我有尝试了将 `KeyChain Access` 里的相关证书删除重新安装了一遍，且保证证书均为有效可用状态，但是问题认为解决。

![编译失败](/images/iOS/2021-03-25-Xcode-Could-not-launch-02.png)

最后又考虑到是否是编译环境的不同引起的冲突，然后就发现 `Targets -> Build Settings -> Signing` 一栏中，选用的是 `AdHoc` 证书对应的 `Apple Distribution` 配置文件；尝试换成了 `Development` 证书对应的 `Apple Development` 再次进行编译运行，发现终于顺利通过了！！！

![编译成功](/images/iOS/2021-03-25-Xcode-Could-not-launch-03.png)

> 温馨提示：
> 
> 更换编译环境或证书进行编译时，尽量删除之前的安装包，防止出现覆盖安装失败问题。

# 总结

在此记录一下，便于日常学习。

# 参考链接

- [iOS Could not launch “xxx”的解决方法](https://blog.csdn.net/jia611/article/details/51872463)
- [［已解决］Xcode给iPhone安装app出错：Could not launch process launch failed](https://www.crifan.com/xcode_iphone_install_app_failed_could_not_launch_process/)
- [Xcode 错误- Could not launch app 解决办法](Xcode 错误- Could not launch app 解决办法)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】真机调试报 Could not launch "xxx" 错误](https://jijiucheng.github.io/2021/03/25/Xcode-Could-not-launch/)
> 
> **发表日期**：2021/03/25 16:00:00
> 
> **更新日期**：2021/03/25 16:00:00
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


