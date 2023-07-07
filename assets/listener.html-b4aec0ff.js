const e=JSON.parse('{"key":"v-5f8d07eb","path":"/backend/java/junit/listener.html","title":"JUnit Listener","lang":"zh-CN","frontmatter":{"title":"JUnit Listener","icon":"markdown","order":1,"date":"2023-07-07T00:00:00.000Z","category":["后端技术"],"tag":["junit"],"description":"介绍 JUnit Listener是一个Junit的监听器，可以用来监听Junit的执行过程，比如在测试用例执行前后做一些操作，比如在测试用例执行失败后做一些操作。本文主要介绍几种实现方式。 一、eclipse插件 1.1 介绍 在eclipse中，可以通过插件的方式来实现Junit Listener，这种方式的好处是可以在eclipse中直接使用，不需要额外的配置。 1.2 创建插件工程 在eclipse中，点击help-&gt;Install New Software，然后在Work with中选择--All Available Sites--，然后在Find中输入Eclipse Plug-in Development Environment，然后点击Next，然后一直点击Next，直到安装完成，如下图所示：","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/backend/java/junit/listener.html"}],["meta",{"property":"og:site_name","content":"Original Tech"}],["meta",{"property":"og:title","content":"JUnit Listener"}],["meta",{"property":"og:description","content":"介绍 JUnit Listener是一个Junit的监听器，可以用来监听Junit的执行过程，比如在测试用例执行前后做一些操作，比如在测试用例执行失败后做一些操作。本文主要介绍几种实现方式。 一、eclipse插件 1.1 介绍 在eclipse中，可以通过插件的方式来实现Junit Listener，这种方式的好处是可以在eclipse中直接使用，不需要额外的配置。 1.2 创建插件工程 在eclipse中，点击help-&gt;Install New Software，然后在Work with中选择--All Available Sites--，然后在Find中输入Eclipse Plug-in Development Environment，然后点击Next，然后一直点击Next，直到安装完成，如下图所示："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mister-hope.github.io/blog/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-07T02:28:31.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"JUnit Listener"}],["meta",{"property":"article:author","content":"lurj"}],["meta",{"property":"article:tag","content":"junit"}],["meta",{"property":"article:published_time","content":"2023-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-07T02:28:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit Listener\\",\\"image\\":[\\"https://mister-hope.github.io/blog/\\"],\\"datePublished\\":\\"2023-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-07T02:28:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"lurj\\",\\"url\\":\\"https://www.lurj7988.cn\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"一、eclipse插件","slug":"一、eclipse插件","link":"#一、eclipse插件","children":[{"level":3,"title":"1.1 介绍","slug":"_1-1-介绍","link":"#_1-1-介绍","children":[]},{"level":3,"title":"1.2 创建插件工程","slug":"_1-2-创建插件工程","link":"#_1-2-创建插件工程","children":[]},{"level":3,"title":"1.3 创建Junit Listener","slug":"_1-3-创建junit-listener","link":"#_1-3-创建junit-listener","children":[]},{"level":3,"title":"1.4 实现Junit Listener","slug":"_1-4-实现junit-listener","link":"#_1-4-实现junit-listener","children":[]},{"level":3,"title":"1.5 引入jar包","slug":"_1-5-引入jar包","link":"#_1-5-引入jar包","children":[]},{"level":3,"title":"1.6 启动调试","slug":"_1-6-启动调试","link":"#_1-6-启动调试","children":[]},{"level":3,"title":"1.7 导出插件","slug":"_1-7-导出插件","link":"#_1-7-导出插件","children":[]}]},{"level":2,"title":"二、idea插件","slug":"二、idea插件","link":"#二、idea插件","children":[{"level":3,"title":"2.1 介绍","slug":"_2-1-介绍","link":"#_2-1-介绍","children":[]},{"level":3,"title":"2.2 创建插件工程","slug":"_2-2-创建插件工程","link":"#_2-2-创建插件工程","children":[]},{"level":3,"title":"2.3 创建Junit Listener","slug":"_2-3-创建junit-listener","link":"#_2-3-创建junit-listener","children":[]},{"level":3,"title":"2.4 实现Junit Listener","slug":"_2-4-实现junit-listener","link":"#_2-4-实现junit-listener","children":[]},{"level":3,"title":"2.5 引入jar包","slug":"_2-5-引入jar包","link":"#_2-5-引入jar包","children":[]},{"level":3,"title":"2.6 启动调试","slug":"_2-6-启动调试","link":"#_2-6-启动调试","children":[]},{"level":3,"title":"2.7 导出插件","slug":"_2-7-导出插件","link":"#_2-7-导出插件","children":[]}]}],"git":{"createdTime":1688696911000,"updatedTime":1688696911000,"contributors":[{"name":"lurj","email":"naulurenjie@outlook.com","commits":1}]},"readingTime":{"minutes":2.5,"words":749},"filePathRelative":"backend/java/junit/listener.md","localizedDate":"2023年7月7日","excerpt":"<h2> 介绍</h2>\\n<p>JUnit Listener是一个Junit的监听器，可以用来监听Junit的执行过程，比如在测试用例执行前后做一些操作，比如在测试用例执行失败后做一些操作。本文主要介绍几种实现方式。</p>\\n<h2> 一、eclipse插件</h2>\\n<h3> 1.1 介绍</h3>\\n<p>在eclipse中，可以通过插件的方式来实现Junit Listener，这种方式的好处是可以在eclipse中直接使用，不需要额外的配置。</p>\\n<h3> 1.2 创建插件工程</h3>\\n<p>在eclipse中，点击help-&gt;Install New Software，然后在Work with中选择<code>--All Available Sites--</code>，然后在Find中输入Eclipse Plug-in Development Environment，然后点击Next，然后一直点击Next，直到安装完成，如下图所示：</p>","autoDesc":true}');export{e as data};