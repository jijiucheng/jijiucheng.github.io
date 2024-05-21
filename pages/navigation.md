---
layout: default
title: 导航
keywords: 导航,苜蓿,苜蓿小站,苜蓿导航
description: 苜蓿导航
permalink: /navigation/
---

{% if site.github.public_repositories != null %}
{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse %}

<link rel="stylesheet" href="../assets/css/pages/navigation.css">
<script src="../assets/js/navigation.js"></script>
<section class="container">
    <header class="text-center">
        <h1>苜蓿导航</h1>
    </header>
    <div class="navigation-wrapper">
        <div class='left-navi'></div>
        <div class='right-content'></div>
    </div>
    <div class="navigation-tools">
        <div class="tool-item tool-top" onclick="clickGoTop()">顶部</div>
    </div>
</section>
{% endif %}

<!--
// 如果需要使用 liquid 加载数据的方式，必须将数据文件放在 _data 文件夹下，且该种数据加载方式是静态的，无法动态处理
{% if site.github.public_repositories != null %}
{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse %}

<link rel="stylesheet" href="../assets/css/pages/navigation.css">
<script src="../assets/js/navigation.js"></script>
<section class="container">
    <header class="text-center">
        <h1>苜蓿导航</h1>
    </header>
    <div class="navigation-wrapper">
        <div class='left-navi'>
            {% for category in site.data.navigation %}
            <div class="left-navi-item" onclick="clickLeftNaviItem({{ category.index }})">{{ category.title }}</div>
            {% endfor %}
        </div>
        <div class='right-content'>
            {% for category in site.data.navigation %}
            <div id="left_navi_{{ category.index }}" class="right-content-item">
                {% assign temp_subCategory = undefined %}
                <div class="subNavi-wrapper">
                    {% for subCategory in category.list %}
                        {% if subCategory.index == 0 %}
                            {% assign temp_subCategory = subCategory %}
                        {% endif %}
                        <span class="subNavi-item" onclick="clickSubNaviItem({{ category.index }}, {{ subCategory.index }})">{{ subCategory.title }}</span>
                    {% endfor %}
                </div>
                <div class="links-wrapper">
                    {% for link in temp_subCategory.list %}
                    <a class="link-item" href="{{ link.url }}" title="{{ link.url }}" target="_blank">
                        <img class="link-item-icon" src="{{ link.icon }}" />
                        <span class="link-item-title">{{ link.title }}</span>
                    </a>
                    {% endfor %}
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
    <div class="navigation-tools">
        <div class="tool-item tool-top" onclick="clickGoTop()">顶部</div>
    </div>
</section>
{% endif %}
-->
