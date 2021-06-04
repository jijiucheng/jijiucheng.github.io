---
layout: post
title: 【Git】日常 Git/Github 报错处理（2021.06.04 更新）
categories: Git
description: 【Git】日常 Git/GitHub 报错处理
keywords: iOS, Xcode, Git, GitHub, Error
topmost: true
---

**导读：** 
该篇文章主要用于收录日常使用 `Git/GitHub` 时各种报错问题，以及相应的解决方法。同时，该篇文章会置顶长期不定时更新。

# 问题

### 1、fatal: unable to access 'https://github.com/xxx/xxx.git/': Failed to connect to github.com port 443: Operation timed out

#### 问题描述

日常开发中，经常会 `clone` `github` 上的仓库到本地，而常见的方式也就是通过 `clone` 以 `https` 或 `ssh` 两种方式为主。其中以 `https` 方式的话，一般不需要做什么特殊处理。而以 `ssh` 方式的话，一般需要配置 `id_rsa.pub` 文件。

当通过 `git pull` 准备拉取最新代码时，发现一直没有响应，当超过一段时间后报错：

```swift
git --no-optional-locks -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree fetch origin 
fatal: unable to access 'https://github.com/SunshineBrother/JHBlog.git/': Failed to connect to github.com port 443: Operation timed out
Completed with errors, see above
```

![Git-Errors-01](/images/Git/2021-04-20-Git-Errors-01.png)

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

### 2、fatal: bad object refs/remotes/origin/HEAD error: failed to run repack

#### 问题描述

本来打算对 `git` 仓库进行清理缓存分支，包括清理已经被删除的的分支，
然而当执行完 `git fetch -p` 后，出现了该报错：

```swift
{21-06-04 10:22}[ruby-3.0.0]jcji:~/xxxxxx@master-ED mxgx% git fetch -p

Auto packing the repository in background for optimum performance.
See "git help gc" for manual housekeeping.
warning: The last gc run reported the following. Please correct the root cause
and remove .git/gc.log.
Automatic cleanup will not be performed until the file is removed.

fatal: bad object refs/remotes/origin/HEAD
fatal: failed to run repack
```

然而根据报错信息，并未在 `~/.git/refs/remotes/origin/HEAD` 对应的文件夹，即使开启隐藏文件模式依旧如此。

![Git-Errors-03](/images/Git/2021-04-20-Git-Errors-03.png)

#### 问题原因

主要原因应该是提交的改动过多，导致本地的缓冲区占用太大，本地一些 `悬空对象` 太多 `（git删除分支或者清空 stash 的时候，这些其实还没有真正删除，成为悬空对象）`。

所以主要的解决方式就是要清除这些缓存对象，然后才能对分支进行清理。

#### 问题解决

依次执行清除命令即可：

```swift 
$ mv .git/refs/remotes/origin/HEAD /tmp
$ git gc
```

![Git-Errors-02](/images/Git/2021-04-20-Git-Errors-02.png)

#### 参考链接

- [How to handle git gc fatal: bad object refs/remotes/origin/HEAD error?](https://stackoverflow.com/questions/37145151/how-to-handle-git-gc-fatal-bad-object-refs-remotes-origin-head-error/38192799#38192799)
- [【开发工具的那些故事】git问题记录（三）：error: The last gc run reported the following. Please correct the root cause a](https://blog.csdn.net/yy339452689/article/details/108641201)

# 参考链接

- [git clone 出现fatal: unable to access ‘https://github 类错误解决方法](https://blog.csdn.net/gbz3300255/article/details/97103621)
- [Git使用出现git@github.com: Permission denied (publickey). 处理](https://blog.csdn.net/qq_43768946/article/details/90411154)
- [How to handle git gc fatal: bad object refs/remotes/origin/HEAD error?](https://stackoverflow.com/questions/37145151/how-to-handle-git-gc-fatal-bad-object-refs-remotes-origin-head-error/38192799#38192799)
- [【开发工具的那些故事】git问题记录（三）：error: The last gc run reported the following. Please correct the root cause a](https://blog.csdn.net/yy339452689/article/details/108641201)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【Git】日常 Git/GitHub 报错处理](https://jijiucheng.github.io/2021/04/20/Git-Errors/)
> 
> **发表日期**：2021/04/20 16:00:00
> 
> **更新日期**：2021/06/04 11:00:00
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


