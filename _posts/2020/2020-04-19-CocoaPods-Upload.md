---
layout: post
title: 【iOS】开源库文件到 cocoapods 管理（2024.06.19 更新）
categories: iOS
description: CocoaPods 安装配置
keywords: iOS, iOS配置, CocoaPods
topmost: true
---

**导读：**

当你有心在 `开源` 的道路上一去不回头的时候，一篇手把手教学的开源步骤是必不可少的~

## 一、podspec 文件介绍

### 1、格式规范官网：

https://guides.cocoapods.org/syntax/podspec.html#specification

### 2、示例规范：

swift 版本如下：

```
# podspec 规范文档：https://guides.cocoapods.org/syntax/podspec.html#specification
# 参考文章：https://www.jianshu.com/p/1f56c3d78b52
# pod成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径
# 删除指定版本：https://www.jianshu.com/p/e3d91ebcc38e

Pod::Spec.new do |s|

    s.name          = 'JJCTools'
    s.version       = '1.0.0'
    s.summary       = 'A Library for iOS to  get result fasterly with some methods.'
    s.homepage      = 'https://github.com/jijiucheng/JJCTools'
    s.license       = { :type => 'MIT', :file => 'LICENSE' }
    s.authors       = { '苜蓿鬼仙' => '302926124@qq.com' }
    s.source        = { :git => 'https://github.com/jijiucheng/JJCTools.git', :tag => s.version }
    s.platform      = :ios, '13.0'
    s.source_files  = 'JJCTools/JJCTools/Sources/**/*.swift'
    # 依赖系统库，建议添加上，不然得话会报一些错误
    s.framework     = 'UIKit', 'Foundation'

    # 依赖三方库，根据需求进行添加
    # s.dependency 'PKHUD'

    # Note：可以通过如下创建子级库，在 pod 的后会形成文件夹
    # 一级子目录结构
    # s.subspec 'Category' do |ss|
    #     ss.source_files = 'JJCTools/JJCTools/Sources/Category/**/*.{swift}'
    # end

end
```

**备注声明：**

下面的配置是以前的 Objective-C 版本的，仅作参考。

```
# podspec 规范文档：https://guides.cocoapods.org/syntax/podspec.html#specification
# 参考文章：https://www.jianshu.com/p/1f56c3d78b52
# pod成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径


Pod::Spec.new do |s|

    s.name          = 'JJCTools'
    s.version       = '1.0.0'
    s.license       = { :type => 'MIT', :file => 'LICENSE' }
    s.summary       = 'A Library for iOS to  get result fasterly with some methods.'
    s.homepage      = 'https://github.com/jijiucheng/JJCTools'
    s.authors       = { '苜蓿鬼仙' => '302926124@qq.com' }
    s.source        = { :git => 'https://github.com/jijiucheng/JJCTools.git', :tag => s.version }
    s.platform      = :ios, '8.0'
    s.ios.deployment_target = '8.0'
    s.requires_arc  = true
    s.public_header_files = 'JJCToolsDemo/JJCTools/JJCTools.h'
    s.source_files  = 'JJCToolsDemo/JJCTools/JJCTools.h'
    s.resource      = 'JJCToolsDemo/JJCTools/JJCToolsResource/JJCTools.bundle'
    s.prefix_header_contents = '#import <UIKit/UIKit.h>', '#import <Foundation/Foundation.h>'

# 一级子目录结构

    s.subspec 'JJCToolsOthers' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsOthers/**/*.{h,m}'
    end

    s.subspec 'JJCToolsDefine' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsDefine/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsDefine/**/*.{h}'
    end

    s.subspec 'JJCToolsObject' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsObject/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsObject/**/*.{h}'
        # pod成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径
        ss.dependency 'JJCTools/JJCToolsDefine'
    end

    s.subspec 'JJCToolsCategory' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsCategory/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsCategory/**/*.{h}'
        ss.dependency 'JJCTools/JJCToolsDefine'
        ss.dependency 'JJCTools/JJCToolsObject'
    end

    s.subspec 'JJCToolsView' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsView/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsView/**/*.{h}'
        ss.dependency 'JJCTools/JJCToolsDefine'
        ss.dependency 'JJCTools/JJCToolsObject'
        ss.dependency 'JJCTools/JJCToolsCategory'
    end

# 依赖第三方库文件
    s.dependency 'MBProgressHUD', '1.1.0'

# 依赖系统静态库文件
    s.framework     = 'UIKit', 'Foundation', 'QuartzCore', 'CoreText', 'CoreGraphics'

end
```

### 3、文件目录层级结构

![文件目录层级结构 - swift](/images/iOS/2020-04-19-CocoaPods-Upload-01.png)
![文件目录层级结构 - oc](https://images.xiaozhuanlan.com/photo/2019/ef699c7d010ca28d140e39565513dc79.png)

![通过 pod search JJCTools 查询库相关信息](https://images.xiaozhuanlan.com/photo/2019/3982fa3c1f95adaadc3fcb273472d946.png)

> **此处说明：**
> 实际上在文件目录层级中并非完全规范，`JJCToolsDemo`目录下的 `JJCTools` 库文件实际上应该是和 `JJCToolsDemo` 同级的，此处暂时还未更改正确。

### 4、部分语法说明（具体详情请参考官方规范文档）

```
# #   井号可以在 podspec 文件中添加注释说明
# s   代表一级目录文件相关属性
# ss  代表二级（子级）文件目录相关属性


Pod::Spec.new do |s|
    # 开源库文件名称
    s.name          = 'JJCTools'
    # 库文件当前版本号，必须保证此处版本号和 GitHub（也可能不是码云之类的代码托管平台）中的 tag 版本号保持一致，否则无法提交成功
    s.version       = '1.0.0'
    # 遵循的开源协议
    s.license       = { :type => 'MIT', :file => 'LICENSE' }
    # 开源库的简要介绍，会在通过 pod search 指令搜索时显示出来的
    s.summary       = 'A Library for iOS to  get result fasterly with some methods.'
    # 开源库的主页地址
    s.homepage      = 'https://github.com/jijiucheng/JJCTools'
    # 开源库作者信息
    s.authors       = { '苜蓿鬼仙' => '302926124@qq.com' }
    # 项目地址（此处建议使用 :tag => s.version）
    s.source        = { :git => 'https://github.com/jijiucheng/JJCTools.git', :tag => s.version }
    # 支持的版本号
    s.platform      = :ios, '8.0'
    # pod 支持的开源库语言最低版本号
    s.ios.deployment_target = '8.0'
    # 是否支持 ARC
    s.requires_arc  = true
    # 开放共用头文件地址
    s.public_header_files = 'JJCToolsDemo/JJCTools/JJCTools.h'
    # 头文件地址
    s.source_files  = 'JJCToolsDemo/JJCTools/JJCTools.h'
    # 资源包地址（建议使用 bundle 资源包形式）
    s.resource      = 'JJCToolsDemo/JJCTools/JJCToolsResource/JJCTools.bundle'
    # 遵循的公共头文件
    s.prefix_header_contents = '#import <UIKit/UIKit.h>', '#import <Foundation/Foundation.h>'

# 一级子目录结构

    s.subspec 'JJCToolsOthers' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsOthers/**/*.{h,m}'
    end

    s.subspec 'JJCToolsDefine' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsDefine/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsDefine/**/*.{h}'
    end

    s.subspec 'JJCToolsObject' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsObject/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsObject/**/*.{h}'
        # pod成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径
        ss.dependency 'JJCTools/JJCToolsDefine'
    end

    s.subspec 'JJCToolsCategory' do |ss|
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsCategory/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsCategory/**/*.{h}'
        ss.dependency 'JJCTools/JJCToolsDefine'
        ss.dependency 'JJCTools/JJCToolsObject'
    end

    # 二级（子级）目录结构（注：ss 可以换成任意非 s 的名称，即子级目录代称）
    s.subspec 'JJCToolsView' do |ss|
        # 子级目录下所有文件（* 代表通配符）
        ss.source_files = 'JJCToolsDemo/JJCTools/JJCToolsView/**/*.{h,m}'
        ss.public_header_files = 'JJCToolsDemo/JJCTools/JJCToolsView/**/*.{h}'
        # 子级目录下文件需要的依赖文件（如果需要依赖多个，官方写法是分别写出，且子级目录依赖只能单方向依赖，不能相互依赖）
        ss.dependency 'JJCTools/JJCToolsDefine'
        ss.dependency 'JJCTools/JJCToolsObject'
        ss.dependency 'JJCTools/JJCToolsCategory'
    end

# 依赖第三方库文件
    s.dependency 'MBProgressHUD', '1.1.0'

# 依赖系统静态库文件
    s.framework     = 'UIKit', 'Foundation', 'QuartzCore', 'CoreText', 'CoreGraphics'

end
```

### 5、部分特别注意说明

- 1、库文件当前版本号，必须保证此处版本号和 `GitHub`（也可能不是`码云`之类的代码托管平台）中的 tag 版本号保持一致，否则无法提交成功。
- 2、如果是图片、本地化语言文件，建议使用 `bundle` 资源包的形式进行打包处理。
- 3、pod 成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径。
- 4、
  - 如果单方向依赖，通过 `dependency` 即可；
  - 如果是同时依赖多个，官方写法是分别写出；
  - 子级目录不能相互依赖，暂时测试 `（2019.07.24）` 的是没法解决，只能将对应的方法复制迁移到对应的子级分类中一份。

## 二、步骤流程

**此处说明：**

- 此处只是建立在已经有过历史版本的情况下进行的记录，至于初次实现的步骤，后期再添加。
- 且此处是建立在未有任何报错的步骤下处理的，至于报错记录会在后面的内容中列出。

### 1、创建 podspec 文件

在项目的根目录下创建 `xxx.podspec` 文件，其中 `xxx` 是开源库名称，此处我这边就是 `JJCTools.podspec`。

而具体该文件中的配置可以参考上面的介绍进行自定义配置。

### 2、添加 tag 标签

当项目工程代码完成后，需要先将代码提交到远程端，并打上 `tag` 标签。

不过该步骤也可以放到校验完本地库文件后再执行，只要是执行远程端库文件校验之前就行。

```
$ git commit -m "提交文件日志"         # 提交所有更新过的文件
$ git tag                            # 查询当前已存在的 tag 标签
$ git tag 1.0.0                      # 添加 tag 本地标签（必须）
$ git push --tags                    # 提交所有 tag 标签到远程端（必须）
$ git tag -d 1.0.0                   # 删除 tag 本地标签
$ git push origin :refs/tags/1.0.0   # 删除远程端指定 tag 标签
```

![添加、删除 tag 标签](https://images.xiaozhuanlan.com/photo/2019/3689ab4bc2fde6559a7fd36944981014.png)

### 3、验证 podpsec 文件的合法性

出现 `passed validation` 代表验证成功

```
pod lib lint              从本地验证 pod 能否通过验证
pod spec lint             从本地和远程端验证 pod 能否通过验证
pod spec lint --verbose   详细编译验证 podspec 合法性
--allow-warnings          带有警告需要的语法
--use-libraries           依赖三方库需要的语法（比如：s.dependency 'MBProgressHUD', '1.1.0'）


# 从本地验证 pod 能否通过验证
pod lib lint JJCTools.podspec
# 从本地验证依赖三方库的 pod 能否通过验证
pod lib lint JJCTools.podspec --use-libraries
# 从本地验证带有警告的 pod 能否通过验证
pod lib lint JJCTools.podspec --allow-warnings
# 从本地验证依赖三方库且有警告的 pod 能否通过验证【推荐】
pod lib lint JJCTools.podspec --use-libraries --allow-warnings


# 从本地和远程端验证 pod 能否通过验证
pod spec lint JJCTools.podspec
# 从本地和远程端验证依赖三方库的 pod 能否通过验证
pod spec lint JJCTools.podspec --use-libraries
# 从本地验和远程端证带有警告的 pod 能否通过验证
pod spec lint JJCTools.podspec --allow-warnings
# 从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证【推荐】
pod spec lint JJCTools.podspec --use-libraries --allow-warnings


# 详细编译验证 podspec 合法性
pod spec lint --verbose
```

![从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证 - 1](https://images.xiaozhuanlan.com/photo/2019/06fa5ba15ad4ae850adf6464df563713.png)

![从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证 - 2](https://images.xiaozhuanlan.com/photo/2019/0c640fae9b3671d656c37a6c14176b55.png)

### 4、验证成功后，将库文件推送到 cocoapods 服务器

此处如果没有绑定过 cocoapods 账户的情况下，此处会优先注册或绑定 cocoapods 账户。

此处建议每次发布新版本前都对账户进行校验，防止出现因账户而产生的失败问题。

```
# 检测是否绑定 cocoapods 账户 --------------
# 注册 cocoapods 账户（需要在邮箱激活）
pod trunk register 邮箱地址 '用户名' —description='描述信息'
# 检测是否注册成功
pod trunk me
# 绑定 cocoapods 账户
pod trunk register 邮箱地址 '用户名'


# 推送到 cocoapods 远程端 --------------
# 将库文件推送到 cocoapods 远程端
pod trunk push JJCTools.podspec
# 将带有警告的库文件推送到 cocoapods 远程端
pod trunk push JJCTools.podspec --allow-warnings
# 将依赖三方库的库文件推送到 cocoapods 远程端
pod trunk push JJCTools.podspec --use-libraries
# 将依赖三方库且带有警告的库文件推送到 cocoapods 远程端【推荐】
pod trunk push JJCTools.podspec --use-libraries --allow-warnings


# 刷新库文件，可保证通过 pod search 立即搜索的到
pod repo update
# 搜索库状态
pod search xxx
```

![报错误提示未注册或绑定 cocoapods 账户](https://images.xiaozhuanlan.com/photo/2019/896b2af9df070d7ad96475b74beaeab7.png)

![绑定 cocoapods 账户](https://images.xiaozhuanlan.com/photo/2019/ac9751061968b0f3242e3f78b1210dab.png)

![将依赖三方库且带有警告的库文件推送到 cocoapods 远程端](https://images.xiaozhuanlan.com/photo/2019/8b540a71d80dafd606558f62ca97ec72.png)

## 三、删除 CocoaPods 开源的指定库

主要参考的是 [简书 - 组件化 cocoapods 仓库删除（填坑）](https://www.jianshu.com/p/e3d91ebcc38e) 这篇文章。

```
# 删除指定库的版本
pod trunk delete JJCTools 1.0.0
```

有时候执行了该指令后会报大片的红色，实际上对应的库版本已经从云端删除了。

为保证准确性，只需要重新执行一遍删除指令即可。

如果提示 `[!] No pod found with the specified name.` 表示当前库中所有版本都已删除。

![删除指定库的版本](/images/iOS/2020-04-19-CocoaPods-Upload-02.png)
![删除指定库的版本](/images/iOS/2020-04-19-CocoaPods-Upload-03.png)

```
{24-06-19 17:25}[ruby-3.2.0]mxgx:~/JJCTools@master✗✗✗✗✗✗ mxgx% pod trunk delete JJCTools 1.0.0
WARNING: It is generally considered bad behavior to remove versions of a Pod that others are depending on!
Please consider using the `deprecate` command instead.
Are you sure you want to delete this Pod version?
> y

[!] An unexpected error occurred: <!DOCTYPE html><html><head><title>CocoaPods Trunk</title><link href="/assets/app.css" media="screen, projection" rel="stylesheet" type="text/css" /><link rel="shortcut icon" href="https://cocoapods.org/favicons/favicon.ico" type="image/x-icon" /
...
...
...
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-29866548-4', 'cocoapods.org');
ga('send', 'pageview');</script></html>

{24-06-19 17:26}[ruby-3.2.0]mxgx:~/JJCTools@master✗✗✗✗✗✗ mxgx% pod trunk delete JJCTools 1.0.0
WARNING: It is generally considered bad behavior to remove versions of a Pod that others are depending on!
Please consider using the `deprecate` command instead.
Are you sure you want to delete this Pod version?
> y

[!] No pod found with the specified name.
```

## 四、报错信息及解决办法

> **说明：**
> 部分 cocoapods 相关信息教程，可以参考如下链接：
> [【iOS 工具】rvm，Ruby 环境和 CocoaPods 安装使用及相关报错问题解决](https://xiaozhuanlan.com/topic/7654293801)

### 1、ERROR: While executing gem ... (Gem::FilePermissionError)...You don't have write permissions for the /usr/bin directory.

- （1）错误信息

```
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /usr/bin directory.
```

- （2）错误原因

未安装 `cocoapods` 或 `cocoapods` 版本过低，需要安装或更新

- （3）解决办法

```
## 安装 cocoapods（macOS 10.11 之前的指令）
sudo gem install cocoapods
## 安装 cocoapods（macOS 10.11 之后的指令）
sudo gem install -n /usr/local/bin cocoapods

## 查询当前 ruby 源
gem sources -l
## 移除 rubygems 源
gem sources --remove https://rubygems.org/
## 替换 ruby-china 源
gem sources -a https://gems.ruby-china.com
```

![ERROR:  While executing gem ... (Gem::FilePermissionError) You don't have write permissions for the /usr/bin directory.](https://images.xiaozhuanlan.com/photo/2019/2d171bb51ee1d2004c2216f924a25868.png)

- （4）参考链接：

  - [安装 CocoaPods 遇到的问题](https://www.jianshu.com/p/f5ebfadb0a20)
  - [gem install cocoapods ERROR: While executing gem ... (Gem::FilePermissionError)](https://blog.csdn.net/kangguang/article/details/79544515)
  - [Cocoapods 安装中出现的问题解决](https://blog.csdn.net/baidu_30511379/article/details/52450794)

### 2、[-Werror,-Wnon-modular-include-in-framework-module]

- （1）错误信息

```
mxgx:JJCTools mxgx$ pod spec lint JJCTools.podspec

 -> JJCTools (0.2.0)
    - ERROR | [JJCTools/JJCToolsObject,JJCTools/JJCToolsCategory] xcodebuild: Returned an unsuccessful exit code. You can use `--verbose` for more information.
    - ERROR | xcodebuild:  /Users/mxgx/Library/Developer/Xcode/DerivedData/App-apmzwwbrafjhhxbmigbmpgfelyxy/Build/Products/Release-iphonesimulator/JJCTools/JJCTools.framework/Headers/MBProgressHUD+JJC.h:33:9: error: include of non-modular header inside framework module 'JJCTools.MBProgressHUD_JJC': '/Users/mxgx/Library/Developer/Xcode/DerivedData/App-apmzwwbrafjhhxbmigbmpgfelyxy/Build/Products/Release-iphonesimulator/MBProgressHUD/MBProgressHUD.framework/Headers/MBProgressHUD.h' [-Werror,-Wnon-modular-include-in-framework-module]
    - WARN  | [iOS] xcodebuild:  /Users/mxgx/Library/Developer/Xcode/DerivedData/App-apmzwwbrafjhhxbmigbmpgfelyxy/Build/Products/Release-iphonesimulator/JJCTools/JJCTools.framework/Headers/UIButton+ActionBlock.h:57:81: warning: block pointer is missing a nullability type specifier (_Nonnull, _Nullable, or _Null_unspecified) [-Wnullability-completeness]

Analyzed 1 podspec.

[!] The spec did not pass validation, due to 2 errors and 1 warnings.
```

- （2）错误原因

这种错误，多为项目中依赖了其他三方库，但是在验证 `podspec` 文件的时候，检测到有类似
`s.dependency 'MBProgressHUD', '1.1.0'`
这样的依赖语句，而又无法找到对应的三方库，所以报错。

- （3）解决办法

指令语句后面添加 `--use-libraries` 即可。
相关指令参考： `二、步骤流程 - 2、验证 podspec 合法性`

- （4）参考链接

  - [CocoaPods 上传问题记录](https://www.jianshu.com/p/5558033ee534)

### 3、- ERROR | [iOS] unknown: Encountered an unknown error ([!] /usr/bin/git clone https://github.com/jijiucheng/JJCTools.git /var/folders/21/dw30m9y11l3gnc9v7n2qbcd80000gn/T/d20190724-15699-8r5sna --template= --single-branch --depth 1 --branch 1.0.0

- （1）错误信息

```
mxgx:JJCTools mxgx$ pod spec lint JJCTools.podspec

 -> JJCTools (1.0.0)
    - ERROR | [iOS] unknown: Encountered an unknown error ([!] /usr/bin/git clone https://github.com/jijiucheng/JJCTools.git /var/folders/21/dw30m9y11l3gnc9v7n2qbcd80000gn/T/d20190724-15699-8r5sna --template= --single-branch --depth 1 --branch 1.0.0

Cloning into '/var/folders/21/dw30m9y11l3gnc9v7n2qbcd80000gn/T/d20190724-15699-8r5sna'...
warning: Could not find remote branch 1.0.0 to clone.
fatal: Remote branch 1.0.0 not found in upstream origin
) during validation.

Analyzed 1 podspec.

[!] The spec did not pass validation, due to 1 error.
```

- （2）错误原因

未添加 tag 标签，且未推送到远程端，在 podspec 进行远程和本地验证的时候，未检测到，所以报错。

- （3）解决办法

添加 tag 标签，并推送到远程端，再次验证即可。
相关指令请参考： `二、步骤流程 - 1、当项目工程代码完成后，需要先将代码提交到远程端，并打上 tag 标签`

![添加 tag 标签，并推送到远程端](https://images.xiaozhuanlan.com/photo/2019/08fc630e471ddedb80c6a891c8ed6364.png)

- （4）参考链接

### 4、- ERROR | [iOS] attributes: Unable to validate 'dependencies' (Illformed requirement '"JJCTools/JJCToolsObject"').

- （1）错误信息

```
mxgx:JJCTools mxgx$ pod spec lint JJCTools.podspec

 -> JJCTools (1.0.0)
    - ERROR | [iOS] attributes: Unable to validate `dependencies` (Illformed requirement `"JJCTools/JJCToolsObject"`).
    - ERROR | [iOS] attributes: Unable to validate `dependencies` (Illformed requirement `"JJCTools/JJCToolsCategory"`).
    - ERROR | [iOS] unknown: Encountered an unknown error (The `JJCTools` pod failed to validate due to 2 errors:
    - ERROR | [iOS] attributes: Unable to validate `dependencies` (Illformed requirement `"JJCTools/JJCToolsObject"`).
    - ERROR | [iOS] attributes: Unable to validate `dependencies` (Illformed requirement `"JJCTools/JJCToolsCategory"`).

) during validation.

Analyzed 1 podspec.

[!] The spec did not pass validation, due to 3 errors.
```

![- ERROR | [iOS] attributes: Unable to validate 'dependencies' (Illformed requirement '"JJCTools/JJCToolsObject"').](https://images.xiaozhuanlan.com/photo/2019/ddac5658999e0463df58638a5839e69f.png)

- （2）错误原因

> 出现此问题，多为开源库有 `二级（子级）模块分类`，podspec 规范要求子级模块不能相互依赖，只允许单方向依赖。

- （3）解决办法

**2019.07.25**
暂时未找到相互依赖解决的好办法，只能通过一个这种的方法：将需要的方法拷贝复制一份到对应的子级文件夹模块即可。

请参考：`一、podspec 文件介绍 - 5、部分特别注意说明`。

- （4）参考链接

  - [iOS 项目组件化遇到的问题及解决（100%遇得到）](https://www.jianshu.com/p/1f56c3d78b52)
  - [cocoapods 系列教程---让自己的开源框架支持 cocoapods](https://www.jianshu.com/p/1f70f1176727)
  - [podspec 文档规范](https://guides.cocoapods.org/syntax/podspec.html#specification)
  - [[的 CocoaPods]项目添加的 CocoaPods 支持遇到的坑](https://www.jianshu.com/p/283584683b0b)

### 5、[!] You need to register a session first.

- （1）错误信息

![[!] You need to register a session first.](https://images.xiaozhuanlan.com/photo/2019/7a2f00f77cfb998eefb2122c1a8d2d4a.png)

- （2）错误原因

出现此问题，多为开源库有 `二级（子级）模块分类`，podspec 规范要求子级模块不能相互依赖，只允许单方向依赖。

- （3）解决办法

```
# 没有 cocoapods 账户，注册账户
pod trunk register 邮箱地址 '用户名' —description='描述信息'
# 有 cocoapods 账户，直接绑定账户
pod trunk register 邮箱地址 '用户名'
```

请参考：`二、步骤流程 - 3、验证成功后，将库文件推送到 cocoapods 服务器`。

- （4）参考链接

  - [iOS 开发：[!] You need to register a session first.](https://blog.csdn.net/yj_sail/article/details/52363920)

### 6、Cocoapods Error when I run: pod search realm

**错误信息：**

```
{24-06-19 17:06}[ruby-3.2.0]mxgx:~/JJCTools@master mxgx% pod search JJCTools
Creating search index for spec repo 'cocoapods'.. Done!
...
...
...
Don't forget to anonymize any private data!

Looking for related issues on cocoapods/cocoapods...
 - Cocoapods Error when I run: pod search realm
   https://github.com/CocoaPods/CocoaPods/issues/12161 [open] [1 comment]
   09 Jan 2024
```

**解决办法：**

有的人会提示删除 `~/Library/Caches/CocoaPods/search_index.json` 该路径下的文件，本人尝试了，没啥子用。

执行如下指令即可：

```
pod setup
```

### 7、ERROR | unknown: Encountered an unknown error (Failed to open TCP connection to github.com:443 (connect(2) for "github.com" port 443)) during validation. 和 fatal: unable to access 'https://github.com/xxx/xxx.git': CONNECT tunnel failed, response 405

**错误信息：**

```
{24-06-19 16:21}[ruby-3.2.0]mxgx:~/JJCTools@master mxgx% pod lib lint JJCTools.podspec --use-libraries --no-clean

 -> JJCTools (1.0.0)
    - ERROR | unknown: Encountered an unknown error (Failed to open TCP connection to github.com:443 (connect(2) for "github.com" port 443)) during validation.

Pods workspace available at `/var/folders/kt/pbq7yrws4xz_kspt99zyc9lc0000gn/T/CocoaPods-Lint-20240619-17615-2pbt3k-JJCTools/App.xcworkspace` for inspection.

[!] JJCTools did not pass validation, due to 1 error.
```

```
{24-06-19 16:54}[ruby-3.2.0]mxgx:~/JJCTools@master mxgx% pod spec lint JJCTools.podspec --use-libraries --allow-warnings

 -> JJCTools (1.0.0)
    - ERROR | [iOS] unknown: Encountered an unknown error ([!] /usr/bin/git clone https://github.com/jijiucheng/JJCTools.git /var/folders/kt/pbq7yrws4xz_kspt99zyc9lc0000gn/T/d20240619-23085-84vroj --template= --single-branch --depth 1 --branch 1.0.0

Cloning into '/var/folders/kt/pbq7yrws4xz_kspt99zyc9lc0000gn/T/d20240619-23085-84vroj'...
fatal: unable to access 'https://github.com/jijiucheng/JJCTools.git/': CONNECT tunnel failed, response 405
) during validation.

Analyzed 1 podspec.

[!] The spec did not pass validation, due to 1 error.
```

**解决办法：**

经过本人多方实验，发现根本原因还是网络问题，只要能解决正常访问 `github.com` 大多数的情况下都是可以的，但是有时候会发现即使 `ping github.com` 能通，但是还是会有该种现象报错。

本人猜测可能有几个原因：

- 如果是公司网络，估计基本上都有防火墙，会限制一些上传，建议更换到家庭网络或其它非公司网络；
- 如果不是在公司网络下仍旧无法上传，建议切换多个网络尝试，亦或者使用手机热点，本人就是使用该方式上传成功的。

网上常见的基本上都是通过配置代理的方式，配置如下：

```
# 取消当前代理设置
git config –global –unset http.proxy
git config –global –unset https.proxy

# 配置本机代理设置，其中 9090 是自己本机的端口号，各自的电脑一般都不一样，需要自己查询
# 有的是 socket，有的是 http 的方式，建议使用 http 方式，区别在于：socks5 不支持通过 pubkey 免密登录 github，每次提交代码只能输入用户名和密码；http 可以支持免密登录
git config --global http.proxy http://127.0.0.1:9090
git config --global https.proxy http://127.0.0.1:9090
```

亦或者通过切换网络、热点方式，再次尝试。

### 8、Unable to resolve dependency: 'activesupport (>= 5.0, < 8)' requires 'drb (>= 0)' (Gem::UnsatisfiableDependencyError)

**报错信息：**

```
{24-06-19 15:53}[ruby-3.2.0]mxgx:~/Documents/GitHub/MyGitHub/JJCTools@master mxgx% pod lib lint JJCTools.podspec
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/resolver.rb:231:in `search_for': Unable to resolve dependency: 'activesupport (>= 5.0, < 8)' requires 'drb (>= 0)' (Gem::UnsatisfiableDependencyError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/resolver.rb:283:in `block in sort_dependencies'
	...
    ...
    ...
	from /usr/local/bin/ruby_executable_hooks:22:in `eval'
	from /usr/local/bin/ruby_executable_hooks:22:in `<main>'
```

**解决办法：**

由于当前 `ruby` 版本环境的问题，切换至更高的版本即可，建议使用 `ruby—3.x` 以上的版本。

指令如下：

```
# 查看当前已安装的 ruby 版本，其中 rvm 是 ruby 版本包管理器
rvm ls
# 设置 ruby 版本（只对当前终端窗口有效）
rvm use ruby-3.2.0
# 设置默认 ruby 版本
rvm --default use ruby-3.2.0
```

### 9、WARN | [iOS] swift: The validator used Swift `4.0` by default because no Swift version was specified. To specify a Swift version during validation, add the `swift_versions` attribute in your podspec. Note that usage of a `.swift-version` file is now deprecated.

实际上该种现象并不是报错，只是说当前未设定 `swift` 版本的情况下，会按照默认使用 `swift 4.0` 进行相关代码校验。

亦或者可以通过在 `podspec` 文件中设置 `s.swift-versions` 属性配置。

最后就是在 `podspec` 同级目录下添加一个 `.swift-version` 的文件，文件的内容直接是 `swift` 的版本号，比如当下我这边是 `swift 5.10` 版本的，所以该 `.swift-version` 文件中就只有 `5.10` 的字样即可，然而该设置方式实际上已经被官方废弃了，所以并不建议使用。

亦或者可以通过指令进行添加：

```
# 在 podspec 同级根目录下执行该指令创建 .swift-version 文件
echo "5.10" > .swift-version

# 查看 swift 版本
xcrun swift -version
# 查看 swift 在 Xcode 中的位置
xcrun - find swift
# 修改 swift 版本
Project -> Target -> Build Settings -> 搜索 "swift" -> Swift Compiler Language -> Swift Language Version -> 设置目标版本
```

## 2019.07.25 更新 - 更新版本教程

```
Last login: Thu Jul 25 15:40:48 on ttys001
mxgx:~ mxgx$ cd /Users/mxgx/Documents/GitHub/MyGitHub/JJCTools
mxgx:JJCTools mxgx$ git tag
0.0.1
0.0.2
...
...
...
0.1.8
1.0.0
mxgx:JJCTools mxgx$ git tag 1.0.1
mxgx:JJCTools mxgx$ git push --tags
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/jijiucheng/JJCTools.git
 * [new tag]         1.0.1 -> 1.0.1
mxgx:JJCTools mxgx$ pod spec lint JJCTools.podspec --use-libraries -allow-warnings

[!] Unable to find a spec named `-allow-warnings'.
mxgx:JJCTools mxgx$ pod spec lint JJCTools.podspec --use-libraries --allow-warnings

 -> JJCTools (1.0.1)
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Using new build system
    ...
    ...
    ...
    - WARN  | [JJCTools/JJCToolsObject, JJCTools/JJCToolsCategory, JJCTools/JJCToolsView, and more...] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsObject/JJCToolsObject+BaseAPI.m:198:34: warning: result of comparison of constant 140000000000 with expression of type 'NSUInteger' (aka 'unsigned int') is always false [-Wtautological-constant-out-of-range-compare]
    - NOTE  | [iOS] [JJCTools/JJCToolsCategory] xcodebuild:  :82:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]

Updating spec repo `master`

--------------------------------------------------------------------------------
 🎉  Congrats

 🚀  JJCTools (1.0.1) successfully published
 📅  July 25th, 02:17
 🌎  https://cocoapods.org/pods/JJCTools
 👍  Tell your friends!
--------------------------------------------------------------------------------
mxgx:JJCTools mxgx$ pod repo update
Updating spec repo `master`
mxgx:JJCTools mxgx$ pod search JJCTools
```

## 参加链接

- [cocoapods - podspec 规范文档](https://guides.cocoapods.org/syntax/podspec.html#specification)
- [【iOS 工具】rvm，Ruby 环境和 CocoaPods 安装使用及相关报错问题解决](https://xiaozhuanlan.com/topic/7654293801)
- [GitHub - JJCTools](https://github.com/jijiucheng/JJCTools)
-
- [腾讯云 - CocoaPods 公有仓库的创建（超详细）前言正文结语](https://cloud.tencent.com/developer/article/1121117)
- [cocoapods 系列教程---让自己的开源框架支持 cocoapods](https://www.jianshu.com/p/1f70f1176727)
- [简书 - 组件化 cocoapods 仓库删除（填坑）](https://www.jianshu.com/p/e3d91ebcc38e)
- [简书 - Xcode - Swift Version](https://www.jianshu.com/p/d37f7fe026e8)
-
- [腾讯云 - git clone 出现 fatal: unable to access ‘https://github.com/…’的解决办法(亲测有效)](https://cloud.tencent.com/developer/article/2108855)
- [安装 CocoaPods 遇到的问题](https://www.jianshu.com/p/f5ebfadb0a20)
- [gem install cocoapods ERROR: While executing gem ... (Gem::FilePermissionError)](https://blog.csdn.net/kangguang/article/details/79544515)
- [Cocoapods 安装中出现的问题解决](https://blog.csdn.net/baidu_30511379/article/details/52450794)
- [CocoaPods 上传问题记录](https://www.jianshu.com/p/5558033ee534)
- [iOS 项目组件化遇到的问题及解决（100%遇得到）](https://www.jianshu.com/p/1f56c3d78b52)
- [CocoaPods 项目添加的 CocoaPods 支持遇到的坑](https://www.jianshu.com/p/283584683b0b)
- [iOS 开发：[!] You need to register a session first.](https://blog.csdn.net/yj_sail/article/details/52363920)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
>
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】开源库文件到 cocoapods 管理（2024.06.20 更新）](https://jijiucheng.github.io/2020/04/19/CocoaPods-Upload/)
>
> **发表日期**：2020/04/19 17:00:00
>
> **更新日期**：2024/06/20 10:00:00
>
> - **GitHub**：[GitHub - jijiucheng](https://github.com/jijiucheng)
>
>   **个人博客**：[GitHub.io - 苜蓿鬼仙](https://jijiucheng.github.io)
>
>   **小专栏**：[小专栏 - 苜蓿鬼仙](https://xiaozhuanlan.com/u/6667468960)
>
>   **掘金**：[掘金 - 苜蓿鬼仙](https://juejin.im/user/5a31e95c51882533d023137d)
