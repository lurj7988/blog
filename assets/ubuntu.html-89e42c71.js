import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as t,b as n,d as c,f as p,e as s}from"./app-efeaa514.js";const o={},d=s(`<h2 id="学术加速" tabindex="-1"><a class="header-anchor" href="#学术加速" aria-hidden="true">#</a> 学术加速</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://192.168.188.1:7890 <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://192.168.188.1:7890
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="磁盘分区与挂载" tabindex="-1"><a class="header-anchor" href="#磁盘分区与挂载" aria-hidden="true">#</a> 磁盘分区与挂载</h2>`,3),r={href:"https://blog.csdn.net/make_progress/article/details/118571375",target:"_blank",rel:"noopener noreferrer"},u=s(`<h3 id="查看空闲磁盘空间" tabindex="-1"><a class="header-anchor" href="#查看空闲磁盘空间" aria-hidden="true">#</a> 查看空闲磁盘空间</h3><p>进入以后，m表示帮助，F表示查看空闲的磁盘，q表示退出，d表示删除分区，n表示新建分区，w表示保存配置等</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">sudo</span> <span class="token function">fdisk</span> /dev/sda

Welcome to <span class="token function">fdisk</span> <span class="token punctuation">(</span>util-linux <span class="token number">2.37</span>.2<span class="token punctuation">)</span>.
Changes will remain <span class="token keyword">in</span> memory only, <span class="token keyword">until</span> you decide to <span class="token function">write</span> them.
Be careful before using the <span class="token function">write</span> command.

GPT PMBR size mismatch <span class="token punctuation">(</span><span class="token number">41943039</span> <span class="token operator">!=</span> <span class="token number">167772159</span><span class="token punctuation">)</span> will be corrected by write.
This disk is currently <span class="token keyword">in</span> use - repartitioning is probably a bad idea.
It&#39;s recommended to <span class="token function">umount</span> all <span class="token function">file</span> systems, and swapoff all swap
partitions on this disk.


Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: F

Unpartitioned space /dev/sda: <span class="token number">60</span> GiB, <span class="token number">64425541120</span> bytes, <span class="token number">125831135</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes

   Start       End   Sectors Size
<span class="token number">41940992</span> <span class="token number">167772126</span> <span class="token number">125831135</span>  60G

Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>:
All unwritten changes will be lost, <span class="token keyword">do</span> you really want to quit? y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新建分区" tabindex="-1"><a class="header-anchor" href="#新建分区" aria-hidden="true">#</a> 新建分区</h3><p>选择<code>n</code>指令进去新建分区模式，选择默认分区号，根据指令设置磁盘大小，选择<code>p</code>指令查看分区是否添加成功，选择<code>w</code>指令保存配置，选择<code>q</code>指令退出不保存配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">sudo</span> <span class="token function">fdisk</span> /dev/sda

Welcome to <span class="token function">fdisk</span> <span class="token punctuation">(</span>util-linux <span class="token number">2.37</span>.2<span class="token punctuation">)</span>.
Changes will remain <span class="token keyword">in</span> memory only, <span class="token keyword">until</span> you decide to <span class="token function">write</span> them.
Be careful before using the <span class="token function">write</span> command.

GPT PMBR size mismatch <span class="token punctuation">(</span><span class="token number">41943039</span> <span class="token operator">!=</span> <span class="token number">167772159</span><span class="token punctuation">)</span> will be corrected by write.
This disk is currently <span class="token keyword">in</span> use - repartitioning is probably a bad idea.
It<span class="token string">&#39;s recommended to umount all file systems, and swapoff all swap
partitions on this disk.

Command (m for help): n
Partition number (4-128, default 4):
First sector (41940992-167772126, default 41940992):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (41940992-167772126, default 167772126):

Created a new partition 4 of type &#39;</span>Linux filesystem&#39; and of size <span class="token number">60</span> GiB.

Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: p
Disk /dev/sda: <span class="token number">80</span> GiB, <span class="token number">85899345920</span> bytes, <span class="token number">167772160</span> sectors
Disk model: VMware Virtual S
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
Disklabel type: gpt
Disk identifier: 209A5215-C303-4C38-802F-FADB733C53A6

Device        Start       End   Sectors  Size Type
/dev/sda1      <span class="token number">2048</span>      <span class="token number">4095</span>      <span class="token number">2048</span>    1M BIOS boot
/dev/sda2      <span class="token number">4096</span>   <span class="token number">3719167</span>   <span class="token number">3715072</span>  <span class="token number">1</span>.8G Linux filesystem
/dev/sda3   <span class="token number">3719168</span>  <span class="token number">41940991</span>  <span class="token number">38221824</span> <span class="token number">18</span>.2G Linux filesystem
/dev/sda4  <span class="token number">41940992</span> <span class="token number">167772126</span> <span class="token number">125831135</span>   60G Linux filesystem

Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: w
The partition table has been altered.
Syncing disks.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="格式化分区" tabindex="-1"><a class="header-anchor" href="#格式化分区" aria-hidden="true">#</a> 格式化分区</h3><p>对新分区<code>/dev/sda4</code>进行格式化，注意，不格式化不能对分区进行挂载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">sudo</span> <span class="token function">mkfs</span> <span class="token parameter variable">-t</span> ext4 /dev/sda4
<span class="token function">mke2fs</span> <span class="token number">1.46</span>.5 <span class="token punctuation">(</span><span class="token number">30</span>-Dec-2021<span class="token punctuation">)</span>
Creating filesystem with <span class="token number">15728640</span> 4k blocks and <span class="token number">3939840</span> inodes
Filesystem UUID: 71fe7d8e-63cf-42c1-abe3-686063d202ce
Superblock backups stored on blocks:
        <span class="token number">32768</span>, <span class="token number">98304</span>, <span class="token number">163840</span>, <span class="token number">229376</span>, <span class="token number">294912</span>, <span class="token number">819200</span>, <span class="token number">884736</span>, <span class="token number">1605632</span>, <span class="token number">2654208</span>,
        <span class="token number">4096000</span>, <span class="token number">7962624</span>, <span class="token number">11239424</span>

Allocating group tables: <span class="token keyword">done</span>
Writing inode tables: <span class="token keyword">done</span>
Creating journal <span class="token punctuation">(</span><span class="token number">65536</span> blocks<span class="token punctuation">)</span>: <span class="token keyword">done</span>
Writing superblocks and filesystem accounting information: <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检测分区" tabindex="-1"><a class="header-anchor" href="#检测分区" aria-hidden="true">#</a> 检测分区</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">sudo</span> e2fsck <span class="token parameter variable">-f</span> /dev/sda4
e2fsck <span class="token number">1.46</span>.5 <span class="token punctuation">(</span><span class="token number">30</span>-Dec-2021<span class="token punctuation">)</span>
Pass <span class="token number">1</span>: Checking inodes, blocks, and sizes
Pass <span class="token number">2</span>: Checking directory structure
Pass <span class="token number">3</span>: Checking directory connectivity
Pass <span class="token number">4</span>: Checking reference counts
Pass <span class="token number">5</span>: Checking group summary information
/dev/sda4: <span class="token number">11</span>/3939840 files <span class="token punctuation">(</span><span class="token number">0.0</span>% non-contiguous<span class="token punctuation">)</span>, <span class="token number">326171</span>/15728640 blocks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移动文件" tabindex="-1"><a class="header-anchor" href="#移动文件" aria-hidden="true">#</a> 移动文件</h3><p>将需要挂载的目录中的文件先移动出去</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/lurj
<span class="token comment"># 查看隐藏文件</span>
<span class="token function">ls</span> <span class="token parameter variable">-a</span>
<span class="token comment"># 移动文件包含隐藏文件</span>
<span class="token function">sudo</span> <span class="token function">mv</span> *.<span class="token punctuation">[</span>^.<span class="token punctuation">]</span>* /opt/ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="磁盘挂载" tabindex="-1"><a class="header-anchor" href="#磁盘挂载" aria-hidden="true">#</a> 磁盘挂载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 此方法只能临时挂载，系统重启后就失效</span>
<span class="token function">sudo</span> <span class="token function">mount</span> /dev/sda4 /home/lurj
<span class="token comment"># 设置开机自动挂载，编辑/etc/fstab文件，添加如下内容</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/fstab
<span class="token comment"># /dev/sda4       /home/lurj     ext4    defaults        0 0</span>
<span class="token comment"># 取消挂载</span>
<span class="token function">sudo</span> <span class="token function">umount</span> /home/lurj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看挂载" tabindex="-1"><a class="header-anchor" href="#查看挂载" aria-hidden="true">#</a> 查看挂载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">df</span> <span class="token parameter variable">-h</span>
Filesystem                         Size  Used Avail Use% Mounted on
tmpfs                              <span class="token number">1</span>.6G  <span class="token number">1</span>.6M  <span class="token number">1</span>.6G   <span class="token number">1</span>% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  <span class="token number">9</span>.8G  <span class="token number">3</span>.9G  <span class="token number">5</span>.5G  <span class="token number">42</span>% /
tmpfs                              <span class="token number">7</span>.8G     <span class="token number">0</span>  <span class="token number">7</span>.8G   <span class="token number">0</span>% /dev/shm
tmpfs                              <span class="token number">5</span>.0M     <span class="token number">0</span>  <span class="token number">5</span>.0M   <span class="token number">0</span>% /run/lock
/dev/sda2                          <span class="token number">1</span>.8G  253M  <span class="token number">1</span>.4G  <span class="token number">16</span>% /boot
tmpfs                              <span class="token number">1</span>.6G  <span class="token number">4</span>.0K  <span class="token number">1</span>.6G   <span class="token number">1</span>% /run/user/1000
/dev/sda4                           59G  <span class="token number">5</span>.4G   51G  <span class="token number">10</span>% /home/lurj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function m(b,v){const a=i("ExternalLinkIcon");return l(),t("div",null,[d,n("p",null,[n("a",r,[c("参考链接"),p(a)])]),u])}const f=e(o,[["render",m],["__file","ubuntu.html.vue"]]);export{f as default};
