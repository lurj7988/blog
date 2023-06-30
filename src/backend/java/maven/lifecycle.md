---
title: lifecycle
icon: markdown
order: 1
date: 2023-05-26
category:
  - 后端技术
tag:
  - maven
---

[Maven](https://maven.apache.org/)的生命周期就是为了对所有的构建过程进行抽象和统一。在大量项目的构建过程中，Maven总结出了一套高度完善的，易于扩展的生命周期，包括项目的清理，初始化，编译，测试，打包，集成测试，验证，部署和生成站点等构建步骤。在我们日常的maven使用中，一条条简单的命令，`mvn clean`, `mvn package`等都是在执行Maven的某个生命周期阶段。

`Maven`提供了三套独立的生命周期：`default`,`clean`,和`site`，接下来我们分别介绍三套生命周期。

<!-- more -->

## default生命周期

default生命周期定义了真正构建项目中需要执行的所有步骤，它包含的阶段如下：

```xml
<phases>
  <phase>validate</phase>
  <phase>initialize</phase>
  <phase>generate-sources</phase>
  <phase>process-sources</phase>
  <phase>generate-resources</phase>
  <phase>process-resources</phase>
  <phase>compile</phase>
  <phase>process-classes</phase>
  <phase>generate-test-sources</phase>
  <phase>process-test-sources</phase>
  <phase>generate-test-resources</phase>
  <phase>process-test-resources</phase>
  <phase>test-compile</phase>
  <phase>process-test-classes</phase>
  <phase>test</phase>
  <phase>prepare-package</phase>
  <phase>package</phase>
  <phase>pre-integration-test</phase>
  <phase>integration-test</phase>
  <phase>post-integration-test</phase>
  <phase>verify</phase>
  <phase>install</phase>
  <phase>deploy</phase>
</phases>
```

default生命周期是在没有任何插件绑定的情况下定义的；插件绑定在`META-INF/plexus/default-bindings.xml`中单独定义，因为它们特定于每个包装：

- [Plugin bindings for pom packaging](#plugin-bindings-for-pom-packaging)
- [Plugin bindings for jar packaging](#plugin-bindings-for-jar-packaging)
- [Plugin bindings for ejb packaging](#plugin-bindings-for-ejb-packaging)
- [Plugin bindings for maven-plugin packaging](#plugin-bindings-for-maven-plugin-packaging)
- [Plugin bindings for war packaging](#plugin-bindings-for-war-packaging)
- [Plugin bindings for ear packaging](#plugin-bindings-for-ear-packaging)
- [Plugin bindings for rar packaging](#plugin-bindings-for-rar-packaging)

### Plugin bindings for pom packaging

```xml
<phases>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for jar packaging

```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:compile
  </compile>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test
  </test>
  <package>
    org.apache.maven.plugins:maven-jar-plugin:3.3.0:jar
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for ejb packaging

```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:compile
  </compile>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test
  </test>
  <package>
    org.apache.maven.plugins:maven-ejb-plugin:3.2.1:ejb
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for maven-plugin packaging

```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:compile
  </compile>
  <process-classes>
    org.apache.maven.plugins:maven-plugin-plugin:3.7.1:descriptor
  </process-classes>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test
  </test>
  <package>
    org.apache.maven.plugins:maven-jar-plugin:3.3.0:jar,
    org.apache.maven.plugins:maven-plugin-plugin:3.7.1:addPluginArtifactMetadata
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for war packaging

```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:compile
  </compile>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test
  </test>
  <package>
    org.apache.maven.plugins:maven-war-plugin:3.3.2:war
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for ear packaging

```xml
<phases>
  <generate-resources>
    org.apache.maven.plugins:maven-ear-plugin:3.3.0:generate-application-xml
  </generate-resources>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <package>
    org.apache.maven.plugins:maven-ear-plugin:3.3.0:ear
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

### Plugin bindings for rar packaging

```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:compile
  </compile>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:3.3.0:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.10.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test
  </test>
  <package>
    org.apache.maven.plugins:maven-rar-plugin:3.0.0:rar
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:3.1.0:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:3.1.0:deploy
  </deploy>
</phases>
```

此处我们注意下`install`生命周期阶段，若我们在当前的maven项目中执行`mvn install`，那么将执行`validate`到`install`的所有生命周期阶段，结果就是将我们当前的项目打包并且安装在了本地仓库。

但是install插件还有一个目标`install-file`该插件目标可以将我们普通Java项目到处的jar包安装到本地仓库。举例如下：

```sh
mvn install:install-file -Dfile=testJar.jar -DgroupId=com.jar -DartifactId=mainywq -Dversion=1.0-SNAPSHOT -Dpackaging=jar  
```

::: info 举例
`mvn test`就是在调用default生命周期的test阶段，实际执行了validate到test阶段之间的所有阶段

`mvn clean package`就是在调用clean生命周期的clean阶段和default生命周期的package阶段，实际执行了pre-clean和clean阶段和default生命周期validate到package阶段之间的所有阶段

`mvn clean install`和`mvn clean deploy`所调用的生命周期阶段请各位自行分析
:::

## clean生命周期

clean生命周期的目的是清理项目，删除前一次构建在target文件夹下生成的各个Jar包等，它包含以下三个阶段：

```xml
<phases>
  <phase>pre-clean</phase>
  <phase>clean</phase>
  <phase>post-clean</phase>
</phases>
<default-phases>
  <clean>
    org.apache.maven.plugins:maven-clean-plugin:3.2.0:clean
  </clean>
</default-phases>
```

::: info 举例
我们在命令行中输入： `mvn clean`就是在调用clean生命周期的clean阶段，实际执行了pre-clean和clean阶段。
:::

## site生命周期

site生命周期的目的是建立和发布项目站点，Maven可以给予pom所包含的信息，生成一个站点，方便团队交流和发布项目信息，其生命周期阶段包含：

```xml
<phases>
  <phase>pre-site</phase>
  <phase>site</phase>
  <phase>post-site</phase>
  <phase>site-deploy</phase>
</phases>
<default-phases>
  <site>
    org.apache.maven.plugins:maven-site-plugin:3.12.1:site
  </site>
  <site-deploy>
    org.apache.maven.plugins:maven-site-plugin:3.12.1:deploy
  </site-deploy>
</default-phases>
```
