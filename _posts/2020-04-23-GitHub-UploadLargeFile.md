---
layout: post
title: 【Git】GitHub 上传超过 100MB 的大文件（git-lfs）
categories: Git
description: GitHub 上传超过 100MB 的大文件解决办法，使用 git-lfs
keywords: GitHub, git-lfs
topmost: false
---

**导读：** 
最近在 `GitHub` 上传代码时，需要上传一些大文件，有时候甚至会超过 `100MB`，则由于 `GitHub` 不支持上传如此大的文件，所以提交代码时往往都会报错！！！

```
# 类似报错信息

Total 3007 (delta 664), reused 0 (delta 0)
remote: error: GH001: Large files detected.
remote: error: Trace: 7b7de6b9372ee392e0f3961b05ea6f33
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File  XXX/XXX/XXX is 234 MB; this exceeds GitHub‘s file size limit of 100.00 MB
remote: error: File  XXX/XXX/XXX is 234 MB; this exceeds GitHub‘s file size limit of 100.00 MB。
```

经过一番资料查询，暂时最优的处理方式就是借助 `git lfs` 的方式。

# Git LFS

### Git LFS 基本介绍

`Git LFS` 是 `Github` 开发的一个 `Git` 的扩展，用于实现 `Git` 对大文件的支持。

![git-grow](/images/Blog/2020-04-23-GitHub-UploadLargeFile-GitLFS.gif)

![git-grow](/images/Blog/2020-04-23-GitHub-UploadLargeFile-GitGrow.png)

在游戏开发过程中，设计资源占用了很大一部分空间。像 `png、psd` 等文件是二进制 (blob) 的，体积也很庞大。

但 `git` 的 `diff/patch` 等是基于文件行的，对于二进制文件来说，`git` 需要存储每次 `commit` 的改动。

每次当二进制文件修改，发生变化的时候，都会产生额外的提交量，导致 `clone` 和 `pull` 的数据量大增，在线仓库的体积也会迅速增长。

**LFS（Large File Storage）** 就是为了解决这一问题而产生的工具。

它将你所标记的大文件保存至另外的仓库，而在主仓库仅保留其轻量级指针；则在检出版本时，根据指针的变化情况下更新对应的大文件，而不是在本地保存所有版本的大文件。

![Store](/images/Blog/2020-04-23-GitHub-UploadLargeFile-Store.png)

### 安装 Git LFS

根据系统环境将 `git - lfs` 安装到本机。

#### Linux

```
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash

# 安装 git - lfs 到本机
sudo apt-get install git-lfs
```

#### Mac

```
# 安装HomeBrew 
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 安装 git - lfs 到本机
brew install git-lfs
```

![Brew Install Git LFS](/images/Blog/2020-04-23-GitHub-UploadLargeFile-BrewInstallGitLFS.png)

#### Windows

```
# 下载安装 Windows installer
https://github.com/github/git-lfs/releases

# 运行 windows installer
```

### 开启 LFS 功能

首先，到达指定 `git` 项目文件夹，执行安装命令，开启 `lfs` 功能。

```
$ cd xxx

# 只需执行一次即可，即可开启 lfs 功能
$ git lfs install 
```

其次，选择您希望 `Git LFS` 管理的文件类型，默认会生成一个 `.gitattributes` 文件。

```
# 此处建议此种格式，可以统一关联 .zip 类型的文件（具体文件类型，视项目而定）
$ git lfs track "*.zip"
```

### 提交大文件

如果将 `.gitattributes` 文件和大文件一起提交，有可能会报错误：

![git push origin master - error](/images/Blog/2020-04-23-GitHub-UploadLargeFile-GitPushError.png)

所以此处建议分两步，优先建议先将 `.gitattributes` 文件提交到 `git` 云端上面。

```
$ cd xxx
$ git add .gitattributes
$ git commit -m '提交 .gitattributes 文件'
$ git push origin master
```

![git push origin master - gitattributes](/images/Blog/2020-04-23-GitHub-UploadLargeFile-GitPushGitAttributes.png)

然后再次通过 `Git LFS` 提交大文件。

```
# 其中 xxx 代表大文件路径
$ git add xxx
$ git commit -m '提交 xxx 大文件'
$ git push origin master
```

此过程中可能会遇到如下报错：

```
mxgx:JJC_GoWeb jijiucheng$ git push origin master
Uploading LFS objects:   0% (0/1), 352 MB | 1.7 MB/s, done.                                                   
Post https://lfs.github.com/jijiucheng/JJC_GoWeb/objects/29642e323ee844d60b3a823c404bf80d41c5ab9bfd50bc22476850e52aaad112/verify: dial tcp 13.250.168.23:443: connect: connection refused
error: failed to push some refs to 'https://github.com/jijiucheng/JJC_GoWeb.git'
```

![git push origin master - largeFileError](/images/Blog/2020-04-23-GitHub-UploadLargeFile-GitPushLargeFileError.png)

此时需要排查一些相关问题：

- 可能是 DNS 的问题，建议添加 `8.8.8.8`；
- 可能是走了代理，建议把代理关闭再重试（本人此处失败就是因为这个原因）；
- 网络是否正常连接，不能出现中断的情况。

**此处说明：**

- 在网上查找了一些相关资料，发现有好多都是提示使用 `$ git push -u origin master` 或 `$ git push -u origin master -f` 指令解决的，但是本人这边验证的暂时无效，没有解决问题。

当排查完原因后，再次执行推送到远程的指令即可。

### Git-LFS 常用指令

```git
# 查看 git-lfs 相关指令
git lfs --help
# 查看 git-lfs 当前环境版本等信息
git lfs env
# 查看 git-lfs 当前版本号
git lfs version
# 查看 git-lfs 文件状态
git lfs status
# 查看 git-lfs 文件内容填充副本
git lfs checkout
# 查看 git-lfs 扩展信息
git lfs ext
# 检查 git-lfs 文件一致性
git lfs fsck
# 查看 git-lfs 命令的错误信息
git lfs logs
# 显示 git-lfs 当前分支下所有的文件信息
git lfs ls-files

# 安装 git-lfs 配置，只需执行一次即可，即可开启 lfs 功能
git lfs install 
# 关闭 lfs 功能
git lfs uninstall
# 从远程端拉取 git-lfs 文件
git lfs fetch
# 从远处端拉取 git-lfs 文件，并标明变更文件
git lfs pull
# 更新 git-lfs 文件
git lfs update

# 此处建议此种格式，可以统一关联 .zip 类型的文件（具体文件类型，视项目而定）
git lfs track "*.zip"
# 取消关联某文件
git lfs untrack "*.zip"
# 从本地存储中删除旧的 git-lfs 文件
git lfs prune xxx
# 对 git-lfs 文件去重（同时会显示当前分支下所有 git-lfs 文件）
git lfs dedup

# 对 git-lfs 文件设置为 “锁定” 状态
git lfs lock xxx
# 对 git-lfs 文件移除 “锁定” 状态
git lfs unlock xxx
# 查看当前 git-lfs 服务器上所有 “锁定” 状态文件
git lfs locks
# 迁移历史信息到 git-lfs 或 从 git-lfs 迁移到历史信息
git lfs migrate


```

```git
git-lfs-env(1)
              Display the Git LFS environment.

       git-lfs-checkout(1)
              Populate working copy with real content from Git LFS files.

       git-lfs-dedup(1)
              De-duplicate Git LFS files.

              git-lfs-ext(1)
              Display Git LFS extension details.

       git-lfs-fetch(1)
              Download Git LFS files from a remote.

       git-lfs-fsck(1)
              Check Git LFS files for consistency.

       git-lfs-install(1)
              Install Git LFS configuration.

       git-lfs-lock(1)
              Set a file as "locked" on the Git LFS server.

              git-lfs-locks(1)
              List currently "locked" files from the Git LFS server.

       git-lfs-logs(1)
              Show errors from the Git LFS command.

       git-lfs-ls-files(1)
              Show information about Git LFS files in the index and working tree.

       git-lfs-migrate(1)
              Migrate history to or from Git LFS

       git-lfs-prune(1)
              Delete old Git LFS files from local storage

       git-lfs-pull(1)
              Fetch Git LFS changes from the remote & checkout any required working tree files.

       git-lfs-push(1)
              Push queued large files to the Git LFS endpoint.

       git-lfs-status(1)
              Show the status of Git LFS files in the working tree.

              git-lfs-track(1)
              View or add Git LFS paths to Git attributes.

       git-lfs-uninstall(1)
              Uninstall Git LFS by removing hooks and smudge/clean filter configuration.

       git-lfs-unlock(1)
              Remove "locked" setting for a file on the Git LFS server.

       git-lfs-untrack(1)
              Remove Git LFS paths from Git Attributes.

       git-lfs-update(1)
              Update Git hooks for the current Git repository.

       git-lfs-version(1)
              Report the version number.
```

# 参考链接

- [简书 - amosbake - Git LFS的使用](https://www.jianshu.com/p/493b81544f80)
- [简书 - 码农大表哥 - Github如何上传超过100M的大文件](https://www.jianshu.com/p/3f25cd20e392)
- [廖雪峰的官方网站 - 版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)
- [CSDN - 无极侠岚 - sourcetree 不停的让输入密码，报 password required](https://blog.csdn.net/qq_24143469/article/details/86760386)
- [StackOverflow - git error: failed to push some refs to remote](https://stackoverflow.com/questions/24114676/git-error-failed-to-push-some-refs-to-remote)
- [GitHub - git-lfs - git lfs fetch hangs#3003](https://github.com/git-lfs/git-lfs/issues/3003)
- [GitHub - git-lfs - Cannot push lfs to GitHub. Getting connection refused. #2474](https://github.com/git-lfs/git-lfs/issues/2474)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【Blog】GitHub 上传超过 100MB 的大文件（git-lfs）](https://jijiucheng.github.io/2020/04/23/GitHub-UploadLargeFile/)
> 
> **发表日期**：2020/04/23 09:00:00
> 
> **更新日期**：2020/07/08 14:40:00
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


