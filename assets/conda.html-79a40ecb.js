import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as d,c as r,b as a,d as e,f as s,e as t}from"./app-3d3bf9ae.js";const o={},c=a("h2",{id:"installing-on-linux",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#installing-on-linux","aria-hidden":"true"},"#"),e(" Installing on Linux")],-1),u=a("ol",null,[a("li",null,"Download the installer:")],-1),p={href:"https://docs.conda.io/en/latest/miniconda.html#linux-installers",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.anaconda.com/download/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://conda.io/projects/conda/en/stable/user-guide/install/download.html#hash-verification",target:"_blank",rel:"noopener noreferrer"},b=a("li",null,"In your terminal window, run:",-1),m=t(`<ul><li>Miniconda:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> Miniconda3-latest-Linux-x86_64.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>Anaconda:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> Anaconda3-latest-Linux-x86_64.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>If you&#39;d prefer that conda&#39;s base environment not be activated on startup,set the auto_activate_base parameter to false:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda config <span class="token parameter variable">--set</span> auto_activate_base <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>列出所有环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda <span class="token function">env</span> list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda create <span class="token parameter variable">--name</span> myenv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建指定版本的环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda create <span class="token parameter variable">-n</span> myenv <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建指定版本的环境并安装指定包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda create <span class="token parameter variable">-n</span> myenv <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.6</span> numpy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda activate myenv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>退出环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda deactivate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda remove <span class="token parameter variable">-n</span> myenv <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置清华源</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda config <span class="token parameter variable">--add</span> channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考连接" tabindex="-1"><a class="header-anchor" href="#参考连接" aria-hidden="true">#</a> 参考连接</h2>`,24),g={href:"https://conda.io/projects/conda/en/stable/user-guide/install/linux.html#install-linux-silent",target:"_blank",rel:"noopener noreferrer"};function _(f,x){const n=i("ExternalLinkIcon");return d(),r("div",null,[c,u,a("ul",null,[a("li",null,[a("a",p,[e("Miniconda installer for Linux."),s(n)])]),a("li",null,[a("a",h,[e("Miniconda installer for Linux."),s(n)])])]),a("ol",null,[a("li",null,[a("a",v,[e("Verify your installer hashes."),s(n)])]),b]),m,a("ul",null,[a("li",null,[a("a",g,[e("https://conda.io/projects/conda/en/stable/user-guide/install/linux.html#install-linux-silent"),s(n)])])])])}const w=l(o,[["render",_],["__file","conda.html.vue"]]);export{w as default};
