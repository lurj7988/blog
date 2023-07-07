const t=JSON.parse('{"key":"v-727d1ccd","path":"/backend/java/spring/tomcatembed.html","title":"tomcat embed","lang":"zh-CN","frontmatter":{"title":"tomcat embed","icon":"markdown","order":1,"date":"2023-06-28T00:00:00.000Z","category":["后端技术"],"tag":["spring"],"description":"前言 众所周知springboot通过Fatjar运行时内嵌了tomcat，那么tomcat是如何启动的，又是如何调整tomcat启动参数的，我们来一探究竟。 内置Tomcat长什么样，它与原来的Tomcat有啥区别 Springboot是如何使用的内置tomcat DispatcherServlet是如何加载到tomcat容器的","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/backend/java/spring/tomcatembed.html"}],["meta",{"property":"og:site_name","content":"Original Tech"}],["meta",{"property":"og:title","content":"tomcat embed"}],["meta",{"property":"og:description","content":"前言 众所周知springboot通过Fatjar运行时内嵌了tomcat，那么tomcat是如何启动的，又是如何调整tomcat启动参数的，我们来一探究竟。 内置Tomcat长什么样，它与原来的Tomcat有啥区别 Springboot是如何使用的内置tomcat DispatcherServlet是如何加载到tomcat容器的"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-30T10:19:02.000Z"}],["meta",{"property":"article:author","content":"lurj"}],["meta",{"property":"article:tag","content":"spring"}],["meta",{"property":"article:published_time","content":"2023-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-30T10:19:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tomcat embed\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-30T10:19:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"lurj\\",\\"url\\":\\"https://www.lurj7988.cn\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"一、原来的Tomcat启动流程","slug":"一、原来的tomcat启动流程","link":"#一、原来的tomcat启动流程","children":[]},{"level":2,"title":"二、内嵌Tomcat","slug":"二、内嵌tomcat","link":"#二、内嵌tomcat","children":[]},{"level":2,"title":"三、Springboot启动Tomcat的时机","slug":"三、springboot启动tomcat的时机","link":"#三、springboot启动tomcat的时机","children":[{"level":3,"title":"3.1 ServletWebServerApplicationContext","slug":"_3-1-servletwebserverapplicationcontext","link":"#_3-1-servletwebserverapplicationcontext","children":[]},{"level":3,"title":"3.2 TomcatServletWebServerFactory","slug":"_3-2-tomcatservletwebserverfactory","link":"#_3-2-tomcatservletwebserverfactory","children":[]}]},{"level":2,"title":"四、SpringBoot中的Tomcat如何加载Servlet","slug":"四、springboot中的tomcat如何加载servlet","link":"#四、springboot中的tomcat如何加载servlet","children":[{"level":3,"title":"4.1 Servlet3.0标准可以不使用web.xml完成Servlet的注册","slug":"_4-1-servlet3-0标准可以不使用web-xml完成servlet的注册","link":"#_4-1-servlet3-0标准可以不使用web-xml完成servlet的注册","children":[]},{"level":3,"title":"4.2 SpringBoot中的ServletContainerInitializer的实现类","slug":"_4-2-springboot中的servletcontainerinitializer的实现类","link":"#_4-2-springboot中的servletcontainerinitializer的实现类","children":[]},{"level":3,"title":"4.3 ServletContainerInitializer的实现类执行onStartup方法的时机","slug":"_4-3-servletcontainerinitializer的实现类执行onstartup方法的时机","link":"#_4-3-servletcontainerinitializer的实现类执行onstartup方法的时机","children":[]},{"level":3,"title":"4.4 分析TomcatStarter的onStartup方法","slug":"_4-4-分析tomcatstarter的onstartup方法","link":"#_4-4-分析tomcatstarter的onstartup方法","children":[]},{"level":3,"title":"4.5 DispatcherServlet如何加载到Tomcat容器","slug":"_4-5-dispatcherservlet如何加载到tomcat容器","link":"#_4-5-dispatcherservlet如何加载到tomcat容器","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"个性化实现","slug":"个性化实现","link":"#个性化实现","children":[]},{"level":2,"title":"FAQ","slug":"faq","link":"#faq","children":[]}],"git":{"createdTime":1688007083000,"updatedTime":1688120342000,"contributors":[{"name":"lurj","email":"naulurenjie@outlook.com","commits":2}]},"readingTime":{"minutes":18.41,"words":5522},"filePathRelative":"backend/java/spring/tomcatembed.md","localizedDate":"2023年6月28日","excerpt":"<h2> 前言</h2>\\n<p>众所周知<code>springboot</code>通过<code>Fatjar</code>运行时内嵌了<code>tomcat</code>，那么<code>tomcat</code>是如何启动的，又是如何调整<code>tomcat</code>启动参数的，我们来一探究竟。</p>\\n<ul>\\n<li>内置Tomcat长什么样，它与原来的Tomcat有啥区别</li>\\n<li>Springboot是如何使用的内置tomcat</li>\\n<li><code>DispatcherServlet</code>是如何加载到tomcat容器的</li>\\n</ul>\\n","autoDesc":true}');export{t as data};