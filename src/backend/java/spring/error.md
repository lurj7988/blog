---
title: error
icon: markdown
order: 3
date: 2023-10-18
category:
  - 后端技术
tag:
  - spring
---

## 背景

1. `IDEA`启动时应用报错跳转`error.ftl`可以正常显示`${message}`，但是打包成`fat jar`后，启动应用报错跳转`error.ftl`时，`${message}`无法显示，显示的是`null`。

2. `Servlet`中抛出异常为什么会自动跳转到`error.ftl`页面？

## 原因

`Servlet`中抛出异常时，会被`tomcat`容器转发到`/error`地址。

```java
package org.apache.catalina.core;
final class StandardHostValve extends ValveBase {
    private void status(Request request, Response response) {
        // 转发到/error地址
        if (custom(request, response, errorPage)) {

        }
    }
}
```

跳转到`/error`地址后，会被`SpringMVC`的`BasicErrorController`拦截，然后跳转到`error.ftl`页面。

```java
package org.springframework.boot.autoconfigure.web.servlet.error;
@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class BasicErrorController extends AbstractErrorController {
    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = getStatus(request);
        // 获取错误信息
        Map<String, Object> model = Collections
                .unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
        response.setStatus(status.value());
        ModelAndView modelAndView = resolveErrorView(request, response, status, model);
        return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
    }    
}
```

未获取到`message`的原因如下：

```java
package org.springframework.boot.web.servlet.error;
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DefaultErrorAttributes implements ErrorAttributes, HandlerExceptionResolver, Ordered {
    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = getErrorAttributes(webRequest, options.isIncluded(Include.STACK_TRACE));
        if (!options.isIncluded(Include.EXCEPTION)) {
            errorAttributes.remove("exception");
        }
        if (!options.isIncluded(Include.STACK_TRACE)) {
            errorAttributes.remove("trace");
        }
        // options中没有Include.MESSAGE所以被排除了
        if (!options.isIncluded(Include.MESSAGE) && errorAttributes.get("message") != null) {
            errorAttributes.remove("message");
        }
        if (!options.isIncluded(Include.BINDING_ERRORS)) {
            errorAttributes.remove("errors");
        }
        return errorAttributes;
    }
}
```

其中`ErrorAttributeOptions`未配置`Include.MESSAGE`，原因是`ErrorProperties`默认关闭了`Include.MESSAGE`。

```java
package org.springframework.boot.autoconfigure.web;
public class ErrorProperties {
    private IncludeAttribute includeMessage = IncludeAttribute.NEVER;    
}
```

然而`IDEA`开发时引用了工具`spring-boot-devtools`，该工具会自动配置`ErrorProperties`，并且开启了`Include.MESSAGE`。配置路径为`spring-boot-devtools-2.7.5.jar!\org\springframework\boot\devtools\env\devtools-property-defaults.properties`

```properties
server.error.include-binding-errors=always
server.error.include-message=always
server.error.include-stacktrace=always
```
