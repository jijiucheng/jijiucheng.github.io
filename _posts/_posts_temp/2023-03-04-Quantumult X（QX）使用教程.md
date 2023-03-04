---
layout: post
title: 【软件】Quantumult X（QX）使用教程
categories: 软件
description: 【软件】Quantumult X（QX）使用教程
keywords: 软件, Quantumult X, QX, 教程
topmost: false
---

**导读：** 
该文章主要介绍 `Quantumult X（QX）` 软件的使用教程，会进行日常更新~

### QX 基本配置
#### 资源解析器

- **作用：**
  - 将导入订阅、规则、重写等资源解析并转换成圈x所支持的格式。
- **步骤：**
  - ① 打开应用，点击底部最右侧的 `大风车（设置）` 按钮；
  - ② 滚动到底部的 `配置文件 -> 编辑` 选项并点击；
  - ③ 点击右上角 `✅` 按钮左侧的 `选项` 按钮，并选择 `general` 一栏；
  - ④ 在 `general` 对应的位置，输入如下配置路径；
  - ⑤ 注意：
    - 灰色代码代表未生效，前面一般都会带有 `;` 分号标识。

```
/// 配置 资源解析器
resource_parser_url=https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js
```

![资源解析器](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-01.png)

#### MitM

- **作用：**
  - 用于 `HTTPS` 解析，只有配置了主机名的请求才会被解析。
- **步骤：**
  - ① 打开应用，点击底部最右侧的 `大风车（设置）` 按钮；
  - ② 滚动到 `MitM -> 生成证书` 选项并点击；
  - ③ 点击 `配置证书` 并允许下载配置描述文件到手机；
  - ④ 打开手机 `设置 -> 已下载描述文件 -> 安装描述文件 -> 安装`，根据流程，完成安装步骤；
  - ⑤ 打开手机 `设置 -> 通用 -> 关于本机 -> 证书信任设置`，选中带有 `Quantumult X` 标识的选项，并打开选中信任，根据流程，完成相应步骤。

![MitM 配置 01](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-02.png)
![MitM 配置 02](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-03.png)
![MitM 配置 03](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-04.png)

#### 添加 js 脚本并使用

- **步骤：**
  - `1、添加脚本：`
    - ① 打开应用，点击底部最右侧的 `大风车（设置）` 按钮；
    - ② 滚动到 `重写 -> 规则来源` 选项并点击；
    - ③ 在 `引用资源 - 重写` 界面，选择右上角的 `新增脚本 URL` 按钮；
    - ④ 在新的 `资源 - 重写` 界面，依次输入 `资源标签（可以随意填写）`、`资源路径（要添加的 js 脚本或脚本合集）`；
    - ⑤ 将提前配置好的 `资源解析器` 选项按钮打开；
    - ⑥ 点击右上角的 `保存` 按钮，并返回到 `引用资源 - 重写` 界面；
    - ⑦ 找到刚添加的 `js 脚本`，并将其选中。
  - `2、配置 MitM 的 hostname：`
    - ① 打开应用，点击底部最右侧的 `大风车（设置）` 按钮；
    - ② 打开 `重写` 和 `MitM` 选项按钮，并滚动到 `重写 -> 重写规则` 选项并点击；
    - ③ 找到与刚添加的 `js 脚本` 相对于的规则，并点击右侧的 `🔗 链接` 图标，点击 `查看脚本`；
    - ④ 在脚本界面，找到 `[MitM]` 中的 `hostname` 选项，并将 `= 等号` 后面的内进行复制；
    - ⑤ 重新返回到 `设置` 界面，并滚动到底部的 `配置文件 -> 编辑` 选项并点击；
    - ⑥ 点击右上角 `✅` 按钮左侧的 `选项` 按钮，并选择 `mitm` 一栏；
    - ⑦ 根据 `[MitM]` 配置，找到 `hostname` 或 `;hostname` 相关配置位置；
    - ⑧ 如果是 `hostname`，就直接粘贴到该配置的最后位置，并与之前的配置通过 `; 英文逗号` 进行分割开；如果是 `;hostname`，则在该位置的最后面另起一行，输入 `hostname = `，然后将复制的内容直接粘贴到该位置的后面；
    - ⑨ 完成后点击右上角 `保存` 按钮，并返回首页，打开首页右上角的开关按钮即可完成相应配置；之后就是启动与脚本相应的应用软件即可使用。

![添加 js 脚本 01](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-05.png)
![添加 js 脚本 02](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-06.png)
![添加 js 脚本 03](/images/Software/2023-03-04-Quantumult%20X%EF%BC%88QX%EF%BC%89%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-07.png)

### JS 脚本

- [JS 脚本 - 资源解析器【必备】]()
  - [https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js](https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js)
- [JS 脚本 - by伟人]()
  - [合集.js（已停止更新）- https://raw.githubusercontent.com/WeiRen0/NewFree/main/QuantumultX2#profile=001](https://raw.githubusercontent.com/WeiRen0/NewFree/main/QuantumultX2#profile=001)
  - [老司机.js（2023.02.23）- https://raw.githubusercontent.com/WeiRen0/Free1/main/Lsp.conf](https://raw.githubusercontent.com/WeiRen0/Free1/main/Lsp.conf)

### 参考资料

- [科技玩家 - Quantumult X(圈x)系列之小白快速入门篇](https://www.kejiwanjia.com/jiaocheng/zheteng/notes/21016.html)
- [Youtube - Quantumult X 从小白到高玩，完整教学！](https://www.youtube.com/watch?v=laqB-SMHO1w&t=1s&ab_channel=HellCell)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【软件】Quantumult X（QX）使用教程](https://jijiucheng.github.io/2023/03/04/Quantumult-X（QX）使用教程)
> 
> **发表日期**：2023/03/04 10:00:00
> 
> **更新日期**：2023/03/04 10:00:00
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


