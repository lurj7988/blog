import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as i,b as n,d as s,f as e,e as t}from"./app-3d3bf9ae.js";const c={},u=n("h2",{id:"一、visual-studio-code相关信息",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#一、visual-studio-code相关信息","aria-hidden":"true"},"#"),s(" 一、Visual Studio Code相关信息")],-1),r={href:"https://code.visualstudio.com/download",target:"_blank",rel:"noopener noreferrer"},d=t("<li>VS Code建议安装插件列表： <ul><li>中文菜单： <ul><li>MS-CEINTL.vscode-language-pack-zh-hans</li></ul></li><li>SSH远程开发： <ul><li>ms-vscode-remote.remote-ssh</li><li>ms-vscode-remote.remote-ssh-edit</li><li>ms-vscode.remote-explorer</li></ul></li><li>C++开发 <ul><li>ms-vscode.cpptools</li></ul></li><li>python开发 <ul><li>ms-python.python</li></ul></li><li>代码补全 <ul><li>TabNine.tabnine-vscode</li><li>GitHub.copilot</li></ul></li></ul></li>",1),k=n("li",null,"本地Ubuntu示例",-1),v={href:"https://www.autodl.com/home",target:"_blank",rel:"noopener noreferrer"},m=n("li",null,"省钱妙招：无卡启动（不挂载GPU，￥0.1/h左右）",-1),b=t(`<h2 id="二、python开发环境配置" tabindex="-1"><a class="header-anchor" href="#二、python开发环境配置" aria-hidden="true">#</a> 二、Python开发环境配置</h2><ul><li>建议<code>conda</code>虚拟环境</li><li>测试代码<code>demo.py</code>：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># python 代码测试</span>

<span class="token comment"># 计算 1+2+3+4+5 的和</span>
<span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">sum</span> <span class="token operator">+=</span> i

<span class="token comment"># 打印结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>debuger配置<code>.vscode</code>下<code>launch.json</code>添加</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 使用 IntelliSense 了解相关属性。 </span>
    <span class="token comment">// 悬停以查看现有属性的描述。</span>
    <span class="token comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;configurations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Python: Current File&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// &quot;program&quot;: &quot;\${file}&quot;, // 当前文件</span>
            <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;demo.py&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 指定文件</span>
            <span class="token property">&quot;console&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integratedTerminal&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;justMyCode&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// false表示可以进入第三方库（如Pytorch）里进行调试</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、ubuntu安装环境" tabindex="-1"><a class="header-anchor" href="#三、ubuntu安装环境" aria-hidden="true">#</a> 三、Ubuntu安装环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装gcc</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gcc
<span class="token comment">#安装g++</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> g++
<span class="token comment">#安装cmake</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> cmake
<span class="token comment">#安装gdb</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、c-开发环境配置" tabindex="-1"><a class="header-anchor" href="#四、c-开发环境配置" aria-hidden="true">#</a> 四、C++ 开发环境配置</h2><blockquote><p>当前配置的环境主要为了演示C++基础知识教学，后面做项目时会有调整。</p></blockquote><ul><li>测试代码<code>main.cpp</code>：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
    <span class="token comment">// 计算 1+2+3+4+5</span>
    <span class="token keyword">int</span> sum <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 输出结果</span>
    cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>先用<code>g++ main.cpp -o main</code>生成可执行文件</li><li>再用VS Code 菜单：<code>终端-运行生成任务</code>生成可执行文件，需要在<code>.vscode</code>先添加<code>tasks.json</code></li></ul><blockquote><p>Linux中可以使用<code>which g++</code>确定<code>g++</code>的路径</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tasks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cppbuild&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C/C++: g++ 生成活动文件&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/usr/bin/g++&quot;</span><span class="token punctuation">,</span> <span class="token comment">// g++的路径</span>
            <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;-fdiagnostics-color=always&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 颜色</span>
                <span class="token string">&quot;-g&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 调试信息</span>
                <span class="token string">&quot;-Wall&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 开启所有警告</span>
                <span class="token string">&quot;-std=c++14&quot;</span><span class="token punctuation">,</span> <span class="token comment">// c++14标准</span>
                <span class="token string">&quot;\${file}&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文件本身，仅适用于C++基础知识教学，无法同时编译所有文件</span>
                <span class="token comment">// &quot;\${fileDirname}/*.cpp&quot;, // 文件所在的文件夹路径下所有cpp文件</span>
                <span class="token string">&quot;-o&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 输出</span>
                <span class="token string">&quot;\${workspaceFolder}/release/\${fileBasenameNoExtension}&quot;</span> <span class="token comment">// 文件所在的文件夹路径/release/当前文件的文件名，不带后缀</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${fileDirname}&quot;</span> <span class="token comment">// 文件所在的文件夹路径</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;problemMatcher&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;$gcc&quot;</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;isDefault&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;detail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;编译器: /usr/bin/g++&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>需要debuger，<code>launch.json</code>修改为：</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 使用 IntelliSense 了解相关属性。 </span>
    <span class="token comment">// 悬停以查看现有属性的描述。</span>
    <span class="token comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;configurations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;(gdb) 启动&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cppdbg&quot;</span><span class="token punctuation">,</span> <span class="token comment">// C++调试</span>
            <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceFolder}/release/\${fileBasenameNoExtension}&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 文件所在的文件夹路径/release/当前文件的文件名，不带后缀</span>
            <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;stopAtEntry&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${fileDirname}&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文件所在的文件夹路径</span>
            <span class="token property">&quot;environment&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;externalConsole&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">&quot;MIMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gdb&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;setupCommands&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;为 gdb 启用整齐打印&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;-enable-pretty-printing&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;ignoreFailures&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;将反汇编风格设置为 Intel&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;-gdb-set disassembly-flavor intel&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;ignoreFailures&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;preLaunchTask&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C/C++: g++ 生成活动文件&quot;</span> <span class="token comment">// tasks.json的label</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Python: Current File&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${file}&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 当前文件</span>
            <span class="token comment">// &quot;program&quot;: &quot;demo.py&quot;, // 指定文件</span>
            <span class="token property">&quot;console&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integratedTerminal&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;justMyCode&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// false表示可以进入第三方库（如Pytorch）里进行调试</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、第一个c-程序" tabindex="-1"><a class="header-anchor" href="#五、第一个c-程序" aria-hidden="true">#</a> 五、第一个C++程序</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> favorites_num<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;请输入0~10中你最喜欢的数字：&quot;</span> <span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cin <span class="token operator">&gt;&gt;</span> favorites_num<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> favorites_num <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;也是我喜欢的数字！&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、附录-vs-code-中变量解释" tabindex="-1"><a class="header-anchor" href="#六、附录-vs-code-中变量解释" aria-hidden="true">#</a> 六、附录：vs code 中变量解释</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>以：/home/Coding/Test/.vscode/tasks.json 为例
\${workspaceFolder}:表示当前workspace文件夹路径，也即/home/Coding/Test
\${workspaceRootFolderName}:表示workspace的文件夹名，也即Test
\${file}:文件自身的绝对路径，也即/home/Coding/Test/.vscode/tasks.json
\${relativeFile}:文件在workspace中的路径，也即.vscode/tasks.json
\${fileBasenameNoExtension}:当前文件的文件名，不带后缀，也即tasks
\${fileBasename}:当前文件的文件名，tasks.json
\${fileDirname}:文件所在的文件夹路径，也即/home/Coding/Test/.vscode
\${fileExtname}:当前文件的后缀，也即.json
\${lineNumber}:当前文件光标所在的行号
\${env:PATH}:系统中的环境变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function q(g,h){const a=p("ExternalLinkIcon");return l(),i("div",null,[u,n("ul",null,[n("li",null,[s("Visual Studio Code 下载地址："),n("a",r,[s("https://code.visualstudio.com/download"),e(a)])]),d,n("li",null,[s("VS Code SSH远程连接Ubuntu主机 "),n("ul",null,[k,n("li",null,[s("autoDL示例： "),n("ul",null,[n("li",null,[s("autoDL地址："),n("a",v,[s("https://www.autodl.com/home"),e(a)])]),m])])])])]),b])}const w=o(c,[["render",q],["__file","config.html.vue"]]);export{w as default};
