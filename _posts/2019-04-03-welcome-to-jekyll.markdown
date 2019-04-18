---
layout: post
title:  "Welcome to Jekyll!"
author: "Augusto Goulart"
date:   2019-04-03 17:07:23 -0300
categories: jekyll update
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

<p class="information">
	<audio controls src="{{ site.url }}/assets/audios/sound.mp3" type="audio/mp3">
  	This audio couldn't be loaded!
	</audio><br>
	Audio by Bensound.com.
</p>

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
#Watir script to show clicking a JavaScript popup box
require "watir"
require 'watir\contrib\enabled_popup'
require 'startClicker'
require 'net/http'
require 'net/https'

$ie = Watir::IE.new  #create an object to drive the browser
$ie.goto "http://mydomain.com/ListGroups.aspx"
if $ie.contains_text("Log In")
  $ie.text_field(:name, "Login1$UserName").set("fincherm")
  $ie.text_field(:name, "Login1$Password").set("mitch")
  $ie.button(:name, "Login1$LoginButton").click 
end
$ie.link(:text, "Baseline").click 
$ie.link(:text, "MoonManC").click 
def setDdlPriority(priority) 
   ddlPriority = $ie.select_list( :name , /ddlPriority/)
   puts ddlPriority
   ddlPriority.select(priority)
   puts ddlPriority
   $ie.button(:name, "ctl00$btnSave").click_no_wait 
      startClicker( "OK", 4 , "User Input" )
      sleep 1   
end
setDdlPriority("2")
setDdlPriority("9")
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
