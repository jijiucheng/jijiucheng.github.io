---
layout: post
title: 【iOS】AppTrackingTransparency（ATT）
categories: iOS
description: 【iOS】AppTrackingTransparency（ATT）
keywords: iOS, Xcode, Developer, AppTrackingTransparency, ATT, 用户广告追踪权限
topmost: false
---

**导读：** 
`App Tracking Transparency（ATT）` 是苹果官方从 `iOS 14` 开始重点强调的 `申请用户广告追踪权限` 相关的 `framework`。

对于开发人员来讲，我们常会听到的一个词 `IDFA`，全称是 `Identifier for Advertising`，即广告标识符。是苹果公司提供的 `用于追踪用户的广告标识符`，可以用来打通不同 app 之间的广告。`IDFA` 是一串 `16进制` 的 `32位` 串的由数字和字母组成的用来标识唯一设备的字符串。

![IDFA 的前世今生](/images/iOS/2021-12-21-AppTrackingTransparency-01.png)

对于有过 App 接入广告的开发者来说，这个可能是再熟悉不过的了；因为对于接入广告，这个是必备的。

在 `iOS13 及以前`，系统会默认为用户开启允许追踪设置，我们可以简单的通过代码来获取到用户的 `IDFA` 标识符。

```Swift
/// iOS 13及之前 获取 IDFA 标识符方法
if ASIdentifierManager.shared().isAdvertisingTrackingEnabled {
    let idfaString = ASIdentifierManager.shared().advertisingIdentifier.uuidString
    print(idfaString)
}
```

但是该方法在 `iOS 14 及之后`，该判断和获取方法已被苹果官方废弃了，且系统会默认为用户关闭广告追踪权限。

![ASIdentifierManager 方法废弃](/images/iOS/2021-12-21-AppTrackingTransparency-02.png)

> /// iOS14 及之后，系统会默认为用户关闭广告追踪权限
> Thank you for answering the app privacy questions in App Store Connect. You’ve indicated that your apps, CRM and QCT, collect data to track users or devices. We want to make sure you're aware that starting April 26, 2021, apps on the App Store must use AppTrackingTransparency to receive user permission before collecting data used to track them or their devices. If you're already working on implementing the framework, we appreciate your efforts to provide transparency and choice to users. If not, and your app continues to track users, your next submission must implement AppTrackingTransparency to request the user’s permission to track them. The following resources are available:App Tracking Transparency documentationAvailability iOS 14.0+

至此，也就迎来了新的用户广告追踪权限。

# AppTrackingTransparency

![iOS14 之后权限获取](/images/iOS/2021-12-21-AppTrackingTransparency-03.png)

### iOS14 及之后

或许很多开发者仍认为，新的 `framework` 的申请权限时机和之前一样，没有什么问题。但是实际上，在 `iOS 15` 之前，`iOS 14` 之后，确实如此，仍旧没有什么变化。

通过以下代码即可以获取：

```Swift
/// 需要引入 AppTrackingTransparency 库
ATTrackingManager.requestTrackingAuthorization { [weak self] (status) in
    debugPrint("iOS 获取用户 IDFA 追踪权限：\(status.rawValue)")
}
```

但是在 `iOS 15` 后的上架审核中，可能很多开发者都会收到类似的 `Metadata Rejected（元数据被拒）` 的邮件提醒：

![iOS15 之后获取权限弹框无法弹出](/images/iOS/2021-12-21-AppTrackingTransparency-04.png)

```
Guideline 2.1 - Information Needed

We're looking forward to completing our review, but we need more information to continue. Your app uses the AppTrackingTransparency framework, but we are unable to locate the App Tracking Transparency permission request when reviewed on iOS 15.2.

Next Steps

Please explain where we can find the App Tracking Transparency permission request in your app. The request should appear before any data is collected that could be used to track the user.

If you've implemented App Tracking Transparency but the permission request is not appearing on devices running the latest OS, please review the available documentation and confirm App Tracking Transparency has been correctly implemented.

If your app does not track users, update your app privacy information in App Store Connect to undeclare tracking. You must have the Account Holder or Admin role to update app privacy information.

Resources

- Tracking is linking data collected from your app with third-party data for advertising purposes, or sharing the collected data with a data broker. Learn more about tracking.
- See Frequently Asked Questions about the new requirements for apps that track users.
- Review developer documentation for App Tracking Transparency.

Since your App Store Connect status is Metadata Rejected, we do NOT require a new binary. To revise the metadata, visit App Store Connect to select your app and revise the desired metadata values. Once you’ve completed all changes, reply to this message in Resolution Center and we will continue the review.
```

简单来讲，就是之前在 `iOS 14.x` 环境下可以好好的获取追踪权限，在 `iOS 15.x` 之后，无法弹出弹框了，进而导致一直无法获取相应权限。

我们首先来看一下对应权限的枚举值：

```Swift
@available(iOS 14, *)
public enum AuthorizationStatus : UInt {
    // 无法确定或用户未进行任何操作时
    case notDetermined = 0
    // 受限制
    case restricted = 1
    // 用户明确拒绝的
    case denied = 2
    // 用户授权允许的
    case authorized = 3
}
```

只有当 `ATTrackingManager.AuthorizationStatus == .authorized` 时，我们才能正常获取到 `IDFA` 标识符。

但是我们在 `iOS 15.x` 的系统下会发现，我们的 App 界面无法弹出对应的获取权限的弹框，进而也就无法获取相应的权限了。

### 不显示 AppTrackingTransparency 弹框的原因

![iOS15 之后不显示弹框原因](/images/iOS/2021-12-21-AppTrackingTransparency-05.png)

![iOS15 之后不显示弹框原因](/images/iOS/2021-12-21-AppTrackingTransparency-06.png)

> // 苹果官方文档：
> `Documents -> ATTrackingManager -> requestTrackingAuthorization(completionHandler:)`
> 
> Calls to the API only prompt when the application state is: UIApplicationStateActive. Calls to the API through an app extension do not prompt.
The requestTrackingAuthorization(completionHandler:) is the one-time request to authorize or deny access to app-related data that can be used for tracking the user or the device. The system remembers the user’s choice and doesn’t prompt again unless a user uninstalls and then reinstalls the app on the device.

说白了就是 **调用时机不对引起的获取追踪权限弹框无法弹起**。

### 适配 AppTrackingTransparency

最后再全流程说一下适配 `App Tracking Transparency` 的步骤。

**`① 引入 AppTrackingTransparency.framework 库`**

在 `TARGET -> General -> Frameworks, Libraries, and Embedded Content` 中引入 `AppTrackingTransparency.framework` 库。

**`② 配置 info.plist 文件`**

![配置 info.plist 文件](/images/iOS/2021-12-21-AppTrackingTransparency-07.png)

```Swift
<key>NSUserTrackingUsageDescription</key>
<string>需要您允许访问广告标识符权限，以便于提供更优质的广告服务和信息推送服务</string>
```

**`③ 使用`**

使用时，需要优先引入 `import AppTrackingTransparency` 库。主要是在 `applicationDidBecomeActive` 和 `sceneDidBecomeActive` 中调用。

如果是 `iOS13.x` 以上的，且使用了 `SceneDelegate` 的，如下：

```Swift
@available(iOS 13.0, *)
func sceneDidBecomeActive(_ scene: UIScene) {
    // Called when the scene has moved from an inactive state to an active state.
    // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    
    // 获取隐私权限
    getATTracking()
}

/// 申请 IDFA 权限
private func getATTracking() {
    if #available(iOS 14, *) {
        DispatchQueue.global().asyncAfter(deadline: DispatchTime.now()) {
            ATTrackingManager.requestTrackingAuthorization { status in
                debugPrint("iOS 获取用户 IDFA 追踪权限：\(status.rawValue)")
                // 此处可以执行其他操作，需要注意线程
            }
        }
    }
}
```

如果是没有使用 `SceneDelegate` 的，仅使用 `AppDelegate` 的，如下：

```Swift
func applicationDidBecomeActive(_ application: UIApplication) {
    getATTracking()
}

/// 申请 IDFA 权限
private func getATTracking() {
    if #available(iOS 14, *) {
        DispatchQueue.global().asyncAfter(deadline: DispatchTime.now()) {
            ATTrackingManager.requestTrackingAuthorization { status in
                debugPrint("iOS 获取用户 IDFA 追踪权限：\(status.rawValue)")
                // 此处可以执行其他操作，需要注意线程
            }
        }
    }
}
```

> 注意：
> 
> 1、曾尝试不添加 `DispatchQueue.global().asyncAfter` 延迟方法，但是发现仍无法显示，尽管网上的教程都是直接在 `applicationDidBecomeActive` 和 `sceneDidBecomeActive` 中调用即可；但是个人测试仍不行。

# 参考链接

- [知乎 - 有没有人给解释一下IDFA是什么，能怎么用？](有没有人给解释一下IDFA是什么，能怎么用？)
- [简书 - iOS 14 IDFA请求权限申请](https://www.jianshu.com/p/366c722c3045)
- [腾讯云 - iOS14适配之【使用AppTrackingTransparency以请求用户授权获取IDFA信息】](https://cloud.tencent.com/developer/article/1820120)
- [简书 - 解决 iOS 15 上 IDFA 权限弹窗(App Tracking Transparency)不显示](https://www.jianshu.com/p/84b8178c2541)
- [CSDN - iOS ATTrackingManager iOS 15 弹窗不出现？](https://blog.csdn.net/xjh093/article/details/121118445)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】AppTrackingTransparency（ATT）](https://jijiucheng.github.io/2021/12/21/AppTrackingTransparency/)
> 
> **发表日期**：2021/12/21 16:00:00
> 
> **更新日期**：2021/12/21 16:00:00
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


