---
layout: post
title: 【软件】Stable Diffusion WebUI（AI 绘画）使用教程
categories: 软件
description: 【软件】Stable Diffusion WebUI（AI 绘画）使用教程
keywords: 软件, AI, Stable Diffusion WebUI, 教程
topmost: false
---

**导读：** 
该文章主要介绍 `Stable Diffusion WebUI（AI 绘画）` 软件的使用教程，会进行日常更新~

### Stable Diffusion WebUI（AI 绘画）安装配置
#### 说明

由于需要下载外网的文件，所以需要开启 `外网代理（梯子 VPN）`，经个人测试，建议直接开启 `全局模式`。

#### Homebrew 和 Python

首先需要判断 `Homebrew` 是否有安装，如果没有安装，需要执行以下指令进行安装，[Homebrew 官网](https://brew.sh/)：

```
# 安装 homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 homebrew（速度很快）
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
# 如果遇到 command not found brew，请执行下面脚本完成安装或者直接重新打开终端:
eval "$(/usr/local/bin/brew shellenv)"

# 检查 homebrew 版本
{23-04-10 1:08}[ruby-2.7.0]mxgx:~ mxgx% brew -v 
Homebrew 4.0.11
Homebrew/homebrew-core (git revision 54272e9ff45; last commit 2023-04-08)
```

完成 `Homebrew` 的安装后，再次检查 `Python` 当前的版本环境，按照官方的说法，当前版本推荐是 `Python 3.10.x` 以上的版本。

```
# 检查当前 python 版本（Python3）
{23-04-09 23:52}[ruby-2.7.0]mxgx:~ mxgx% python3 -V
Python 3.9.6

# 检查当前 python 版本（Python2）

```

如感觉当前 `Python` 版本过低的话，可以通过 [Python 官网下载](https://www.python.org/downloads/) 下载相应的版本进行升级，亦或者通过以下指令进行升级：

```
# 安装指定版本 python
brew install cmake protobuf rust python@3.10 git wget

# 执行完上面的指令后，建议依次指令以下指令（实测不需要）
rm -rf "/opt/homebrew/Library/Taps/homebrew/homebrew-cask"
brew tap homebrew/cask
rm -rf "/opt/homebrew/Library/Taps/homebrew/homebrew-core"
brew tap homebrew/core
```

执行指令结果如下：

```
{23-04-10 1:08}[ruby-2.7.0]mxgx:~ mxgx% brew install cmake protobuf rust python@3.10 git wget
Warning: Treating cmake as a formula. For the cask, use homebrew/cask/cmake
Warning: cmake 3.26.3 is already installed and up-to-date.
To reinstall 3.26.3, run:
  brew reinstall cmake
Warning: protobuf 21.12 is already installed and up-to-date.
To reinstall 21.12, run:
  brew reinstall protobuf
Warning: rust 1.68.2 is already installed and up-to-date.
To reinstall 1.68.2, run:
  brew reinstall rust
Warning: python@3.10 3.10.11 is already installed and up-to-date.
To reinstall 3.10.11, run:
  brew reinstall python@3.10
Warning: git 2.40.0 is already installed and up-to-date.
To reinstall 2.40.0, run:
  brew reinstall git
Warning: wget 1.21.3_1 is already installed and up-to-date.
To reinstall 1.21.3_1, run:
  brew reinstall wget
{23-04-10 1:10}[ruby-2.7.0]mxgx:~ mxgx% python3 -V
Python 3.9.6
```

![安装 Python](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-02.png)

#### 安装 Stable Diffusion WebUI（AI 绘画）

![安装成功](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-03.png)

根据官网 `MAC` 端安装教程 [GitHub - stable-diffusion-webui - MAC 安装教程](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon)，通过如下指令进行安装：

```
# 在想要的安装的位置，进行克隆项目工程
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
```

安装完成后，通过如下指令进入项目根目录并执行脚本：

```
# 进入项目根目录
cd stable-diffusion-webui

# 执行脚本文件
sh ./webui.sh
```

```
# sh ./webui.sh 执行过程 --------------------------

{23-04-08 23:37}[ruby-2.7.0]mxgx:~/Documents/GitHub/Others/stable-diffusion-webui@master mxgx% sh webui.sh 

################################################################
Install script for stable-diffusion + Web UI
Tested on Debian 11 (Bullseye)
################################################################

################################################################
Running on mxgx user
################################################################

################################################################
Repo already cloned, using it as install directory
################################################################

################################################################
Create and activate python venv
################################################################

################################################################
Launching launch.py...
################################################################
Python 3.9.6 (default, Oct 18 2022, 12:41:40) 
[Clang 14.0.0 (clang-1400.0.29.202)]
Commit hash: 22bcc7be428c94e9408f589966c2040187245d81
Installing torch and torchvision
Collecting torch==1.12.1
  Downloading torch-1.12.1-cp39-none-macosx_10_9_x86_64.whl (133.8 MB)
     |████████████████████████████████| 133.8 MB 37 kB/s 
Collecting torchvision==0.13.1
  Downloading torchvision-0.13.1-cp39-cp39-macosx_10_9_x86_64.whl (1.3 MB)
     |████████████████████████████████| 1.3 MB 1.5 MB/s 
Collecting typing-extensions
  Downloading typing_extensions-4.5.0-py3-none-any.whl (27 kB)
Collecting numpy
  Downloading numpy-1.24.2-cp39-cp39-macosx_10_9_x86_64.whl (19.8 MB)
     |████████████████████████████████| 19.8 MB 1.4 MB/s 
Collecting requests
  Downloading requests-2.28.2-py3-none-any.whl (62 kB)
     |████████████████████████████████| 62 kB 979 kB/s 
Collecting pillow!=8.3.*,>=5.3.0
  Downloading Pillow-9.5.0-cp39-cp39-macosx_10_10_x86_64.whl (3.4 MB)
     |████████████████████████████████| 3.4 MB 1.9 MB/s 
Collecting idna<4,>=2.5
  Downloading idna-3.4-py3-none-any.whl (61 kB)
     |████████████████████████████████| 61 kB 245 kB/s 
Collecting urllib3<1.27,>=1.21.1
  Downloading urllib3-1.26.15-py2.py3-none-any.whl (140 kB)
     |████████████████████████████████| 140 kB 2.5 MB/s 
Collecting certifi>=2017.4.17
  Downloading certifi-2022.12.7-py3-none-any.whl (155 kB)
     |████████████████████████████████| 155 kB 2.5 MB/s 
Collecting charset-normalizer<4,>=2
  Downloading charset_normalizer-3.1.0-cp39-cp39-macosx_10_9_x86_64.whl (124 kB)
     |████████████████████████████████| 124 kB 2.6 MB/s 
Installing collected packages: urllib3, typing-extensions, idna, charset-normalizer, certifi, torch, requests, pillow, numpy, torchvision
Successfully installed certifi-2022.12.7 charset-normalizer-3.1.0 idna-3.4 numpy-1.24.2 pillow-9.5.0 requests-2.28.2 torch-1.12.1 torchvision-0.13.1 typing-extensions-4.5.0 urllib3-1.26.15
WARNING: You are using pip version 21.2.4; however, version 23.0.1 is available.
You should consider upgrading via the '/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/venv/bin/python3 -m pip install --upgrade pip' command.
Installing gfpgan
Installing clip
Installing open_clip
Cloning Stable Diffusion into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/stable-diffusion-stability-ai...
Cloning Taming Transformers into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/taming-transformers...
Cloning K-diffusion into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/k-diffusion...
Cloning CodeFormer into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/CodeFormer...
Cloning BLIP into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/BLIP...
Installing requirements for CodeFormer
Installing requirements for Web UI
Launching Web UI with arguments: --skip-torch-cuda-test --upcast-sampling --no-half-vae --use-cpu interrogate
Warning: caught exception 'Torch not compiled with CUDA enabled', memory monitor disabled
No module 'xformers'. Proceeding without it.
==============================================================================
You are running torch 1.12.1.
The program is tested to work with torch 1.13.1.
To reinstall the desired version, run with commandline flag --reinstall-torch.
Beware that this will cause a lot of large files to be downloaded, as well as
there are reports of issues with training tab on the latest version.

Use --skip-version-check commandline argument to disable this check.
==============================================================================
Downloading: "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors" to /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors

100%|████████████████████████████████████████████████████████████████████| 3.97G/3.97G [03:26<00:00, 20.6MB/s]
Calculating sha256 for /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors: 6ce0161689b3853acaa03779ec93eafe75a02f4ced659bee03f50797806fa2fa
Loading weights [6ce0161689] from /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors
Creating model from config: /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/configs/v1-inference.yaml
LatentDiffusion: Running in eps-prediction mode
DiffusionWrapper has 859.52 M params.
Downloading (…)olve/main/vocab.json: 100%|██████████████████████████████████| 961k/961k [00:01<00:00, 701kB/s]
Downloading (…)olve/main/merges.txt: 100%|█████████████████████████████████| 525k/525k [00:00<00:00, 1.31MB/s]
Downloading (…)cial_tokens_map.json: 100%|████████████████████████████████████| 389/389 [00:00<00:00, 225kB/s]
Downloading (…)okenizer_config.json: 100%|████████████████████████████████████| 905/905 [00:00<00:00, 499kB/s]
Downloading (…)lve/main/config.json: 100%|███████████████████████████████| 4.52k/4.52k [00:00<00:00, 2.56MB/s]
Applying cross attention optimization (InvokeAI).
Textual inversion embeddings loaded(0): 
Model loaded in 18.7s (calculate hash: 5.0s, load weights from disk: 0.4s, create model: 7.8s, apply weights to model: 4.1s, apply half(): 1.5s).
Running on local URL:  http://127.0.0.1:7860
```

只要执行的结果中显示 `Running on local URL:  http://127.0.0.1:7860` 类似的字样就代表安装成功了，然后在浏览器中输入该网址就会有对应的 UI 界面显示了。

![安装成功](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-05.png)

### 生成 Application 应用程序

根据 [B站 - Mac安装stable diffusion第四版-运行篇！！【推荐】](https://www.bilibili.com/read/cv22258423) 可以将原本通过终端指令的运行方式，通过点击应用程序的方式打开。

![脚本编辑器](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-06.png)

打开电脑中的应用程序 `脚本编辑器（Script Editor）`，选择 `应用程序（Application）` 作为保存位置，点击 `新建文稿（New Folder）`。

![脚本编辑器](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-07.png)

在编辑框中输入如下指令，`./webui.sh` 需要单独一行：

```
tell application "Terminal"
	do script "cd 项目位置
	./webui.sh"
end tell
```

![脚本编辑器](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-08.png)

点击 `文件（File） -> 导出（Export）`，在 `文件格式（File Format）` 一栏选择 `应用程序（Application）` 即可。

至于更改应用图标，则通过 `显示简介` 进行更改。

### 报错解决

然而在执行 `sh ./webui.sh` 脚本文件的过程中基本上很少会一次性安装完成，会遇到各种各样的错误。

#### RuntimeError: Couldn't clone K-diffusion.、RuntimeError: Couldn't clone CodeFormer....

如此类似比较多的报错：

```
RuntimeError: Couldn't clone K-diffusion.
RuntimeError: Couldn't clone CodeFormer.
...
...
...
```

```
# 报错信息 -----------------

Python 3.10.11 (main, Apr  7 2023, 07:31:31) [Clang 14.0.0 (clang-1400.0.29.202)]
Commit hash: 22bcc7be428c94e9408f589966c2040187245d81
Cloning CodeFormer into /Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/CodeFormer...
Traceback (most recent call last):
  File "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/launch.py", line 355, in <module>
    prepare_environment()
  File "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/launch.py", line 291, in prepare_environment
    git_clone(codeformer_repo, repo_dir('CodeFormer'), "CodeFormer", codeformer_commit_hash)
  File "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/launch.py", line 151, in git_clone
    run(f'"{git}" clone "{url}" "{dir}"', f"Cloning {name} into {dir}...", f"Couldn't clone {name}")
  File "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/launch.py", line 97, in run
    raise RuntimeError(message)
RuntimeError: Couldn't clone CodeFormer.
Command: "git" clone "https://github.com/sczhou/CodeFormer.git" "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/CodeFormer"
Error code: 128
stdout: <empty>
stderr: Cloning into '/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/repositories/CodeFormer'...
fatal: unable to access 'https://github.com/sczhou/CodeFormer.git/': Failed to connect to github.com port 443 after 75014 ms: Operation timed out
```

该类型的报错原因主要是因为下载对应的配置文件超时引起的，可以通过 `切换外网节点`，是有比较大的几率可以完成安装的。

该部分下载的主要是在根目录下的 `repositories` 文件中的文件：

```
repositories/BLIP
repositories/CodeFormer
repositories/k-diffusion
repositories/stable-diffusion-stability-ai
repositories/taming-transformers
```

如果可以的话，也是可以直接在该 `repositories` 文件下克隆对应的文件也是可以的（个人测试有效的）。

![目录](/images/Software/2023-04-09-stable-diffusion-webui%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B-04.png)

#### RuntimeError: "LayerNormKernelImpl" not implemented for 'Half'

```
# 报错信息 ----------------------

Error completing request
Arguments: ('task(ar2o1gpi490h9fh)', 'green sapling rowing out of ground, mud, dirt, grass, high quality, photorealistc, sharp focus, depth of field', '', [], 20, 0, False, False, 1, 1, 7, -1.0, -1.0, 0, 0, 0, False, 512, 512, False, 0.7, 2, 'Latent', 0, 0, 0, [], 0, False, False, 'positive', 'comma', 0, False, False, '', 1, '', 0, '', 0, '', True, False, False, False, 0) {}
Traceback (most recent call last):
  File "/Users/mxgx/Documents/GitHub/Others/stable-diffusion-webui/modules/call_queue.py", line 56, in f
    res = list(func(*args, **kwargs))
  ...
  ...
  ...
  File "/usr/local/lib/python3.10/site-packages/torch/nn/functional.py", line 2503, in layer_norm
    return torch.layer_norm(input, normalized_shape, weight, bias, eps, torch.backends.cudnn.enabled)
RuntimeError: "LayerNormKernelImpl" not implemented for 'Half'
```

该报错是在完成安装后，当输入对应的描述后，执行生成对应的 AI 图片的过程中出现的报错。

主要原因是因为显卡不支持 `half-float` 数据类型，只需要加一些启动参数即可。

**实测有效方法：**

[参考链接 - IT 学院 - 搭一下 Stable Diffusion WebUI](https://article.itxueyuan.com/RdyMeB)

在根目录下的 `webui-user.sh` 文件中添加如下代码即可：

```
export COMMANDLINE_ARGS="--skip-torch-cuda-test --precision full --no-half"
```

**实测无效方法：**

[参考链接 - CSDN - intel的集成显卡（intel(r) uhd graphics） 配置stable diffusion](https://blog.csdn.net/caijinghuacaijinghua/article/details/129264496)

根据该文章的提示，编辑 `./repositories/stable-diffusion/ldm/models/diffusion/ddim.py` 文件，将文件中 `cuda` 改为 `cpu` 即可，个人感觉应该 `Windows` 系统的修改方法，而 `MAC` 系统下并不试用。

### 模型、插件
#### 模型

- [https://huggingface.co/gsdf/Counterfeit-V2.5（二次元模型，配合 EasyNegative 使用，上面的萝姬就是用这个模型，很好看，tag写起来也简单）](https://huggingface.co/gsdf/Counterfeit-V2.5)
- [https://huggingface.co/andite/anything-v4.0（祖师爷，出图质量稳定，插图风格很不错）](https://huggingface.co/andite/anything-v4.0)
- [https://huggingface.co/datasets/gsdf/EasyNegative（用这个负面tag就可以写很简单了）](https://huggingface.co/datasets/gsdf/EasyNegative)
- [https://huggingface.co/TASUKU2023/Chilloutmix（真人模型）](https://huggingface.co/TASUKU2023/Chilloutmix)
- [https://civitai.com/models/7240/meinamix（二次元模型）【推荐】](https://civitai.com/models/7240/meinamix)
- [https://huggingface.co/stabilityai（二次元模型）](https://huggingface.co/stabilityai)

#### 插件

- [https://github.com/DominikDoom/a1111-sd-webui-tagcomplete（可以自动补全标签，有助于写出更准确的 tags，提高分辨率功能）](https://github.com/DominikDoom/a1111-sd-webui-tagcomplete)

### 参考资料

- [Homebrew 官网](https://brew.sh/)
- [Python 官网下载](https://www.python.org/downloads/)
- [GitHub - AUTOMATIC1111 / stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- [GitHub - stable-diffusion-webui - MAC 安装教程](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon)
- 
- [MeinaMix（models 模型）- 二次元模型【推荐】](https://civitai.com/models/7240/meinamix)
- [Stability AI（models 模型）](https://huggingface.co/stabilityai)
- [runwayml / stable-diffusion-v1-5（models 模型）](https://huggingface.co/runwayml/stable-diffusion-v1-5)
- 
- [知乎 - Mac本地部署Stable-diffusion，别怕折腾，坑都帮你填好了【推荐】](https://zhuanlan.zhihu.com/p/608178376)
- [B站 - 自力更生：Stable Diffusion webui本地部署遇到的坑及解决【推荐】](https://www.bilibili.com/read/cv21987039)
- [B站 - Stable Diffusion 的 Intel oneAPI 改造，让低显/非N卡也能快速造老婆](https://www.bilibili.com/read/cv19132184?from=articleDetail)
- 
- [B站 - 记录Mac安装apple/stable diffusion-失败了！！！](https://www.bilibili.com/read/cv22094444?spm_id_from=333.999.0.0)
- [B站 - Mac安装stable diffusion第二次-成功版！！](https://www.bilibili.com/read/cv22165682?spm_id_from=333.999.0.0)
- [B站 - Mac安装stable diffusion第三版-整理加强！！【推荐】](https://www.bilibili.com/read/cv22177914?spm_id_from=333.999.0.0)
- [B站 - Mac安装stable diffusion第四版-运行篇！！【推荐】](https://www.bilibili.com/read/cv22258423)
- [B站 - Mac stable diffusion安装错误记录](https://www.bilibili.com/read/cv22533228?spm_id_from=333.999.0.0)
- [B站 - 记录Mac安装stable diffusion 第五篇—更新！！](https://www.bilibili.com/read/cv22533272?spm_id_from=333.999.0.0)
- 
- [CSDN - 处理stable-diffusion-webui本地部署过程中的commit hash ＜none＞问题的一个方法](https://blog.csdn.net/Xy_G__/article/details/128180356)
- [IT 学院 - 搭一下 Stable Diffusion WebUI](https://article.itxueyuan.com/RdyMeB)
- [CSDN - intel的集成显卡（intel(r) uhd graphics） 配置stable diffusion](https://blog.csdn.net/caijinghuacaijinghua/article/details/129264496)
- [B站 - 部署novel ai时安装失败，提示coudn’t install gfpgan](https://www.bilibili.com/read/cv21797695)
- [CSDN - 使用stable diffusion webui时，安装gfpgan失败的解决方案（windows下的操作）](https://blog.csdn.net/weixin_40735291/article/details/129153398)
- [CSDN - 打开stable diffusion webui时，提示缺少clip或clip安装不上的解决方案（windows下的操作）](https://blog.csdn.net/weixin_40735291/article/details/129333599)

# 版权声明

> **原文作者**：[苜蓿鬼仙（苜蓿、jijiucheng）](https://jijiucheng.github.io/)
> 
> **原文链接**：[GitHub.io - 苜蓿鬼仙 - 【软件】Stable Diffusion WebUI（AI 绘画）使用教程](https://jijiucheng.github.io/2023/04/09/stable-diffusion-webui安装教程)
> 
> **发表日期**：2023/04/09 23:00:00
> 
> **更新日期**：2023/04/09 23:00:00
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


