---
layout: default
---

{% include head.md %}

This is a tree of links to all posts I've written so far...

<hr>

<div class="posts">
  <div class="post-item">
    {% for post in site.posts %}
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span>{{ post.date | date: '%B %d, %Y' }}</span>
    {% endfor %}
  </div>
</div>

{% include foot.md %}
