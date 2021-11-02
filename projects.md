---
layout: default
---

{% include head.md %}

Here are some of the projects I have made so far, some of them are still a work-in-progress, so they might not have links attached to them.

<hr>

<div class="projects">
  {% if site.projects[0] %}
    {% for project in site.projects %}
      <div class="project">
        <img src="{{ project.image }}" alt="{{ project.name }}">
        <div class="desc">
          {% if project.href %}
            <a target="_blank" href="{{ project.href }}">{{ project.name }}</a>
          {% else %}
            <span>{{ project.name }}</span>
          {% endif %}
          <p>{{ project.brief }}</p>
        </div>
          <div class="tags">
            {% for tag in project.tags %}
              <div class="tag">{{ tag }}</div>
            {% endfor %}
          </div>
      </div>
    {% endfor %}
  {% endif %}
</div>

{% include foot.md %}
