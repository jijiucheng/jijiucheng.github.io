---
layout: page
title: Links
description: 没有链接的博客是孤独的
keywords: 友情链接
comments: true
menu: 链接
permalink: /links/
---

> 博客搭建

{% for link in site.data.links %}
  {% if link.src == 'blog-build' %}
* [{{ link.name }}]({{ link.url }})
  {% endif %}
{% endfor %}

> God made relatives. Thank God we can choose our friends.

{% for link in site.data.links %}
  {% if link.src == 'life' %}
* [{{ link.name }}]({{ link.url }})
  {% endif %}
{% endfor %}

> 友情链接

{% for link in site.data.links %}
  {% if link.src == 'www' %}
* [{{ link.name }}]({{ link.url }})
  {% endif %}
{% endfor %}
