import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,e as a}from"./app-25c8c6ef.js";const i={},t=a(`<h2 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> git常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token parameter variable">-v</span> <span class="token comment"># 显示所有远程仓库</span>
<span class="token function">git</span> remote <span class="token function">rm</span> newOrigin <span class="token comment"># 删除远程仓库</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin main <span class="token comment"># 新增远程仓库</span>
<span class="token function">git</span> remote set-url origin https://github.com/lurj7988/blog.git <span class="token comment"># 设置远程仓库地址</span>
<span class="token function">git</span> checkout <span class="token comment"># 显示所有本地仓库</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span> <span class="token comment"># 查看所有分支</span>
<span class="token function">git</span> branch main <span class="token comment"># 创建一个名为main的新分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> master <span class="token comment"># 删除分支</span>
<span class="token function">git</span> checkout main <span class="token comment"># 切换到新的分支</span>
<span class="token function">git</span> push origin main <span class="token parameter variable">--force</span> <span class="token comment"># 强制将本地仓库覆盖到远程仓库</span>
<span class="token function">git</span> push --set-upstream origin main <span class="token comment"># fatal: The current branch main has no upstream branch. To push the current branch and set the remote as upstream</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git配置" tabindex="-1"><a class="header-anchor" href="#git配置" aria-hidden="true">#</a> git配置</h2><p><code>proxy</code>配置代理了<code>clash</code>的7890端口，实现通过<code>vpn</code>访问<code>github</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[user]
        name = lurj
        email = naulurenjie@outlook.com
[credential &quot;http://192.168.0.200&quot;]
        provider = generic
[credential &quot;https://gitee.com&quot;]
        provider = generic
[credential &quot;http://192.168.217.8&quot;]
        provider = generic
[http]
        proxy = 192.168.188.1:7890
[https]
        proxy = 192.168.188.1:7890
[credential]
        helper = store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),c=[t];function l(r,o){return e(),s("div",null,c)}const m=n(i,[["render",l],["__file","git.html.vue"]]);export{m as default};
