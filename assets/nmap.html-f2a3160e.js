import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r,o,c,b as a,d as n,f as s,e as l}from"./app-e2eff2df.js";const p={},i={href:"https://github.com/nmap/nmap.git",target:"_blank",rel:"noopener noreferrer"},m=a("h2",{id:"nmap-编译",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#nmap-编译","aria-hidden":"true"},"#"),n(" nmap 编译")],-1),d={href:"https://nmap.org/dist/nmap-7.91.tar.bz2",target:"_blank",rel:"noopener noreferrer"},u=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">bzip2</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> nmap-7.91.tar.bz2
./configure <span class="token parameter variable">--build</span><span class="token operator">=</span>x86-pc-linux-gnu
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc+ gcc-c++
<span class="token function">make</span> <span class="token parameter variable">-j</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
nmap <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function b(v,k){const e=r("ExternalLinkIcon");return o(),c("div",null,[a("p",null,[a("a",i,[n("Github"),s(e)])]),m,a("p",null,[a("a",d,[n("下载地址"),s(e)])]),u])}const h=t(p,[["render",b],["__file","nmap.html.vue"]]);export{h as default};
