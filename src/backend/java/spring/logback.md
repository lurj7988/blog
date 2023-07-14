---
title: logback
icon: markdown
order: 2
date: 2023-06-30
category:
  - 后端技术
tag:
  - spring
---

## 前言

SLF4J，即简单日志门面（Simple Logging Facade for Java），不是具体的日志解决方案，它只服务于各种各样的日志系统。

SLF4J最常用的日志实现框架是：log4j、logback。一般有slf4j+log4j、slf4j+log4j2、slf4j+logback三种日志组合。本文选取logback做具体介绍。

## 一、logback介绍

Logback是由log4j创始人设计的另一个开源日志组件,官方网站：<http://logback.qos.ch>。它当前分为以下三个模块：

- ogback-core：其它两个模块的基础模块。
- logback-classic：它是log4j的一个改良版本，同时它完整实现了slf4j API使你可以很方便地更换成其它日志系统如log4j或JDK14 Logging。
- logback-access：访问模块与Servlet容器集成提供通过Http来访问日志的功能。

默认情况下，Spring Boot会用Logback来记录日志，并用INFO级别输出到控制台。

日志级别（log level）：用来控制日志信息的输出，从高到低分为共分为七个等级:

::: info 日志等级

1. off 最高等级，用于关闭所有日志记录。
1. fatal 指出每个严重的错误事件将会导致应用程序的退出。
1. error 指出虽然发生错误事件，但仍然不影响系统的继续运行。
1. warm 表明会出现潜在的错误情形。
1. info 一般和在粗粒度级别上，强调应用程序的运行全程。
1. debug 一般用于细粒度级别上，对调试应用程序非常有帮助。
1. all 最低等级，用于打开所有日志记录。
:::

## 二、logback配置

### 2.1 pom依赖

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>

<!--引入以上依赖，会自动引入以下jar
	logback-classic.x.x.x.jar
	logback-core.x.x.x.jar
	slf4j-api-x.x.x.jar
-->
```

> 注意`spring-boot-starter`里已集成`spring-boot-starter-logging`，可直接使用。

### 2.2 logback.xml配置

首先会从`resource`文件中查询`logback-test.groovy`, `logback-test.xml`, `logback.groovy`, `logback.xml`文件，找到就会刷新文件反正文件变化，找不到就会加上`-spring`继续查询。具体代码实现可以查看`org.springframework.boot.logging.AbstractLoggingSystem`类。

```java
private void initializeWithConventions(LoggingInitializationContext initializationContext, LogFile logFile) {
  String config = getSelfInitializationConfig();
  if (config != null && logFile == null) {
    // self initialization has occurred, reinitialize in case of property changes
    reinitialize(initializationContext);
    return;
  }
  if (config == null) {
    //logback-test-spring.groovy logback-test-spring.xml logback-spring.groovy logback-spring.xml
    config = getSpringInitializationConfig();
  }
  if (config != null) {
    loadConfiguration(initializationContext, config, logFile);
    return;
  }
  loadDefaults(initializationContext, logFile);
}
```

### 2.3 logback.xml指定路径

在`application.properties`中指定`logback.xml`路径，如：

```properties
logging.config=classpath:logback-spring.xml
```

也可以指定vm参数启动时指定，如：

```shell
java -jar xxx.jar -Dlogging.config=classpath:logback-spring.xml
```

### 2.4 logback.xml默认配置

`spring-boot-2.6.14.jar!\org\springframework\boot\logging\logback\base.xml`文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Base logback configuration provided for compatibility with Spring Boot 1.1
-->

<included>
  <include resource="org/springframework/boot/logging/logback/defaults.xml" />
  <property name="LOG_FILE" value="${LOG_FILE:-${LOG_PATH:-${LOG_TEMP:-${java.io.tmpdir:-/tmp}}}/spring.log}"/>
  <include resource="org/springframework/boot/logging/logback/console-appender.xml" />
  <include resource="org/springframework/boot/logging/logback/file-appender.xml" />
  <root level="INFO">
    <appender-ref ref="CONSOLE" />
    <appender-ref ref="FILE" />
  </root>
</included>
```

可以继承`base.xml`，然后自定义配置，如：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>
    <!-- 配置信息需要放在前面 -->
    <property name="LOG_PATH" value="D:/"/>
    <include resource="org/springframework/boot/logging/logback/base.xml"/>
    <logger name="com.xxx" level="DEBUG" additivity="false">
        <appender-ref ref="FILE"/>
    </logger>
</configuration>
```

## 三、configuration标签

`configuration`节点主要包含`appdender`、`logger`、`root`三个标签，`configuration`标签的属性如下：

- scan: 当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
- scanPeriod: 设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。
- debug: 当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。

## 四、logger标签

`logger`是`configuration`的子节点，用来设置某一个包或者具体的某一个类的日志打印级别、以及指定`appender`。`logger`仅有一个`name`属性，一个可选的`level`和一个可选的`addtivity`属性。

- name: 用来指定受此logger约束的某一个包或者具体的某一个类。
- level: 用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，还有一个特殊值INHERITED或者同义词NULL，代表强制执行上级的级别。如果未设置此属性，那么当前logger将会继承上级的级别。
- addtivity: 是否向上级logger传递打印信息。默认是true。如果存在重复打印问题，可以设置addtivity=false解决。

logger可以包含零个或多个appender-ref元素，标识这个appender将会添加到这个logger。

## 五、root标签

`root`也是`logger`元素，但是它是根`logger`。只有一个`level`属性，因为已经被命名为`root`，所以不需要`name`属性。

level: 用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，不能设置为INHERITED或者同义词NULL。默认是DEBUG。

root可以包含零个或多个appender-ref元素，标识这个appender将会添加到这个logger。

## 六、appender标签

appender有两个必要属性name和class，name指定appender名称，class指定appender的全限定名。另一个属性encoder：负责两件事，一是把日志信息转换成字节数组，二是把字节数组写入到输出流。目前PatternLayoutEncoder 是唯一有用的且默认的encoder，有一个节点，用来设置日志的输入格式，使用“%”加“转换符”方式。

```xml
<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
  <pattern>%yellow(%d{yyyy-MM-dd HH:mm:ss}) %red([%thread]) %highlight(%-5level) %cyan(%logger{50}) - %magenta(%msg) %n</pattern>
  <charset>UTF-8</charset>
</encoder>
```

- %d表示日期
- %thread表示线程名
- %-5level表示级别从左显示5个字符宽度
- %msg是日志消息
- %n是换行符

如果要输出“%”则必须用“\”对“%”进行转义

下面介绍几种常用的appender。

### 6.1 ConsoleAppender

把日志输出到控制台，有以下子节点：

`<encoder>`：对日志进行格式化,上面已介绍；

`<target>`：字符串`System.out`或者`System.err`，默认`System.out`；

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false">
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!--格式化输出：%d表示日期，%thread表示线程名，%highlight()高亮显示，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %highlight(%-5level) [%logger{15}:%line] - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 日志输出级别 -->
    <root level="error">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### 6.2 FileAppender

把日志添加到文件，有以下子节点：

`<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。

`<append>`：如果是`true`，日志被追加到文件结尾，如果是`false`，清空现存文件，默认是`true`。

`<encoder>`：对记录事件进行格式化。

`<prudent>`：如果是`true`，日志会被安全的写入文件，即使其他的FileAppender也在向此文件做写入操作，效率低，默认是`false`。

```xml
<configuration>  
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">  
    <file>testFile.log</file>  
    <append>true</append>  
    <encoder>  
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>  
    </encoder>  
  </appender>  
          
  <root level="DEBUG">  
    <appender-ref ref="FILE" />  
  </root>  
</configuration>  
```

### 6.3 RollingFileAppender

滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件。这个是最常用的！

有以下子节点：

`<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。

`<filter>`: 表示过滤器，用法稍后讲解。

`<append>`：如果是 true，日志被追加到文件结尾，如果是`false`，清空现存文件，默认是`true`。

`<encoder>`：对记录日志进行格式化。

`<rollingPolicy>`: 当发生滚动时，决定 RollingFileAppender的行为，涉及文件移动和重命名。

`<triggeringPolicy >`: 告知RollingFileAppender何时激活滚动。

`<prudent>`：当为true时，不支持FixedWindowRollingPolicy。支持TimeBasedRollingPolicy，但是有两个限制，1.不支持也不允许文件压缩，2.不能设置file属性，必须留空

#### 6.3.1 FixedWindowRollingPolicy

根据固定窗口算法重命名文件的滚动策略。有以下子节点：

minIndex: 窗口索引最小值
maxIndex: 窗口索引最大值，当用户指定的窗口过大时，会自动将窗口设置为12。
fileNamePattern :必须包含“%i”例如，假设最小值和最大值分别为1和2，命名模式为 mylog%i.log,会产生归档文件mylog1.log和mylog2.log。还可以指定文件压缩选项，例如，mylog%i.log.gz 或者 没有log%i.log.zip。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>test.log</file>

    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
      <fileNamePattern>tests.%i.log.zip</fileNamePattern>
      <minIndex>1</minIndex>
      <maxIndex>3</maxIndex>
    </rollingPolicy>

    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>5MB</maxFileSize>
    </triggeringPolicy>

    <encoder>
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
        
  <root level="DEBUG">
    <appender-ref ref="FILE" />
  </root>
</configuration>
```

#### 6.3.2 triggeringPolicy

如果当前活动文件的大小超过指定大小会触发当前活动文件滚动。只有一个节点:`<maxFileSize>`，当前活动日志文件的大小，默认值是10MB。

```xml
<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
    <MaxFileSize>25MB</MaxFileSize>
</triggeringPolicy>
```

#### 6.3.3 TimeBasedRollingPolicy

根据时间的滚动策略，既负责滚动也负责触发滚动。有以下子节点：

fileNamePattern 必要节点，文件名必须包含`%d`转换符，`%d`可以包含一个 java.text.SimpleDateFormat指定的时间格式，如：`%d{yyyy-MM}`,如果直接使用`%d`，默认格式是`yyyy-MM-dd`。RollingFileAppender的file子节点可有可无，通过设置file，可以为活动文件和归档文件指定不同位置，当前日志总是记录到file指定的文件（活动文件），活动文件的名字不会改变；如果没设置file，活动文件的名字会根据fileNamePattern 的值，每隔一段时间改变一次。“/”或者“\”会被当做目录分隔符。
maxHistory 可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每个月滚动，且`<maxHistory>`是6，则只保存最近6个月的文件，删除之前的旧文件。注意，删除旧文件时，那些为了归档而创建的目录也会被删除。

```xml
<appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <FileNamePattern>d://log/business.log.%d.log</FileNamePattern>
        <maxHistory>30</maxHistory>
    </rollingPolicy>

    <encoder>
        <pattern>%d{yyyy-MM-dd'T'HH:mm:ss.SSSXXX} - %msg%n</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>

<logger name="com.z7.springcloud.service" level="INFO" additivity="false">
    <appender-ref ref="file" />
</logger>
```

#### 6.3.4 SizeAndTimeBasedRollingPolicy

最常用的滚动策略，根据时间再根据文件大小来滚动生成文件，例如：

```xml
<!--当前项目的目录下-->
<property name="LOG_HOME" value="logs/cloud" />
<appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">

    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
        <!-- rollover daily -->
        <fileNamePattern>${LOG_HOME}/mylog-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
        <!-- 每个文件最多5MB，保存60天的历史记录，但最多20GB -->
        <maxFileSize>5MB</maxFileSize>
        <maxHistory>60</maxHistory>
        <totalSizeCap>20GB</totalSizeCap>
    </rollingPolicy>

    <encoder>
        <pattern>%d{yyyy-MM-dd'T'HH:mm:ss.SSSXXX} - %msg%n</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>
```

## 七、filter

过滤器，执行一个过滤器会有返回个枚举值，即DENY，NEUTRAL，ACCEPT其中之一。

> 返回DENY，日志将立即被抛弃不再经过其他过滤器； 返回NEUTRAL，有序列表里的下个过滤器过接着处理日志； 返回ACCEPT，日志会被立即处理，不再经过剩余过滤器。

过滤器被添加到`<Appender>`中，为`<Appender>`添加一个或多个过滤器后，可以用任意条件对日志进行过滤。`<Appender>`有多个过滤器时，按照配置顺序执行。

下面是几个常用的过滤器：

### 7.1 ThresholdFilter

临界值过滤器，过滤掉低于指定临界值的日志。当日志级别等于或高于临界值时，过滤器返回NEUTRAL；当日志级别低于临界值时，日志会被拒绝。

例如：过滤掉所有低于INFO级别的日志。

```xml
<configuration>   
  <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">   
    <!-- 过滤掉 TRACE 和 DEBUG 级别的日志-->   
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">   
      <level>INFO</level>   
    </filter>   

    <encoder>   
      <pattern>   
        %-4relative [%thread] %-5level %logger{30} - %msg%n   
      </pattern>   
    </encoder>  
  </appender>   

  <root level="DEBUG">   
    <appender-ref ref="CONSOLE" />   
  </root>   
</configuration>
```

### 7.2 LevelFilter

级别过滤器，根据日志级别进行过滤。如果日志级别等于配置级别，过滤器会根据onMath 和 onMismatch接收或拒绝日志。有以下子节点：

`<level>`:设置过滤级别

`<onMatch>`:用于配置符合过滤条件的操作

`<onMismatch>`:用于配置不符合过滤条件的操作

例如：将过滤器的日志级别配置为INFO，所有INFO级别的日志交给appender处理，非INFO级别的日志，被过滤掉。

```xml
<configuration>   
  <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">   
    <filter class="ch.qos.logback.classic.filter.LevelFilter">   
      <level>INFO</level>   
      <onMatch>ACCEPT</onMatch>   
      <onMismatch>DENY</onMismatch>   
    </filter>   

    <encoder>   
      <pattern>   
        %-4relative [%thread] %-5level %logger{30} - %msg%n   
      </pattern>   
    </encoder>   
  </appender>   

  <root level="DEBUG">   
    <appender-ref ref="CONSOLE" />   
  </root>   
</configuration>  
```

## 参考文献

- <http://logback.qos.ch/>
- <https://zhuanlan.zhihu.com/p/474844021>
