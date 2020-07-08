---
layout: post
title: 【iOS】Animation 动画特效图片资源文件的处理实现策略
categories: iOS
description: Animation 动画特效图片资源文件的处理实现策略
keywords: iOS, image, lottie, SVGA
topmost: false
---

# 前言

最近项目中需要实现一个动画特效，初始的设计思路是通过 UI 设计组给定的图片资源通过 `UIImageView` 的 `帧动画` 实现，之后考虑可以通过 `SVGA` 文件播放资源文件也可以实现，但是这两种方式的实现都需要通过将较大的 `图片资源文件` 或 `SVGA` 资源文件打包到 `ipa` 文件包中，无形之中增大了安装包的体积，对于用户来的下载安装来讲并不是一种很好的体验。

虽然实现上都比较方便，甚至可以通过打包安装包时不带对应的资源文件，通过用户打开 App 后远程缓存对应的图片资源文件或 `SVGA` 资源文件的方式，但是操作仍比较繁琐，仍需要花费比较多的流量进行缓存下载才能实现对应的动画特效，对于用户而言仍不是一种很好的方案。

最终调研发现，可以使用一种新的方案，`Lottie File` 的方式，只需要导入对应的开源库 `lottie-ios`、添加少量的配置文件，以及添加少量的代码，即可实现酷炫的动画效果。 

此处会简单介绍一下 `UIImageView` 的帧动画、`SVGA` 动画、`Lottie File` 动画。至于苹果原生的 `Animation` 动画效果的实现方式，本篇文章中暂不介绍。


# UIImageView 帧动画

### UIImageView 帧动画简单介绍

对于 `Video` 实际上就是由一组组连续的图片共同合成的动态可视化视图。

所以，UIImageView 动画也是通过 `UIImageView` 加载一组连续的图片数组，形成的简单帧动画。

### UIImageView 相关属性方法

```
// these allow a set of images to be animated. the array may contain multiple copies of the same

// 动画图片数组
open var animationImages: [UIImage]? // The array must contain UIImages. Setting hides the single image. default is nil
// 高亮动画图片数组
@available(iOS 3.0, *)
open var highlightedAnimationImages: [UIImage]? // The array must contain UIImages. Setting hides the single image. default is nil
// 动画持续时间
open var animationDuration: TimeInterval // for one cycle of images. default is number of images * 1/30th of a second (i.e. 30 fps)
// 重复次数（默认 0，无限循环）
open var animationRepeatCount: Int // 0 means infinite (default is 0)
// 获取是否动画中...
open var isAnimating: Bool { get }

// 开始动画
open func startAnimating()
// 结束动画
open func stopAnimating()
```

### 示例代码

![UIImageViewFrameAnimation.gif](/images/iOS/Animation-SVGAAndLottie-imageview 01.gif)

```
import UIKit

class UIImageViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.title = "UIImageView Frame Animation"
        view.backgroundColor = .white
        
        setupImageViewAnimation()
    }
    
    func setupImageViewAnimation() {
        
        //MARK: - Create UIImageView
        
        let imageV = UIImageView()
        imageV.center = view.center
        imageV.bounds = CGRect(x: 0, y: 0, width: 300, height: 300)
        imageV.backgroundColor = UIColor(white: 0.9, alpha: 1)
        view.addSubview(imageV)
        
        
        //MARK: - Add frame animation with UIImageView
        
        /// Add  images with 'UIImage' type to Array
        var array = [UIImage]()
        for i in 0...21 {
            array.append(UIImage(named: "image_\(i)") ?? UIImage())
        }
        
        /// animation duration
        imageV.animationDuration = 3.0
        /// animation images resources
        imageV.animationImages = array
        /// animation repeat count，0 means infinite
        imageV.animationRepeatCount = 0
        
        /// start animation
        imageV.startAnimating()
    }
}
```

# SVGA 动画

### SVGA 动画简单介绍

> SVGA 是一种 `跨平台` 的开源动画格式，同时兼容 `iOS / Android / Web`。SVGA 除了使用简单，性能卓越，同时让动画开发分工明确，各自专注各自的领域，大大减少动画交互的沟通成本，提升开发效率。动画设计师专注动画设计，通过工具输出 svga 动画文件，提供给开发工程师在集成 svga player 之后直接使用。动画开发从未如此简单！
>
> SVGA 除了使用简单，性能卓越，同时让动画开发分工明确，各自专注各自的领域，大大减少动画交互的沟通成本，提升开发效率。
>
> 动画设计师专注动画设计，通过工具输出 svga 动画文件，提供给开发工程师在集成 SVGAPlayer 之后直接使用。
>   
> <p align="right">—— 摘自 “SVGA 官网”</p>

> Similar to Lottie. Render After Effects / Animate CC (Flash) animations natively on Android and iOS, Web. 使用 SVGAPlayer 在 Android、iOS、Web中播放 After Effects / Animate CC (Flash) 动画。
> 
> <p align="right">—— 摘自 “GitHub - SVGA”</p> 

[SVGA 官网](http://svga.io/)

[GitHub - SVGA](https://github.com/svga)

![SVGA 支持平台](/images/iOS/Animation-SVGAAndLottie-svga 01.png)

暂时已知的是，`SVGA` 已经支持 `iOS / Android / Web / Flutter` 平台。

### SVGA 动画原理

![SVGA 使用展示流程](/images/iOS/Animation-SVGAAndLottie-svga 02.png)

`SVGA` 最初的 `目标是为降低序列帧动画开销而生的`，因此，性能问题一直是 SVGA 关注的焦点。SVGA 实质上做了一件非常重要的事情：

> 在动画播放前，一次性地上传所有纹理到 `GPU`，接着，在播放的过程中，这些纹理会被重复使用；CPU 与 GPU 交换的次数大大减少，同时，纹理的数目也在可控范围。内存、CPU、GPU 占用能达到最优状态。
> 
> SVGA 做的事情实际上非常简单，`Converter` 会负责从 `Flash` 或 `AE` 源文件中提取所有动画元素（位图、矢量），并将其在时间轴中的每帧表现（位移、缩放、旋转、透明度）导出。 `Player` 会负责将这些信息还原至画布上。

SVGA 不同于 `Lottie`，**Lottie 需要在 Player 一层完整地将 After Effects 所有逻辑实现，而 SVGA 则将这些逻辑免去**。因此，SVGA 可以同时支持 Flash，我们相信 Flash 以及其继承者 Animate CC 仍然有强大的生命力，以及完善的设计生态。

### 项目集成（iOS）

通过 `Cocoapods` 添加库依赖支持：

```
platform :ios, '11.0'

target '001-LottieAndSVGADemo' do
use_frameworks!

	pod 'SVGAPlayer'

source 'https://github.com/CocoaPods/Specs.git'

end
```

然后通过 `pod install` 安装依赖支持。

### 核心代码

[GitHub - SVGA - SVGAParser.m](https://github.com/svga/SVGAPlayer-iOS/blob/master/Source/SVGAParser.m)

```
*********** 核心方法 ************

// 通过 URL 播放动画（底层实现依赖于 parseWithURLRequest 方法）
- (void)parseWithURL:(nonnull NSURL *)URL
     completionBlock:(void ( ^ _Nonnull )(SVGAVideoEntity * _Nullable videoItem))completionBlock
        failureBlock:(void ( ^ _Nullable)(NSError * _Nullable error))failureBlock;

// 最核心方法，通过网络请求 URLRequest 播放动画
// 原理：先通过 parseWithCacheKey 方法查询是否有对应的缓存，如果有直接返回；如果没有，则通过 NSURLSession 的 dataTaskWithRequest 方法进行缓存下载再返回
- (void)parseWithURLRequest:(nonnull NSURLRequest *)URLRequest
            completionBlock:(void ( ^ _Nonnull )(SVGAVideoEntity * _Nullable videoItem))completionBlock
               failureBlock:(void ( ^ _Nullable)(NSError * _Nullable error))failureBlock;

// 通过 data 加载播放动画
- (void)parseWithData:(nonnull NSData *)data
             cacheKey:(nonnull NSString *)cacheKey
      completionBlock:(void ( ^ _Nullable)(SVGAVideoEntity * _Nonnull videoItem))completionBlock
         failureBlock:(void ( ^ _Nullable)(NSError * _Nonnull error))failureBlock;

// 本地加载播放动画，通过文件资源名
- (void)parseWithNamed:(nonnull NSString *)named
              inBundle:(nullable NSBundle *)inBundle
       completionBlock:(void ( ^ _Nullable)(SVGAVideoEntity * _Nonnull videoItem))completionBlock
          failureBlock:(void ( ^ _Nullable)(NSError * _Nonnull error))failureBlock;


*********** 代理方法 ************

// 动画完成时回调
- (void)svgaPlayerDidFinishedAnimation:(SVGAPlayer *)player;
// 当前执行动画对应图库资源的 frame 帧 index
- (void)svgaPlayerDidAnimatedToFrame:(NSInteger)frame;
// 动画执行进度
- (void)svgaPlayerDidAnimatedToPercentage:(CGFloat)percentage;


*********** 本地 ************

// 创建 SVGAPlayer 实例
SVGAPlayer *localSVGAPlayer = [[SVGAPlayer alloc] initWithFrame:CGRectMake(0, 0, 200, 200)];
[self.view addSubview:localSVGAPlayer]; // Add subview by yourself.

// 创建 SVGAParser 实例，并使用对应的方法加载动画
SVGAParser *parser = [[SVGAParser alloc] init];
[parser parseWithNamed:@"posche" inBundle:nil completionBlock:^(SVGAVideoEntity * _Nonnull videoItem) {
    localSVGAPlayer.videoItem = svgaItem
    localSVGAPlayer.startAnimation()
} failureBlock:nil];


*********** 远程 ************

// 创建 SVGAPlayer 实例
SVGAPlayer *player = [[SVGAPlayer alloc] initWithFrame:CGRectMake(0, 0, 200, 200)];
[self.view addSubview:player]; // Add subview by yourself.

// 创建 SVGAParser 实例，并使用对应的方法加载动画
SVGAParser *parser = [[SVGAParser alloc] init];
[parser parseWithURL:[NSURL URLWithString:@"https://github.com/yyued/SVGA-Samples/blob/master/posche.svga?raw=true"] completionBlock:^(SVGAVideoEntity * _Nullable videoItem) {
    if (videoItem != nil) {
        player.videoItem = videoItem;
        [player startAnimation];
    }
} failureBlock:nil];
```

### 示例代码

![SVGA 示例动画](/images/iOS/Animation-SVGAAndLottie-svga 03.gif)

```
import UIKit
import SVGAPlayer

class SVGAViewController: UIViewController {
    
    let remoteSVGAUrl = "https://gitee.com/jijiucheng/MyFile/raw/master/airplane.svga"
    let localSVGAName = "airplane"

    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.title = "SVGA Animation"
        view.backgroundColor = .white
        
        setupSVGAAnimation()
    }
    
    func setupSVGAAnimation() {
        
        //MARK: - Local
        
        let localLabel = UILabel(frame: CGRect(x: 20, y: 100, width: UIScreen.main.bounds.size.width - 20*2, height: 25))
        localLabel.text = "Local SVGA Animation"
        localLabel.textAlignment = .center
        localLabel.font = UIFont.boldSystemFont(ofSize: 18)
        view.addSubview(localLabel)
        
        let localSVGAPlayer = SVGAPlayer(frame: CGRect(x: 20, y: 150, width: 130, height: 130))
        localSVGAPlayer.backgroundColor = .darkGray
//        localSVGAPlayer.delegate = self
        localSVGAPlayer.loops = 0       // repeat count，0 means infinite
        localSVGAPlayer.clearsAfterStop = false     // Remove or clear after stop
        view.addSubview(localSVGAPlayer)

        let localSVGAParser = SVGAParser()
        localSVGAParser.parse(withNamed: localSVGAName, in: nil, completionBlock: { (svgaItem) in
            localSVGAPlayer.videoItem = svgaItem
            localSVGAPlayer.startAnimation()
        }, failureBlock: nil)
        
        
        //MARK: - Remote
        
        let remoteLabel = UILabel(frame: CGRect(x: 20, y: 400, width: UIScreen.main.bounds.size.width - 20*2, height: 25))
        remoteLabel.text = "Remote SVGA Animation"
        remoteLabel.textAlignment = .center
        remoteLabel.font = UIFont.boldSystemFont(ofSize: 18)
        view.addSubview(remoteLabel)
        
        let remoteSVGAPlayer = SVGAPlayer(frame: CGRect(x: 20, y: 450, width: 150, height: 150))
        remoteSVGAPlayer.backgroundColor = .darkGray
        view.addSubview(remoteSVGAPlayer)
        
        if let url = URL(string: remoteSVGAUrl) {
            let remoteSVGAParser = SVGAParser()
            remoteSVGAParser.parse(with: url, completionBlock: { (svgaItem) in
                remoteSVGAPlayer.videoItem = svgaItem
                remoteSVGAPlayer.startAnimation()
            }, failureBlock: { (error) in
                print("--------------------- \(String(describing: error))")
            })
        }
    }
}

extension SVGAViewController: SVGAPlayerDelegate {
    
    /// SVGA animation progress
    func svgaPlayerDidAnimated(toPercentage percentage: CGFloat) {
        print("precent ------- \(percentage)")
    }
    
    /// SVGA frame index with images resource
    func svgaPlayerDidAnimated(toFrame frame: Int) {
        print("frame ------- \(frame)")
    }
    
    /// doing after SVGA animation end or stop
    func svgaPlayerDidFinishedAnimation(_ player: SVGAPlayer!) {
        print("play end ---------------")
    }
}
```

**备注：**

> 此处示例代码中测试的远程端加载 SVGA 链接，无法正常播放，暂时原因未明，需要后面继续调试测试。

# Lottie File 动画

### Lottie File 动画简单介绍

由 `Airbnb` 开发的 `Lottie` 是一个将 `After Effects` 动画提供给任意一个 `iOS，macOS，Android 还有 React Native` 原生 APP 的文件库。这些动画通过一个叫 `Bodymovin` 的开源 `After Effects` 插件，以 `JSON` 文件的形式进行输出。`Lottie` 通过 `JSON` 格式下载动画数据并实时提供给开发者。

- [GitHub - Airbnb - lottie-ios](https://github.com/airbnb/lottie-ios)
- [lottie 官网](http://airbnb.io/lottie/#/)
- [Lottie File 官网](https://lottiefiles.com/)
- [简书 - 透支未来 - iOS Lottie动画【推荐】](https://www.jianshu.com/p/230bda17a2b5)

### 项目集成（iOS）

通过 `Cocoapods` 添加库依赖支持：

```
platform :ios, '11.0'

target '001-LottieAndSVGADemo' do
use_frameworks!

  pod 'lottie-ios'

source 'https://github.com/CocoaPods/Specs.git'

end
```

然后通过 `pod install` 安装依赖支持。

### 常用属性方法

```
// 是否循环播放动画
/// Tells the animation to loop indefinitely.
open var loopAnimation: Bool

// 当支持循环播放时，是否反向播放
/// The animation will play forward and then backwards if loopAnimation is also YES
open var autoReverseAnimation: Bool

// 播放速度
/// Sets the speed of the animation. Accepts a negative value for reversing animation.
open var animationSpeed: CGFloat

// 播放时间，只读属性，要设置时长可以通过 animationSpeed 设置播放速度   
/// Read only of the duration in seconds of the animation at speed of 1
open var animationDuration: CGFloat { get }
```

### 示例代码

![Lottie 示例动画](/images/iOS/Animation-SVGAAndLottie-lottie 03.gif)

```
import UIKit
import Lottie

class LottieViewController: UIViewController {
    
    /// 源资源文件链接：https://lottiefiles.com/159-servishero-loading
    let remoteUrl = "https://assets5.lottiefiles.com/datafiles/Hc0DflKIkYg1j3u/data.json"
    let localName = "159-servishero-loading.json"

    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.title = "Lottie 动画"
        view.backgroundColor = .gray
        
        setupLottieAnimation()
    }
    
    func setupLottieAnimation() {
        
        /// local
        
        let localLabel = UILabel(frame: CGRect(x: 20, y: 100, width: UIScreen.main.bounds.size.width - 20*2, height: 25))
        localLabel.text = "Local Lottie Animation"
        localLabel.textAlignment = .center
        localLabel.font = UIFont.boldSystemFont(ofSize: 18)
        view.addSubview(localLabel)
        
        let localLottie = LOTAnimationView(name: localName)
        localLottie.backgroundColor = .white
        localLottie.frame = CGRect(x: 100, y: 150, width: 200, height: 200)
        localLottie.contentMode = .scaleAspectFit
        localLottie.animationSpeed = 3
        localLottie.loopAnimation = true
        view.addSubview(localLottie)
        
        localLottie.play()
        
        
        /// remote
        
        let remoteLabel = UILabel(frame: CGRect(x: 20, y: 400, width: UIScreen.main.bounds.size.width - 20*2, height: 25))
        remoteLabel.text = "Remote Lottie Animation"
        remoteLabel.textAlignment = .center
        remoteLabel.font = UIFont.boldSystemFont(ofSize: 18)
        view.addSubview(remoteLabel)
        
        if let url = URL(string: remoteUrl) {
            let remoteLottie = LOTAnimationView(contentsOf: url)
            remoteLottie.backgroundColor = .white
            remoteLottie.frame = CGRect(x: 100, y: 450, width: 200, height: 200)
            remoteLottie.contentMode = .scaleAspectFit
            remoteLottie.animationSpeed = 0.5
            remoteLottie.loopAnimation = true
            view.addSubview(remoteLottie)
            
            remoteLottie.play()
        }
    }
}
```

# SVGA 和 Lottie 对比

### 性能特点对比

![多种动画库方案对比](/images/iOS/Animation-SVGAAndLottie-lottie 01.png)
![SVGA 和 Lottie 性能对比](/images/iOS/Animation-SVGAAndLottie-lottie 02.png)

### SVGA 和 Lottie 思路对比

##### SVGA 动画库源码思路

- **一帧一帧**

- 通过设置帧率，来生成一个配置文件，使得每一帧都有一个配置，每一帧都是关键帧，通过帧率去刷每一帧的画面，这个思路跟 `gif` 很像，但是通过配置使得动画过程中图片都可以得到复用。性能就提升上来了。并且不用解析高阶插值（二次线性方程，贝塞尔曲线方程）。

##### Lottie 动画库源码思路

- **一层一层**

- 完全按照设计工具的设计思路来进行还原，将动画脚本导出并解析。动画脚本非常的轻量。
- 将所有的动画拆成多个层级,每个层级 `layer` 都有一个动画配置，播放时解析多个 `layer` 的配置，并给每个 `layer` 做相应的动画。也达到了图片可以复用。当需要解析高阶插值（二次线性方程，贝塞尔曲线方程）时，性能相对而言差一点。

### SVGA 和 Lottie 设计开发成本对比

##### SVGA 设计开发成本

**不支持类型：**

- 不支持复杂的矢量形状图层；
- AE自带的渐变、生成、描边、擦除…
- 对设计工具原生动画不友好，对图片动画友好(适合礼物场景)

**优点：**

- 资源包小
- 测试工具齐全
- 三端可用
- 回调完整
- `Protobuf` 序列化结构数据格式，序列化的数据体更小，传递效率比 `xml,json` 更高。
- 导出工具开源（[开源地址](https://github.com/svga/SVGA-FLConverter)）

**缺点：**

- 每个礼物播放时都去新解压，需要改一套缓存策略
- svga 用 `zlib` 打包(字节流数据压缩程序库)，不方便解压和追踪包内容。

**插入动画头像功能：**

- 支持，需定义一套专属的头像配置的协议。

##### Lottie 设计开发成本

**不支持类型：**

- 基本满足所有种类的矢量动画和图片动画。

**优点：**

- 三端可用
- 回调完整
- 项目已经存在一套缓存逻辑
- 当前的库可以满足业务需求，不需要二次开发
- 有导出插件

**缺点：**

- 资源包相较SVGA而言会大一倍多
- 图片需要重命名 & 偶先播不出来动效。

**插入动画头像功能：**

- 已经支持。

### SVGA 和 Lottie 对比

> 从 `CreateJS/Lottie` 实现的原理来看，都是将设计软件中的时间轴完整地导出来，包括里面的各种关键帧信息、矢量路径、样式等等。其中，最为关键的是『关键帧』！由于使用的是关键帧动画描述，那么对应的 `Player` 就难免变得复杂起来。如果只是简单的一次线性方程，比如，物体从 A 点匀速移动至 B 点，还 OK。但是，当遇到二次线性方程、贝塞尔曲线方程这些高阶插值计算的时候，Player 就会很吃力。（矢量动画就是通过一些公式能表达的矢量线条和色块，以此来表示每一帧动画）。
>
> `CreateJS` 可以导出 `Flash` 动画，`Lottie` 可以导出 `After Effects` 动画，但是它们都不能导出对方的动画（每种设计工具的脚本都是不一致的），这也意味着，你家的设计师只能使用其中一种设计工具。
> 
> `Lottie 在导出位图动画方面不够友好`，从 UI 设计师和开发人员使用角度来看都比较麻烦，开发人员需要先将做好的效果打包成 ZIP，再解压到本地目录，才能播放。
> 
> `SVGA 使用另外一套逻辑，它不关心关键帧，因为 SVGA 里面的每一帧都是关键帧` ！也就是说，SVGA 已经在导出动画的时候，把每一帧的信息都计算好了，如此一来，Player 也就不用关心插值计算的过程。正因为如此，`SVGA 可以同时支持 Flash 和 After Effects 的导出`，只需要在各自转换器中计算差值就好了。
> 
> SVGA 在设计之初就支持位图元素，在 1.x 格式时使用 ZIP 进行打包，在 2.x 格式中，直接使用 `ProtoBuf+Zlib` 方式打包，作为开发者，完全不用关心应该怎样下载、解压、获取位图文件，直接把 svga 文件扔进去 Player 就可以了。
> 
> 功能上，`SVGA 更贴合直播应用场景，SVGA所提供的动态文本、动态图像功能都是其它库所不能提供的`。
> 
> <p align="right">—— 摘自 “掘金 - 直播App中Android酷炫礼物动画实现方案（下篇）：SVGA由来与Lottie的对比”</p>

### 推荐参考博客

- [Jfson's Blog - Android 动画库对比(Lottie 和 SVGA)【推荐】](https://jfson.github.io/2018/01/08/41-anim/)
- [掘金 - 直播App中Android酷炫礼物动画实现方案（下篇）：SVGA由来与Lottie的对比](https://juejin.im/entry/59f6c0ec6fb9a0451d40bfbf)

# Demo

- [GitHub - jijiucheng/JJC_Demo_Swift - 001-LottieAndSVGADemo](https://github.com/jijiucheng/JJC_Demo_Swift)

# 参考链接

- [GitHub - Airbnb（Lottie）](https://github.com/airbnb)
- [GitHub - Airbnb - lottie-ios](https://github.com/airbnb/lottie-ios)
- [GitHUb - SVGA](https://github.com/svga)
- [GitHub - SVGA - SVGAPlayer-iOS](https://github.com/svga/SVGAPlayer-iOS)
- [GitHub - SVGA - SVGA-Samples【SVGA 资源包】](https://github.com/svga/SVGA-Samples)
- 
- [Airbnb.io](https://airbnb.io/)
- [Airbnb.io - lottie](https://airbnb.io/lottie/#/)
- [Lottie File 官网](https://lottiefiles.com)
- [Lottie Files - Nattu Adnan - ServisHero Loading](https://lottiefiles.com/159-servishero-loading#)
- [简书 - 透支未来 - iOS Lottie动画](https://www.jianshu.com/p/230bda17a2b5)
- 
- [SVGA 官网](http://svga.io/)
- [SVGA 文件预览器](http://svga.io/svga-preview.html)
- [Jfson's Blog - Android 动画库对比(Lottie 和 SVGA)【推荐】](https://jfson.github.io/2018/01/08/41-anim/)
- [掘金 - 直播App中Android酷炫礼物动画实现方案（下篇）：SVGA由来与Lottie的对比](https://juejin.im/entry/59f6c0ec6fb9a0451d40bfbf)
- [简书 - PonyCui - 一种完美的动画实现方案](https://www.jianshu.com/p/8298015a02ff)
- [CSDN - gutaocslg - GIF、Lottie、SVGA](https://blog.csdn.net/gutaocslg/article/details/79908414)


# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】Animation 动画特效图片资源文件的处理实现策略](https://jijiucheng.github.io/2020/05/20/Animation-SVGAAndLottie/)
> 
> **发表日期**：2020/05/25 09:00:00
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


