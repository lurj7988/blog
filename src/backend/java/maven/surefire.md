---
title: surefire
icon: markdown
order: 1
date: 2023-05-31
category:
  - 后端技术
tag:
  - maven-plugin
---


## About Apache Maven Surefire

[Surefire] is a test framework project. This is the aggregator POM in [Apache Maven Surefire] project.

## Project Documentation

Usage of [maven-surefire-plugin], [maven-failsafe-plugin], [maven-surefire-report-plugin]

### maven-surefire-plugin

Best practice is to define the version of the Surefire Plugin that you want to use in either your pom.xml or a parent `pom.xml`:

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
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
  [...]
</project>
```

The Surefire Plugin can be invoked by calling the `test` phase of the build lifecycle.

```shell
mvn test
```

And more parameters in [SurefirePlugin.java](https://github.com/apache/maven-surefire/blob/master/maven-surefire-plugin/src/main/java/org/apache/maven/plugin/surefire/SurefirePlugin.java)

### maven-failsafe-plugin

To use the Failsafe Plugin, you need to add the following configuration to your `pom.xml`:

```xml
<project>
  [...]
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-failsafe-plugin</artifactId>
        <version>2.22.2</version>
        <executions>
          <execution>
            <goals>
              <goal>integration-test</goal>
              <goal>verify</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
  [...]
</project>
```

The Failsafe Plugin can be invoked by calling the `verify` phase of the build lifecycle.

```shell
mvn verify
```

And more parameters in [VerifyMojo.java](https://github.com/apache/maven-surefire/blob/master/maven-failsafe-plugin/src/main/java/org/apache/maven/plugin/failsafe/VerifyMojo.java)

### maven-surefire-report-plugin

To generate the Surefire report as part of the site generation, add the following in the `<reporting>` section of your POM:

```xml
<project>
  ...
  <reporting>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-report-plugin</artifactId>
        <version>3.1.0</version>
      </plugin>
    </plugins>
  </reporting>
  ...
</project>
```

The plugin can also generate the report using its standalone goal:

```shell
mvn surefire-report:report
mvn surefire-report:report -DlinkXRef=false -Daggregate=true
```

And more parameters in [SurefireReportMojo.java](https://github.com/apache/maven-surefire/blob/master/maven-surefire-report-plugin/src/main/java/org/apache/maven/plugins/surefire/report/SurefireReportMojo.java)

A HTML report should be generated in `${basedir}/target/site/surefire-report.html`.

## FAQ

> Question：Why `test` is called during `mvn surefire-report:report` execution and `test` fails without interruption?

::: info Answer

The [maven-surefire-report-plugin] define the test phase in [lifecycle.xml](https://github.com/apache/maven-surefire/blob/master/maven-surefire-report-plugin/src/main/resources/META-INF/maven/lifecycle.xml), and set the parameter `testFailureIgnore` to "true" to ignore a failure during testing. Its use is NOT RECOMMENDED, but quite convenient onoccasion.

```xml
<lifecycles>
  <lifecycle>
    <id>surefire</id>
    <phases>
      <phase>
        <id>test</id>
        <configuration>
          <testFailureIgnore>true</testFailureIgnore>
        </configuration>
      </phase>
    </phases>
  </lifecycle>
</lifecycles>
```

:::

> Question：crashed tests - unit tests with large logging output does not produce surefire report?

::: info Description

Upon upgrading our maven-surefire-plugin from version 2.15 to version 2.21.0.  We noticed that the number of tests being run by our jenkins test job changed.  Upon further investigation we found a test class with 7 test cases that were not being reported at all (not as passed, failed, or skipped).  

When we ran just that test class from the command line it failed with

```txt
[2023-06-06 10:17:14.877] [ERROR] There are test failures.
[2023-06-06 10:17:14.877] 
[2023-06-06 10:17:14.877] Please refer to /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test/target/surefire-reports for the individual test results.
[2023-06-06 10:17:14.877] Please refer to dump files (if any exist) [date].dump, [date]-jvmRun[N].dump and [date].dumpstream.
[2023-06-06 10:17:14.877] The forked VM terminated without properly saying goodbye. VM crash or System.exit called?
[2023-06-06 10:17:14.877] Command was /bin/sh -c cd /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test && /opt/jdk8u312-b07/jre/bin/java -jar /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test/target/surefire/surefirebooter7106199231689045505.jar /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test/target/surefire 2023-06-06T10-16-01_649-jvmRun1 surefire2911789998602964175tmp surefire_02965824114494373512tmp
[2023-06-06 10:17:14.877] Process Exit Code: 0
[2023-06-06 10:17:14.877] org.apache.maven.surefire.booter.SurefireBooterForkException: The forked VM terminated without properly saying goodbye. VM crash or System.exit called?
[2023-06-06 10:17:14.877] Command was /bin/sh -c cd /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test && /opt/jdk8u312-b07/jre/bin/java -jar /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test/target/surefire/surefirebooter7106199231689045505.jar /var/lib/jenkins/workspace/418dacbd-ef8f-4643-b85d-9164c014bf60/epoint-financeproduct-test/target/surefire 2023-06-06T10-16-01_649-jvmRun1 surefire2911789998602964175tmp surefire_02965824114494373512tmp
[2023-06-06 10:17:14.877] Process Exit Code: 0
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.booterclient.ForkStarter.fork(ForkStarter.java:669)
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.booterclient.ForkStarter.run(ForkStarter.java:282)
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.booterclient.ForkStarter.run(ForkStarter.java:245)
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.AbstractSurefireMojo.executeProvider(AbstractSurefireMojo.java:1183)
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.AbstractSurefireMojo.executeAfterPreconditionsChecked(AbstractSurefireMojo.java:1011)
[2023-06-06 10:17:14.877]   at org.apache.maven.plugin.surefire.AbstractSurefireMojo.execute(AbstractSurefireMojo.java:857)
```

but did not produce any output in the target/surefire-reports directory explaining why the failures were not reported in the jobs test report.  Trying different maven-surefire-plugin versions the tests pass successfully with version 2.19.1, but fail with every version tried between 2.20 and 3.0.0-M5.  Note we run our tests with these options:

`<reuseForks>false</reuseForks>`

`<forkCount>1</forkCount>`

`<reportFormat>xml</reportFormat>`

I also noticed that the tests in question did produce a lot of logging output.  I found that the tests would pass if I added the configuration option:

`<redirectTestOutputToFile>true</redirectTestOutputToFile>`

I have reproduced the problem with a simpler test module that is attached.  Upon playing with the output in this module the issue appears to happen when the output is about 1.2MB or higher.

Not sure what changed between version 2.19.1 and 2.20 with how output from the forked jvm is collected but it appear to have a problem if there is too much output.  If the tests were being reported as failed then this issue would not be a huge problem, but having tests just not be reported because their output grows is a critical issue for us as we may not notice that the test has effectively been dropped from our test suite, unless we closely audit the ~30000 test cases we run every run to detect missing tests which is hard to do as new tests are constantly being added.

:::

::: info Answer

Here is an official [issue](https://issues.apache.org/jira/browse/SUREFIRE-1628) for this problem.

:::

::: info Solution

Add the following configuration to your `pom.xml`:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.22.2</version>
  <configuration>
    <redirectTestOutputToFile>true</redirectTestOutputToFile>
  </configuration>
</plugin>
```

OR

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>3.1.0</version>
</plugin>
```

:::

> Question：How to translate the Surefire report into another language?

::: info Answer

`@since 3.1.0`[@see](https://github.com/apache/maven-surefire/blob/master/maven-surefire-report-plugin/src/main/java/org/apache/maven/plugins/surefire/report/AbstractSurefireReportMojo.java)The Surefire Report Plugin supports internationalization. The default language is English. To translate the report into another language, you need to create a custom resource bundle and configure the plugin to use it.

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-report-plugin</artifactId>
  <version>3.1.0</version>
  <configuration>
    <customBundle>src/site/custom/surefire-report_cn.properties</customBundle>
  </configuration>
</plugin>
```

The Content of `src/site/custom/surefire-report_cn.properties` is as follows:

```properties
report.surefire.name=\u5355\u5143\u6d4b\u8bd5
report.surefire.description=\u62a5\u544a\u9879\u76ee\u7684\u6d4b\u8bd5\u7ed3\u679c\u3002
report.surefire.title=\u5355\u5143\u6d4b\u8bd5\u62a5\u544a

report.surefire.label.summary=\u603b\u7ed3
report.surefire.label.tests=\u6d4b\u8bd5\u6570\u91cf
report.surefire.label.errors=\u9519\u8bef\u6570\u91cf
report.surefire.label.failures=\u5931\u8d25\u6570\u91cf
report.surefire.label.skipped=\u8df3\u8fc7\u6570\u91cf
report.surefire.label.successrate=\u6210\u529f\u7387
report.surefire.label.time=\u8017\u65f6
report.surefire.label.packagelist=\u5305\u540d\u6e05\u5355
report.surefire.label.package=\u5305\u540d
report.surefire.label.class=\u7c7b\u540d
report.surefire.label.testcases=\u6d4b\u8bd5\u7528\u4f8b
report.surefire.label.failuredetails=\u6545\u969c\u8be6\u60c5
report.surefire.text.note1=\u6ce8\u610f\uff1a\u5931\u8d25\u662f\u9884\u671f\u7684\uff0c\u5e76\u4f7f\u7528\u65ad\u8a00\u8fdb\u884c\u68c0\u67e5\uff0c\u800c\u9519\u8bef\u662f\u610f\u5916\u7684\u3002
report.surefire.text.note2=\u6ce8\u610f\uff1a\u5305\u7edf\u8ba1\u6570\u636e\u4e0d\u662f\u9012\u5f52\u8ba1\u7b97\u7684\uff0c\u5b83\u4eec\u53ea\u662f\u603b\u7ed3\u4e86\u6240\u6709\u7684\u6d4b\u8bd5\u5957\u4ef6\u6570\u91cf\u3002

report.failsafe.name=\u6545\u969c\u4fdd\u9669
report.failsafe.description=\u62a5\u544a\u9879\u76ee\u7684\u96c6\u6210\u6d4b\u8bd5\u7ed3\u679c\u3002
report.failsafe.title=\u6545\u969c\u4fdd\u9669\u62a5\u544a
```

:::

[Surefire]: https://maven.apache.org/surefire/
[Apache Maven Surefire]: https://github.com/apache/maven-surefire
[maven-surefire-plugin]: https://maven.apache.org/surefire/maven-surefire-plugin/usage.html
[maven-failsafe-plugin]: https://maven.apache.org/surefire/maven-failsafe-plugin/usage.html
[maven-surefire-report-plugin]: https://maven.apache.org/surefire/maven-surefire-report-plugin/usage.html
