---
layout: post
title: 【iOS】SPM（Swift Package Manage）
categories: iOS
description: 【iOS】SPM（Swift Package Manage）使用介绍和下载、拉取缓慢问题解决
keywords: iOS, SPM, Swift Package Manage
topmost: false
---

**导读：**
该篇文章主要介绍 `SPM（Swift Package Manage）` 的使用和下载、拉取缓慢问题解决。

### SPM 简介

### SPM 下载、拉取缓慢问题解决
#### 前提准备

由于 `SPM` 主要还是从 `Github` 上拉取对应的三方库，所以只要把对应的 Github 访问资源速度搞定，基本上也就差不多了。

最好的方式，就是通过添加 `hosts` 的方式，也就是查询 `DNS` 的方式：
- 可以借助 站长工具 - DNS 查询 进行查询；
- 查询对应的域名：

```
20.205.243.166  github.com
185.199.110.153 github.io
185.199.110.133 raw.githubusercontent.com
185.199.108.154 github.githubassets.com
185.199.109.133 avatars1.githubusercontent.com
185.199.109.133 avatars2.githubusercontent.com
185.199.109.133 avatars3.githubusercontent.com
185.199.109.133 avatars4.githubusercontent.com
``` 

Mac 端对应的 host 地址：
- `/private/etc/hosts`
  - ![](/images/iOS/2026-01-06-iOS-SPM（Swift%20Package%20Manage）-01.png)
- 也可以借助三方工具：
  - 如 [SwitchHosts - 跨平台 hosts 管理工具](https://github.com/oldj/SwitchHosts/releases) 专门管理 hosts 的工具。
- 刷新 DNS 指令：
  - `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

#### 首次添加（亲测有效）

- 需要科学上网；
- 直接开启全局代理方式，进行搜索、添加；
- 最好的方式是通过手机开通一个热点，然后再次进行全局代理进行搜索。

#### 二次更新（亲测有效）

通过查看当前连接的 WiFi 详情（需要开启科学上网的情况下）：

![](/images/iOS/2026-01-06-iOS-SPM（Swift%20Package%20Manage）-02.png)

直接在当前项目的根目录下打开终端（需要科学上网），并执行如下指令：
- 注意：
  - **只在当前窗口有效，关闭窗口需要重新执行**。

```
// 执行终端代理（已测试）--------------------
// 命令行(终端) 开启代理，执行如下指令
export http_proxy=http://127.0.0.1:你的http端口号
export https_proxy=http://127.0.0.1:你的http端口号
export all_proxy=socks5://127.0.0.1:你的socks5端口号

// 最后执行如下指令进行更新
xcodebuild -resolvePackageDependencies -scmProvider system

// 其它可能会用到的指令
// 强制关闭 Xcode
killall -9 Xcode

// 通过终端指令打开 Xcode
open -a Xcode.app


// 开启终端代理（方法二）（未测试）--------------------
// 命令行（终端）开启代理，执行如下指令
git config --global http.proxy "http://127.0.0.1:端口号"
git config --global https.proxy "http://127.0.0.1:端口号"

// 取消终端代理
git config --global --unset http.proxy 
git config --global --unset https.proxy
```

当所有的更新完成后，再次开启 Xcode 就会默认显示更新完成，不会再次执行 resolving......

### SPM + 项目

首先是找到所需要添加的三方库地址，此处通过 `MJExtension` 进行举例：
- [https://github.com/CoderMJLee/MJExtension.git](https://github.com/CoderMJLee/MJExtension.git)

然后通过 Xcode 添加 Package Dependencies：

![](/images/iOS/2026-01-06-iOS-SPM（Swift%20Package%20Manage）-03.png)

添加依赖的管理方式主要由如下几个方式：
- **Up to Next Major Version**
  - 向上至大版本，默认方式，如 `3.4.2 < 4.0.0`。
- **Up to Next minor Version**
  - 向上至小版本，如 `3.4.2 < 3.5.0`。
- **Exact Version**
  - 固定版本，如 `3.4.2`。
- **Range of Version**
  - 固定范围的版本，如 `3.4.2 < 3.5.2`
- **Branch**
  - 根据某个分支进行版本依赖，如 `master` 分支、`fix` 分支。
  - 自己实测会拉取失败。
- **Commit**
  - 通过某个 commit 提交进行版本依赖，如 `3799654xxx..xxxxd6e31af`。

然后在使用上则是通过 `import MJExtension` 的方式引入；

实测记录：
- **[Github - SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON)**
  - 在通过 [https://github.com/SwiftyJSON/SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON)  进行库搜索时，是可以搜索到对应的 SPM 库的，对应的版本号是 `5.0.2`，官方也通过 5.0.0 的时宣布支持 SPM 的依赖方式；
  - 但是当通过 `Up to Next Major Version` 的方式进行添加依赖时，会报如下错误：
  - 报错信息：

```
SwiftyJSON:
    Updating from https://github.com/SwiftyJSON/SwiftyJSON.git
Failed to resolve dependencies Dependencies could not be resolved because no versions of 'swiftyjson' match the requirement 5.0.2..<6.0.0 and root depends on 'swiftyjson' 5.0.2..<6.0.0.
unexpectedly did not find the new dependency in the package graph: sourceControl(identity: swiftyjson, location: SwiftPM.SPMPackageDependency.SourceControlLocation.remote(SwiftPM.SPMSourceControlURL(sourceControlURL: https://github.com/SwiftyJSON/SwiftyJSON.git)), requirement: 5.0.2 – Next Major)
```

![](/images/iOS/2026-01-06-iOS-SPM（Swift%20Package%20Manage）-04.png)

-
    - 然后又尝试了其它几种方式，甚至于包括 Branch 的方式，也都是会报错，而官方也一年多未进行该库的维护了，所以只能尝试其它方式；
    - 最终是选择 `Commit` 的方式，选择了某个节点的提交码，最终得以成功。

![](/images/iOS/2026-01-06-iOS-SPM（Swift%20Package%20Manage）-05.png)

### SPM 开源库
 
### 参考链接

- [TimorYang / SPM 下载慢解决方案（推荐）](https://gist.github.com/TimorYang/998a195ce1bf9362c65c508b6e7935d3)
- [Swift Package Manager 速度慢解决方案](https://blog.csdn.net/abcliuliu120/article/details/142797760)
- [解决swift package manager fetch慢的问题（推荐）](https://www.cnblogs.com/vlucht/p/15015875.html)
- [站长工具 - DNS 查询](https://tool.chinaz.com/dns/)
- [SwitchHosts - 跨平台 hosts 管理工具](https://github.com/oldj/SwitchHosts/releases)
- [Github - SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
>
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【前端】XSS 安全问题](https://jijiucheng.github.io/2026/01/06/iOS-SPM（Swift Package Manage）)
>
> **发表日期**：2026/01/06 16:00:00
>
> **更新日期**：2026/01/06 16:00:00
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
