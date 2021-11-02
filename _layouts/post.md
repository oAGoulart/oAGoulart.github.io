---
layout: default
---

{% include head.md %}

<h1 class="title">{{ page.title }}</h1>
<p class="date">{{ page.date | date: '%B %d, %Y' }}</p>

<hr>

<div class="post-page">
  {{ content }}
</div>

{% include foot.md %}
