---
title: surefire
icon: markdown
order: 1
date: 2023-05-31
category:
  - 测试运维
tag:
  - test
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

1. Q：Why `test` is called during `mvn surefire-report:report` execution and `test` fails without interruption?

A: The [maven-surefire-report-plugin] define the test phase in [lifecycle.xml](https://github.com/apache/maven-surefire/blob/master/maven-surefire-report-plugin/src/main/resources/META-INF/maven/lifecycle.xml), and set the parameter `testFailureIgnore` to "true" to ignore a failure during testing. Its use is NOT RECOMMENDED, but quite convenient onoccasion.

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

[Surefire]: https://maven.apache.org/surefire/
[Apache Maven Surefire]: https://github.com/apache/maven-surefire
[maven-surefire-plugin]: https://maven.apache.org/surefire/maven-surefire-plugin/usage.html
[maven-failsafe-plugin]: https://maven.apache.org/surefire/maven-failsafe-plugin/usage.html
[maven-surefire-report-plugin]: https://maven.apache.org/surefire/maven-surefire-report-plugin/usage.html
