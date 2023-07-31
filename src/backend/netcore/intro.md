---
title: netcore介绍
icon: markdown
order: 1
date: 2023-07-28
category:
  - 后端技术
tag:
  - netcore
---

## 一、什么是 .NET？ 简介和概述

<https://learn.microsoft.com/zh-cn/dotnet/core/introduction>

## 二、什么是 .NET SDK？

<https://learn.microsoft.com/zh-cn/dotnet/core/sdk>

<https://dotnet.microsoft.com/zh-cn/download>

下载二进制文件，解压到指定目录，添加到环境变量即可试用。开发环境选择SDK，生产环境选择Runtime。

## 三、.NET CLI 概述

<https://learn.microsoft.com/zh-cn/dotnet/core/tools/>

```bash
# 创建环境
dotnet new console
# 生成项目及其所有依赖项
dotnet build --output ./build_output
dotnet ./build_output/my_app.dll
# 查找包 https://www.nuget.org/
dotnet add package Microsoft.EntityFrameworkCore
dotnet add ToDo.csproj package Microsoft.Azure.DocumentDB.Core -v 1.0.0
dotnet add package Microsoft.AspNetCore.StaticFiles -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
# 恢复项目的依赖项和工具
dotnet restore
# 运行命令
dotnet run
# 发布命令
dotnet publish -c Release
dotnet publish --os linux
```

## 四、ASP.NET Core 概述

<https://learn.microsoft.com/zh-cn/aspnet/core/introduction-to-aspnet-core>

## 五、使用 ASP.NET Core 创建 Web API

<https://learn.microsoft.com/zh-cn/aspnet/core/web-api>

<https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples>

### 5.1、路由规则

```csharp
[Route("api/[controller]")]
public class ProductsController : MyControllerBase
{
  // https://localhost:5001/api/Products/1
  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public ActionResult<Product> GetById(int id){}
  // https://localhost:5001/api/Products
  [HttpGet]
  public ActionResult<List<Product>> Get(
      [FromQuery] bool discontinuedOnly = false){}

  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  // https://localhost:5001/Pets/1
  public ActionResult<Pet> GetById(int id){} 
}

[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class PetsController : MyControllerBase
{
  [HttpGet]
  // https://localhost:5001/Pets
  public ActionResult<List<Pet>> GetAll() => _petsInMemoryStore;  
}

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
  [HttpGet]
  // https://localhost:5001/WeatherForecast
  public IEnumerable<WeatherForecast> Get(){}
}
```

## 六、Docker运行

可以在[dotnet-docker](https://github.com/dotnet/dotnet-docker)中查找所有可用的`docker`映像，还可使用每日生成的`mcr.microsoft.com/dotnet/nightly/*`来参考最新的预览版本。

### 6.1、Featured Repos

* [dotnet/sdk](https://hub.docker.com/_/microsoft-dotnet-sdk/): .NET SDK
* [dotnet/aspnet](https://hub.docker.com/_/microsoft-dotnet-aspnet/): ASP.NET Core Runtime
* [dotnet/runtime](https://hub.docker.com/_/microsoft-dotnet-runtime/): .NET Runtime
* [dotnet/runtime-deps](https://hub.docker.com/_/microsoft-dotnet-runtime-deps/): .NET Runtime Dependencies
* [dotnet/monitor](https://hub.docker.com/_/microsoft-dotnet-monitor/): .NET Monitor Tool
* [dotnet/samples](https://hub.docker.com/_/microsoft-dotnet-samples/): .NET Samples

### 6.2、Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:2.1

add ./ /test/

workdir /test
ENTRYPOINT ["dotnet","test.dll"]
```

### 6.3、构建镜像

```bash
docker build --no-cache -t registry.epoint.com.cn/library/test:v1 .
docker run registry.epoint.com.cn/library/test:v1
```
