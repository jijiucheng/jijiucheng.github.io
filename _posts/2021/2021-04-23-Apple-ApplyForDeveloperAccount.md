---
layout: post
title: 【iOS】苹果开发者账户申请及邓白氏编号（D-U-N-S® Number）申请（2021.04.25 更新）
categories: iOS
description: 【iOS】苹果开发者账户申请及邓白氏编号（D-U-N-S® Number）申请
keywords: iOS, Xcode, Apple, Developer, 苹果开发者, 邓白氏, 邓白氏编号, D-U-N-S, D-U-N-S® Number
topmost: true
---

**导读：** 
该篇文章主要记录 `苹果开发者账户` 申请流程，以及相关 `邓白氏编号（D-U-N-S® Number）` 的申请流程。

最近因为一些原因，需要帮朋友申请一个苹果开发者账户，而上次申请 `公司级（Company）` 的开发者账户早是 `2016` 年，都不知道申请流程和申请材料有没有变化，便同期决定记录一下相关流程作为笔记。

# 前期材料准备

<span id="Jump-DUNS Number"></span>

### 邓白氏编号（D-U-N-S® Number）材料

- **文字信息材料**
  - 1、`公司中文名称（工商注册的中文名，如有更名情况，请同时提供更名前和更名后的名称）`
    - `英文名（如无正式的英文名按字面翻译）`
  - 2、`中文办公地址`
    - `英文办公地址`
  - 3、`邮编`
  - 4、`企业类型`
  - 5、`是否是独立企业（公司有无分公司或办事处，只需填有或无）`
  - 6、`公司英文简称或英文商标（如果没有可以填无）`
  - 7、`主营业务（一个最主要的业务）`
  - 8、`员工人数（请尽量精确 , 例 :10 人；不要填区间 , 例： 10-20 人）`
  - 9、`本项目联系人（务必填写申请公司的本项目联系人）`
    - `姓名`
    - `性别`
    - `职务`
    - `电话（公司座机和联系人手机，所提供座机和办公地址保持一致）`
- **图片信息材料**
  - 1、`清晰的营业执照正本（或副本）实物照片`
  - 2、`公司公章刻字面的实物照片 （如是事业单位请提供事业单位法人证）`
  - 3、`邓白氏申请知悉函打印（需经过手签和盖章）照片`

<span id="Jump-Apply AppleID"></span>

# Apple ID 申请

**申请 `苹果开发者账户` 的前提是必须要有一个 `Apple ID`，也就是苹果账户的。**

所以可以先去苹果官网申请一个账户：

- [苹果官网](https://appleid.apple.com/)
- [苹果官网（中国）](https://www.apple.com.cn/)
- 
- [苹果官网 - Apple ID](https://appleid.apple.com/)
- [苹果官网（中国） - Apple ID](https://appleid.apple.com/cn/)
- [苹果官网 - Apple ID - 申请界面](https://appleid.apple.com/account)
- 

> **说明：**
>
> 即使直接进入 [苹果开发者网站](https://developer.apple.com/) 申请，也仍旧会需要先跳转到登录界面 [苹果开发者网站 - 登录](https://idmsa.apple.com/IDMSWebAuth/signin.html?path=%2Fenroll%2F&appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757) 登录 `Apple ID` 才可以执行开发者账户的申请流程，所以还是先去官网申请一个才是 `王道`。

![苹果官网](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-01.png)

![苹果官网 - Apple ID - 登录](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-02.png)

![苹果官网 - Apple ID - 注册申请](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-03.png)

因为苹果 `Apple ID` 的申请流程比较简单，所以此处就不过多赘述了。

下面就直接开始申请 `邓白氏编号（D-U-N-S® Number）`。
    
# 邓白氏编号（D-U-N-S® Number） 申请

### 简介

> D-U-N-S® 编号
> D-U-N-S 编号是一组唯一的九位数，用于根据具体位置识别企业实体。D-U-N-S 编号由 Dun & Bradstreet (D&B) 进行分配和维护，广泛用作标准的企业识别码。
>
> 作为您注册 Apple Developer Program 或 Apple Developer Enterprise Program 时验证流程的一部分，D-U-N-S 编号会被用于检查您所在组织的身份和法人实体状态。虽然许多类型的企业都能获得 D-U-N-S 编号，但您的企业必须被确认为法人实体 (如大型企业、有限合伙或有限责任公司)，才能签订 Apple Developer Program 协议的法律条款和义务。不接受 DBA、虚构公司、商号和分公司。
> 
> 公司和教育机构必须提供为其法人实体注册的 D-U-N-S 编号。对于政府组织，D-U-N-S 编号则是可选信息。如果您以个人身份注册，则无需 D-U-N-S 编号。
> 
> `————摘自 “苹果官网 D-U-N-S 介绍”`

- [苹果官网 D-U-N-S 介绍](https://developer.apple.com/cn/support/D-U-N-S/)

### 方式一：苹果官网自助申请

最初的前提需要有个苹果的 [Apple ID](#Jump-Apply AppleID)。

在注册申请 `邓白氏编号（D-U-N-S® Number）` 之前，需要先查找当前申请苹果开发者账号的公司是否已经有 `邓白氏编号（D-U-N-S® Number）` 了，所以需要先 [查找您的 D-U-N-S 编号](https://developer.apple.com/enroll/duns-lookup/#!/search) 。

![邓白氏编号（D-U-N-S® Number） - 查找](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-04.png)

> **注意：**
> 
> 1、一定要特别注意，`法人实体名称` 根据申请账户的不同而定，因为此处申请的是 `公司级（Company）` 账户，所以此处要填写 `公司名称（英文）` ，且必须是在工商局注册申请的公司名称，需要翻译成英文，可以借助 [谷歌翻译](https://translate.google.cn/)；
> 
> 2、此界面所有信息必须全部为 `罗马字符`，`全部英文，不支持中文`。

当按照规定输入相关信息后，点击底部 `继续` 按钮后，一般会返回以下字样：

![邓白氏编号（D-U-N-S® Number） - 查找结果](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-05.png)

此种结果，一般都是还是申请 `邓白氏编号（D-U-N-S® Number）` 才会有的结果。如果已有的，请自行忽略，直接使用。

然后该界面会默认填充上一界面填写的相关资料，然后 `勾选底部的协议`，并 `点击提交按钮`，就可以完成 `苹果官网自助申请 邓白氏编号（D-U-N-S® Number）`。

![邓白氏编号（D-U-N-S® Number） - 提交申请](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-06.png)

### 方式二：苹果支持 - 客服协助申请【推荐】

当你对申请流程有任何疑义，或者感觉不知道如何填写的时候，可以通过 `苹果官方客服支持` 协助申请，然后经过一番电话沟通，一般会有 `专项专员` 通过邮件进行协助申请，过程中有任何问题都可以通过邮件进行沟通的。

- [苹果开发者网站 - 联系我们](https://developer.apple.com/contact/topic/select)

![邓白氏编号（D-U-N-S® Number） - 苹果官方客服支持](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-07.png)

关于 `邓白氏编号（D-U-N-S® Number）` 的申请材料，在上面 [邓白氏编号（D-U-N-S® Number）材料](#Jump-DUNS Number) 已经列出来了，可以自行参考，尽量提前准备好。

### 苹果支持 - 客服协助申请 - 往来邮件记录

> **2021.04.21 10:54**  
> - `苹果客服顾问`发邮件索要 [邓白氏编号（D-U-N-S® Number）材料](#Jump-DUNS Number) 
> - 此时材料包含：
>   - 企业名称 [法人实体名称]
>   - 实际地址 [街道地址]
>   - 城市
>   - 省/自治区/直辖市
>   - 邮政编码
>   - 电话号码
>   - 国家或地区
>   - 通知人全名
>     - 工作电话号码
>     - 工作电子邮件（贵公司分配给您的电子邮件地址）
> 
> **2021.04.21 11:06**  
> - 将准备好的材料（此时材料和 [查找您的 D-U-N-S 编号](https://developer.apple.com/enroll/duns-lookup/#!/search) 中的材料一致） 回复给`苹果客服顾问`
>
> **2021.04.22 10:33**  
> - `苹果客服顾问`发邮件索要 [邓白氏编号（D-U-N-S® Number）材料](#Jump-DUNS Number) 
> - 此时材料包含：
>   - 邓白氏编号申请的手签盖章`知悉函`
>   - 清晰的`营业执照`正本（或副本）实物照片
>   - 公司`公章刻字面`的实物照片 （如是事业单位请提供事业单位法人证）（手持公章带刻字面照片）
>   - 公司中文名称（工商注册的中文名，如有更名情况，请同时提供更名前和更名后的名称）
>     - 英文名（如无正式的英文名按字面翻译）
>   - 中文办公地址
>     - 英文办公地址
>   - 邮编
>   - 企业类型
>   - 是否是独立企业（公司有无分公司或办事处，只需填有或无）
>   - 公司英文简称或英文商标（如果没有可以填无）
>   - 主营业务（一个最主要的业务）
>   - 员工人数（请尽量精确 , 例 :10 人；不要填区间 , 例： 10-20 人）
>   - 本项目联系人（务必填写申请公司的本项目联系人）
>     - 姓名
>     - 性别
>     - 职务
>     - 电话（公司座机和联系人手机，所提供座机和办公地址保持一致）
> 
> **2021.04.23 14:20** 
> - 将准备好的材料（此时材料和 [邓白氏编号（D-U-N-S® Number）材料](#Jump-DUNS Number) 一致） 回复给`苹果客服顾问`
> - 此时材料包含：
>   - 三个照片附件：
>     - 营业执照（副本）照片
>     - 手持公章刻字面 照片
>     - 手签盖章知悉函 照片
>   - 其他文本类型材料（上述 [邓白氏编号（D-U-N-S® Number）材料](#Jump-DUNS Number) 文本材料）
>
> **2021.04.23 14:56**  
> - `苹果客服顾问`发邮件确认提供材料主体信息：
>   - 公司中/英文名称
>   - 公司中/英文地址
> - `苹果客服顾问`发邮件确认涉及个人信息手机号录入数据库
> - `苹果客服顾问`发邮件通知苹果官方已审核材料通过，并将移交发送给`邓白氏官方`
>
> **2021.04.23 15:00** 
> - 发送邮件给`苹果客服顾问`确认提供材料主体信息无误，个人信息手机号允许录入
>
> **2021.04.23 21:00** 
> - `邓白氏编号（D-U-N-S® Number）`官方审核通过，收到对应编号
> - **注意：因数据录入问题，邓白氏官方建议收到编号后7天再使用，苹果官方建议收到编号后14个工作日再使用**

![邓白氏编号（D-U-N-S® Number） - 苹果官方客服支持](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-08.png)

![邓白氏编号（D-U-N-S® Number） - 苹果官方客服支持](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-09.png)

![邓白氏编号（D-U-N-S® Number） - 苹果官方客服支持](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-10.png)

![邓白氏编号（D-U-N-S® Number） - 苹果官方客服支持](/images/iOS/2021-04-23-Apple-ApplyForDeveloperAccount-11.png)



<——待更新——>


# 参考链接

- [苹果官网](https://appleid.apple.com/)
- [苹果官网（中国）](https://www.apple.com.cn/)
- [苹果官网 - Apple ID](https://appleid.apple.com/)
- [苹果官网（中国） - Apple ID](https://appleid.apple.com/cn/)
- [苹果官网 - Apple ID - 申请界面](https://appleid.apple.com/account)
- 
- [苹果开发者网站](https://developer.apple.com/)
- [苹果开发者网站 - 登录](https://idmsa.apple.com/IDMSWebAuth/signin.html?path=%2Fenroll%2F&appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757)
- [苹果开发者网站 - 联系我们](https://developer.apple.com/contact/topic/select)
- 
- [苹果官网 D-U-N-S 介绍](https://developer.apple.com/cn/support/D-U-N-S/)
- [查找您的 D-U-N-S 编号](https://developer.apple.com/enroll/duns-lookup/#!/search) 

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【iOS】苹果开发者账户申请及邓白氏编号（D-U-N-S® Number）申请](https://jijiucheng.github.io/2021/04/23/Apple-ApplyForDeveloperAccount/)
> 
> **发表日期**：2021/04/23 16:00:00
> 
> **更新日期**：2021/04/25 15:00:00
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


