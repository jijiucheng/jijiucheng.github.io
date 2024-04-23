---
layout: post
title: 【iOS】Xcode 真机调试 App 启动长时间挂起
categories: iOS
description: 【iOS】Xcode 真机调试 App 启动长时间挂起
keywords: iOS, Xcode
topmost: false
---

**导读：** 
最近在真机调试的过程中，突然出现了在 App 启动的时候长时间挂起卡顿现象，每次编译运行都会卡在启动界面近乎 1 分钟的情况，绝对令人崩溃。

![内心崩溃](/images/Emoji/Emoji-hematemesis.png)

# 产生现象

最开始的时候，是在编译时突然弹出了一个弹框（未及时截图），大致的意思是：真机调试时开启了一个状态，会增加编译运行时长。

当时也没太在意，就 `默认` 勾选了。然后就出现了如此令人崩溃的情况，每次编译运行都会卡在启动界面，最开始以为是 `Crash` 了，然而并没有，日志栏也没有打印日志，所以 `一脸懵逼`。

后经过查询相关文档，发现也有不少的程序猿们遇到了同样的问题，基本上是有如下几个现象：
- 当连接 Xcode 真机调试时，在 App 启动后，会出现 `卡死现象`，少则几十秒，多则几分钟，才会正式进入 App 界面；
- Xcode 底部日志栏会因为卡顿，不会有任何日志打印，所以并没有进入到 `AppDelegate` 中的 `didFinishLaunchingWithOptions` 方法中；
- 在项目工程进程面板界面 `Show the Debug navigator`，会发现所有数值全部为 `zero`，所以实际上 App 并没有正式运行起来。

# 问题排查

在 Xcode 调试过程中，尤其是真机调试过程中，我们需要下载设备（真机、模拟器）对应系统版本的支持文件，已保证 Xcode 可以兼容对应的系统正常调试。

由于 Xcode 是向下兼容的开发工具，所以当版本兼容的情况下，Xcode 会自动为我们下载指定的支持文件。

文件路径如下：
> ~/Library/Developer/Xcode/iOS DeviceSupport

猜测具体的原因应该是出现了兼容问题：
- 当前 Xcode 自动下载的或已经存在的支持文件与当前真机所需支持文件不兼容引起的。

# 问题解决

所以当我们知道原因后，只需要将对应支持文件删除，让 Xcode 重新下载即可。

**步骤一：**

任意文件夹通过 `Command + Shift + G` 快捷键，进入指定文件夹：

> ~/Library/Developer/Xcode/iOS DeviceSupport

删除与当前真机系统版本相对应的支持文件。

**步骤二：**

通过菜单栏：`Window -> Devices and Simulators` 进入 `Devices` 选择栏；

选中对应设备右击选中 `Unpair Device`，解除对当前设备的信任；

之后该设备再次连接 Xcode 时会重新添加信任，并自动下载当前设备所需的支持文件，然后再次编译运行就正常了。

![Unpair Device](/images/iOS/2022-04-11-Xcode-iPhone-Debug-TimeOut-01.png)

# 总结

在此记录一下，便于日常学习。

# 参考链接

- [Xcode更新DeviceSupport文件后真机调试在App启动时挂起的解决](https://kinds.blog.csdn.net/article/details/106987189)
- [Xcode真机调试太慢](https://blog.csdn.net/weixin_42979360/article/details/111276171)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】Xcode 真机调试 App 启动长时间挂起](https://jijiucheng.github.io/2022/04/11/Xcode-iPhone-Debug-TimeOut/)
> 
> **发表日期**：2022/04/11 18:00:00
> 
> **更新日期**：2022/04/11 18:00:00
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


