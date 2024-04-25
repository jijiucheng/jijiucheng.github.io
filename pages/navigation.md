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
    <div class="navigation-wrapper"></div>
</section>
{% endif %}
