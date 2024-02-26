import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as r,c as l,b as e,d as a,f as s,e as t}from"./app-55dec57a.js";const d="/blog/assets/ubuntu-vmware-com1-1c1b8341.png",c="/blog/assets/ubuntu-vmware-com2-23426d8a.png",p={},u=e("h2",{id:"参考文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),a(" 参考文档")],-1),h={href:"https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/index.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/espressif/ESP8266_RTOS_SDK",target:"_blank",rel:"noopener noreferrer"},b=t('<h2 id="get-started" tabindex="-1"><a class="header-anchor" href="#get-started" aria-hidden="true">#</a> Get Started</h2><p>This document is intended to help users set up the software environment for development of applications using hardware based on the Espressif ESP8266EX. Through a simple example we would like to illustrate how to use ESP8266_RTOS_SDK (ESP-IDF Style), including the menu based configuration, compiling the ESP8266_RTOS_SDK and firmware download to ESP8266EX boards.</p><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>The ESP8266EX microcontroller integrates a Tensilica L106 32-bit RISC processor, which achieves extra-low power consumption and reaches a maximum clock speed of 160 MHz. The Real-Time Operating System (RTOS) and Wi-Fi stack allow about 80% of the processing power to be available for user application programming and development.</p><p>Espressif provides the basic hardware and software resources that help application developers to build their ideas around the ESP8266EX series hardware. The software development framework by Espressif is intended for rapidly developing Internet-of-Things (IoT) applications, with Wi-Fi, power management and several other system features.</p><h2 id="developing-with-the-esp8266-rtos-sdk" tabindex="-1"><a class="header-anchor" href="#developing-with-the-esp8266-rtos-sdk" aria-hidden="true">#</a> Developing With the ESP8266_RTOS_SDK</h2><h3 id="get-toolchain" tabindex="-1"><a class="header-anchor" href="#get-toolchain" aria-hidden="true">#</a> Get toolchain</h3><p>v8.4.0</p>',8),g={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-win32.zip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-macos.tar.gz",target:"_blank",rel:"noopener noreferrer"},v={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64.tar.gz",target:"_blank",rel:"noopener noreferrer"},k={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-i686.tar.gz",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,"If you are still using old version SDK(< 3.0), please use toolchain v4.8.5, as following:",-1),y={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-win32-1.22.0-88-gde0bdc1-4.8.5.tar.gz",target:"_blank",rel:"noopener noreferrer"},S={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-osx-1.22.0-88-gde0bdc1-4.8.5.tar.gz",target:"_blank",rel:"noopener noreferrer"},w={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-linux64-1.22.0-88-gde0bdc1-4.8.5.tar.gz",target:"_blank",rel:"noopener noreferrer"},x={href:"https://dl.espressif.com/dl/xtensa-lx106-elf-linux32-1.22.0-88-gde0bdc1-4.8.5.tar.gz",target:"_blank",rel:"noopener noreferrer"},T=t(`<h3 id="setup-toolchain" tabindex="-1"><a class="header-anchor" href="#setup-toolchain" aria-hidden="true">#</a> Setup Toolchain</h3><p>Download this file, then extract it in <code>~/esp</code> directory:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/esp
<span class="token builtin class-name">cd</span> ~/esp
<span class="token function">tar</span> <span class="token parameter variable">-xzf</span> ~/Downloads/xtensa-lx106-elf-linux64-1.22.0-100-ge567ec7-5.2.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The toolchain will be extracted into <code>~/esp/xtensa-lx106-elf/</code> directory.</p><p>To use it, you will need to update your <code>PATH</code> environment variable in <code>~/.profile</code> file. To make <code>xtensa-lx106-elf</code> available for all terminal sessions, add the following line to your <code>~/.profile</code> file:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$PATH</span>:<span class="token environment constant">$HOME</span>/esp/xtensa-lx106-elf/bin&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Alternatively, you may create an alias for the above command. This way you can get the toolchain only when you need it. To do this, add different line to your <code>~/.profile</code> file:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">alias</span> <span class="token assign-left variable">get_lx106</span><span class="token operator">=</span><span class="token string">&#39;export PATH=&quot;$PATH:$HOME/esp/xtensa-lx106-elf/bin&quot;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then when you need the toolchain you can type <code>get_lx106</code> on the command line and the toolchain will be added to your <code>PATH</code>.</p><div class="hint-container info"><p class="hint-container-title">Note</p><p>If you have <code>/bin/bash</code> set as login shell, and both <code>.bash_profile</code> and <code>.profile</code> exist, then update <code>.bash_profile</code> instead.</p></div><p>Log off and log in back to make the .profile changes effective. Run the following command to verify if PATH is correctly set:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">printenv</span> <span class="token environment constant">PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You are looking for similar result containing toolchain’s path at the end of displayed string:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">printenv</span> <span class="token environment constant">PATH</span>
/home/user-name/bin:/home/user-name/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/user-name/esp/xtense-lx106-elf/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Instead of <code>/home/user-name</code> there should be a home path specific to your installation.</p><h3 id="permission-issues-dev-ttyusb0" tabindex="-1"><a class="header-anchor" href="#permission-issues-dev-ttyusb0" aria-hidden="true">#</a> Permission issues /dev/ttyUSB0</h3><p>With some Linux distributions you may get the <code>Failed to open port /dev/ttyUSB0</code> error message when flashing the ESP8266.</p><p>If this happens you may need to add your current user to the correct group (commonly “dialout”) which has the appropriate permissions:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-G</span> dialout <span class="token environment constant">$USER</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In addition, you can also use “sudo chmod” to set permissions on the “/dev/ttyUSB0” file before running the make command to resolve:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /dev/ttyUSB0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you want to check which serial ports are available, you can use the following command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> ttyS*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You are looking for a line similar to this:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lurj@lurj:~$ <span class="token function">sudo</span> <span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> ttyS*
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> password <span class="token keyword">for</span> lurj:
<span class="token punctuation">[</span>    <span class="token number">2.797442</span><span class="token punctuation">]</span> printk: console <span class="token punctuation">[</span>tty0<span class="token punctuation">]</span> enabled
<span class="token punctuation">[</span>    <span class="token number">4.669863</span><span class="token punctuation">]</span> 00:05: ttyS0 at I/O 0x3f8 <span class="token punctuation">(</span>irq <span class="token operator">=</span> <span class="token number">4</span>, base_baud <span class="token operator">=</span> <span class="token number">115200</span><span class="token punctuation">)</span> is a 16550A
<span class="token punctuation">[</span>    <span class="token number">4.762274</span><span class="token punctuation">]</span> 00:06: ttyS1 at I/O 0x2f8 <span class="token punctuation">(</span>irq <span class="token operator">=</span> <span class="token number">3</span>, base_baud <span class="token operator">=</span> <span class="token number">115200</span><span class="token punctuation">)</span> is a 16550A
<span class="token punctuation">[</span> <span class="token number">5659.082997</span><span class="token punctuation">]</span> ch341-uart ttyUSB0: <span class="token builtin class-name">break</span> control not supported, using simulated <span class="token builtin class-name">break</span>
<span class="token punctuation">[</span> <span class="token number">5659.084082</span><span class="token punctuation">]</span> usb <span class="token number">2</span>-2.1: ch341-uart converter now attached to ttyUSB0
<span class="token punctuation">[</span> <span class="token number">6258.526072</span><span class="token punctuation">]</span> ch341-uart ttyUSB0: ch341-uart converter now disconnected from ttyUSB0
<span class="token punctuation">[</span> <span class="token number">9450.323388</span><span class="token punctuation">]</span> ch341-uart ttyUSB0: <span class="token builtin class-name">break</span> control not supported, using simulated <span class="token builtin class-name">break</span>
<span class="token punctuation">[</span> <span class="token number">9450.323720</span><span class="token punctuation">]</span> usb <span class="token number">2</span>-2.1: ch341-uart converter now attached to ttyUSB0
<span class="token punctuation">[</span><span class="token number">18277.962687</span><span class="token punctuation">]</span> ch341-uart ttyUSB0: ch341-uart converter now disconnected from ttyUSB0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-esp8266-rtos-sdk" tabindex="-1"><a class="header-anchor" href="#get-esp8266-rtos-sdk" aria-hidden="true">#</a> Get ESP8266_RTOS_SDK</h3>`,26),P={href:"https://github.com/espressif/ESP8266_RTOS_SDK",target:"_blank",rel:"noopener noreferrer"},E=e("code",null,"git clone",-1),O=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/esp
<span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> https://github.com/espressif/ESP8266_RTOS_SDK.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ESP8266_RTOS_SDK will be downloaded into <code>~/esp/ESP8266_RTOS_SDK</code>.</p><p><code>--depth 1</code> means that only the latest commit will be downloaded.</p><h3 id="setup-path-to-esp8266-rtos-sdk" tabindex="-1"><a class="header-anchor" href="#setup-path-to-esp8266-rtos-sdk" aria-hidden="true">#</a> Setup Path to ESP8266_RTOS_SDK</h3><p>The toolchain programs access ESP8266_RTOS_SDK using <code>IDF_PATH</code> environment variable. This variable should be set up on your PC, otherwise projects will not build. Setting may be done manually, each time PC is restarted. Another option is to set up it permanently by defining <code>IDF_PATH</code> in user profile.</p><p>For manually, the command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">IDF_PATH</span><span class="token operator">=~</span>/esp/ESP8266_RTOS_SDK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="install-the-required-python-packages" tabindex="-1"><a class="header-anchor" href="#install-the-required-python-packages" aria-hidden="true">#</a> Install the Required Python Packages</h3><p>Create a virtual environment for ESP8266_RTOS_SDK. This is optional, but recommended. It will allow you to install the required Python packages without affecting the rest of your system.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda create <span class="token parameter variable">-n</span> esp <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">2.7</span>
conda activate esp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Python packages required by ESP8266_RTOS_SDK are located in the <code>$IDF_PATH/requirements.txt</code> file. You can install them by running:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python <span class="token parameter variable">-m</span> pip <span class="token function">install</span> <span class="token parameter variable">-r</span> <span class="token variable">$IDF_PATH</span>/requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="start-a-project" tabindex="-1"><a class="header-anchor" href="#start-a-project" aria-hidden="true">#</a> Start a Project</h3><p>Now you are ready to prepare your application for ESP8266. To start off quickly, we can use <code>examples/get-started/hello_world</code> project from <code>examples</code> directory in SDK.</p><p>Once you&#39;ve found the project you want to work with, change to its directory and you can configure and build it.</p><h3 id="connect" tabindex="-1"><a class="header-anchor" href="#connect" aria-hidden="true">#</a> Connect</h3><p>You are almost there. To be able to proceed further, connect ESP8266 board to PC, check under what serial port the board is visible and verify if serial communication works. Note the port number, as it will be required in the next step.</p><h3 id="configuring-the-project" tabindex="-1"><a class="header-anchor" href="#configuring-the-project" aria-hidden="true">#</a> Configuring the Project</h3><p>Being in terminal window, go to directory of <code>hello_world</code> application by typing <code>cd ~/esp/ESP8266_RTOS_SDK/examples/get-started/hello_world</code>. Then start project configuration utility <code>menuconfig</code>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/esp/ESP8266_RTOS_SDK/examples/get-started/hello_world
<span class="token function">make</span> menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>In the menu, navigate to <code>Serial flasher config</code> &gt; <code>Default serial port</code> to configure the serial port, where project will be loaded to. Confirm selection by pressing enter, save configuration by selecting <code>&lt; Save &gt;</code> and then exit application by selecting <code>&lt; Exit &gt;</code>.</p><blockquote><p>Note: On Windows, serial ports have names like COM1. On MacOS, they start with <code>/dev/cu.</code>. On Linux, they start with <code>/dev/tty</code>.</p></blockquote><p>Here are couple of tips on navigation and use of <code>menuconfig</code>:</p><ul><li>Use up &amp; down arrow keys to navigate the menu.</li><li>Use Enter key to go into a submenu, Escape key to go out or to exit.</li><li>Type <code>?</code> to see a help screen. Enter key exits the help screen.</li><li>Use Space key, or <code>Y</code> and <code>N</code> keys to enable (Yes) and disable (No) configuration items with checkboxes &quot;<code>[*]</code>&quot;</li><li>Pressing <code>?</code> while highlighting a configuration item displays help about that item.</li><li>Type <code>/</code> to search the configuration items.</li></ul><p>Once done configuring, press Escape multiple times to exit and say &quot;Yes&quot; to save the new configuration when prompted.</p><h3 id="compiling-the-project" tabindex="-1"><a class="header-anchor" href="#compiling-the-project" aria-hidden="true">#</a> Compiling the Project</h3><p><code>make all</code></p><p>... will compile app based on the config.</p><h3 id="flashing-the-project" tabindex="-1"><a class="header-anchor" href="#flashing-the-project" aria-hidden="true">#</a> Flashing the Project</h3>`,29),D=e("code",null,"make all",-1),R={href:"http://esptool.py",target:"_blank",rel:"noopener noreferrer"},j=t('<p><code>make flash</code></p><p>This will flash the entire project (app, bootloader and init data bin) to a new chip. The settings for serial port flashing can be configured with <code>make menuconfig</code>.</p><p>You don&#39;t need to run <code>make all</code> before running <code>make flash</code>, <code>make flash</code> will automatically rebuild anything which needs it.</p><h3 id="viewing-serial-output" tabindex="-1"><a class="header-anchor" href="#viewing-serial-output" aria-hidden="true">#</a> Viewing Serial Output</h3>',4),K=e("code",null,"make monitor",-1),I={href:"https://esp-idf.readthedocs.io/en/latest/get-started/idf-monitor.html",target:"_blank",rel:"noopener noreferrer"},q={href:"https://esp-idf.readthedocs.io/en/latest/get-started/idf-monitor.html",target:"_blank",rel:"noopener noreferrer"},A=t(`<p>Exit the monitor by typing Ctrl-].</p><p>To flash and monitor output in one pass, you can run:</p><p><code>make flash monitor</code></p><h3 id="compiling-flashing-just-the-app" tabindex="-1"><a class="header-anchor" href="#compiling-flashing-just-the-app" aria-hidden="true">#</a> Compiling &amp; Flashing Just the App</h3><p>After the initial flash, you may just want to build and flash just your app, not the bootloader and init data bin:</p><ul><li><code>make app</code> - build just the app.</li><li><code>make app-flash</code> - flash just the app.</li></ul><p><code>make app-flash</code> will automatically rebuild the app if it needs it.</p><p>(In normal development there&#39;s no downside to reflashing the bootloader and init data bin each time, if they haven&#39;t changed.)</p><blockquote><p>Note: Recommend to use these 2 commands if you have flashed bootloader and init data bin.</p></blockquote><h3 id="parallel-builds" tabindex="-1"><a class="header-anchor" href="#parallel-builds" aria-hidden="true">#</a> Parallel Builds</h3><p>ESP8266_RTOS_SDK supports compiling multiple files in parallel, so all of the above commands can be run as <code>make -jN</code> where <code>N</code> is the number of parallel make processes to run (generally N should be equal to or one more than the number of CPU cores in your system.)</p><p>Multiple make functions can be combined into one. For example: to build the app &amp; bootloader using 5 jobs in parallel, then flash everything, and then display serial output from the ESP32 run:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> <span class="token parameter variable">-j5</span> app-flash monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="erasing-flash" tabindex="-1"><a class="header-anchor" href="#erasing-flash" aria-hidden="true">#</a> Erasing Flash</h3><p>The <code>make flash</code> target does not erase the entire flash contents. However it is sometimes useful to set the device back to a totally erased state. To erase the entire flash, run <code>make erase_flash</code>.</p><p>This can be combined with other targets, ie <code>make erase_flash flash</code> will erase everything and then re-flash the new app, bootloader and init data bin.</p><h3 id="updating-esp8266-rtos-sdk" tabindex="-1"><a class="header-anchor" href="#updating-esp8266-rtos-sdk" aria-hidden="true">#</a> Updating ESP8266_RTOS_SDK</h3><p>After some time of using ESP8266_RTOS_SDK-IDF, you may want to update it to take advantage of new features or bug fixes. The simplest way to do so is by deleting existing <code>ESP8266_RTOS_SDK</code> folder and cloning it again.</p><p>Another solution is to update only what has changed. This method is useful if you have a slow connection to GitHub. To do the update run the following commands::</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/esp/ESP8266_RTOS_SDK
<span class="token function">git</span> pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>git pull</code> command is fetching and merging changes from ESP8266_RTOS_SDK repository on GitHub.</p><h3 id="ubuntu-vmware" tabindex="-1"><a class="header-anchor" href="#ubuntu-vmware" aria-hidden="true">#</a> Ubuntu VMware</h3><p><img src="`+d+'" alt="ubuntu-vmware-com1" loading="lazy"><img src="'+c+'" alt="ubuntu-vmware-com2" loading="lazy"></p>',23);function H(U,B){const n=i("ExternalLinkIcon");return r(),l("div",null,[u,e("ul",null,[e("li",null,[e("a",h,[a("ESP8266 RTOS SDK Programming Guide"),s(n)])]),e("li",null,[e("a",m,[a("ESP8266_RTOS_SDK"),s(n)])])]),b,e("ul",null,[e("li",null,[e("a",g,[a("Windows"),s(n)])]),e("li",null,[e("a",f,[a("Mac"),s(n)])]),e("li",null,[e("a",v,[a("Linux(64)"),s(n)])]),e("li",null,[e("a",k,[a("Linux(32)"),s(n)])])]),_,e("ul",null,[e("li",null,[e("a",y,[a("Windows"),s(n)])]),e("li",null,[e("a",S,[a("Mac"),s(n)])]),e("li",null,[e("a",w,[a("Linux(64)"),s(n)])]),e("li",null,[e("a",x,[a("Linux(32)"),s(n)])])]),T,e("p",null,[a("Besides the toolchain (that contains programs to compile and build the application), you also need ESP8266 specific API / libraries. They are provided by Espressif in "),e("a",P,[a("ESP8266_RTOS_SDK"),s(n)]),a(" repository. To get it, open terminal, navigate to the directory you want to put ESP8266_RTOS_SDK, and clone it using "),E,a(" command:")]),O,e("p",null,[a("When "),D,a(" finishes, it will print a command line to use "),e("a",R,[a("esptool.py"),s(n)]),a(" to flash the chip. However you can also do this from make by running:")]),j,e("p",null,[a("The "),K,a(" target uses the "),e("a",I,[a("idf_monitor tool"),s(n)]),a(" to display serial output from the ESP32. idf_monitor also has a range of features to decode crash output and interact with the device. "),e("a",q,[a("Check the documentation page for details"),s(n)]),a(".")]),A])}const N=o(p,[["render",H],["__file","develop.html.vue"]]);export{N as default};