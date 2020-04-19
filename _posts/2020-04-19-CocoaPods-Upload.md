---
layout: post
title: 【iOS配置】开源库文件到cocoapods管理（2019.07.24 更新）
categories: iOS
description: CocoaPods 安装配置
keywords: iOS 配置, CocoaPods
topmost: true
---

### 声明：因为在写这篇文章的时候，是出于版本迭代状态，所以有些初始化的教程此次暂不列出，等后面有机会会慢慢补上！！！（2019.07.24）

### 此次会主要讲解 podspec 文件格式的规范问题，以及对应出现问题的解决办法！！！（2019.07.24）



## 一、podspec 文件介绍

#### 1、格式规范官网：

https://guides.cocoapods.org/syntax/podspec.html#specification

#### 2、示例规范：

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


#### 3、文件目录层级结构

![文件目录层级结构](https://images.xiaozhuanlan.com/photo/2019/ef699c7d010ca28d140e39565513dc79.png)

![通过 pod search JJCTools 查询库相关信息](https://images.xiaozhuanlan.com/photo/2019/3982fa3c1f95adaadc3fcb273472d946.png)

> **此处说明：**
> 实际上在文件目录层级中并非完全规范，`JJCToolsDemo`目录下的 `JJCTools` 库文件实际上应该是和 `JJCToolsDemo` 同级的，此处暂时还未更改正确。

#### 4、部分语法说明（具体详情请参考官方规范文档）

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


#### 5、部分特别注意说明

> 1、库文件当前版本号，必须保证此处版本号和 `GitHub`（也可能不是`码云`之类的代码托管平台）中的 tag 版本号保持一致，否则无法提交成功。
>
> 2、如果是图片、本地化语言文件，建议使用 `bundle` 资源包的形式进行打包处理。
>
> 3、pod 成功的库，每个子文件夹都是对应一个子库，子库的目的是为了防止一个 kit 太大，把功能模块都分出来减少包体积；所以子库原则上是不进行相互依赖的；如果库中有必须依赖的话，可以通过该方式进行依赖；其中依赖的对应为 pod 成功后显示的库路径，非真实路径。
>
> 4、
如果单方向依赖，通过 `dependency` 即可；
如果是同时依赖多个，官方写法是分别写出；
子级目录不能相互依赖，暂时测试 `（2019.07.24）` 的是没法解决，只能将对应的方法复制迁移到对应的子级分类中一份。



## 二、步骤流程

> **此处说明：**
> 此处只是建立在已经有过历史版本的情况下进行的记录，至于初次实现的步骤，后期再添加。
> 且此处是建立在未有任何报错的步骤下处理的，至于报错记录会在后面的内容中列出。


#### 1、当项目工程代码完成后，需要先将代码提交到远程端，并打上 `tag` 标签

```
$ git commit -m "提交文件日志"         # 提交所有更新过的文件
$ git tag                            # 查询当前已存在的 tag 标签
$ git tag 1.0.0                      # 添加 tag 本地标签（必须）
$ git push --tags                    # 提交所有 tag 标签到远程端（必须）
$ git tag -d 1.0.0                   # 删除 tag 本地标签
$ git push origin :refs/tags/1.0.0   # 删除远程端指定 tag 标签
```
![添加、删除 tag 标签](https://images.xiaozhuanlan.com/photo/2019/3689ab4bc2fde6559a7fd36944981014.png)

#### 2、验证 podpsec 文件的合法性

> 出现 `passed validation` 代表验证成功

```
## pod lib lint              从本地验证 pod 能否通过验证
## pod spec lint             从本地和远程端验证 pod 能否通过验证
## pod spec lint --verbose   详细编译验证 podspec 合法性
## --allow-warnings          带有警告需要的语法
## --use-libraries           依赖三方库需要的语法（比如：s.dependency 'MBProgressHUD', '1.1.0'）


## 从本地验证 pod 能否通过验证
pod lib lint JJCTools.podspec         
## 从本地验证依赖三方库的 pod 能否通过验证          
pod lib lint JJCTools.podspec --use-libraries 
## 从本地验证带有警告的 pod 能否通过验证  
pod lib lint JJCTools.podspec --allow-warnings
## 从本地验证依赖三方库且有警告的 pod 能否通过验证  
pod lib lint JJCTools.podspec --use-libraries --allow-warnings  


## 从本地和远程端验证 pod 能否通过验证
pod spec lint JJCTools.podspec         
## 从本地和远程端验证依赖三方库的 pod 能否通过验证         
pod spec lint JJCTools.podspec --use-libraries 
## 从本地验和远程端证带有警告的 pod 能否通过验证  
pod spec lint JJCTools.podspec --allow-warnings
## 从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证  
pod spec lint JJCTools.podspec --use-libraries --allow-warnings  


## 详细编译验证 podspec 合法性
pod spec lint --verbose  
```

![# 从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证 - 1](https://images.xiaozhuanlan.com/photo/2019/06fa5ba15ad4ae850adf6464df563713.png)

![# 从本地和远程端验证依赖三方库且有警告的 pod 能否通过验证 - 2](https://images.xiaozhuanlan.com/photo/2019/0c640fae9b3671d656c37a6c14176b55.png)


#### 3、验证成功后，将库文件推送到 cocoapods 服务器

> 此处如果没有绑定过 cocoapods 账户的情况下，此处会优先注册或绑定 cocoapods 账户

```
## 检测是否绑定 cocoapods 账户 

## 注册 cocoapods 账户（需要在邮箱激活）
pod trunk register 邮箱地址 '用户名' —description='描述信息'
## 检测是否注册成功  
pod trunk me                        
## 绑定 cocoapods 账户
pod trunk register 邮箱地址 '用户名'  
```
```
## 将库文件推送到 cocoapods 远程端

## 将库文件推送到 cocoapods 远程端 
pod trunk push JJCTools.podspec                    
## 将带有警告的库文件推送到 cocoapods 远程端
pod trunk push JJCTools.podspec --allow-warnings   
## 将依赖三方库的库文件推送到 cocoapods 远程端
pod trunk push JJCTools.podspec --use-libraries 
## 将依赖三方库且带有警告的库文件推送到 cocoapods 远程端  
pod trunk push JJCTools.podspec --use-libraries --allow-warnings  

## 刷新库文件，可保证通过 pod search 立即搜索的到 
pod repo update    
```

![报错误提示未注册或绑定 cocoapods 账户](https://images.xiaozhuanlan.com/photo/2019/896b2af9df070d7ad96475b74beaeab7.png)

![绑定 cocoapods 账户](https://images.xiaozhuanlan.com/photo/2019/ac9751061968b0f3242e3f78b1210dab.png)

![将依赖三方库且带有警告的库文件推送到 cocoapods 远程端](https://images.xiaozhuanlan.com/photo/2019/8b540a71d80dafd606558f62ca97ec72.png)



## 三、报错信息及解决办法

> **说明：**
> 部分 cocoapods 相关信息教程，可以参考如下链接：
> [【iOS工具】rvm，Ruby环境和CocoaPods安装使用及相关报错问题解决](https://xiaozhuanlan.com/topic/7654293801)


#### 1、ERROR:  While executing gem ... (Gem::FilePermissionError) 
#### You don't have write permissions for the /usr/bin directory.

- （1）错误信息

```
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /usr/bin directory.
```

- （2）错误原因

> 未安装 `cocoapods` 或 `cocoapods` 版本过低，需要安装或更新

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
  
  - [安装CocoaPods遇到的问题](https://www.jianshu.com/p/f5ebfadb0a20)
  - [gem install cocoapods ERROR: While executing gem ... (Gem::FilePermissionError)](https://blog.csdn.net/kangguang/article/details/79544515)
  - [Cocoapods安装中出现的问题解决](https://blog.csdn.net/baidu_30511379/article/details/52450794)


#### 2、[-Werror,-Wnon-modular-include-in-framework-module]

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

> 这种错误，多为项目中依赖了其他三方库，但是在验证 `podspec` 文件的时候，检测到有类似 
> `s.dependency 'MBProgressHUD', '1.1.0'`
> 这样的依赖语句，而又无法找到对应的三方库，所以报错。

- （3）解决办法

> 指令语句后面添加 `--use-libraries` 即可。
> 相关指令参考： `二、步骤流程 - 2、验证 podspec 合法性`

- （4）参考链接

  - [CocoaPods上传问题记录](https://www.jianshu.com/p/5558033ee534)


#### 3、- ERROR | [iOS] unknown: Encountered an unknown error ([!] /usr/bin/git clone https://github.com/jijiucheng/JJCTools.git /var/folders/21/dw30m9y11l3gnc9v7n2qbcd80000gn/T/d20190724-15699-8r5sna --template= --single-branch --depth 1 --branch 1.0.0

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

> 未添加 tag 标签，且未推送到远程端，在 podspec 进行远程和本地验证的时候，未检测到，所以报错。

- （3）解决办法

> 添加 tag 标签，并推送到远程端，再次验证即可。
> 相关指令请参考：  `二、步骤流程 - 1、当项目工程代码完成后，需要先将代码提交到远程端，并打上 tag 标签`

![添加 tag 标签，并推送到远程端](https://images.xiaozhuanlan.com/photo/2019/08fc630e471ddedb80c6a891c8ed6364.png)

- （4）参考链接


#### 4、- ERROR | [iOS] attributes: Unable to validate 'dependencies' (Illformed requirement '"JJCTools/JJCToolsObject"').

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

> 2019.07.25
>暂时未找到相互依赖解决的好办法，只能通过一个这种的方法：将需要的方法拷贝复制一份到对应的子级文件夹模块即可。
>
> 请参考：`一、podspec 文件介绍 - 5、部分特别注意说明`。

- （4）参考链接
 
  - [iOS项目组件化遇到的问题及解决（100%遇得到）](https://www.jianshu.com/p/1f56c3d78b52)
  - [cocoapods系列教程---让自己的开源框架支持cocoapods](https://www.jianshu.com/p/1f70f1176727)
  - [podspec 文档规范](https://guides.cocoapods.org/syntax/podspec.html#specification)
  - [[的CocoaPods]项目添加的CocoaPods支持遇到的坑](https://www.jianshu.com/p/283584683b0b)


#### 4、[!] You need to register a session first.

- （1）错误信息

![[!] You need to register a session first.](https://images.xiaozhuanlan.com/photo/2019/7a2f00f77cfb998eefb2122c1a8d2d4a.png)

- （2）错误原因

> 出现此问题，多为开源库有 `二级（子级）模块分类`，podspec 规范要求子级模块不能相互依赖，只允许单方向依赖。

- （3）解决办法

```
# 没有 cocoapods 账户，注册账户
pod trunk register 邮箱地址 '用户名' —description='描述信息'
# 有 cocoapods 账户，直接绑定账户
pod trunk register 邮箱地址 '用户名' 
```

> 请参考：`二、步骤流程 - 3、验证成功后，将库文件推送到 cocoapods 服务器`。

- （4）参考链接
 
  - [iOS开发：[!] You need to register a session first.](https://blog.csdn.net/yj_sail/article/details/52363920)



## 四、参考链接汇总

#### 1、资源集汇总

- [cocoapods - podspec 规范文档](https://guides.cocoapods.org/syntax/podspec.html#specification)
- [【iOS工具】rvm，Ruby环境和CocoaPods安装使用及相关报错问题解决](https://xiaozhuanlan.com/topic/7654293801)
- [GitHub - JJCTools](https://github.com/jijiucheng/JJCTools)

#### 2、ERROR:  While executing gem ... (Gem::FilePermissionError) You don't have write permissions for the /usr/bin directory.

- [安装CocoaPods遇到的问题](https://www.jianshu.com/p/f5ebfadb0a20)
- [gem install cocoapods ERROR: While executing gem ... (Gem::FilePermissionError)](https://blog.csdn.net/kangguang/article/details/79544515)
- [Cocoapods安装中出现的问题解决](https://blog.csdn.net/baidu_30511379/article/details/52450794)

#### 3、[-Werror,-Wnon-modular-include-in-framework-module]

- [CocoaPods上传问题记录](https://www.jianshu.com/p/5558033ee534)

#### 4、- ERROR | [iOS] attributes: Unable to validate 'dependencies' (Illformed requirement '"JJCTools/JJCToolsObject"').

- [iOS项目组件化遇到的问题及解决（100%遇得到）](https://www.jianshu.com/p/1f56c3d78b52)
- [cocoapods系列教程---让自己的开源框架支持cocoapods](https://www.jianshu.com/p/1f70f1176727)
- [podspec 文档规范](https://guides.cocoapods.org/syntax/podspec.html#specification)
- [[的CocoaPods]项目添加的CocoaPods支持遇到的坑](https://www.jianshu.com/p/283584683b0b)

#### 5、[!] You need to register a session first.
 
 - [iOS开发：[!] You need to register a session first.](https://blog.csdn.net/yj_sail/article/details/52363920)


## 2019.07.25 更新 - 更新版本教程

```
Last login: Thu Jul 25 15:40:48 on ttys001
mxgx:~ mxgx$ cd /Users/mxgx/Documents/GitHub/MyGitHub/JJCTools
mxgx:JJCTools mxgx$ git tag
0.0.1
0.0.2
0.0.4
0.0.5
0.0.6
0.0.7
0.0.8
0.0.9
0.1.0
0.1.1
0.1.2
0.1.3
0.1.4
0.1.5
0.1.6
0.1.7
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
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Planning build
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Constructing build description
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:53:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - NOTE  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  MBProgressHUD/MBProgressHUD.h:435:62: note: 'yOffset' has been explicitly marked deprecated here
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:82:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:83:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIImage+JJC.m:72:18: warning: null passed to a callee that requires a non-null argument [-Wnonnull]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/MBProgressHUD+JJC.m:301:70: warning: values of type 'NSInteger' should not be used as format arguments; add an explicit cast to 'long' instead [-Wformat]
    - WARN  | [JJCTools/JJCToolsObject, JJCTools/JJCToolsCategory, JJCTools/JJCToolsView, and more...] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsObject/JJCToolsObject+BaseAPI.m:195:44: warning: implicit conversion loses integer precision: 'long long' to 'NSUInteger' (aka 'unsigned int') [-Wshorten-64-to-32]
    - WARN  | [JJCTools/JJCToolsObject,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsObject/JJCToolsObject+BaseAPI.m:198:34: warning: result of comparison of constant 140000000000 with expression of type 'NSUInteger' (aka 'unsigned int') is always false [-Wtautological-constant-out-of-range-compare]

Analyzed 1 podspec.

JJCTools.podspec passed validation.

mxgx:JJCTools mxgx$ pod trunk push JJCTools.podspec --use-libraries --allow-warnings
Updating spec repo `master`
Validating podspec
 -> JJCTools (1.0.1)
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Using new build system
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Planning build
    - NOTE  | [JJCTools/JJCToolsOthers, JJCTools/JJCToolsDefine, JJCTools/JJCToolsObject, and more...] xcodebuild:  note: Constructing build description
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:53:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - NOTE  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  MBProgressHUD/MBProgressHUD.h:435:62: note: 'yOffset' has been explicitly marked deprecated here
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:82:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIViewController+HUD.m:83:9: warning: 'yOffset' is deprecated: Set offset.y instead. [-Wdeprecated-declarations]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/UIImage+JJC.m:72:18: warning: null passed to a callee that requires a non-null argument [-Wnonnull]
    - WARN  | [JJCTools/JJCToolsCategory,JJCTools/JJCToolsView] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsCategory/MBProgressHUD+JJC.m:301:70: warning: values of type 'NSInteger' should not be used as format arguments; add an explicit cast to 'long' instead [-Wformat]
    - WARN  | [JJCTools/JJCToolsObject, JJCTools/JJCToolsCategory, JJCTools/JJCToolsView, and more...] xcodebuild:  JJCTools/JJCToolsDemo/JJCTools/JJCToolsObject/JJCToolsObject+BaseAPI.m:195:44: warning: implicit conversion loses integer precision: 'long long' to 'NSUInteger' (aka 'unsigned int') [-Wshorten-64-to-32]
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


## 备注：
## 对于托管 cocoapods 开源库的初始教程暂时还没有附上，后期会增加；此处只是在已存的情况进行迭代的。
## 初始教程相比于这篇，仅仅是多了在代码托管平台创建开源链接，这个 GitHub、码云都有相应的教程，可以参考。


