---
layout: post
title: 【SDK】SDK / framework 开发实践（2021.07.06 更新）
categories: SDK
description: 【SDK】苹果开发者账户申请及邓白氏编号（D-U-N-S® Number）申请
keywords: SDK，framework, iOS, Xcode
topmost: true
---

**导读：** 
该篇文章主要记录 `SDK / framework` 开发实践，创建的 `framework` 为 [jijiucheng / JJCSwiftTools](https://github.com/jijiucheng/JJCSwiftTools)，参考实践是 [onevcat / Kingfisher](https://github.com/onevcat/Kingfisher)。

## 基础知识

### 01 - 架构设备

> 常见 **iOS SDK** 开发架构设备区分：
> 
> - **arm7**：`真机`，在最老的支持 `iOS7` 的设备上使用
> - **arm7s**：`真机`，在 `iPhone5` 和 `iPhone5c` 上使用
> - **arm64**：`真机`，运行于 `iPhone5s` 的 `64位 ARM` 处理器上
> - **i386**：`模拟器`，`32位` 模拟器上使用
> - **x86_64**：`模拟器`，`64位` 模拟器上使用
>
> 注意：
> - 高位兼容地位（`32位` 兼容 `16位`），`arm7` 版本可以在 `arm7s` 上运行；
> - 需要在对应架构设备上运行，才能生成对应架构的包。

### 02 - Static Library（静态库）、Dynamic Library（动态库）、Framework、Mach-O Type

**① 库格式**

> **库格式** 决定库独立性、库内文件类型、库内外文件依赖关系。
- `Static Library`：静态性质、动态非共享性质、动态共享性质
- `Framework`：静态性质、动态非共享性质、动态共享性质
- `Metal Library`

**② 库性质**

> **库性质** 由 `Mach-O Type` 决定；<br>
> **库性质** 决定库加载到运行时内存的时机、加载的库范围、库的共享权限。
- 静态库
- 动态非共享库
- 动态共享库

**③ Mach-O Type**

> **Mach-O Type** 是一种文件格式，`Mach Object` 文件格式，是 Mac 上的可执行文件类型或目标文件(`.o`)。

- `Executable`：`静态库`，输出二进制；
- `Dynamic Library`：`动态非共享库`，输出动态链接库非共享库，程序 `运行` 时链接到 `内存`，大部分场景下不可共享；`app extension`、`部分 macOS` 场景下可以共享；
- `Bundle`：`动态非共享库`，和 `Dynamic Library` 相近，不过需要手动调用函数加载；
- `Static Library`：`静态库`，输出静态链接库，程序 `编译` 时拷贝到 `内存`；
- `Relocatable Object File`：`静态库`，和 `Static Library` 类似，但体积更小。

## 基础工程配置

`此处先看一下总体文件目录：` 

![SDK 开发实践 - 总体文件目录](/images/SDK/2021-07-06-SDK-Framework-01.png)

> JJCSwiftTools
> - .git
> - .gitignore
> - Source
>   - General
> - Demo
>   - Demo
>     - JJCSwiftTools-Demo
>   - JJCSwiftTools-Demo.xcodeproj
> - JJCSwiftTools.xcodeproj
> - JJCSwiftTools.xcworkspace
> - LICENSE
> - README.md

> 说明：
> 
> 1、`.git`：git 关联 github 相关的各分支、提交日志等信息
> 2、`.gitignore`：git 忽略文件
> 3、`JJCSwiftTools.xcworkspace`：该项目容器文件
> 4、`JJCSwiftTools.xcodeproj`：该项目 `framework` 库
> 5、`Demo`：相关的 demo 文件
> 6、`Source`：**核心代码区**

### 01 - 创建 .framework 文件

> 执行路径：`Xcode -> File -> New -> Project -> iOS -> Framework & Library -> Framework`

![SDK 开发实践 - 创建 framework 文件](/images/SDK/2021-07-06-SDK-Framework-02.png)

创建完成后，通过 `JJCSwiftTools` 项目调整相关文件目录，此处直接在工程内部更改名称及新增文件夹。

![SDK 开发实践 - 创建 framework 文件 - 更改文件名](/images/SDK/2021-07-06-SDK-Framework-03.png)

变更完文件名称后，如果此时进行编译的话，因为直接在工程内部将 `Project - JJCSwiftTools` 下原本的 `JJCSwiftTools` 更名为 `Source`，会引起原目录下的 `info.plist` 文件路径发生改变，所以会报以下错误：

```
ProcessInfoPlistFile /Users/mxgx/Library/Developer/Xcode/DerivedData/JJCSwiftTools-bphcwwejeiwraedwnkjzyeowdibz/Build/Products/Debug-maccatalyst/JJCSwiftTools.framework/Versions/A/Resources/Info.plist /Users/mxgx/Documents/GitHub/MyGitHub/JJCSwiftTools/JJCSwiftTools/Info.plist (in target 'JJCSwiftTools' from project 'JJCSwiftTools')
    cd /Users/mxgx/Documents/GitHub/MyGitHub/JJCSwiftTools
    builtin-infoPlistUtility /Users/mxgx/Documents/GitHub/MyGitHub/JJCSwiftTools/JJCSwiftTools/Info.plist -producttype com.apple.product-type.framework -expandbuildsettings -platform macosx -o /Users/mxgx/Library/Developer/Xcode/DerivedData/JJCSwiftTools-bphcwwejeiwraedwnkjzyeowdibz/Build/Products/Debug-maccatalyst/JJCSwiftTools.framework/Versions/A/Resources/Info.plist

error: Build input file cannot be found: '/Users/mxgx/Documents/GitHub/MyGitHub/JJCSwiftTools/JJCSwiftTools/Info.plist' (in target 'JJCSwiftTools' from project 'JJCSwiftTools')
```

![SDK 开发实践 - 创建 framework 文件 - 报错](/images/SDK/2021-07-06-SDK-Framework-04.png)

既然弄明白了报错的原因，那就只需要找到对应的 `info.plist` 文件路径，更改为指定的即可以编译成功：
> 执行路径：Project -> TARGET -> Build Settings -> Packaging -> Info.plist File

将 `JJCSwiftTools/info.plist` 更改为 `Source/info.plist` 后编译即可。

![SDK 开发实践 - 创建 framework 文件 - 更改 info.plist 路径](/images/SDK/2021-07-06-SDK-Framework-05.png)

### 02 - 更改工程配置

**1、更改 Development Info Target 到目标系统版本（设置 SDK 版本号和环境依赖）**

> 执行路径：JJCSwiftTools -> Target -> General -> Identity / Deployment Info

![SDK 开发实践 - 调整 SDK 版本号和版本环境依赖](/images/SDK/2021-07-06-SDK-Framework-06.png)

**2、设置 SDK - framework 为动态库**

> 执行路径：JJCSwiftTools -> Target -> Build Settings -> Linking -> Mach-O Type

![SDK 开发实践 - 创建 framework 文件](/images/SDK/2021-07-06-SDK-Framework-07.png)

### 03 - 创建 Demo 相关工程

在根目录下（与 `Source` 同级）创建 `Demo` 文件夹，并在 `Demo` 文件夹下创建常规工程 `JJCSwiftTools-Demo`，用于保存所涉及的相关 `Demo` 合辑。

创建完工程项目后，直接在工程内部根目录下创建 `Demo` 文件夹，并将原工程根目录下的 `JJCSwiftTools-Demo` 整个文件夹拖拽至工程内部根目录下的 `Demo` 文件目录下。

此后新建的其他 `Target` 类型的文件工程都将添加至该 `Demo` 文件目录下。

![SDK 开发实践 - 创建 Demo 工程](/images/SDK/2021-07-06-SDK-Framework-08.png)

> **注意：**
> 
> 1、此处同样会有 `info.plist` 路径问题，同样需要进行变更，参考 `01 - 创建 .framework 文件`。

### 04 - 创建关联 .xcworkspace 容器文件

> 执行路径：`Xcode -> File -> New -> Workspace`

`.workspace` 文件是类似一个 `容器` 的存在，可以同时关联多个 `project` 文件，而每个 `project` 又可以同时关联多个 `target` 工程。

![SDK 开发实践 - 创建 workspace 文件](/images/SDK/2021-07-06-SDK-Framework-09.png)

创建完 `JJCSwiftTools.xcworkspace` 容器文件后，分别添加关联 `JJCSwiftTools` 的 `framework` 工程文件和 `JJCSwiftTools-Demo` 工程文件。

只需要添加 `.xcodeproj` 文件即可。

> 执行路径：File -> Add Files to "JJCSwiftTools.xcworkspace" ...

![SDK 开发实践 - 创建 workspace 文件 - 添加其他工程](/images/SDK/2021-07-06-SDK-Framework-10.png)


## 添加 CocoaPod 支持

添加 `CocoaPod` 支持，可以先参考一下之前写得文章：
- [【iOS】开源库文件到cocoapods管理（2019.07.24 更新）](https://jijiucheng.github.io/2020/04/19/CocoaPods-Upload/)

### 01 - 配置 podspec 文件

需要在根目录文件夹下，新增一个 `.podspec` 文件，用于管理支持 `CocoaPod` 的环境配置文件。

```
Pod::Spec.new do |s|

  s.name         = "JJCSwiftTools"
  s.version      = "1.0.0"
  s.summary      = "Some methods to get result fasterly with swift!"

  s.homepage     = "https://github.com/jijiucheng/JJCSwiftTools"
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "苜蓿鬼仙" => "302926124@qq.com" }

  s.swift_versions = ['5.0']
  s.ios.deployment_target = "13.0"
  s.requires_arc = true

  s.source       = { :git => "https://github.com/jijiucheng/JJCSwiftTools.git", :tag => s.version }
  s.source_files = [ "Sources/**/*.swift" ]
  s.resource     = [ "Sources/Resources/JJCSwiftTools.bundle" ]
  
end
```

#### 部分语法说明（具体详情请参考官方规范文档）（参考 JJCTools.podspec 配置）

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

当完成 `.podspec` 文件配置后，需要将对应的变动文件上传到 `master` 主分支上，同时需要添加 `tag` 标签。

```
$ git commit -m "提交文件日志"         # 提交所有更新过的文件
$ git tag                            # 查询当前已存在的 tag 标签
$ git tag 1.0.0                      # 添加 tag 本地标签（必须）
$ git push --tags                    # 提交所有 tag 标签到远程端（必须）
$ git tag -d 1.0.0                   # 删除 tag 本地标签
$ git push origin :refs/tags/1.0.0   # 删除远程端指定 tag 标签
```

![SDK 开发实践 - 添加 CocoaPod 支持 - 配置 podspec 文件后，打 tag 标签](/images/SDK/2021-07-06-SDK-Framework-11.png)

### 02 - 验证 podpsec 文件的合法性

> 出现 `passed validation` 代表验证成功

```
## pod lib lint              从本地验证 pod 能否通过验证
## pod spec lint             从本地和远程端验证 pod 能否通过验证
## pod spec lint --verbose   详细编译验证 podspec 合法性
## --allow-warnings          带有警告需要的语法
## --use-libraries           依赖三方库需要的语法（比如：s.dependency 'MBProgressHUD', '1.1.0'）


## 从本地验证 pod 能否通过验证
pod lib lint JJCSwiftTools.podspec         
## 从本地验证依赖三方库的 pod 能否通过验证          
pod lib lint JJCSwiftTools.podspec --use-libraries 
## 从本地验证带有警告的 pod 能否通过验证  
pod lib lint JJCSwiftTools.podspec --allow-warnings
## 从本地验证依赖三方库且有警告的 pod 能否通过验证  
pod lib lint JJCSwiftTools.podspec --use-libraries --allow-warnings  


## 从本地和远程端验证 pod 能否通过验证
pod spec lint JJCSwiftTools.podspec         
## 从本地和远程端验证依赖三方库的 pod 能否通过验证         
pod spec lint JJCSwiftTools.podspec --use-libraries 
## 从本地验和远程端证带有警告的 pod 能否通过验证  
pod spec lint JJCSwiftTools.podspec --allow-warnings
## 从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证  
pod spec lint JJCSwiftTools.podspec --use-libraries --allow-warnings  


## 详细编译验证 podspec 合法性
pod spec lint --verbose  
```

![SDK 开发实践 - 添加 CocoaPod 支持 - 校验 podspec 文件的合法性](/images/SDK/2021-07-06-SDK-Framework-12.png)

### 03 - 检测是否关联注册账户

> 此处的账户指代的为当前库关联账户，第一次提交的话，默认是未关联状态，需要注册。

```
## 检测是否绑定 cocoapods 账户 

## 检测是否关联注册
pod trunk me  
## 注册 cocoapods 账户（需要在邮箱激活）
pod trunk register 邮箱地址 '用户名' —description='描述信息'                      
## 绑定 cocoapods 账户
pod trunk register 邮箱地址 '用户名'  
```

```
pod trunk register 302926124@qq.com 'jijiucheng'
```

![SDK 开发实践 - 添加 CocoaPod 支持 - 关联注册账户](/images/SDK/2021-07-06-SDK-Framework-13.png)

### 04 - 验证成功后，将库文件推送到 cocoapods 服务器

```
## 将库文件推送到 cocoapods 远程端

## 将库文件推送到 cocoapods 远程端 
pod trunk push JJCSwiftTools.podspec                    
## 将带有警告的库文件推送到 cocoapods 远程端
pod trunk push JJCSwiftTools.podspec --allow-warnings   
## 将依赖三方库的库文件推送到 cocoapods 远程端
pod trunk push JJCSwiftTools.podspec --use-libraries 
## 将依赖三方库且带有警告的库文件推送到 cocoapods 远程端  
pod trunk push JJCSwiftTools.podspec --use-libraries --allow-warnings  

## 刷新库文件，可保证通过 pod search 立即搜索的到 
pod repo update    

## 删除某个已发布的版本
pod trunk delete JJCSwiftTools 1.0.2
```

```
pod trunk push JJCSwiftTools.podspec --allow-warnings
```

![SDK 开发实践 - 添加 CocoaPod 支持 - 将库文件推送到 cocoapods 服务器](/images/SDK/2021-07-06-SDK-Framework-14.png)


> **注意**：如果出现如下报错：
> - 1、检查是私有库还是公有库？
> - 2、检查是否添加对应的 tag 标签了？

```
[!] Source code for your Pod was not accessible to CocoaPods Trunk. Is it a private repo or behind a username/password on http?
```

![SDK 开发实践 - 添加 CocoaPod 支持 - 将库文件推送到 cocoapods 服务器报错](/images/SDK/2021-07-06-SDK-Framework-15.png)



<——待更新——>


## 参考链接

- [【iOS】开源库文件到cocoapods管理（2019.07.24 更新）](https://jijiucheng.github.io/2020/04/19/CocoaPods-Upload/)
- 
- [iOS SDK 从开发到发布](https://www.jianshu.com/p/78685840bec3)
- [iOS SDK开发二三事](https://zhuanlan.zhihu.com/p/135315672)
- [iOS-SDK开发经验分享（推荐）](https://www.jianshu.com/p/cbb1f54b89d2)
- [iOS 静态库、动态库、Framework、mach-O Type](https://www.jianshu.com/p/ab7e902218c8)
- [iOS开发-动态和静态FrameWork](https://www.jianshu.com/p/8ab019a38467)
- [iOS如何在SDK中使用资源文件(xib,image,localizable string...（推荐）](https://www.codercto.com/a/40780.html)
- [Framework&&Bundle打包&&iOS SDK（推荐）](https://www.jianshu.com/p/92876a275f7f)
-
- [关于iOS-SDK那些事](https://www.jianshu.com/p/f44e30089971)
- [iOS SDK（一）：静态库、动态库创建&接口测试【推荐】](https://www.jianshu.com/p/1d6cd04ff1e3)
- [iOS：NSBundle的一些理解【推荐】](https://www.jianshu.com/p/b64ff9d8e7ce)
- [iOS SDK（二）：Bundle【推荐】](https://www.jianshu.com/p/173076faa742)


## 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【SDK】SDK / framework 开发实践（2021.07.06 更新）](https://jijiucheng.github.io/2021/07/06/SDK-Framework/)
> 
> **发表日期**：2021/07/06 16:00:00
> 
> **更新日期**：2021/07/06 16:00:00
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


