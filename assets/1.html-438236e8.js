import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as r,d as n,e,b as o,a}from"./app-1e0ef221.js";const d={},c=a('<h1 id="stable-diffusion安装教程" tabindex="-1"><a class="header-anchor" href="#stable-diffusion安装教程" aria-hidden="true">#</a> Stable Diffusion安装教程</h1><h2 id="安装python环境" tabindex="-1"><a class="header-anchor" href="#安装python环境" aria-hidden="true">#</a> 安装python环境</h2><h2 id="安装git" tabindex="-1"><a class="header-anchor" href="#安装git" aria-hidden="true">#</a> 安装git</h2><h2 id="安装环境" tabindex="-1"><a class="header-anchor" href="#安装环境" aria-hidden="true">#</a> 安装环境</h2>',4),h={href:"https://www.python.org/downloads/release/python-3106/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.python.org/ftp/python/3.10.6/python-3.10.6-amd64.exe",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/adang1345/PythonWin7/raw/master/3.10.6/python-3.10.6-amd64-full.exe",target:"_blank",rel:"noopener noreferrer"},f={href:"https://git-scm.com/download/win",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,[e("Linux (Debian-based): "),n("code",null,"sudo apt install wget git python3 python3-venv")],-1),_=n("li",null,[e("Linux (Red Hat-based): "),n("code",null,"sudo dnf install wget git python3")],-1),g=n("li",null,[e("Linux (Arch-based): "),n("code",null,"sudo pacman -S wget git python3")],-1),m=a("<li>从仓库下载代码: <ul><li>首选方法: 使用git命令: <code>git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git</code>. <ul><li>之所以使用这种方法，是因为它允许您通过运行<code>git pull</code>来更新。</li><li>这些命令可以在文件资源管理器中右键单击并选择“Git Bash here”后打开的命令行窗口中使用。</li></ul></li><li>替代方法: 点击 &quot;Code&quot; (绿色按钮) -&gt; &quot;Download ZIP&quot; 选择这个仓库的<code>main</code>分支。 <ul><li>即使你选择这样做，你仍然需要安装git。</li><li>要更新，您必须再次下载zip并替换文件。</li></ul></li></ul></li>",1),w=n("code",null,".ckpt",-1),k=n("code",null,"models/Stable-diffusion",-1),v={href:"https://huggingface.co/CompVis/stable-diffusion-v-1-4-original",target:"_blank",rel:"noopener noreferrer"},A={href:"https://drive.yerf.org/wl/?id=EBfTrmcCCUAGaQBXVIj5lJmEhjoP1tgl",target:"_blank",rel:"noopener noreferrer"},x={href:"http://2ftracker.openbittorrent.com",target:"_blank",rel:"noopener noreferrer"},y={href:"http://2ftracker.opentrackr.org",target:"_blank",rel:"noopener noreferrer"},I=n("h2",{id:"installation-and-running",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#installation-and-running","aria-hidden":"true"},"#"),e(" Installation and Running")],-1),T={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-NVidia-GPUs",target:"_blank",rel:"noopener noreferrer"},U={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-AMD-GPUs",target:"_blank",rel:"noopener noreferrer"},M=n("p",null,"Alternatively, use online services (like Google Colab):",-1),O={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Online-Services",target:"_blank",rel:"noopener noreferrer"},P=n("h3",{id:"automatic-installation-on-windows",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#automatic-installation-on-windows","aria-hidden":"true"},"#"),e(" Automatic Installation on Windows")],-1),S={href:"https://www.python.org/downloads/windows/",target:"_blank",rel:"noopener noreferrer"},D={href:"https://git-scm.com/download/win",target:"_blank",rel:"noopener noreferrer"},V=n("li",null,[e("Download the stable-diffusion-webui repository, for example by running "),n("code",null,"git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git"),e(".")],-1),G=n("code",null,"model.ckpt",-1),L=n("code",null,"models/Stable-diffusion",-1),q={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies",target:"_blank",rel:"noopener noreferrer"},B=n("li",null,[e("Run "),n("code",null,"webui-user.bat"),e(" from Windows Explorer as normal, non-administrator, user.")],-1),E=a(`<h3 id="automatic-installation-on-linux" tabindex="-1"><a class="header-anchor" href="#automatic-installation-on-linux" aria-hidden="true">#</a> Automatic Installation on Linux</h3><ol><li>Install the dependencies:</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Debian-based:</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">wget</span> <span class="token function">git</span> python3 python3-venv
<span class="token comment"># Red Hat-based:</span>
<span class="token function">sudo</span> dnf <span class="token function">install</span> <span class="token function">wget</span> <span class="token function">git</span> python3
<span class="token comment"># Arch-based:</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> <span class="token function">wget</span> <span class="token function">git</span> python3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>To install in <code>/home/$(whoami)/stable-diffusion-webui/</code>, run:</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">wget</span> -qO- https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/webui.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="installation-on-apple-silicon" tabindex="-1"><a class="header-anchor" href="#installation-on-apple-silicon" aria-hidden="true">#</a> Installation on Apple Silicon</h3>`,6),N={href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon",target:"_blank",rel:"noopener noreferrer"};function R(W,H){const t=s("ExternalLinkIcon");return l(),r("div",null,[c,n("ol",null,[n("li",null,[e("Python 3.10.6 and Git: "),n("ul",null,[n("li",null,[e("Windows: 下载并运行Python 3.10.6的安装程序("),n("a",h,[e("webpage"),o(t)]),e(", "),n("a",u,[e("exe"),o(t)]),e(", 或者 "),n("a",p,[e("win7 version"),o(t)]),e(") 以及 git 工具 ("),n("a",f,[e("webpage"),o(t)]),e(")")]),b,_,g])]),m,n("li",null,[e("Stable Diffusion基础模型, 一个"),w,e("后缀的文件下载并放在"),k,e("目录下。 "),n("ul",null,[n("li",null,[n("a",v,[e("官方下载"),o(t)])]),n("li",null,[n("a",A,[e("文件存储"),o(t)])]),n("li",null,[e("磁力链接 (magnet:?xt=urn:btih:3a4a612d75ed088ea542acac52f9f45987488d1c&dn=sd-v1-4.ckpt&tr=udp%3a%2f%"),n("a",x,[e("2ftracker.openbittorrent.com"),o(t)]),e("%3a6969%2fannounce&tr=udp%3a%2f%"),n("a",y,[e("2ftracker.opentrackr.org"),o(t)]),e("%3a1337)")])])])]),I,n("p",null,[e("Make sure the required "),n("a",T,[e("dependencies"),o(t)]),e(" are met and follow the instructions available for both "),n("a",C,[e("NVidia"),o(t)]),e(" (recommended) and "),n("a",U,[e("AMD"),o(t)]),e(" GPUs.")]),M,n("ul",null,[n("li",null,[n("a",O,[e("List of Online Services"),o(t)])])]),P,n("ol",null,[n("li",null,[e("Install "),n("a",S,[e("Python 3.10.6"),o(t)]),e(', checking "Add Python to PATH"')]),n("li",null,[e("Install "),n("a",D,[e("git"),o(t)]),e(".")]),V,n("li",null,[e("Place stable diffusion checkpoint ("),G,e(") in the "),L,e(" directory (see "),n("a",q,[e("dependencies"),o(t)]),e(" for where to get it).")]),B]),E,n("p",null,[e("Find the instructions "),n("a",N,[e("here"),o(t)]),e(".")])])}const F=i(d,[["render",R],["__file","1.html.vue"]]);export{F as default};
