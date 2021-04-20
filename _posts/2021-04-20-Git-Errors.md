---
layout: post
title: 【Git】日常 Git/Github 报错处理
categories: Git
description: 【Git】日常 Git/GitHub 报错处理
keywords: iOS, Xcode, Git, GitHub, Error
topmost: true
---

**导读：** 
该篇文章主要用于收录日常使用 `Git/GitHub` 时各种报错问题，以及相应的解决方法。同时，该篇文章会置顶长期不定时更新。

# 问题

### fatal: unable to access 'https://github.com/xxx/xxx.git/': Failed to connect to github.com port 443: Operation timed out

#### 问题描述

日常开发中，经常会 `clone` `github` 上的仓库到本地，而常见的方式也就是通过 `clone` 以 `https` 或 `ssh` 两种方式为主。其中以 `https` 方式的话，一般不需要做什么特殊处理。而以 `ssh` 方式的话，一般需要配置 `id_rsa.pub` 文件。

当通过 `git pull` 准备拉取最新代码时，发现一直没有响应，当超过一段时间后报错：

```
git --no-optional-locks -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree fetch origin 
fatal: unable to access 'https://github.com/SunshineBrother/JHBlog.git/': Failed to connect to github.com port 443: Operation timed out
Completed with errors, see above
```

![fatal: unable to access 'https://github.com/xxx/xxx.git/': Failed to connect to github.com port 443: Operation timed out](/images/Git/2020-04-20-Git-Errors-01.png)

#### 问题原因

暂时不明，猜测应该是与 `git` 执行路径有关。

#### 问题解决

暂时发现两种解决方式：

**方法一：**

将对应仓库的远程链接中的 `https` 更改为 `git`，然后重新执行即可。

比如：`https://github.com/SunshineBrother/JHBlog.git` 更改为 `git://github.com/SunshineBrother/JHBlog.git`

经过测试，发现有效。但是原因不明。

**方法二：（推荐）**

将曾经的 `https` 方式变更为 `ssh` 方式即可。

> **配置 GitHub + SSH 关联方式**
> 
> 1、通过根目录查找 `.ssh` 文件夹
> 
> ```$ cd ~/.ssh/```
> 
> 2、通过 `ls` 指令查看 `.ssh` 文件夹下是否包含 `id_rsa.pub` 文件
> 
> ```$ ls```
> 
> 3、如果不包含，则生成相应文件
> 
> ```$ ssh-keygen -t rsa -C "github账户邮箱"```
> 
> 4、查看生成的 `id_rsa.pub` 文件
> 
> ```$ cat id_rsa.pub```
> 
> 5、将显示的字符串拷贝新增到 `github -> Settings -> SSH and GPG keys` 中的 `SSH` 一栏中即可
> 
> 6、测试是否通过
> 
> ```$ ssh -T git@github.com```
> 
> 7、如果显示类似字样，即代表成功：
> 
> ```Hi xxxxxxApr 20, 2021! You've successfully authenticated, but GitHub does not provide shell access.```

#### 参考链接

- [git clone 出现fatal: unable to access ‘https://github 类错误解决方法](https://blog.csdn.net/gbz3300255/article/details/97103621)
- [Git使用出现git@github.com: Permission denied (publickey). 处理](https://blog.csdn.net/qq_43768946/article/details/90411154)

# 参考链接

- [git clone 出现fatal: unable to access ‘https://github 类错误解决方法](https://blog.csdn.net/gbz3300255/article/details/97103621)
- [Git使用出现git@github.com: Permission denied (publickey). 处理](https://blog.csdn.net/qq_43768946/article/details/90411154)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【Git】日常 Git/GitHub 报错处理](https://jijiucheng.github.io/2021/04/20/Git-Errors/)
> 
> **发表日期**：2021/04/20 16:00:00
> 
> **更新日期**：2021/04/20 16:00:00
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


