---
layout: post
title: 【自动化测试】Appium 安装使用
categories: 自动化测试
description: 【自动化测试】Appium 安装使用
keywords: iOS, Xcode, Appium, 自动化测试
topmost: false
---

**导读：** 
该篇文章主要记录基于 `Appium` 的 `自动化测试` 开发实践。

## 环境配置

**01 - 安装 homebrew**

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**02 - 安装 libimobiledevice**

```
brew install libimobiledevice
```

执行过程中可能会出现如下问题：

```
{21-07-12 10:25}[ruby-2.7.0]mxgx-3:~ mxgx% brew install libimobiledevice 
Error: The following directories are not writable by your user:
/usr/local/lib
/usr/local/lib/pkgconfig

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/lib /usr/local/lib/pkgconfig

And make sure that your user has write permission.
  chmod u+w /usr/local/lib /usr/local/lib/pkgconfig
{21-07-12 10:28}[ruby-2.7.0]mxgx-3:~ mxgx% sudo chown -R $(whoami) /usr/local/lib /usr/local/lib/pkgconfig/
Password:
{21-07-12 10:46}[ruby-2.7.0]mxgx-3:~ mxgx% brew install libimobiledevice 
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> New Formulae
clarinet              func-e                graphqurl             mariadb@10.5          ncc
==> Updated Formulae
Updated 1087 formulae.
......
......
......
```

![brew install libimobiledevice 安装失败](/images/Test/2021-07-12-Appium-Use-01.png)

只需要依照终端返回的信息，执行对应的命令即可，中途中可能会需要输入 `管理员密码`，输入回车即可。

```
/// 本人此处执行该指令：
sudo chown -R $(whoami) /usr/local/lib /usr/local/lib/pkgconfig/
```

最后执行结果：

```
{21-07-12 10:46}[ruby-2.7.0]mxgx-3:~ mxgx% brew install libimobiledevice 
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> New Formulae
clarinet              func-e                graphqurl             mariadb@10.5          ncc
==> Updated Formulae
Updated 1087 formulae.

==> Downloading https://ghcr.io/v2/homebrew/core/libplist/manifests/2.2.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/libplist/blobs/sha256:1ac05ef69cc02f4663fbb1c3d6d6e964c70a5ba
......
......      ----> 该处省略
......
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:277577a3a30ff9bf60d0e4b81
######################################################################## 100.0%
==> Installing dependencies for wget: libidn2
==> Installing wget dependency: libidn2
==> Pouring libidn2--2.3.1.big_sur.bottle.1.tar.gz
🍺  /usr/local/Cellar/libidn2/2.3.1: 73 files, 812.3KB
==> Installing wget
==> Pouring wget--1.21.1.big_sur.bottle.1.tar.gz
🍺  /usr/local/Cellar/wget/1.21.1: 88 files, 4MB
Removing: /usr/local/Cellar/wget/1.20.3_2... (50 files, 4.0MB)
==> Checking for dependents of upgraded formulae...
==> No broken dependents found!
{21-07-12 11:24}[ruby-2.7.0]mxgx-3:~ mxgx% 
```

**03 - 安装 ideviceinstaller（真机安装相关）**

```
brew install ideviceinstaller
```

执行结果如下：

```
{21-07-12 11:24}[ruby-2.7.0]mxgx-3:~ mxgx% brew install ideviceinstaller
Updating Homebrew...
==> Downloading https://ghcr.io/v2/homebrew/core/libzip/manifests/1.8.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/libzip/blobs/sha256:f5b0d74305b2f249a8389bbee71ab51e446fcc824c950b2a954860d21e4d61b4
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:f5b0d74305b2f249a8389bbee71ab51e446fcc824c950b2a954860d21e4d61b4?se=2021-07-1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/ideviceinstaller/manifests/1.1.1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/ideviceinstaller/blobs/sha256:6d98523b90770662e350311c375f1157ac0c708769ce2145036aeed451e26621
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:6d98523b90770662e350311c375f1157ac0c708769ce2145036aeed451e26621?se=2021-07-1
######################################################################## 100.0%
==> Installing dependencies for ideviceinstaller: libzip
==> Installing ideviceinstaller dependency: libzip
==> Pouring libzip--1.8.0.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/libzip/1.8.0: 144 files, 771KB
==> Installing ideviceinstaller
==> Pouring ideviceinstaller--1.1.1.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/ideviceinstaller/1.1.1: 8 files, 101.6KB
{21-07-12 11:30}[ruby-2.7.0]mxgx-3:~ mxgx% 
```

![brew install ideviceinstaller 安装信息](/images/Test/2021-07-12-Appium-Use-02.png)




## 参考链接

- [Appium - 官网](http://appium.io/)
- [Appium - 简介](http://appium.io/docs/cn/about-appium/intro/)
-
- [MAC下搭建 appium+ios+python 自动化测试环境（一）](https://www.jianshu.com/p/505525e2bb01)
- [Mac 下 appium 自动化测试iOS 测试配置和脚本编写(二)](https://www.jianshu.com/p/73981e3265d5)
- [Mac 下 搭建appium +android+python 自动化测试环境(三)](https://www.jianshu.com/p/c91e073cb859)
- [Mac 下 appium 自动化测试 Android 测试配置和脚本编写(四)](https://www.jianshu.com/p/fd068f80f9b2)


## 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【自动化测试】Appium 安装使用](https://jijiucheng.github.io/2021/07/12/Appium-Use/)
> 
> **发表日期**：2021/07/12 16:00:00
> 
> **更新日期**：2021/07/12 16:00:00
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


