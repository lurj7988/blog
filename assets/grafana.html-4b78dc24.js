const e=JSON.parse('{"key":"v-56155b0b","path":"/ops/grafana.html","title":"grafana","lang":"zh-CN","frontmatter":{"title":"grafana","icon":"markdown","order":1,"category":["测试运维"],"tag":["linux"],"description":"grafana+prometheus 部署 docker pull bitnami/prometheus:latest docker run -d --name=prometheus --net=host -v /opt/prometheus.yml:/opt/bitnami/prometheus/conf/prometheus.yml bitnami/prometheus:latest docker pull grafana/grafana docker run -d --name=grafana --net=host grafana/grafana:latest","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/ops/grafana.html"}],["meta",{"property":"og:site_name","content":"个人博客"}],["meta",{"property":"og:title","content":"grafana"}],["meta",{"property":"og:description","content":"grafana+prometheus 部署 docker pull bitnami/prometheus:latest docker run -d --name=prometheus --net=host -v /opt/prometheus.yml:/opt/bitnami/prometheus/conf/prometheus.yml bitnami/prometheus:latest docker pull grafana/grafana docker run -d --name=grafana --net=host grafana/grafana:latest"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-16T09:06:23.000Z"}],["meta",{"property":"article:author","content":"lurj"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:modified_time","content":"2023-05-16T09:06:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"grafana\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-16T09:06:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"lurj\\",\\"url\\":\\"https://www.lurj7988.cn\\"}]}"]]},"headers":[{"level":2,"title":"部署","slug":"部署","link":"#部署","children":[]},{"level":2,"title":"监控linux","slug":"监控linux","link":"#监控linux","children":[]},{"level":2,"title":"prometheus配置","slug":"prometheus配置","link":"#prometheus配置","children":[]},{"level":2,"title":"监控mysql","slug":"监控mysql","link":"#监控mysql","children":[]}],"git":{"createdTime":1684227983000,"updatedTime":1684227983000,"contributors":[{"name":"lurj","email":"naulurenjie@outlook.com","commits":1}]},"readingTime":{"minutes":0.96,"words":287},"filePathRelative":"ops/grafana.md","localizedDate":"2023年5月16日","excerpt":"<h1> grafana+prometheus</h1>\\n<h2> 部署</h2>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">docker</span> pull bitnami/prometheus:latest\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">--name</span><span class=\\"token operator\\">=</span>prometheus <span class=\\"token parameter variable\\">--net</span><span class=\\"token operator\\">=</span>host <span class=\\"token parameter variable\\">-v</span> /opt/prometheus.yml:/opt/bitnami/prometheus/conf/prometheus.yml bitnami/prometheus:latest\\n<span class=\\"token function\\">docker</span> pull grafana/grafana\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">--name</span><span class=\\"token operator\\">=</span>grafana <span class=\\"token parameter variable\\">--net</span><span class=\\"token operator\\">=</span>host grafana/grafana:latest\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
