---
title: jacoco
icon: markdown
order: 3
date: 2023-06-29
category:
  - 后端技术
tag:
  - maven
---

[JaCoCo](https://github.com/jacoco/jacoco) is a free code coverage library for Java, which has been created by the EclEmma team based on the lessons learned from using and integration existing libraries for many years.

Check the [project homepage](https://www.jacoco.org/jacoco/) for downloads, documentation and feedback.

<!-- more -->

## 配置

```xml
<project>
  [...]
  <build>
    <pluginManagement>
      <plugins>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.10</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>report</id>
                        <phase>test</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
      </plugins>
    </pluginManagement>
  </build>
  [...]
</project>
```

## 原理

jacoco插件在启动时会先调用`prepare-agent`目标，该目标会在`target`目录下生成`jacoco.exec`文件，该文件是二进制文件，需要通过`report`目标生成html报告。`report`默认路径为`target/site/jacoco`，通过参数`${project.reporting.outputDirectory}/jacoco`控制，可以通过配置`<outputDirectory>`修改。

## AgentMojo

```java
@Override
public void executeMojo() {
    final String name = getEffectivePropertyName();//可以通过配置<propertyName>修改
    final Properties projectProperties = getProject().getProperties();
    final String oldValue = projectProperties.getProperty(name);
    final String newValue = createAgentOptions()
            .prependVMArguments(oldValue, getAgentJarFile());//生成javaagent参数
    //示例：jacoco.agent.argLine set to -javaagent:xxxx/jacocoagent.jar=destfile=xxxx/jacoco.exec
    getLog().info(name + " set to " + newValue);
    projectProperties.setProperty(name, newValue);
}
```

## FAQ

> Question：Skipping JaCoCo execution due to missing execution data file.

::: info Answer
如果`maven-surefire-plugin`插件配置了`<argLine>-Dfile.encoding=UTF-8</argLine>`则会影响`jacoco-maven-plugin`插件的执行`prepare-agent`生成的`javaagent`参数，导致`jacoco.exec`文件没有生成，从而报错。

解决办法：将`<propertyName>jacoco.agent.argLine</propertyName>`配置到`jacoco-maven-plugin`插件中，修改`javaagent`参数对应的参数名，并且在`maven-surefire-plugin`插件中配置`<argLine>-Dfile.encoding=UTF-8 ${jacoco.agent.argLine}</argLine>`。

```xml
<project>
  [...]
  <build>
    <pluginManagement>
      <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.22.2</version>
                <configuration>
                    <argLine>-Dfile.encoding=UTF-8 ${jacoco.agent.argLine}</argLine>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.10</version>
                <configuration>
                    <propertyName>jacoco.agent.argLine</propertyName>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>report</id>
                        <phase>test</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
      </plugins>
    </pluginManagement>
  </build>
  [...]
</project>
```

源码详解`maven-surefire-plugin`插件的`argLine`参数：

```java
/**
 * Arbitrary JVM options to set on the command line.
 * <br>
 * <br>
 * Since the Version 2.17 using an alternate syntax for {@code argLine}, <b>@{...}</b> allows late replacement
 * of properties when the plugin is executed, so properties that have been modified by other plugins will be picked
 * up correctly.
 * See the Frequently Asked Questions page with more details:<br>
 * <a href="http://maven.apache.org/surefire/maven-surefire-plugin/faq.html">
 *     http://maven.apache.org/surefire/maven-surefire-plugin/faq.html</a>
 * <br>
 * <a href="http://maven.apache.org/surefire/maven-failsafe-plugin/faq.html">
 *     http://maven.apache.org/surefire/maven-failsafe-plugin/faq.html</a>
 *
 * @since 2.1
 */
@Parameter( property = "argLine" )
private String argLine;
```

`maven-surefire-plugin`在执行`test`过程中会`fork`一个`jvm`进程，通过`argLine`增加额外的启动参数，如果`jacoco-maven-plugin`不修改`javaagent`参数对应的名称，则默认为`argLine`，这样会与`maven-surefire-plugin`插件的`argLine`参数冲突，导致`maven-surefire-plugin`插件的`argLine`参数覆盖`jacoco-maven-plugin`插件的`argLine`参数，从而导致`jacoco.exec`文件没有生成。

所以需要通过`<propertyName>`修改`javaagent`参数对应的名称，如`jacoco.agent.argLine`。并且在`maven-surefire-plugin`插件中配置`<argLine>-Dfile.encoding=UTF-8 ${jacoco.agent.argLine}</argLine>`，这样`maven-surefire-plugin`插件的`argLine`参数就会带上`javaagent`参数，`jvm`启动参数就会变成`-Dfile.encoding=UTF-8 -javaagent:xxxx/jacocoagent.jar=destfile=xxxx/jacoco.exec`，这样`jacoco.exec`文件就会生成，从而解决此问题。

:::
