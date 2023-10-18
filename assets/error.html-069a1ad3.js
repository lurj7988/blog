import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-37fbae1f.js";const e={},p=t(`<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><ol><li><p><code>IDEA</code>启动时应用报错跳转<code>error.ftl</code>可以正常显示<code>\${message}</code>，但是打包成<code>fat jar</code>后，启动应用报错跳转<code>error.ftl</code>时，<code>\${message}</code>无法显示，显示的是<code>null</code>。</p></li><li><p><code>Servlet</code>中抛出异常为什么会自动跳转到<code>error.ftl</code>页面？</p></li></ol><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h2><p><code>Servlet</code>中抛出异常时，会被<code>tomcat</code>容器转发到<code>/error</code>地址。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>catalina<span class="token punctuation">.</span>core</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">StandardHostValve</span> <span class="token keyword">extends</span> <span class="token class-name">ValveBase</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">Request</span> request<span class="token punctuation">,</span> <span class="token class-name">Response</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 转发到/error地址</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">custom</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> errorPage<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳转到<code>/error</code>地址后，会被<code>SpringMVC</code>的<code>BasicErrorController</code>拦截，然后跳转到<code>error.ftl</code>页面。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>error</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;\${server.error.path:\${error.path:/error}}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasicErrorController</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractErrorController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>produces <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">TEXT_HTML_VALUE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ModelAndView</span> <span class="token function">errorHtml</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HttpStatus</span> status <span class="token operator">=</span> <span class="token function">getStatus</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取错误信息</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> model <span class="token operator">=</span> <span class="token class-name">Collections</span>
                <span class="token punctuation">.</span><span class="token function">unmodifiableMap</span><span class="token punctuation">(</span><span class="token function">getErrorAttributes</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token function">getErrorAttributeOptions</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">TEXT_HTML</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ModelAndView</span> modelAndView <span class="token operator">=</span> <span class="token function">resolveErrorView</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> status<span class="token punctuation">,</span> model<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>modelAndView <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> modelAndView <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">ModelAndView</span><span class="token punctuation">(</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> model<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未获取到<code>message</code>的原因如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>error</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token class-name">Ordered</span><span class="token punctuation">.</span><span class="token constant">HIGHEST_PRECEDENCE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultErrorAttributes</span> <span class="token keyword">implements</span> <span class="token class-name">ErrorAttributes</span><span class="token punctuation">,</span> <span class="token class-name">HandlerExceptionResolver</span><span class="token punctuation">,</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">getErrorAttributes</span><span class="token punctuation">(</span><span class="token class-name">WebRequest</span> webRequest<span class="token punctuation">,</span> <span class="token class-name">ErrorAttributeOptions</span> options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> errorAttributes <span class="token operator">=</span> <span class="token function">getErrorAttributes</span><span class="token punctuation">(</span>webRequest<span class="token punctuation">,</span> options<span class="token punctuation">.</span><span class="token function">isIncluded</span><span class="token punctuation">(</span><span class="token class-name">Include</span><span class="token punctuation">.</span><span class="token constant">STACK_TRACE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isIncluded</span><span class="token punctuation">(</span><span class="token class-name">Include</span><span class="token punctuation">.</span><span class="token constant">EXCEPTION</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            errorAttributes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;exception&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isIncluded</span><span class="token punctuation">(</span><span class="token class-name">Include</span><span class="token punctuation">.</span><span class="token constant">STACK_TRACE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            errorAttributes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;trace&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// options中没有Include.MESSAGE所以被排除了</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isIncluded</span><span class="token punctuation">(</span><span class="token class-name">Include</span><span class="token punctuation">.</span><span class="token constant">MESSAGE</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> errorAttributes<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;message&quot;</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            errorAttributes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span><span class="token function">isIncluded</span><span class="token punctuation">(</span><span class="token class-name">Include</span><span class="token punctuation">.</span><span class="token constant">BINDING_ERRORS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            errorAttributes<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;errors&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> errorAttributes<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>ErrorAttributeOptions</code>未配置<code>Include.MESSAGE</code>，原因是<code>ErrorProperties</code>默认关闭了<code>Include.MESSAGE</code>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span>web</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ErrorProperties</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">IncludeAttribute</span> includeMessage <span class="token operator">=</span> <span class="token class-name">IncludeAttribute</span><span class="token punctuation">.</span><span class="token constant">NEVER</span><span class="token punctuation">;</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而<code>IDEA</code>开发时引用了工具<code>spring-boot-devtools</code>，该工具会自动配置<code>ErrorProperties</code>，并且开启了<code>Include.MESSAGE</code>。配置路径为<code>spring-boot-devtools-2.7.5.jar!\\org\\springframework\\boot\\devtools\\env\\devtools-property-defaults.properties</code></p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">server.error.include-binding-errors</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
<span class="token key attr-name">server.error.include-message</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
<span class="token key attr-name">server.error.include-stacktrace</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","error.html.vue"]]);export{k as default};
