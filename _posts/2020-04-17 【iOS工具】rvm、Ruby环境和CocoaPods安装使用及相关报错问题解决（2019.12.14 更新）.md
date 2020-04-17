[TOC]


# 〇、前言
<p>
在iOS开发中 [CocoaPods](https://github.com/CocoaPods/CocoaPods) 作为库依赖管理工具就是一把利器。

有了 `CocoaPods` 则无需再通过拖 `第三方库` 及第三方库所依赖的 `framework` 静态库到项目中等麻烦的操作，仅仅只需要通过终端`（Terminal）`输入一些指令即可完成这些操作；而且涉及到第三方库的更新升级也可以通过 `CocoaPods` 进行手动管理更新。

方便快捷！赶快行动起来吧！！！

# 一、Homebrew、Rvm、Ruby、CocoaPods 简介

### 1、官网及相关链接
**Rvm 官网** ： https://www.rvm.io/
**Ruby 官网** ：https://rubygems.org/
**CocoaPods 官网** ：https://cocoapods.org/
`Rvm 安装指南` ：https://rvm.io/rvm/install
`Homebrew 官网` ：http://brew.sh/index_zh-cn.html
`ruby 镜像 - taobao`：https://ruby.taobao.org/
`ruby 镜像 - china`：https://gems.ruby-china.org/

### 2、Homebrew 介绍
  -  `Homebrew` 是一个软件包管理器，用于在mac上安装一些os x上没有的UNiX工具；类似于360软件管理器。

### 3、Rvm 介绍
  - `Rvm` 全称 `Ruby Version Manager` ，是安装和管理 `ruby` 的一种工具。
  - 摘录：`RVM is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems.`

### 4、Ruby 介绍
  - `Ruby` 是一种面向对象的脚本语言，简单易用，功能强大。能跨平台和可移植性好等等。其实就是种脚本语言。
  - `Ruby` 的软件源使用的是亚马逊的云服务，国内网络环境下载时可能会出现各种不稳定和超时，所以自带的需要翻墙，可以将 `官方 ruby 源` 替换成国内 `淘宝 ruby 源`（[https://ruby.taobao.org/](https://ruby.taobao.org/) ）或者是由 `China ruby 源` （[https://gems.ruby-china.org/](https://gems.ruby-china.org/) ）。据消息了解，2016.06 `淘宝源` 暂停维护了，建议使用 `China ruby 源`。


### 5、CocoaPods 介绍
  - `CocoaPods` 是 iOS 最常用的第三方类库管理工具，绝大部分有名的开源类库都支持 `CocoaPods`。
  - `CocoaPods` 是用 `ruby` 实现的，要想使用它首先需要有 `ruby` 的环境。幸运的是OS X系统默认已经可以运行 `ruby` 了。但是有时候 `ruby` 版本过低是无法正常支持 `CocoaPods` 的使用，所以需要先安装更新升级 `rvm` 和 `ruby`。


# 二、CocoaPods 安装使用

### 1、检查安装 rvm 环境（ 正常情况可直接略过此步骤 ）

- 检查当前 `rvm` 环境（ 此处检查是否存在 `rvm` 环境 ）：
```
$ rvm -v
```
```
`输出结果：（ 存在 rvm 环境）`
muxuguixiandeMacBook-Pro:~ jijiucheng$ rvm -v
rvm 1.27.0 (latest) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
```
```
`输出结果：（不存在 rvm 环境）`
muxuguixiandeMacBook-Pro:~ jijiucheng$ rvm -v
-bash: rvm: command not found
```

  - **情况一**：如果不存在 `rvm` 环境，先安装配置 `rvm` 环境；
```
① 期间可能会问你 `sudo管理员` 密码，以及自动通过 `homebrew` 安装依赖包；
等待一段时间后就可以成功安装好 `rvm`。
```
```
$ curl -L https://get.rvm.io | bash -s stable
```
```
输出结果：（下载安装）（显示的 `` 代表一行空格）
muxuguixiandeMacBook-Pro:~ jijiucheng$ curl -L https://get.rvm.io | bash -s stable
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current Dload  Upload   Total   Spent    Left  Speed
100   184  100   184    0     0     93      0  0:00:01  0:00:01 --:--:--    93
100 22865  100 22865    0     0   8964      0  0:00:02  0:00:02 --:--:--  710k
Downloading https://github.com/rvm/rvm/archive/1.27.0.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.27.0/1.27.0.tar.gz.asc
Found PGP signature at: 'https://github.com/rvm/rvm/releases/download/1.27.0/1.27.0.tar.gz.asc',
but no GPG software exists to validate it, skipping.
``
`Installing RVM to /Users/smalllufeinj/.rvm/`
    Adding rvm PATH line to /Users/smalllufeinj/.profile /Users/smalllufeinj/.mkshrc /Users/smalllufeinj/.bashrc /Users/smalllufeinj/.zshrc.
    Adding rvm loading line to /Users/smalllufeinj/.profile /Users/smalllufeinj/.bash_profile /Users/smalllufeinj/.zlogin.
`Installation of RVM in /Users/smalllufeinj/.rvm/ is almost complete:`
``
  .* To start using RVM you need to run `source /Users/smalllufeinj/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.
``
# muxuguixian,
#
#   Thank you for using RVM!
#   We sincerely hope that RVM helps to make your life easier and more enjoyable!!!
#
# ~Wayne, Michal & team.
``
In case of problems: https://rvm.io/help and https://twitter.com/rvm_io
```
![下载安装 rvm 环境.png](https://images.xiaozhuanlan.com/photo/2019/b69788f5ad2d506e34eb4d863386c7da.png)

```
② 然后，载入 RVM 环境（新开 Termal 就不用这么做了，会自动重新载入的）。
```

```
$ source ~/.rvm/scripts/rvm
```
```
输出结果：（^_^）（什么都没有输出）
muxuguixiandeMacBook-Pro:~ jijiucheng$ source ~/.rvm/scripts/rvm
```
```
③ 再次检查 rvm 是否安装正确。
```
```
$ rvm -v
```
```
`输出结果：（ 存在 rvm 环境）`
muxuguixiandeMacBook-Pro:~ jijiucheng$ rvm -v
rvm 1.27.0 (latest) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
```

  - **情况二**：如果存在 `rvm` 环境，用 `rvm` 安装 `ruby` 环境；
  - 当 `ruby` 版本低于 `2.2.2` 时，安装 `CocoaPods` 会报错；为防止 `ruby` 版本过低，建议先升级 `ruby` 环境，建议升级到 `2.3.0` 版本以上。【可以通过 `$ ruby -v` 指令检查当前 ruby 版本】
```
  ① 查询已知的 ruby 环境。
```
```
$ rvm list known
```
```
输出结果：（显示的 `` 代表一行空格）
muxuguixiandeMacBook-Pro:~ jijiucheng$ rvm list known
# MRI Rubies
[ruby-]1.8.6[-p420]
[ruby-]1.8.7[-head] # security released on head
[ruby-]1.9.1[-p431]
[ruby-]1.9.2[-p330]
[ruby-]1.9.3[-p551]
[ruby-]2.0.0[-p648]
[ruby-]2.1[.8]
[ruby-]2.2[.4]
[ruby-]2.3[.0]
[ruby-]2.2-head
ruby-head
``
# for forks use: rvm install ruby-head-<name> --url https://github.com/github/ruby.git --branch 2.2
``
# JRuby
jruby-1.6[.8]
jruby-1.7[.23]
jruby[-9.0.5.0]
jruby-head
``
# Rubinius
rbx-1[.4.3]
rbx-2.3[.0]
rbx-2.4[.1]
rbx[-2.5.8]
rbx-head
``
# Opal
opal
``
# Minimalistic ruby implementation - ISO 30170:2012
mruby[-head]
``
# Ruby Enterprise Edition
ree-1.8.6
ree[-1.8.7][-2012.02]
``
# GoRuby
goruby
``
# Topaz
topaz
``
# MagLev
maglev[-head]
maglev-1.0.0
``
# Mac OS X Snow Leopard Or Newer
macruby-0.10
macruby-0.11
macruby[-0.12]
macruby-nightly
macruby-head
``
# IronRuby
ironruby[-1.1.3]
ironruby-head
```
![查询已知的 ruby 环境 .png](https://images.xiaozhuanlan.com/photo/2019/cf1ed58d9d8892cc93062fee57391ecc.png)

```
② 指定 ruby 版本进行更新（ 此处按照 ruby 2.3.0 版本进行更新 ）。
```
```
$ rvm install 2.3.0
```
```
输出结果：（ 此处因为终端输出的字符过多，所以此处用截图方式 ）
```
![指定 ruby 版本进行更新 .png](https://images.xiaozhuanlan.com/photo/2019/819d92576e886ab30b956797fa42ab73.png)

```
③ 第二步需要一段时间等待，完成后此时 rvm 环境就配置好了；Ruby Gems 就安装好了。
```
```
④ 补充相关指令：
```
*查询已安装的 ruby：*
```
$ rvm list
```
*卸载一个已安装版本：*
```
$ rvm remove 1.9.2
```


### 2、检查更新 ruby 版本环境（正常情况下从此步骤开始）

  - `CocoaPods` 是用 `gem ruby` 实现的，要想使用它首先需要有 `gem ruby` 的环境。且 MAC 的 OS X系统默认已经可以运行 `ruby` 。
  - 此处建议 `gem ruby` 包环境升级到 `2.6.x` 以上。
  - 检查 `gem ruby` 版本号：
```
$ sudo gem -v
```
```
检查结果：（ 默认情况下版本应该较低，建议升级到 ）
muxuguixiandeMacBook-Pro:local jijiucheng$ gem -v
2.5.1
```

  - 更新 `gem ruby` 版本号：
```
$ sudo gem update --system
```
```
更新成功：（ 实际打印可能与此不同，但是成功了就会显示 Successfully ）
muxuguixiandeMacBook-Pro:local jijiucheng$ gem update --system
Updating rubygems-update
Fetching: rubygems-update-2.6.7.gem (100%)
Successfully installed rubygems-update-2.6.7
```
```
此种提示：（ 表示已经是最新的 gem ruby 环境 ）
muxuguixiandeMacBook-Pro:~ jijiucheng$ gem update --system
Latest version currently installed. Aborting.
```

  - 检查 `ruby 源`
```
$ gem sources -l
```  
```
检查结果：（ 如果电脑没安装过 CocoaPods，此时应该是默认 ruby 源 ）
muxuguixiandeMacBook-Pro:~ jijiucheng$ gem sources -l
*** CURRENT SOURCES ***
https://rubygems.org/
```

  - 移除 `ruby 源`
```
$ gem sources --remove https://rubygems.org/
```
```
移除结果：
muxuguixiandeMacBook-Pro:local jijiucheng$ gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources
```

  - 替换添加国内镜像源 `ruby-china 源`，因为上面已经提到国内镜像源 `taobao 源` 已经停止维护了，所以此处替换的是 `ruby-china 源`，且尽量确保只有一个 `ruby-china 源`，
备注：`https://gems.ruby-china.org` 已废弃，改为`https://gems.ruby-china.com`
```
$ gem sources --add https://gems.ruby-china.com
```
```
替换结果：
muxuguixiandeMacBook-Pro:local jijiucheng$ gem sources --add https://gems.ruby-china.com
https://gems.ruby-china.com added to sources
```
```
再次检查此时的 ruby 源：（ 已经变成了 ruby-china 源 ）
muxuguixiandeMacBook-Pro:local jijiucheng$ gem sources -l
*** CURRENT SOURCES ***
https://gems.ruby-china.com
```

### 3、安装 CocoaPods

- 安装 CocoaPods（ `sudo 表示管理员执行指令` ）（ `此处需要输入一次密码` ）
```
$ sudo gem install cocoapods
```
```
`注意点：<------------------------------> 此处有个注意点`
由于 OS X 系统的不同，此处的指令也是有些变化:
OS X 10.11之前系统的安装 CocoaPods 指令： $ sudo gem install cocoapods
OS X 10.11以后系统的安装 CocoaPods 指令： $ sudo gem install -n /usr/local/bin cocoa pods
```
```
安装结果：（正常情况打印没有这么多，此处是因为解决报错时，同时打印了这么多）
muxuguixiandeMacBook-Pro:local jijiucheng$ sudo gem install cocoa pods
Password:   <----------------------------------->  // 此处需要输入一次密码 
Fetching: ffi-1.9.14.gem (100%)
Building native extensions.  This could take a while...
Successfully installed ffi-1.9.14
Fetching: thread_safe-0.3.5.gem (100%)
Successfully installed thread_safe-0.3.5
Fetching: tzinfo-1.2.2.gem (100%)
Successfully installed tzinfo-1.2.2
Fetching: i18n-0.7.0.gem (100%)
Successfully installed i18n-0.7.0
Fetching: concurrent-ruby-1.0.2.gem (100%)
Successfully installed concurrent-ruby-1.0.2
Fetching: activesupport-5.0.0.1.gem (100%)
Successfully installed activesupport-5.0.0.1
Fetching: cocoa-0.1.6.gem (100%)
Successfully installed cocoa-0.1.6
Parsing documentation for ffi-1.9.14
Installing ri documentation for ffi-1.9.14
Parsing documentation for thread_safe-0.3.5
Installing ri documentation for thread_safe-0.3.5
Parsing documentation for tzinfo-1.2.2
Installing ri documentation for tzinfo-1.2.2
Parsing documentation for i18n-0.7.0
Installing ri documentation for i18n-0.7.0
Parsing documentation for concurrent-ruby-1.0.2
Installing ri documentation for concurrent-ruby-1.0.2
Parsing documentation for activesupport-5.0.0.1
Installing ri documentation for activesupport-5.0.0.1
Parsing documentation for cocoa-0.1.6
Installing ri documentation for cocoa-0.1.6
Done installing documentation for ffi, thread_safe, tzinfo, i18n, concurrent-ruby, activesupport, cocoa after 34 seconds
Fetching: pods-0.0.1.gem (100%)
Successfully installed pods-0.0.1
Parsing documentation for pods-0.0.1
Installing ri documentation for pods-0.0.1
Done installing documentation for pods after 0 seconds
8 gems installed
<------------------ 此处有 gems installed 标志着安装 CocoaPods 成功 ------------------>
```
![安装 CocoaPods .png](https://images.xiaozhuanlan.com/photo/2019/4dcb8f4c4f09bfdfc492018e1c6f0615.png)

  - 正常情况下此处会出现很大的坑，经常会出现各种报错问题，大多数是为 `ruby` 环境过低没有更新升级，或者是牵扯到 `rvm` 管理器环境的问题，在后面各种报错问题的解决方案的中会有提到。


### 4、配置 CocoaPods 环境
  - **说明** ：此处为了做测试，在 MAC 桌面 `Desktop` 创建了一个工程 `CocoaPodsTestDemo`。

  - **第一步** ：`cd` 到目录文件夹，回车 `enter`（ `快速方式`：直接将文件夹拖入到终端 `Terminal` ）。
```
$ cd /Users/jijiucheng/Desktop/CocoaPodsTestDemo 
```
```
输入结果：（（^_^）此时没有任何结果 ）
muxuguixiandeMacBook-Pro:~ jijiucheng$ cd /Users/jijiucheng/Desktop/CocoaPodsTestDemo 
```

 - **第二步（建议）**：如果不知道第三方库版本的情况下，建议先查找一下当前所需第三方库的最新版本，可以通过输入指令的方式完成。并且查询完成后输入 `wq` 返回之前终端 `Terminal`页面。
```
$ pod search 'AFNetworking'
```
```
查询结果：（因为会查询输出所有与 'AFNetworking' 相关的第三方库，此处只输出部分，其中下面的“横线”代替实际打印的一行空格）
muxuguixiandeMacBook-Pro:~ jijiucheng$ cd /Users/jijiucheng/Desktop/CocoaPodsTestDemo 
muxuguixiandeMacBook-Pro:CocoaPodsTestDemo jijiucheng$ pod search 'AFNetworking'
--------------------------（此处是输出结果）--------------------------
-> AFNetworking (3.1.0)
   A delightful iOS and OS X networking framework.
   pod 'AFNetworking', '~> 3.1.0'
   - Homepage: https://github.com/AFNetworking/AFNetworking
   - Source:   https://github.com/AFNetworking/AFNetworking.git
   - Versions: 3.1.0, 3.0.4, 3.0.3, 3.0.2, 3.0.1, 3.0.0, 3.0.0-beta.3,
   3.0.0-beta.2, 3.0.0-beta.1, 2.6.3, 2.6.2, 2.6.1, 2.6.0, 2.5.4, 2.5.3, 2.5.2,
   2.5.1, 2.5.0, 2.4.1, 2.4.0, 2.3.1, 2.3.0, 2.2.4, 2.2.3, 2.2.2, 2.2.1, 2.2.0,
   2.1.0, 2.0.3, 2.0.2, 2.0.1, 2.0.0, 2.0.0-RC3, 2.0.0-RC2, 2.0.0-RC1, 1.3.4,
   1.3.3, 1.3.2, 1.3.1, 1.3.0, 1.2.1, 1.2.0, 1.1.0, 1.0.1, 1.0, 1.0RC3, 1.0RC2,
   1.0RC1, 0.10.1, 0.10.0, 0.9.2, 0.9.1, 0.9.0, 0.7.0, 0.5.1 [master repo]
   - Subspecs:
     - AFNetworking/Serialization (3.1.0)
     - AFNetworking/Security (3.1.0)
     - AFNetworking/Reachability (3.1.0)
     - AFNetworking/NSURLSession (3.1.0)
     - AFNetworking/UIKit (3.1.0)
......（后面还有好多与 'AFNetworking' 相关的第三方库，此处不一一列举）
```
![搜索 'AFNetworking' 打印结果.png](https://images.xiaozhuanlan.com/photo/2019/0d03f8983bfa50ddedae5e78ae430170.png)

 - **第三步**：创建 Podfile 配置文件
```
$ vim Podfile
```
```
回车跳转界面（如下）：
```
![指令 vim Podfile 后跳转界面 .png](https://images.xiaozhuanlan.com/photo/2019/c3bcce15d52bfad0fce89516b1412e73.png)
```
① 键盘输入 i ，进入 Podfile 配置文件的编辑模式，底部会变成 ：
-- INSERT --
```
```
Podfile 配置文件编辑模式（如下）：
```
![Podfile 配置文件编辑模式 .png](https://images.xiaozhuanlan.com/photo/2019/5f451dee0c10486db6427639ed3db5d5.png)
```
② 通过固定语句编辑进行 Podfile 文件的配置：
```

```
Podfile 配置文件固定语句（如下）：
 ```说明：可能有些人看到的固定语句不一样，但是大同小异，基本上都能实现最终效果。`
---> 
# Uncomment this line to define a global platform for your project
platform :ios, '8.0'
target 'CocoaPodsTestDemo' do
  # Uncomment this line if you're using Swift or would like to use dynamic frameworks
  # Pods for CocoaPodsTestDemo
     pod 'AFNetworking', '~>3.1.0'
     pod 'SDWebImage'
     pod 'MBProgressHUD'
     pod 'FMDB'
     pod 'Masonry'
     pod 'MJExtension'
     pod 'MJRefresh'
# use_frameworks!
# pod 'ReactiveCocoa'
end
```
![Podfile 配置文件固定语句 .png](https://images.xiaozhuanlan.com/photo/2019/e16eca071adc99dd0fcc0aa9f1349924.png)
```
③ 当固定语句输入完毕之后，按一次 `Esc` 按键退出编辑模式，底部就没有 `-- INSERT --` 标识了；
再按一次 `shift + :` （ 英文输入法状态下 ）组合，底部就会出现一个 `冒号 :` ；
最后再输入 `wq` 回车，返回到配置 Podfile 文件之前的界面；
此时 Podfile 文件就配置好了；
此时可以在 `CocoaPodsTestDemo` 文件夹下发现多了一个 `Podfile` 文件。
```
```
Podfile 输入完毕之后（如下）：
```
![Podfile 输入完毕之后 .png](https://images.xiaozhuanlan.com/photo/2019/fdf9681c992c4fa5e5c8ff4fd315115c.png)
![配置文件完成后新增 Podfile 文件 .png](https://images.xiaozhuanlan.com/photo/2019/8571125918c05b36ba04e7ac9df2767e.png)

  - **第四步**：下载第三方库文件到项目工程中
```
$ pod install
```
```
下载输出（如下）：
muxuguixiandeMacBook-Pro:CocoaPodsTestDemo jijiucheng$ pod install
Analyzing dependencies
Downloading dependencies
Installing AFNetworking (3.1.0)
Installing FMDB (2.6.2)
Installing MBProgressHUD (1.0.0)
Installing MJExtension (3.0.13)
Installing MJRefresh (3.1.12)
Installing Masonry (1.0.2)
Installing SDWebImage (3.8.2)
Generating Pods project
Integrating client project
[!] Please close any current Xcode sessions and use `CocoaPodsTestDemo.xcworkspace` for this project from now on.
Pod installation complete! There are 7 dependencies from the Podfile and 7 total pods
installed.
```
![下载第三方库文件到项目工程中 .png](https://images.xiaozhuanlan.com/photo/2019/feb38552c4e7e4a9961fb90a9e296009.png)
![安装 CocoaPods 成功后项目文件变化 .png](https://images.xiaozhuanlan.com/photo/2019/5dcd309ce62086539d7b6d8a84cba3a7.png)

  - **第五步**：此后打开项目工程只需要点击打开 `CocoaPodsTestDemo.xcworkspace` 文件即可
```
打开工程文件目录变化（如下）：
所有的第三方库文件都在 `/CocoaPodsTestDemo/Pods/Pods` 文件夹目录下
```
![打开工程文件目录变化 .png](https://images.xiaozhuanlan.com/photo/2019/8ff64fb1e9a42ce3e42910c825e3d414.png)



<br>
# 三、CocoaPods 安装过程中报错问题解决

**说明：此部分所列举的问题均是在执行相关指令时出现的报错**

### 1、Rvm 环境搭建
   - **报错一：**
**① Error running 'requirements_osx_brew_update_system ruby-2.3.0', showing last 15 lines of /Users/jijiucheng/.rvm/log/1475769205_ruby-2.3.0/update_system.log
② curl: (35) Server aborted the SSL handshake**

 *① 报错指令：*
```
$ rvm install 2.3.0
``` 
*② 报错信息：*
```
Error running 'requirements_osx_brew_update_system ruby-2.3.0',
showing last 15 lines of /Users/jijiucheng/.rvm/log/1475769205_ruby-2.3.0/update_system.log
......
......
Requirements installation failed with status: 1.
```
```
curl: (35) Server aborted the SSL handshake
```
![报错信息 1.png](https://images.xiaozhuanlan.com/photo/2019/f86da9847851c979fef5c489cd80a9da.png)
![报错信息 2.png](https://images.xiaozhuanlan.com/photo/2019/be9fcd366d2609a0b0c5f1fbf13b5643.png)
*③ 报错原因：*
`网络问题，因为需要翻墙，所以网络不稳定；建议选择 VPN，保证线路的稳定性。`

*④ 解决方案（ 指令一行一行输入 ）：*
```
$ cd /usr/local
```
```
$ git remote set-url origin git://mirrors.ustc.edu.cn/brew.git
```
```
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bashrc
```
![解决方案 .png](https://images.xiaozhuanlan.com/photo/2019/729408ad3f7a4e007fe53afc90c5bee4.png)
*⑤ 方案链接：*
[方案解决链接 -- https://segmentfault.com/q/1010000004276750](https://segmentfault.com/q/1010000004276750)

   - **报错二：**
**① Error running '__rvm_make -j 1', 
showing last 15 lines of /Users/jijiucheng/.rvm/log/1475769349_ruby-2.3.0/make.log**

*① 报错指令：*
```
$ rvm install 2.3.0
``` 
*② 报错信息：*
```
Error running '__rvm_make -j 1',
showing last 15 lines of /Users/jijiucheng/.rvm/log/1475769349_ruby-2.3.0/make.log
......
......
There has been an error while running make. Halting the installation.
```
![报错信息 .png](https://images.xiaozhuanlan.com/photo/2019/8149348ef2d0cb73bf9c7d93463a5978.png)
*③ 报错原因：*
`缺少 Xcode 工具，xcode command line`

*④ 解决方案：*
```
$ xcode-select --install
```
![解决方案 .png](https://images.xiaozhuanlan.com/photo/2019/745d2f5b0c8ea51355b08d31fe8c338f.png)
*⑤ 方案链接：*
[方案解决链接 1 - http://stackoverflow.com/questions/35228481/error-running-rvm-make-install](http://stackoverflow.com/questions/35228481/error-running-rvm-make-install)
[方案解决链接 2 - http://www.th7.cn/Program/Ruby/201609/966343.shtml](http://www.th7.cn/Program/Ruby/201609/966343.shtml)

   - **报错三：**
**① Gemset '' does not exist, 'rvm ruby-2.3.0 do rvm gemset create ' first, or append '--create'.**

*① 报错指令：*
```
$ rvm install 2.3.0
``` 
*② 报错信息：*
```
muxuguixiandeMacBook-Pro:local jijiucheng$ rvm install 2.3.0
Already installed ruby-2.3.0.
To reinstall use:
.
    rvm reinstall ruby-2.3.0
.
Gemset '' does not exist, 'rvm ruby-2.3.0 do rvm gemset create ' first, or append '--create'.
```
![报错信息 .png](https://images.xiaozhuanlan.com/photo/2019/e4cba7ce38746a9cdd6e2c1fffd31fbf.png)
*③ 报错原因：*
`指令不对，已经存在 ruby-2.3.0 的文件残留，需要重新安装；`

*④ 解决方案：*
```
$ rvm reinstall ruby-2.3.0
```
![解决方案 .png](https://images.xiaozhuanlan.com/photo/2019/f41814386677c6293956234557763cb5.png)

### 2、Ruby 环境搭建
   - **报错一：**

### 3、CocoaPods 安装

### 4、CocoaPods 配置使用

   - **报错一：**
**① Setting up CocoaPods master repo**
**② [!] Unable to add a source with url `https://github.com/CocoaPods/Specs.git` named `master`. You can try adding it manually in `~/.cocoapods/repos` or via `pod repo add`.**

*① 报错指令：*
```
$ pod install
```
*② 报错信息：*
```
muxuguixiandeMacBook-Pro:NFCustomer jijiucheng$ pod install
Setting up CocoaPods master repo
[!] Unable to add a source with url `https://github.com/CocoaPods/Specs.git` named `master`.
You can try adding it manually in `~/.cocoapods/repos` or via `pod repo add`.
```
![报错信息 .png](https://images.xiaozhuanlan.com/photo/2019/d98a030117e5e484ba69a22940c9a251.png)
*③ 报错原因：*
`由于安装了多个Xcode导致路径变了，需要变换路径：
sudo xcode-select -switch /Applications/Xcode.app 
sudo xcode-select -switch /Applications/Xcode\ 2.app `

*④ 解决方案：*
```
$ sudo xcode-select -switch /Applications/Xcode.app
```
![解决方案 .png](https://images.xiaozhuanlan.com/photo/2019/fb97779e1c099de24728897389c62c9a.png)
*⑤ 资料补充：*
`出现 Setting up CocoaPods master repo，说明 Cocoapods 在将它的信息下载到  ~/.cocoapods 里；
新创建终端窗口，输入 cd ~/.cocoapods ，回车，输入 du -sh *  命令来查看文件大小，
每隔几分钟查看一次，这个目录最终大小是100多M（ 本人这里大概 800M + ），就是完成了。`

*⑥ 方案链接：*
[方案解决链接 1 - ios开发怎样卸载已经安装的cocoapod](http://zhidao.baidu.com/link?url=WZj_AtGSTkdb0J3G09EdHxqNaD6eM6Uf5u-Qp6-SrFbDBUzA5Bhka9qQ_uHQe67Pn51nWw3wrulL2vy-nfal8KpLqMN_5-ahsYHY6G_8eOa)
[方案解决链接 2 - CocoaPods安装和使用及问题：Setting up CocoaPods master repo](http://blog.csdn.net/zhangjunjian127/article/details/47954981)


<br>
# 四、资料补充
### 1、指令补全

  - **① Rvm 指令库**
```
$ ruby -v                     #  查看ruby 版本 
$ rvm list known              #  列出已知的 ruby 版本
$ rvm install 2.3.0           #  选择指定 ruby 版本进行更新 
$ rvm get stable              #  更新 rvm
$ rvm use 2.2.2               #  切换到指定 ruby 版本
$ rvm use 2.2.2 --default     #  设置指定 ruby 版本为默认版本  
$ rvm list                    #  查询已安装的 ruby 版本 
$ rvm remove 1.9.2            #  卸载移除 指定 ruby 版本 
```
```
$ curl -L https://get.rvm.io | bash -s stable                    #  安装 rvm 环境
$ curl -sSL https://get.rvm.io | bash -s stable --ruby           #  默认安装 rvm 最新版本
$ curl -sSL https://get.rvm.io | bash -s stable --ruby=2.3.0     #  安装 rvm 指定版本
$ source ~/.rvm/scripts/rvm                                      #  载入 rvm 
```
 - **②  gem 指令库**
```
$ gem -v                                  #  查看 gem 版本
$ gem source                              #  查看 gem 配置源
$ gem source -l                           #  查看 gem 配置源目录
$ gem sources -a url                      #  添加 gem 配置源（url 需换成网址）
$ gem sources --add url                   #  添加 gem 配置源（url 需换成网址）
$ gem sources -r url                      #  删除 gem 配置源（url 需换成网址）
$ gem sources --remove url                #  删除 gem 配置源（url 需换成网址）
$ gem update                              #  更新 所有包
$ gem update --system                     #  更新 Ruby Gems 软件
$
$ gem install rake                        #  安装 rake，从本地或远程服务器
$ gem install rake --remote               #  安装 rake，从远程服务器
$ gem install watir -v 1.6.2              #  安装 指定版本的 watir
$ gem install watir --version 1.6.2       #  安装 指定版本的 watir
$ gem uninstall rake                      #  卸载 rake 包
$ gem list d                              #  列出 本地以 d 打头的包
$ gem query -n ''[0-9]'' --local          #  查找 本地含有数字的包
$ gem search log --both                   #  查找 从本地和远程服务器上查找含有 log 字符串的包
$ gem search log --remoter                #  查找 只从远程服务器上查找含有 log 字符串的包
$ gem search -r log                       #  查找 只从远程服务器上查找含有log字符串的包
$
$ gem help                                #  提醒式的帮助
$ gem help install                        #  列出 install 命令 帮助
$ gem help examples                       #  列出 gem 命令使用一些例子
$ gem build rake.gemspec                  #  把 rake.gemspec 编译成 rake.gem
$ gem check -v pkg/rake-0.4.0.gem         #  检测 rake 是否有效
$ gem cleanup                             #  清除 所有包旧版本，保留最新版本
$ gem contents rake                       #  显示 rake 包中所包含的文件
$ gem dependency rails -v 0.10.1          #  列出 与 rails 相互依赖的包
$ gem environment                         #  查看 gem 的环境
$
$ sudo gem -v                             #  查看 gem 版本（以管理员权限）
$ sudo gem install cocoa pods             #  安装 CocoaPods（以管理员权限）
$ sudo gem install cocoapods              #  安装 CocoaPods（以管理员权限）
$ sudo gem install cocoapods --pre        #  安装 CocoaPods 至预览版（以管理员权限）
$ sudo gem install cocoapods -v 0.39.0    #  安装 CocoaPods 指定版本（以管理员权限）
$ sudo gem update cocoapods               #  更新 CocoaPods 至最新版（以管理员权限）
$ sudo gem update cocoapods --pre         #  更新 CocoaPods 至预览版（以管理员权限）
$ sudo gem uninstall cocoapods -v 0.39.0  #  移除 CocoaPods 指定版本（以管理员权限）
```
 - **③  pod 指令库**
```
$ pod setup                         #  CocoaPods 将信息下载到~/.cocoapods/repos 目录下。如果安装 CocoaPods 时不执行此命令，在初次执行 pod intall 命令时，系统也会自动执行该指令
$ pod --version                     #  检查 CocoaPods 是否安装成功及其版本号
$ pod install                       #  安装 CocoaPods 的配置文件 Podfile
```


<br>
<br>

# 五、引用资料

> 说明：此处是列举了我安装CocoaPods 和写这篇文章时查询引用的文章，如有涉及到版权问题，请联系，我会删除的。


- **01** - [Rvm、Ruby及Cocoapods安装](http://www.jianshu.com/p/934849a5232a)
- **02** - [RVM 和 Ruby的安装](http://www.jianshu.com/p/7fedee946f40)
- **03** - [iOS的库依赖管理工具CocoaPods](http://www.jianshu.com/p/0cea9006c0cb)
- **04** - [CocoaPods的安装以及遇到的坑](http://www.cocoachina.com/ios/20160922/17622.html)
- **05** - [ios开发怎样卸载已经安装的cocoapod](http://zhidao.baidu.com/link?url=WZj_AtGSTkdb0J3G09EdHxqNaD6eM6Uf5u-Qp6-SrFbDBUzA5Bhka9qQ_uHQe67Pn51nWw3wrulL2vy-nfal8KpLqMN_5-ahsYHY6G_8eOa)
- **06** - [配置CocoaPods前 - 本地安装好Ruby环境](http://www.cnblogs.com/cwllong/p/5072882.html)
- **07** - [iOS 学习笔记二【cocopods安装使用和安装过程中遇到的问题及解决办法】【20160725更新】](http://www.cnblogs.com/boai/p/4977976.html)
- **08** - [ruby学习及编译ruby缺少openssl问题解决](http://www.cnblogs.com/netbuddy/p/3501147.html)
- **09** - [如何在本地安装多个版本的 CocoaPods](https://www.jianshu.com/p/ca57863c4109)
- **10** - [CocoaPods 1.8 Beta is Here!](http://blog.cocoapods.org/CocoaPods-1.8.0-beta/)
<br>
- **01** - [解决升级EI Capiton CocoaPods "pod: command not found"](http://www.jianshu.com/p/6ff1903c3f11)
- **02** - [curl: (35) Server aborted the SSL handshake](https://segmentfault.com/q/1010000004276750)
- **03** - [第一种 - Error running '__rvm_make -j 1'](http://stackoverflow.com/questions/35228481/error-running-rvm-make-install)
- **04** - [第二种 - Error running '__rvm_make -j 1'](http://www.th7.cn/Program/Ruby/201609/966343.shtml)
- **05** - [[!] Unable to add a source with url "xxxxxxxxxxxxx"](http://zhidao.baidu.com/link?url=WZj_AtGSTkdb0J3G09EdHxqNaD6eM6Uf5u-Qp6-SrFbDBUzA5Bhka9qQ_uHQe67Pn51nWw3wrulL2vy-nfal8KpLqMN_5-ahsYHY6G_8eOa)
- **06** - [Error running 'requirements_osx_brew_update_system ruby-2.0.0-p643'](http://blog.csdn.net/luohancc/article/details/46897247)
- **07** - [关于安装cocoapods遇到的一些坑（ERROR: Error installing cocoapods: activesupport requires Ruby version >= 2.2）](http://blog.csdn.net/fairytale_1/article/details/51850734)
- **08** - [Homebrew install: Failed during: git fetch origin master:refs/remotes/origin/master -n --depth=1](http://stackoverflow.com/questions/39836190/homebrew-install-failed-during-git-fetch-origin-masterrefs-remotes-origin-mas)
- **09** - [Pod /usr/bin/git clone https://github.com/CocoaPods/Specs.git master](http://www.jianshu.com/p/90ca71b3b94a)
- **10** -[命令行执行命令时报错You don't have write permissions for the /Library/***](https://blog.csdn.net/soindy/article/details/46470463)
- **11** -[gem install cocoapods ERROR: While executing gem ... (Gem::FilePermissionError)](https://blog.csdn.net/kangguang/article/details/79544515)
- **12** - [zsh: /usr/local/bin/pod: bad interpreter: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: no such file or directory](https://www.cnblogs.com/BK-12345/p/11645856.html)
- **13** - [[!] CDN: trunk Repo update failed](https://www.jianshu.com/p/bf1cbe49cb5d)
- **14** - [Homebrew installation on Mac OS X Failed to connect to raw.githubusercontent.com port 443](https://stackoverflow.com/questions/29910217/homebrew-installation-on-mac-os-x-failed-to-connect-to-raw-githubusercontent-com)
- **15** - [安装homebrew报错curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation](https://www.jianshu.com/p/68efabd2e32b)
<br>


# 六、后续更新

### 2016.12.15  问题更新
 - **安装 CocoaPods 步骤指令问题**
> ① 最初写的：
```
由于 OS X 系统的不同，此处的指令也是有些变化:
OS X 10.11之前系统的安装 CocoaPods 指令： $ sudo gem install cocoapods
OS X 10.11以后系统的安装 CocoaPods 指令： $ sudo gem install -n /usr/local/bin cocoa pods
```
② 更改原因：
 *因为有朋友说在 `mac OS 10.11` 和 `mac OS 10.12` 环境中所用的指令不一样，当时写这篇文章的时候环境是 `mac OS 10.11` ，但是并没有做 `mac OS 10.12` 的环境，今天又做了一下测试，现在的环境是 `mac OS 10.12.1`。*
![测试环境 mac OS 10.12.1.png](https://images.xiaozhuanlan.com/photo/2019/48fc1197230defb6860929167adfee1f.png)
③ 测试结果：
`----> 指令：
----> $ sudo gem install cocoa pods 
----> 不需要密码 `
![指令：$ sudo gem install cocoa pods 测试结果.png](https://images.xiaozhuanlan.com/photo/2019/2207ed415351ef4447c2f158e8644bb2.png)
`----> 指令：
----> $ sudo gem install cocoapods 
----> 需要密码 `
![指令：$ sudo gem install cocoapods 测试结果.png](https://images.xiaozhuanlan.com/photo/2019/f95aa6707c47e3af4d951c1ed379d9ea.png)
`----> 指令：
----> $ sudo gem install -n /usr/local/bin cocoa pods 
----> 需要密码 `
![指令：$ sudo gem install -n /usr/local/bin cocoa pods 测试结果.png](https://images.xiaozhuanlan.com/photo/2019/21e162bc76ef6325ba6d45449ceb43f4.png)
④ 测试结论：
`三种结果都能安装 Cocoapods 成功，只不过安装更新的内容略有不同。
推荐使用：指令：$ sudo gem install cocoapods`


<br>
<br>

### 2018.04.08 更新

- **1、报错信息**

**RuntimeError - [Xcodeproj] Unknown object version.**

```
RuntimeError - [Xcodeproj] Unknown object version.
/usr/local/lib/ruby/gems/2.3.0/gems/xcodeproj-1.5.1/lib/xcodeproj/project.rb:217:in `initialize_from_file'
/usr/local/lib/ruby/gems/2.3.0/gems/xcodeproj-1.5.1/lib/xcodeproj/project.rb:102:in `open'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer/analyzer.rb:903:in `block (2 levels) in inspect_targets_to_integrate'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer/analyzer.rb:902:in `each'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer/analyzer.rb:902:in `block in inspect_targets_to_integrate'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/user_interface.rb:64:in `section'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer/analyzer.rb:897:in `inspect_targets_to_integrate'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer/analyzer.rb:69:in `analyze'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer.rb:242:in `analyze'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer.rb:154:in `block in resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/user_interface.rb:64:in `section'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer.rb:153:in `resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/installer.rb:116:in `install!'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/command/install.rb:41:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/claide-1.0.2/lib/claide/command.rb:334:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/lib/cocoapods/command.rb:52:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-1.3.1/bin/pod:55:in `<top (required)>'
/usr/local/bin/pod:22:in `load'
/usr/local/bin/pod:22:in `<main>'

――― TEMPLATE END ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

[!] Oh no, an error occurred.
```
- **2、报错原因**
```
主要原因就是 Xcode 当前版本和 当前的 CocoaPods 的版本问题不匹配，需要对当前 CocoaPods 进行安装更新。

博主当前 Xcode Version 9.3 (9E145) ；
gem -v             2.6.6
```

- **3、解决办法**
```
方法一：
① 终端执行   gem install cocoapods --pre  命令；
② cd 对应项目目录，pod install。

方法二：
① 终端执行 sudo gem update cocoapods 命令。
```

- **4、参考链接**
[① pod 更新第三方依赖遇到的 object version 问题](https://blog.csdn.net/miaopf123/article/details/70492411)
[② 如何在本地安装多个版本的 CocoaPods](https://www.jianshu.com/p/ca57863c4109)



<br>
<br>
<br>


### 2018.07.23 更新

- **1、报错信息**
```
jijiuchengdeMacBook-Pro:lemon-ios jijiucheng$ pod install
Analyzing dependencies
Downloading dependencies
Using AFNetworking (3.2.1)
Using Bugly (2.5.0)
Using FMDB (2.7.2)
Using IQKeyboardManager (6.0.4)
Installing JJCTools (0.1.8)

[!] Error installing JJCTools
[!] /usr/bin/git clone https://github.com/jijiucheng/JJCTools.git /var/folders/g6/t4gwthjn1w3f8pyy0kv_fj800000gn/T/d20180723-35368-1q363aj --template= --single-branch --depth 1 --branch 0.1.8

Cloning into '/var/folders/g6/t4gwthjn1w3f8pyy0kv_fj800000gn/T/d20180723-35368-1q363aj'...
error: RPC failed; curl 56 LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: unpack-objects failed


[!] Automatically assigning platform `ios` with version `8.0` on target `lemon` because no platform was specified. Please specify a platform for this target in your Podfile. See `https://guides.cocoapods.org/syntax/podfile.html#platform`.
```
- **2、解决办法**
```
因为本人使用的是 SourceTree，所以本人是在具体项目界面的，点击右上角 Settings --> Remotes --> Edit Config File... --> 输入 `[http] 
        postBuffer = 524288000`  增大缓存空间。

保存后再次 pod install 则解决了。
```
```
另外见到一种方法，但是没有测试：

git clone https://git.coding.net/CocoaPods/Specs.git ~/.cocoapods/repos/master
```
- **3、参考链接**
- [安装cocoapods设置pod的时候](https://blog.csdn.net/love9099/article/details/79738724)

<br>
<br>

### 2018.10.10 更新

- **1、报错信息**
```
jijiuchengdeMacBook-Pro:~ jijiucheng$ gem sources -l
*** CURRENT SOURCES ***

https://rubygems.org/
jijiuchengdeMacBook-Pro:~ jijiucheng$ gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources
jijiuchengdeMacBook-Pro:~ jijiucheng$ gem sources --add https://gems.ruby-china.org
Error fetching https://gems.ruby-china.org:
	bad response Not Found 404 (https://gems.ruby-china.org/specs.4.8.gz)
```
- **2、解决办法**
```
将 `gem sources --add https://gems.ruby-china.org` 替换成 `gem sources --add https://gems.ruby-china.com` 即可
```
- **3、参考链接**
- [Error fetching https://gems.ruby-china.org/: bad response Not Found 404 (https://gems.ruby-china.org/specs.4.8.gz)](http://www.mamicode.com/info-detail-2427771.html)


### 2019.12.14 更新

#### 1、问题一：`-bash: /usr/local/bin/pod: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: bad interpreter: No such file or directory`

- **1、报错信息**
```
mxgx:PetBar mxgx$ pod --version
-bash: /usr/local/bin/pod: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: bad interpreter: No such file or directory
```
- **2、解决办法**
> 主要是因为升级 `macOS Catalina version 10.15` 引起的  `cocoapods` 无法使用了。
```
mxgx:PetBar mxgx$ sudo gem update --system
Latest version already installed. Done.
mxgx:PetBar mxgx$ sudo gem install cocoapods -n/usr/local/bin
Successfully installed cocoapods-1.8.4
Parsing documentation for cocoapods-1.8.4
Done installing documentation for cocoapods after 1 seconds
1 gem installed
mxgx:PetBar mxgx$ pod --version
1.8.4
```
- **3、参考链接**
 - [zsh: /usr/local/bin/pod: bad interpreter: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: no such file or directory](https://www.cnblogs.com/BK-12345/p/11645856.html)


#### 2、问题二：`[!] CDN: trunk Repo update failed - 127 error(s):`

- **1、报错信息**
```
mxgx:PetBar mxgx$ pod install
Analyzing dependencies
Adding spec repo `trunk` with CDN `https://cdn.cocoapods.org/`
[!] CDN: trunk Repo update failed - 127 error(s):
CDN: trunk URL couldn't be downloaded: https://raw.githubusercontent.com/CocoaPods/Specs/master/Specs/a/a/6/Kingfisher/0.0.1/Kingfisher.podspec.json, error: Failed to open TCP connection to raw.githubusercontent.com:443 (Connection refused - connect(2) for "raw.githubusercontent.com" port 443)
CDN: trunk URL couldn't be downloaded: https://raw.githubusercontent.com/CocoaPods/Specs/master/Specs/a/a/6/Kingfisher/0.0.2/Kingfisher.podspec.json, error: Failed to open TCP connection to raw.githubusercontent.com:443 (Connection refused - connect(2) for "raw.githubusercontent.com" port 443)
CDN: trunk URL couldn't be downloaded: https://raw.githubusercontent.com/CocoaPods/Specs/master/Specs/a/a/6/Kingfisher/1.0.0/Kingfisher.podspec.json, error: Failed to open TCP connection to raw.githubusercontent.com:443 (Connection refused - connect(2) for "raw.githubusercontent.com" port 443)
```
- **2、解决办法**
> 主要是因为默认源的变更。
> 只需要在 Podfile 文件里添加 `source 'https://github.com/CocoaPods/Specs.git'` ，并执行指令 `pod repo remove trunk` 即可。
```
platform :ios, '11.0'

target 'PetBar' do
use_frameworks!

	pod 'Kingfisher'
	pod 'Alamofire'
	pod 'SwiftyJSON'
	pod 'SnapKit'
	pod 'RxSwift'
	pod 'RxCocoa'
	pod 'PKHUD'
	pod 'IQKeyboardManagerSwift'
	pod 'R.swift'

source 'https://github.com/CocoaPods/Specs.git'

end
```
```
mxgx:PetBar mxgx$ pod repo remove trunk
Removing spec repo `trunk`
mxgx:PetBar mxgx$ pod install
Analyzing dependencies
Downloading dependencies
Installing Alamofire (4.8.2)
Installing IQKeyboardManagerSwift (6.4.0)
Installing Kingfisher (5.7.0)
Installing PKHUD (5.3.0)
Installing R.swift (5.0.3)
Installing R.swift.Library (5.0.1)
Installing RxCocoa (5.0.0)
Installing RxRelay (5.0.0)
Installing RxSwift (5.0.0)
Installing SnapKit (5.0.0)
Installing SwiftyJSON (5.0.0)
Generating Pods project
Integrating client project

[!] Please close any current Xcode sessions and use `PetBar.xcworkspace` for this project from now on.
Pod installation complete! There are 9 dependencies from the Podfile and 11 total pods installed.
```

- **3、参考链接**
 - [[!] CDN: trunk Repo update failed](https://www.jianshu.com/p/bf1cbe49cb5d)
 - [CocoaPods 1.8 Beta is Here!](http://blog.cocoapods.org/CocoaPods-1.8.0-beta/)


#### 3、问题三：`curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused`

- **1、报错信息**
```
mxgx:PetBar mxgx$ rvm -v
-bash: rvm: command not found
mxgx:PetBar mxgx$ curl -L https://get.rvm.io | bash -s stable
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   194  100   194    0     0      4      0  0:00:48  0:00:41  0:00:07    48
  0     0    0     0    0     0      0      0 --:--:--  0:00:41 --:--:--     0
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
mxgx:PetBar mxgx$ rvm -v
-bash: rvm: command not found
mxgx:PetBar mxgx$ curl -L https://get.rvm.io | bash -s stable
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   194  100   194    0     0    176      0  0:00:01  0:00:01 --:--:--   176
  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```
- **2、解决办法**
> 主要原因暂时位置，只找到了解决办法。
>
> 先将 [https://raw.githubusercontent.com/Homebrew/install/master/install](https://raw.githubusercontent.com/Homebrew/install/master/install) 输入到浏览器中看是否能打开，如果能打开，右击 `save as` 保存名为 `brew_install.rb` 网页到任意目录下（只要能找的到）。
>
> 打开终端，`cd` 到对应的文件目录，依次执行下面指令即可。
```
mxgx:~ mxgx$ cd Desktop/
mxgx:PetBar mxgx$ curl
curl: try 'curl --help' or 'curl --manual' for more information
mxgx:Desktop mxgx$ ruby brew_install.rb
==> This script will install:
...
...
```

```
mxgx:PetBar mxgx$ curl
curl: try 'curl --help' or 'curl --manual' for more information
mxgx:PetBar mxgx$ cd ~
mxgx:~ mxgx$ ls
Applications			Library				Postman
Carfile				Movies				Public
Desktop				Music				Virtual Machines.localized
Documents			Parallels			WeChatProjects
Downloads			Pictures
mxgx:~ mxgx$ cd Desktop/
mxgx:Desktop mxgx$ ruby brew_install.rb
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
==> The following existing directories will be made group writable:
/usr/local/include
/usr/local/lib
/usr/local/lib/pkgconfig
==> The following existing directories will have their owner set to mxgx:
/usr/local/include
/usr/local/lib
/usr/local/lib/pkgconfig
==> The following existing directories will have their group set to admin:
/usr/local/include
/usr/local/lib
/usr/local/lib/pkgconfig
==> The Xcode Command Line Tools will be installed.

Press RETURN to continue or any other key to abort
==> /usr/bin/sudo /bin/chmod u+rwx /usr/local/include /usr/local/lib /usr/local/lib/pkgconfig
Password:
==> /usr/bin/sudo /bin/chmod g+rwx /usr/local/include /usr/local/lib /usr/local/lib/pkgconfig
==> /usr/bin/sudo /usr/sbin/chown mxgx /usr/local/include /usr/local/lib /usr/local/lib/pkgconfig
==> /usr/bin/sudo /usr/bin/chgrp admin /usr/local/include /usr/local/lib /usr/local/lib/pkgconfig
==> Searching online for the Command Line Tools
==> /usr/bin/sudo /usr/bin/touch /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
==> Installing Command Line Tools for Xcode-11.3
==> /usr/bin/sudo /usr/sbin/softwareupdate -i Command\ Line\ Tools\ for\ Xcode-11.3
Software Update Tool


Downloading Command Line Tools for Xcode

Downloaded Command Line Tools for Xcode
Installing Command Line Tools for Xcode

Done with Command Line Tools for Xcode
Done.
==> /usr/bin/sudo /bin/rm -f /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
==> /usr/bin/sudo /usr/bin/xcode-select --switch /Library/Developer/CommandLineTools
==> Downloading and installing Homebrew...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
From https://github.com/Homebrew/brew
   b1eb96dfd..e78836fda  master     -> origin/master
HEAD is now at e78836fda Merge pull request #6832 from Homebrew/dependabot/bundler/Library/Homebrew/json-2.3.0
Already up-to-date.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate formulae and cask analytics.
Read the analytics documentation (and how to opt-out) here:
  https://docs.brew.sh/Analytics

==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations
==> Next steps:
- Run `brew help` to get started
- Further documentation: 
    https://docs.brew.sh
mxgx:Desktop mxgx$ 
mxgx:Desktop mxgx$ 
mxgx:Desktop mxgx$ curl -L https://get.rvm.io | bash -s stable
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   194  100   194    0     0     23      0  0:00:08  0:00:08 --:--:--    59
100 24535  100 24535    0     0   2720      0  0:00:09  0:00:09 --:--:--  2720
Downloading https://github.com/rvm/rvm/archive/1.29.9.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.29.9/1.29.9.tar.gz.asc
Found PGP signature at: 'https://github.com/rvm/rvm/releases/download/1.29.9/1.29.9.tar.gz.asc',
but no GPG software exists to validate it, skipping.
Upgrading the RVM installation in /Users/mxgx/.rvm/
    RVM PATH line found in /Users/mxgx/.mkshrc /Users/mxgx/.profile /Users/mxgx/.bashrc /Users/mxgx/.zshrc.
    RVM sourcing line found in /Users/mxgx/.profile /Users/mxgx/.zlogin.
    RVM sourcing line not found for Bash, rerun this command with '--auto-dotfiles' flag to fix it.
Upgrade of RVM in /Users/mxgx/.rvm/ is complete.

Thanks for installing RVM 🙏
Please consider donating to our open collective to help us maintain RVM.

👉  Donate: https://opencollective.com/rvm/donate


mxgx:Desktop mxgx$ rvm -v
-bash: rvm: command not found
mxgx:Desktop mxgx$ source ~/.rvm/scripts/rvm
mxgx:Desktop mxgx$ rvm -v
rvm 1.29.9 (latest) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
```
- **3、参考链接**
 - [Homebrew installation on Mac OS X Failed to connect to raw.githubusercontent.com port 443](https://stackoverflow.com/questions/29910217/homebrew-installation-on-mac-os-x-failed-to-connect-to-raw-githubusercontent-com)
 - [安装homebrew报错curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation](https://www.jianshu.com/p/68efabd2e32b)




------


<br>
# 声明：
> 报错信息板块尚未写完，后面有时间会继续完善！！！
> 如果有错误的信息，希望大家可以指出，进而及时修改，相互学习！！！
> 如有转载的，希望可以注明出处！！！

----