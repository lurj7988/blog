---
title: tomcat embed
icon: markdown
order: 1
date: 2023-06-28
category:
  - 后端技术
tag:
  - spring
---

众所周知`springboot`通过`Fatjar`运行时内嵌了`tomcat`，那么`tomcat`是如何启动的，又是如何调整`tomcat`启动参数的，我们来一探究竟。

## ServletWebServerApplicationContext

```java
@Override
protected void onRefresh() {
    super.onRefresh();
    try {
        createWebServer();//创建web服务
    }
    catch (Throwable ex) {
        throw new ApplicationContextException("Unable to start web server", ex);
    }
}

private void createWebServer() {
    WebServer webServer = this.webServer;
    ServletContext servletContext = getServletContext();
    if (webServer == null && servletContext == null) {
        StartupStep createWebServer = this.getApplicationStartup().start("spring.boot.webserver.create");
        ServletWebServerFactory factory = getWebServerFactory();//获取TomcatServletWebServerFactory
        createWebServer.tag("factory", factory.getClass().toString());
        this.webServer = factory.getWebServer(getSelfInitializer());//获取WebServer
        createWebServer.end();
        getBeanFactory().registerSingleton("webServerGracefulShutdown",
                new WebServerGracefulShutdownLifecycle(this.webServer));
        getBeanFactory().registerSingleton("webServerStartStop",
                new WebServerStartStopLifecycle(this, this.webServer));
    }
    else if (servletContext != null) {
        try {
            getSelfInitializer().onStartup(servletContext);
        }
        catch (ServletException ex) {
            throw new ApplicationContextException("Cannot initialize servlet context", ex);
        }
    }
    initPropertySources();
}
```

## TomcatServletWebServerFactory

```java
@Override
public WebServer getWebServer(ServletContextInitializer... initializers) {
    ...
    prepareContext(tomcat.getHost(), initializers);//准备上下文
    return getTomcatWebServer(tomcat);
}

protected void prepareContext(Host host, ServletContextInitializer[] initializers) {
    ...
    configureContext(context, initializersToUse);//配置上下文
    ...
}

protected void configureContext(Context context, ServletContextInitializer[] initializers) {
    TomcatStarter starter = new TomcatStarter(initializers);//创建tomcat启动类
    if (context instanceof TomcatEmbeddedContext) {
        TomcatEmbeddedContext embeddedContext = (TomcatEmbeddedContext) context;
        embeddedContext.setStarter(starter);
        embeddedContext.setFailCtxIfServletStartFails(true);
    }
    context.addServletContainerInitializer(starter, NO_CLASSES);
    ...
}
```