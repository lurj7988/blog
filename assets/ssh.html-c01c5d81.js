import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,e as a}from"./app-c551f475.js";const i={},d=a(`<h2 id="ssh免密登录" tabindex="-1"><a class="header-anchor" href="#ssh免密登录" aria-hidden="true">#</a> ssh免密登录</h2><h3 id="在本地windows上生成公钥私钥对" tabindex="-1"><a class="header-anchor" href="#在本地windows上生成公钥私钥对" aria-hidden="true">#</a> 在本地Windows上生成公钥私钥对</h3><p>生产目录位于<code>C:\\Users\\naulu\\.ssh</code>，其中<code>id_rsa</code>为私钥，<code>id_rsa.pub</code>为公钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="将公钥放入linux服务器" tabindex="-1"><a class="header-anchor" href="#将公钥放入linux服务器" aria-hidden="true">#</a> 将公钥放入linux服务器</h3><p>将公钥中的内容添加到<code>linux</code>用户目录下的<code>.ssh</code>目录下的<code>authorized_keys</code>文件中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/.ssh
<span class="token function">touch</span> authorized_keys
<span class="token function">vim</span> authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode远程插件指定私钥" tabindex="-1"><a class="header-anchor" href="#vscode远程插件指定私钥" aria-hidden="true">#</a> vscode远程插件指定私钥</h3><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>Host 192.168.188.128
  HostName 192.168.188.128
  User lurj
  IdentityFile C:/Users/naulu/.ssh/id_rsa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="禁止ssh用户名密码登录" tabindex="-1"><a class="header-anchor" href="#禁止ssh用户名密码登录" aria-hidden="true">#</a> 禁止ssh用户名密码登录</h3><p>修改 /etc/ssh/sshd_config</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vim</span> /etc/ssh/sshd_config
<span class="token punctuation">..</span>.
<span class="token comment"># To disable tunneled clear text passwords, change to no here!</span>
<span class="token comment">#PasswordAuthentication yes</span>
<span class="token comment">#PermitEmptyPasswords no</span>
PasswordAuthentication no

<span class="token comment"># Change to no to disable s/key passwords</span>
<span class="token comment">#ChallengeResponseAuthentication yes</span>
ChallengeResponseAuthentication no
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把<code>PasswordAuthentication</code>改成no，则ssh再发起登录的时候就会提示如下错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ssh</span> <span class="token builtin class-name">:</span> Permission denied <span class="token punctuation">(</span>publickey,gssapi-with-mic<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通常禁止了用户名密码登录之后，需要配置public/private key pair进行登录，即ssh使用-i参数指定private key文件登录。</p><p>反之如果ssh使用用户名密码登录遇到上述错误，则需要把 /etc/ssh/sshd_config配置文件里的配置项<code>PasswordAuthentication</code>改成<code>yes</code>。</p>`,16),c=[d];function o(t,l){return e(),n("div",null,c)}const h=s(i,[["render",o],["__file","ssh.html.vue"]]);export{h as default};
