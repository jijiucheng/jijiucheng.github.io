---
layout: post
title: 【iOS】真机调试报 Unable to prepare xxx iPhone for development 错误
categories: iOS
description: 【iOS】真机调试报 Unable to prepare xxx iPhone for development 错误
keywords: iOS, Xcode, 真机调试
topmost: false
---

**导读：** 
此处记录一下开发过程中遇到的一个真机调试问题：`Unable to prepare xxx iPhone for development`

# 报错

当编译运行真机到最后会提示如下：

```
Unable to prepare xxx iPhone for development

Please check the connection to the device, and review all errors in the Devices and Simulators window.
```

通过打开 `Window - Devices and Simulators`，则可以看到：

```
Failed to prepare device for development.

if youare certain thax xcode supports development on this device, try disconnecting and  reconnecting the device.
```

# 问题解决

有提示添加适配兼容文件：

```
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport
```

我只想说，这个是必须的，如果 Xcode 版本和手机版本不兼容肯定是不行的，这个只是必要条件。

接着还是实行老套路，一旦出现非正常真机调试问题四步骤：

- `Command + Shift + K` 清空 Xcode 缓存，编译运行；
- `完全关闭退出 Xcode 重启`，再次编译运行；
- `手机重启`，再次编译运行；
- `电脑重启`，再次编译运行。

基本上之前运行好好的突然出现问题的情况，在经过这四个步骤，可以解决九成的问题。

我这边就是在第三步的时候解决了。

# 总结

在此记录一下，便于日常学习。

# 参考链接

- [Unable to prepare iPhone for development](http://www.0daybug.com/posts/e1d3f6a5/index.html)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】真机调试报 Unable to prepare xxx iPhone for development 错误](https://jijiucheng.github.io/2022/05/09/Unable-to-prepare-iPhone-for-development/)
> 
> **发表日期**：2022/05/09 18:00:00
> 
> **更新日期**：2022/05/09 18:00:00
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


