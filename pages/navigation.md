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
        <div class='left-navi'>
            {% for category in site.data.navigation %}
            <div class="left-navi-item">{{ category.title }}</div>
            {% endfor %}
        </div>
        <div class='right-content'>
            {% for category in site.data.navigation %}
            <div class="right-content-item">
                {% assign temp_subCategory = undefined %}
                <div class="subNavi-wrapper">
                    {% for subCategory in category.list %}
                        {% if subCategory.index == 0 %}
                            {% assign temp_subCategory = subCategory %}
                        {% endif %}
                        <span class="subNavi-item">{{ subCategory.title }}</span>
                    {% endfor %}
                </div>
                <div class="links-wrapper">
                    {% for link in temp_subCategory.list %}
                    <a class="link-item" href="{{ link.url }}" name="{{ link.url }}" target="_blank">{{ link.title }}</a>
                    {% endfor %}
                </div>
            </div>
            {% endfor %}
        </div>
    </div>

</section>
{% endif %}
