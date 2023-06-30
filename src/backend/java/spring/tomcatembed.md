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

## 前言

众所周知`springboot`通过`Fatjar`运行时内嵌了`tomcat`，那么`tomcat`是如何启动的，又是如何调整`tomcat`启动参数的，我们来一探究竟。

- 内置Tomcat长什么样，它与原来的Tomcat有啥区别
- Springboot是如何使用的内置tomcat
- `DispatcherServlet`是如何加载到tomcat容器的

## 一、原来的Tomcat启动流程

> 1.运行`catalina.sh` `start`脚本最终会执行`Bootstrap`的`mian`方法

```sh
eval exec "\"$_RUNJDB\"" "\"$CATALINA_LOGGING_CONFIG\"" $LOGGING_MANAGER "$JAVA_OPTS" "$CATALINA_OPTS" \
        -D$ENDORSED_PROP="$JAVA_ENDORSED_DIRS" \
        -classpath "$CLASSPATH" \
        -sourcepath "$CATALINA_HOME"/../../java \
        -Dcatalina.base="$CATALINA_BASE" \
        -Dcatalina.home="$CATALINA_HOME" \
        -Djava.io.tmpdir="$CATALINA_TMPDIR" \
        //这里会运行Bootstrap的main方法 并传入start参数
        org.apache.catalina.startup.Bootstrap "$@" start
    fi
```

> 2.执行Bootstrap的mian方法 构建Catalina对象 并执行其load和start方法

```java
//全局变量 用于保存Bootstrap实例
private static volatile Bootstrap daemon = null;
//全局变量 用于保存Catalina对象
private Object catalinaDaemon = null;

public static void main(String args[]) {
        synchronized (daemonLock) {
            if (daemon == null) {
                // Don't set daemon until init() has completed
                Bootstrap bootstrap = new Bootstrap();
                try {
                    //这里 构建Catalina对象并赋值给全局变量catalinaDaemon
                    bootstrap.init();
                } catch (Throwable t) {
                   ...
                }
                //这里初始化了全局变量
                daemon = bootstrap;
            } else {
               ...
            }

            try {
                    ...
                if (command.equals("start")) {
                    daemon.setAwait(true);
                    //本质是调用了Catalina对象的load方法
                    daemon.load(args);
                    //本质上是调用了Catalina的start方法
                    daemon.start();
                    ...
                } 
            } catch (Throwable t) {
                        ...
            }
        ...
}
 //构建Catalina对象并赋值给全局变量catalinaDaemon
 public void init() throws Exception {
    ...
    //通过反射构建Catalina对象
    Class<?> startupClass = catalinaLoader.loadClass("org.apache.catalina.startup.Catalina");
    Object startupInstance = startupClass.getConstructor().newInstance();
    ...
    //这里把Catalina对象赋予了全局变量catalinaDaemon
    catalinaDaemon = startupInstance;
}
//本质是调用了Catalina对象的load方法
private void load(String[] arguments) throws Exception {
        // Call the load() method
        String methodName = "load";
        ...
        Method method =
            catalinaDaemon.getClass().getMethod(methodName, paramTypes);
        //这里就是调用了Catalina对象的load方法
        method.invoke(catalinaDaemon, param);
}
//本质上是调用了Catalina的start方法
public void start() throws Exception {
      Method method = catalinaDaemon.getClass().getMethod("start", (Class [])null);
      method.invoke(catalinaDaemon, (Object [])null);
}
```

> 3.Catalina的load方法

```java
//全局变量Server对象 该对象通过解析server.xml生成
protected Server server = null;

public void load() {
    ...
    // Parse main server.xml
    // 解析server.xml文件 初始化server对象
    parseServerXml(true);
    Server s = getServer()
    ...
    // Start the new server
    try {
        getServer().init();
    } catch (LifecycleException e) {
        ...
    }
    ...
}
```

server.xml的结构是一个4层嵌套的树状结构。一层也就是根节点是server元素，二层是service元素，三层是Engine元素，四层是Host元素。最终其被解析Server对象。该对象内部包含一组service对象，每个service对象包含一个Engine对象，每个Engine对象包含一组Host对象。

其实每个Host对象还对应一组Context对象也就是我们常说的Servlet容器，只是在server.xml文件中体现的比较隐晦。Host对象有一个属性叫做appBase，该属性的默认值是webapps，最终解析时会去Tomcat根目录下的webapps文件中找web.xml，找到一个就生成一个Context对象。

> 4.Catalina的start方法

```java
//本质上就是调用server的start方法
public void start() {
    ...
    // Start the new server
    try {
        getServer().start();
    } catch (LifecycleException e) {
        ...
    }
    ...
}
//返回全局变量server
public Server getServer() {
    return server;
}
```

这里蕴含这一个设计模式值得一提,通过load方法可以知道Server内部有一组service，每个service内部有一个Engine，每个Engine内部有一组host，每个host内部有一组context。这里提到的每一个对象都有init方法和start方法，在server的start方法被调用后需要执行其下每个service对象的init方法和start方法，当service的start方法被调用后需要执行其下Engine的init方法和start方法以此类推一直到调用完Context的init方法和start方法。Tomcat使用抽象模板的设计模式完成了该流程的实现。
首先看看抽象模板类LifecycleBase，上述提到的所有对象都继承该类，该类有4个主要方法，其中start是模板类的核心方法。

```java
public abstract class LifecycleBase implements Lifecycle {
    //抽象模板类提供的公共方法
    public final synchronized void init() throws LifecycleException {
        if (!state.equals(LifecycleState.NEW)) {
            invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
        }
        try {
            setStateInternal(LifecycleState.INITIALIZING, null, false);
            //该方法是一个抽象方法由子类完成实现
            //server类的实现方式  就是便利其内部的sercie对象 挨个调用其init方法
            //service类的实现方法 就是调用engine的 init方法
            //engine的实现方法 就是便利其内部的host对象 挨个调用其init方法
            //以此类推。。。
            initInternal();
            //这里会发生状态变更 防止重复init用的
            setStateInternal(LifecycleState.INITIALIZED, null, false);
        } catch (Throwable t) {
            handleSubClassException(t, "lifecycleBase.initFail", toString());
        }
    }
    //抽象模板类提供的公共方法
    public final synchronized void start() throws LifecycleException {
        if (state.equals(LifecycleState.NEW)) {
            //start方法中会先执行init方法
            init();
        } else if (state.equals(LifecycleState.FAILED)) {
             ...
        } else if (!state.equals(LifecycleState.INITIALIZED) &&
                !state.equals(LifecycleState.STOPPED)) {
             ...
        }
        ...
        try {
            setStateInternal(LifecycleState.STARTING_PREP, null, false);
            //该方法是一个抽象方法由子类完成实现
            //server类的实现方式 就是便利其内部的sercie对象 挨个调用其start方法
            //service类的实现方法 就是调用engine的 start方法
            //engine的实现方法 就是便利其内部的host对象 挨个调用其start方法
            //以此类推。。。
            startInternal();
            ...
        } catch (Throwable t) {
           ...
        }
    }

    //子类实现
    protected abstract void initInternal() throws LifecycleException;
    //子类实现
    protected abstract void startInternal() throws LifecycleException;

}
```

基于对LifecycleBase的4个方法的分析，我们看看当server的start方法被调用时会发生什么

1. server的start方法会调用其父类LifecycleBase的公共start方法
1. 接着会调用LifecycleBase的init方法
1. 接着会调用LifecycleBase的initInternal方法，该方法由子类server实现，便利其下的service对象挨个调用init方法
1. service对象的init方法是由父类LifecycleBase实现的，所以会执行LifecycleBase的init方法。这里有一个状态变更即元素的state状态由LifecycleState.NEW变成了LifecycleState.INITIALIZING防止在start方法中再次执行init方法
1. 以此类推最终所有元素的init方法会被调用并且状态变成了LifecycleState.INITIALIZING，最终又回到了server的start方法此时init方法已经执行完了
1. 继续向下走执行startInternal方法，该方法由子类server实现，便利其下的service对象挨个调用start方法
1. start方法由父类LifecycleBase实现的，所以会执行LifecycleBase的start方法，此时因为对象状态已经不是new状态了，init方法不会执行，继续执行startInternal方法，以此类推最终所有元素的start方法会被执行

最终各个元素的init和start方法都被执行了一遍

## 二、内嵌Tomcat

阿帕奇提供了一个类，名字就叫Tomcat。该类和Catalina类十分相似，内部也有一个Server对象并且提供了start方法，本质也是调用的server.start。接下来看看这个类

```java
public class Tomcat {
    //全局变量
    protected Server server;
    //启动方法
    public void start() throws LifecycleException {
        getServer();
        //本质是server的start方法
        server.start();
    }
    //重点在后边的这几个方法

    //获取server
    public Server getServer() {
        ...
        if (server != null) {
            return server;
        }
        //这里直接new对象了 不像Catalina那样需要解析server.xml文件
        server = new StandardServer();

        initBaseDir();
        ...
        //顺便为其创建了一个service对象
        Service service = new StandardService();
        service.setName("Tomcat");
        server.addService(service);
        return server;
    }
    //获取service 内部调用了getServer 一样的道理 没有就new
    public Service getService() {
        return getServer().findServices()[0];
    }
    //获取引擎 一样的逻辑 没有就new
    public Engine getEngine() {
        Service service = getServer().findServices()[0];
        if (service.getContainer() != null) {
            return service.getContainer();
        }
        Engine engine = new StandardEngine();
        engine.setName( "Tomcat" );
        engine.setDefaultHost(hostname);
        engine.setRealm(createDefaultRealm());
        service.setContainer(engine);
        return engine;
    }
    //获取host 同上没有就new
    public Host getHost() {
        Engine engine = getEngine();
        if (engine.findChildren().length > 0) {
            return (Host) engine.findChildren()[0];
        }

        Host host = new StandardHost();
        host.setName(hostname);
        getEngine().addChild(host);
        return host;
    }
}
```

最终可以发现内嵌Tomcat本质上和Catalina对象一样，都是通过初始化一个Server对象然后调用Server对象的start方法完成tomcat启动的。区别就是初始化Server的过程不在需要解析server.xml文件了，各种get就能完成初始化。

## 三、Springboot启动Tomcat的时机

springboot启动类的mian方法中会执行SpringApplication.run方法，该方法会创建并启动一个容器`AnnotationConfigServletWebServerApplicationContext`,容器启动会执行祖先类`AbstractApplicationContext`的refresh方法，该方法中的onRefresh方法被`AnnotationConfigServletWebServerApplicationContext`的父类`ServletWebServerApplicationContext`重写了，内置Tomcat就在onRefresh方法中被启动了。

### 3.1 ServletWebServerApplicationContext

```java
public class ServletWebServerApplicationContext extends GenericWebApplicationContext
        implements ConfigurableWebServerApplicationContext {
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
            //从spring容器中获取TomcatServletWebServerFactory如果没注入则直接进行注入
            ServletWebServerFactory factory = getWebServerFactory();
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
}
```

### 3.2 TomcatServletWebServerFactory

通过`ServletWebServerFactoryConfiguration`完成`TomcatServletWebServerFactory`注入，同时会注入一些个性化接口，这些接口会在`TomcatServletWebServerFactory`的构造器中被调用。个性化接口有：

1. `TomcatContextCustomizer`
1. `TomcatConnectorCustomizer`
1. `TomcatProtocolHandlerCustomizer`

最终会通过`TomcatServletWebServerFactory`工厂类构建`WebServer`对象，跟`getWebServer`方法

```java
public class TomcatServletWebServerFactory extends AbstractServletWebServerFactory
        implements ConfigurableTomcatWebServerFactory, ResourceLoaderAware {
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
        //此处的context是org.springframework.boot.web.embedded.tomcat.TomcatEmbeddedContext
        context.addServletContainerInitializer(starter, NO_CLASSES);
        ...
    }
}
```

工厂类中会创建`Tomcat`对象，并初始化其内部的`Server`对象。最终将`Tomcat`对象封装到`TomcatWebServer`中返回，接着看下`TomcatWebServer`的构造器

```java
public class TomcatWebServer implements WebServer {
    //用于封装Tomcat对象
    private final Tomcat tomcat;

    public TomcatWebServer(Tomcat tomcat, boolean autoStart, Shutdown shutdown) {
        Assert.notNull(tomcat, "Tomcat Server must not be null");
        //初始化Tomcat对象
        this.tomcat = tomcat;
        this.autoStart = autoStart;
        this.gracefulShutdown = (shutdown == Shutdown.GRACEFUL) ? new GracefulShutdown(tomcat) : null;
        //重点看这里 这里启动了Tomcat
        initialize();
    }
    //启动了Tomcat
    private void initialize() throws WebServerException {
        logger.info("Tomcat initialized with port(s): " + getPortsDescription(false));
        synchronized (this.monitor) {
            try {
                ...
                // Start the server to trigger initialization listeners
                this.tomcat.start();
                ...
            }
            catch (Exception ex) {
                ...
            }
        }
    }
}
```

到这里可以知道工厂类在构造WebServer之后，Tomcat就被启动了，这里就是内嵌Tomcat的启动时机。和原来相比，原来的启动类是Tomcat，再由Tomcat启动触发容器的创建和启动，而现在的启动类是容器，由容器启动触发了Tomcat的启动。

## 四、SpringBoot中的Tomcat如何加载Servlet

### 4.1 Servlet3.0标准可以不使用web.xml完成Servlet的注册

早期的项目一个web.xml文件最终被解析成一个Context对象【容器对象】，web.xml内部可以配置很多servlet，最终在解析完web.xml会将解析出来的servlet对象注册到容器中。而springboot项目中并没有web.xml文件，所以引发了一个问题。Servlet对象是如何被注册到Tomcat容器中的呢？
servlet3.0标准中提供了一个不用web.xml也能加载Servlet的方法。

::: info 需要三步

1. 写一个类实现`ServletContainerInitializer`接口
1. 实现`ServletContainerInitializer`接口的`onStartup`方法
1. 在`/META-INF/services`目录下创建`javax.servlet.ServletContainerInitializer`文件，将实现类的全名称写入到配置文件中
:::

实现完以上步骤,Tomcat启动后会回调实现类的onStartup方法，并将Servlet容器的装饰类【ServletContext】当作入参传入onStartup方法。看下ServletContext这个类的方法。

```java
public interface ServletContext {
    public ServletRegistration.Dynamic addServlet(String servletName, String className);
    public ServletRegistration.Dynamic addServlet(String servletName, Servlet servlet);
    public ServletRegistration.Dynamic addServlet(String servletName,
            Class<? extends Servlet> servletClass);
}
```

这个类有很多方法,其中新增servlet的就有3个重载方法。也就是说我们写的实现类在实现onStartup的方法中就可以调用ServletContext的addServlet方法完成Servlet的注册了。

### 4.2 SpringBoot中的ServletContainerInitializer的实现类

那么SpringBoot中的Tomcat就是用这个方式加载的Servlet吗？是也不全是。springboot确实搞了一个实现类`TomcatStarter`来实现`ServletContainerInitializer`接口并实现了onStartup方法。但是和web.xml文件一样`javax.servlet.ServletContainerInitializer`文件在springboot项目中也没有。其实与写`javax.servlet.ServletContainerInitializer`文件的方式相比还有一种更加简单粗暴的方式，在Context对象创建好后直接调用其`addServletContainerInitializer`方法将`ServletContainerInitializer`的实现类传进去。再次看下创建Context对象的地方。

```java
public class TomcatServletWebServerFactory extends AbstractServletWebServerFactory
        implements ConfigurableTomcatWebServerFactory, ResourceLoaderAware {

    //创建Servlet容器
    protected void prepareContext(Host host, ServletContextInitializer[] initializers) {
        File documentRoot = getValidDocumentRoot();
        //直接new了一个容器 该类是StandardContext的子类
        TomcatEmbeddedContext context = new TomcatEmbeddedContext();
        if (documentRoot != null) {
            context.setResources(new LoaderHidingResourceRoot(context));
        }
        ...
        ServletContextInitializer[] initializersToUse = mergeInitializers(initializers);
        //将容器放入host对象中
        host.addChild(context);
        //这个方法之前没根 这次下这个方法
        configureContext(context, initializersToUse);
        postProcessContext(context);
    }
    
    protected void configureContext(Context context, ServletContextInitializer[] initializers) {
        //创建了ServletContainerInitializer的实现类
        TomcatStarter starter = new TomcatStarter(initializers);
        ...
        //这里直接将其放入到了容器中
        context.addServletContainerInitializer(starter, NO_CLASSES);
        ...
    }
}
```

### 4.3 ServletContainerInitializer的实现类执行onStartup方法的时机

之前分析过`server.start`方法执行后各个元素的init、start、initInternal、startInternal都会被调用，Context对象也不例外。接着看下Context的startInternal方法。虽然我们的Context对象类型是`TomcatEmbeddedContext`，但是startInternal方法是由其父类`StandardContext`实现的。所以看下`StandardContext`类

```java
public class StandardContext extends ContainerBase implements Context, NotificationEmitter {
    //内部有一个集合 用于保存所有ServletContainerInitializer的实现类
    private Map<ServletContainerInitializer,Set<Class<?>>> initializers =
        new LinkedHashMap<>();
    //还记得这个方法吗TomcatEmbeddedContext就是通过该方法将TomcatStarter添加进来的
    public void addServletContainerInitializer(
            ServletContainerInitializer sci, Set<Class<?>> classes) {
        initializers.put(sci, classes);
    }
    //Tomcat启动时会执行该方法 这个方法巨长无比 我只把关键的保留了
    protected synchronized void startInternal() throws LifecycleException {
        //便利集合
        for (Map.Entry<ServletContainerInitializer, Set<Class<?>>> entry :
                initializers.entrySet()) {
                try {
                    //集合中的key就是ServletContainerInitializer的实现类 这里调用了onStartup方法
                    entry.getKey().onStartup(entry.getValue(),
                            //最后看下getServletContext方法，看看容器的装饰类到底是什么
                            getServletContext());
                } catch (ServletException e) {
                    log.error(sm.getString("standardContext.sciFail"), e);
                    ok = false;
                    break;
                }
        }
   }
   //这里可以知道容器最终把自己封装到了ApplicationContext对象中，
   //最终将ApplicationContext对象暴露给ServletContainerInitializer实现类
   public ServletContext getServletContext() {
        if (context == null) {
            context = new ApplicationContext(this);
            if (altDDName != null)
                context.setAttribute(Globals.ALT_DD_ATTR,altDDName);
        }
        return context.getFacade();
    }
}
```

也就是容器对象启动后，在执行其`startInternal`方法是会调用`ServletContainerInitializer`的实现类的onStartup方法并将容器对象的装饰类`ApplicationContext`当作入参传入onStartup方法。

### 4.4 分析TomcatStarter的onStartup方法

铺垫了那么多，我们看下TomcatStarter的onStartup方法

```java
class TomcatStarter implements ServletContainerInitializer {
    //一堆ServletContextInitializer接口的实现类
    private final ServletContextInitializer[] initializers;
    //构造器 初始化内部的initializers属性
    TomcatStarter(ServletContextInitializer[] initializers) {
        this.initializers = initializers;
    }
    //这个方法里没有任何servlet的添加操作，而是便利了initializers，并执行initializers每一个实例的onStartup方法，将servletContext当入参传入其中
    @Override
    public void onStartup(Set<Class<?>> classes, ServletContext servletContext) throws ServletException {
        try {
            for (ServletContextInitializer initializer : this.initializers) {
                initializer.onStartup(servletContext);
            }
        }
        catch (Exception ex) {
            ....
        }
    }
}
```

和想象中的不一样，`onStartup`方法中并没有添加servlet，而是将`ServletContext`对象再次传给了`ServletContextInitializer`的实现类去完成后续工作。为什么要这样做呢？其实原因很简单，到目前为止要想拿到`ServletContext`对象就必须实现`ServletContainerInitializer`接口。而`ServletContainerInitializer`接口并不是spring的类。所以spring搞了一个自己的接口`ServletContextInitializer`并且内部也有一个待实现的方法onStartup。spring想实现的目标是所有实现了`ServletContextInitializer`接口的bean都能拿到`ServletContext`对象。最终借助`TomcatStarter`类中的`onStartup`完成了实现。
大致看下实现过程，起点在`ServletWebServerApplicationContext`类中

```java
public class ServletWebServerApplicationContext extends GenericWebApplicationContext
        implements ConfigurableWebServerApplicationContext {

    //最终这个私有方法会被调用，可以看出如果TomcatStarter中的onStartup方法能调用到该方法，上述说的spirng目的就达成了
    private void selfInitialize(ServletContext servletContext) throws ServletException {
        prepareWebApplicationContext(servletContext);
        registerApplicationScope(servletContext);
        WebApplicationContextUtils.registerEnvironmentBeans(getBeanFactory(), servletContext);
        //这里拿到容器中所有实现了ServletContextInitializer接口的bean并依次执行其onStartup方法 入参是servletContext
        for (ServletContextInitializer beans : getServletContextInitializerBeans()) {
            beans.onStartup(servletContext);
        }
    }

    //ServletContextInitializer本身是一个@FunctionalInterface
    //这里将上述的私有方法封装成了一个ServletContextInitializer实例 很感慨既然还能这样干
    private org.springframework.boot.web.servlet.ServletContextInitializer getSelfInitializer() {
        return this::selfInitialize;
    }
    //还记得这个方法吗，这里通过factory完成了WebServer的创建，也就是tomcat启动的位置
    private void createWebServer() {
        WebServer webServer = this.webServer;
        ServletContext servletContext = getServletContext();
        if (webServer == null && servletContext == null) {
            ServletWebServerFactory factory = getWebServerFactory();
            //这里将ServletContextInitializer实例传入到了TomcatServletWebServerFactory中
            this.webServer = factory.getWebServer(getSelfInitializer());
            ...
        }
        ....
    }
}
```

上述可以看到spring用一种很诡异的方式将一个私有方法封装成了`ServletContextInitializer`实例并传给了`TomcatServletWebServerFactory`的getWebServer方法中，再次根下`TomcatServletWebServerFactory`类。这次主要看`ServletContextInitializer`实例的传递过程

```java
public class TomcatServletWebServerFactory extends AbstractServletWebServerFactory
        implements ConfigurableTomcatWebServerFactory, ResourceLoaderAware {
    //这里ServletContextInitializer实例被传入
    public WebServer getWebServer(ServletContextInitializer... initializers) {
        ...
        //被传入到该方法
        prepareContext(tomcat.getHost(), initializers);
        return getTomcatWebServer(tomcat);
    }

    protected void prepareContext(Host host, ServletContextInitializer[] initializers) {
        //这里做了依次封装 之前的ServletContextInitializer实例就在其中
        ServletContextInitializer[] initializersToUse = mergeInitializers(initializers);
        //根这里
        configureContext(context, initializersToUse);
        postProcessContext(context);
    }

    //做了一层扩展
    protected final ServletContextInitializer[] mergeInitializers(ServletContextInitializer... initializers) {
        List<ServletContextInitializer> mergedInitializers = new ArrayList<>();
        mergedInitializers.add((servletContext) -> this.initParameters.forEach(servletContext::setInitParameter));
        mergedInitializers.add(new SessionConfiguringInitializer(this.session));
        //被传入到mergedInitializers集合中
        mergedInitializers.addAll(Arrays.asList(initializers));
        mergedInitializers.addAll(this.initializers);
        //集合转数组
        return mergedInitializers.toArray(new ServletContextInitializer[0]);
    }


    //最终会将ServletContextInitializer传入TomcatStarter的构造函数，和之前说的完全对应上了
    protected void configureContext(Context context, ServletContextInitializer[] initializers) {
        TomcatStarter starter = new TomcatStarter(initializers);
        ...
    }
}
```

通过对TomcatStarter的onStartup方法的分析可以知道，所有实现了`ServletContextInitializer`接口的bean都能拿到ServletContext对象，完成servlet对象的添加

### 4.5 DispatcherServlet如何加载到Tomcat容器

springboot会自动装配springmvc，而springmvc的核心类就是`DispatcherServlet`。上边铺垫了那么多最终看看`DispatcherServlet`是如何加载到tomcat中的
首先看下自动装配类`DispatcherServletAutoConfiguration`

```java
...省略注解
public class DispatcherServletAutoConfiguration {
    ...省略注解
    protected static class DispatcherServletConfiguration {
        //这里创建了DispatcherServlet类
        @Bean(name = DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)
        public DispatcherServlet dispatcherServlet(WebMvcProperties webMvcProperties) {
            ...省略DispatcherServlet构造内容
            return dispatcherServlet;
        }
        ...

        ...省略注解
        protected static class DispatcherServletRegistrationConfiguration {
            ...省略注解
            //重点是这个类，上边的DispatcherServlet会被传入到该类中，最终由该类完成DispatcherServlet向Tomcat容器的注册
            public DispatcherServletRegistrationBean dispatcherServletRegistration(DispatcherServlet dispatcherServlet,
                    WebMvcProperties webMvcProperties, ObjectProvider<MultipartConfigElement> multipartConfig) {
                DispatcherServletRegistrationBean registration = new DispatcherServletRegistrationBean(dispatcherServlet,
                    webMvcProperties.getServlet().getPath());
            registration.setName(DEFAULT_DISPATCHER_SERVLET_BEAN_NAME);
            registration.setLoadOnStartup(webMvcProperties.getServlet().getLoadOnStartup());
            multipartConfig.ifAvailable(registration::setMultipartConfig);
            return registration;
            }
        }
    }
}
```

可以看到自动装配时向spring容器中注册了DispatcherServletRegistrationBean类，该类构造器中包含DispatcherServlet对象。看下DispatcherServletRegistrationBean类的家谱

可以看到该类实现了ServletContextInitializer接口也就是其能拿到Tomcat容器对象。看下其祖先类RegistrationBean的onStartup方法

```java
public abstract class RegistrationBean implements ServletContextInitializer, Ordered {
    public final void onStartup(ServletContext servletContext) throws ServletException {
        String description = getDescription();
        if (!isEnabled()) {
            logger.info(StringUtils.capitalize(description) + " was not registered (disabled)");
            return;
        }
        //根这个方法 该方法由子类DynamicRegistrationBean实现
        register(description, servletContext);
    }
}

```

看下`DynamicRegistrationBean`类的`register`方法

```java
public abstract class DynamicRegistrationBean<D extends Registration.Dynamic> extends RegistrationBean {
    protected final void register(String description, ServletContext servletContext) {
        //servlet注册在这里完成 该方法由子类ServletRegistrationBean实现
        //servlet注册完后会返回一个registration对象，用于完成servlet-mapping的配置
        D registration = addRegistration(description, servletContext);
        if (registration == null) {
            logger.info(StringUtils.capitalize(description) + " was not registered (possibly already registered?)");
            return;
        }
        //servlet的mapping配置在这里完成 该方法由子类ServletRegistrationBean实现
        configure(registration);
    }
}
```

看下`ServletRegistrationBean`类的`addRegistration`方法

```java
public class ServletRegistrationBean<T extends Servlet> extends DynamicRegistrationBean<ServletRegistration.Dynamic> {
    //这里可以看到servletContext.addServlet方法终于被调用了
    @Override
    protected ServletRegistration.Dynamic addRegistration(String description, ServletContext servletContext) {
        String name = getServletName();
        //this.servlet就是DispatcherServlet
        return servletContext.addServlet(name, this.servlet);
    }
    
    //这里来配置servlet-mapping
    @Override
    protected void configure(ServletRegistration.Dynamic registration) {
        super.configure(registration);
        String[] urlMapping = StringUtils.toStringArray(this.urlMappings);
        if (urlMapping.length == 0 && this.alwaysMapUrl) {
            urlMapping = DEFAULT_MAPPINGS;
        }
        if (!ObjectUtils.isEmpty(urlMapping)) {
            registration.addMapping(urlMapping);
        }
        registration.setLoadOnStartup(this.loadOnStartup);
        if (this.multipartConfig != null) {
            registration.setMultipartConfig(this.multipartConfig);
        }
    }
}
```

## 总结

1. springboot使用内嵌Tomcat完成了tomcat的启动。内嵌Tomcat本质上和正常Tomcat的Catalina对象一样都是通过初始化内部的server对象，最终调用server对象的start方法来完成启动的。区别就是server对象的创建构成，前者直接new后者解析server.xml文件
1. springboot中tomcat的启动时机是在容器启动时，执行onRefresh方法中。创建webServer对象时启动的。
1. springboot基于servlet3.0标准。创建了`ServletContainerInitializer`的实现类TomcatStarter最终拿到Tomcat容器对象
1. springboot基于TomcatStarter拿到的tomcat容器对象做了进一步优化。最终实现了所有实现`ServletContextInitializer`接口的bean都能拿到tomcat容器
1. `ServletContextInitializer`的实现类之一`DispatcherServletRegistrationBean`完成了`DispatcherServlet向tomcat`容器的注册

## 个性化实现

通过`ServletWebServerFactoryAutoConfiguration`导入`BeanPostProcessorsRegistrar`，该类会注册一个`WebServerFactoryCustomizerBeanPostProcessor`，该类会调用`WebServerFactoryCustomizer`的`customize`方法，通过实现`WebServerFactoryCustomizer`接口来可以个性化tomcat配置。

## FAQ

> Question: The valid characters are defined in RFC 7230 and RFC 3986

```log
java.lang.IllegalArgumentException: Invalid character found in the request target [/officeweb_cs?fname=[%E6%A0%87%E6%AE%B5%E7%BC%96%E5%8F%B7202306260101-001]9A062601-001.XZZF ]. The valid characters are defined in RFC 7230 and RFC 3986
    at org.apache.coyote.http11.Http11InputBuffer.parseRequestLine(Http11InputBuffer.java:509) ~[tomcat-coyote.jar:8.5.76]
    at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:513) ~[tomcat-coyote.jar:8.5.76]
    at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65) [tomcat-coyote.jar:8.5.76]
    at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:881) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.Nio2Endpoint$SocketProcessor.doRun(Nio2Endpoint.java:1708) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.AbstractEndpoint.processSocket(AbstractEndpoint.java:1184) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.Nio2Endpoint.setSocketOptions(Nio2Endpoint.java:340) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.Nio2Endpoint$Nio2Acceptor.completed(Nio2Endpoint.java:474) [tomcat-coyote.jar:8.5.76]
    at org.apache.tomcat.util.net.Nio2Endpoint$Nio2Acceptor.completed(Nio2Endpoint.java:410) [tomcat-coyote.jar:8.5.76]
    at sun.nio.ch.Invoker.invokeUnchecked(Invoker.java:126) [na:1.8.0_312]
    at sun.nio.ch.Invoker$2.run(Invoker.java:218) [na:1.8.0_312]
    at sun.nio.ch.AsynchronousChannelGroupImpl$1.run(AsynchronousChannelGroupImpl.java:112) [na:1.8.0_312]
    at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191) [tomcat-util.jar:8.5.76]
    at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659) [tomcat-util.jar:8.5.76]
    at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-util.jar:8.5.76]
    at java.lang.Thread.run(Thread.java:748) [na:1.8.0_312]
```

tomcat8自带的非法字符拦截机制，异常抛出详见`ErrorReportValve`

> 方案一：外置`tomcat`可以通过配置指定`error`处理页面(对tomcat版本有要求),公司的`tomcat8`不支持配置`errorCode`，详见`catalina.jar`中`ErrorReportValve`

```xml
<Engine name="Catalina" defaultHost="localhost">
    <Valve className="org.apache.catalina.valves.ErrorReportValve"
        errorCode.400="400.html"
        errorCode.404="404.html"
        errorCode.500="500.html"
        showReport="false" 
        showServerInfo="false" 
        />
</Engine>
```

> 方案二：`springboot`可以通过配置关闭异常显示

```properties
server.error.include-stacktrace=never
server.error.include-message=never
server.error.include-binding-errors=never
server.error.include-exception=false
```

> 方案三：`springboot`可以通过实现`WebServerFactoryCustomizer`接口对`ErrorReportValve`进行配置

```java
@Component
public class MyTomcatWebServerFactoryCustomizer
        implements WebServerFactoryCustomizer<ConfigurableTomcatWebServerFactory>, Ordered {

    protected final ResourceLoader resourceLoader;

    public MyTomcatWebServerFactoryCustomizer(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void customize(ConfigurableTomcatWebServerFactory factory) {
        factory.addContextCustomizers((context) -> {
            ErrorReportValve valve = new ErrorReportValve();
            valve.setShowServerInfo(true);
            valve.setShowReport(true);
            valve.setProperty("errorCode.0", "error.html");
            try {
                File error = new File(context.getCatalinaHome(), "error.html");
                log.info(error.getCanonicalPath());
                //File file2 = ResourceUtils.getFile("classpath:templates/error.ftl");
                Resource path = resourceLoader.getResource("classpath:templates/error.ftl");
                //File file = path.getFile();  // will fail if not resolvable in the file system
                if (!error.exists()) {
                    log.debug(String.valueOf(error.createNewFile()));
                }
                try (OutputStream os = Files.newOutputStream(error.toPath());
                     InputStream is = path.getInputStream()) {
                    IOTools.flow(is, os);
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }

            context.getParent().getPipeline().addValve(valve);
        });
    }

    @Override
    public int getOrder() {
        return 1;
    }    

}
```

> 方案四：`springboot`也可以通过实现`TomcatConnectorCustomizer`接口进行配置。

```java
@Component
public class MyTomcatConnectorCustomizer implements TomcatConnectorCustomizer {
    @Override
    public void customize(Connector connector) {
       connector.setProperty("relaxedPathChars", "\"<>[\\]^`{|}");
       connector.setProperty("relaxedQueryChars", "\"<>[\\]^`{|}");
    }
}
```

> 方案五：外置tomcat可以通过配置`server.xml`进行配置

```xml
<Conection port="8080" 
        protocol="HTTP/1.1" 
        connectionTimeout="20000" 
        redirectPort="8443" 
        relaxedPathChars="\,[]^`{|}%" 
        relaxedQueryChars="\,[]^`{|,}%"/>
```
