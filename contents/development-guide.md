# DataFlux Func 开发手册

本文档主要面向开发者，提供有关DataFlux Func 代码编写等相关介绍。

在阅读本文档前，请确保已经阅读过「DataFlux Func 用户手册」，
且已经对DataFlux Func 以及在DataFlux Func 中编写脚本有了初步的了解。



## 目录

<!-- MarkdownTOC levels="1,2,3,4" -->

- [A. 重要提示](#a-%E9%87%8D%E8%A6%81%E6%8F%90%E7%A4%BA)
- [1. 开始编写第一个函数](#1-%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)
    - [1.1 支持文件上传的函数](#11-%E6%94%AF%E6%8C%81%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%87%BD%E6%95%B0)
- [2. 调用授权链接](#2-%E8%B0%83%E7%94%A8%E6%8E%88%E6%9D%83%E9%93%BE%E6%8E%A5)
    - [2.1 授权链接调用详解](#21-%E6%8E%88%E6%9D%83%E9%93%BE%E6%8E%A5%E8%B0%83%E7%94%A8%E8%AF%A6%E8%A7%A3)
        - [2.1.1 `POST`标准传参](#211-post%E6%A0%87%E5%87%86%E4%BC%A0%E5%8F%82)
        - [2.1.2 `POST`简化传参](#212-post%E7%AE%80%E5%8C%96%E4%BC%A0%E5%8F%82)
        - [2.1.3 `GET`标准传参](#213-get%E6%A0%87%E5%87%86%E4%BC%A0%E5%8F%82)
        - [2.1.4 `GET`简化传参](#214-get%E7%AE%80%E5%8C%96%E4%BC%A0%E5%8F%82)
- [3. 使用内置功能](#3-%E4%BD%BF%E7%94%A8%E5%86%85%E7%BD%AE%E5%8A%9F%E8%83%BD)
    - [3.1 输出日志 `print(...)`](#31-%E8%BE%93%E5%87%BA%E6%97%A5%E5%BF%97-print)
    - [3.2 导出函数 `DFF.API(...)`](#32-%E5%AF%BC%E5%87%BA%E5%87%BD%E6%95%B0-dffapi)
        - [3.2.1 参数`title`](#321-%E5%8F%82%E6%95%B0title)
        - [3.2.2 参数`category`/`tags`](#322-%E5%8F%82%E6%95%B0categorytags)
        - [3.2.3 参数`timeout`/`api_timeout`](#323-%E5%8F%82%E6%95%B0timeoutapi_timeout)
        - [3.2.4 参数`cache_result`](#324-%E5%8F%82%E6%95%B0cache_result)
        - [3.2.5 参数`fixed_crontab`](#325-%E5%8F%82%E6%95%B0fixed_crontab)
    - [3.3 操作数据源 `DFF.SRC(...)`](#33-%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E6%BA%90-dffsrc)
        - [3.3.1 InfluxDB](#331-influxdb)
        - [3.3.2 MySQL](#332-mysql)
        - [3.3.3 Redis](#333-redis)
        - [3.3.4 Memcached](#334-memcached)
        - [3.3.5 ClickHouse](#335-clickhouse)
        - [3.3.6 Oracle Database](#336-oracle-database)
        - [3.3.7 Microsoft SQL Server](#337-microsoft-sql-server)
        - [3.3.8 PostgreSQL](#338-postgresql)
        - [3.3.9 mongoDB](#339-mongodb)
        - [3.3.10 elasticsearch](#3310-elasticsearch)
        - [3.3.11 DataFlux DataWay](#3311-dataflux-dataway)
    - [3.4 获取环境变量 `DFF.ENV(...)`](#34-%E8%8E%B7%E5%8F%96%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F-dffenv)
    - [3.5 接口响应控制](#35-%E6%8E%A5%E5%8F%A3%E5%93%8D%E5%BA%94%E6%8E%A7%E5%88%B6)
        - [3.5.1 返回数据 `DFF.RESP(...)`](#351-%E8%BF%94%E5%9B%9E%E6%95%B0%E6%8D%AE-dffresp)
        - [3.5.2 返回文件 `DFF.RESP_FILE(...)`](#352-%E8%BF%94%E5%9B%9E%E6%96%87%E4%BB%B6-dffresp_file)
- [4. 脚本集、脚本规划设计](#4-%E8%84%9A%E6%9C%AC%E9%9B%86%E3%80%81%E8%84%9A%E6%9C%AC%E8%A7%84%E5%88%92%E8%AE%BE%E8%AE%A1)
    - [4.1 按照用途、类型合理划分脚本集和脚本](#41-%E6%8C%89%E7%85%A7%E7%94%A8%E9%80%94%E3%80%81%E7%B1%BB%E5%9E%8B%E5%90%88%E7%90%86%E5%88%92%E5%88%86%E8%84%9A%E6%9C%AC%E9%9B%86%E5%92%8C%E8%84%9A%E6%9C%AC)
    - [4.2 调用另一个脚本中的函数](#42-%E8%B0%83%E7%94%A8%E5%8F%A6%E4%B8%80%E4%B8%AA%E8%84%9A%E6%9C%AC%E4%B8%AD%E7%9A%84%E5%87%BD%E6%95%B0)
    - [4.3 单个脚本的代码量及依赖链](#43-%E5%8D%95%E4%B8%AA%E8%84%9A%E6%9C%AC%E7%9A%84%E4%BB%A3%E7%A0%81%E9%87%8F%E5%8F%8A%E4%BE%9D%E8%B5%96%E9%93%BE)
    - [4.4 不划分脚本的情况](#44-%E4%B8%8D%E5%88%92%E5%88%86%E8%84%9A%E6%9C%AC%E7%9A%84%E6%83%85%E5%86%B5)
- [5. 常见代码处理方式](#5-%E5%B8%B8%E8%A7%81%E4%BB%A3%E7%A0%81%E5%A4%84%E7%90%86%E6%96%B9%E5%BC%8F)
    - [5.1 使用列表生成器预发](#51-%E4%BD%BF%E7%94%A8%E5%88%97%E8%A1%A8%E7%94%9F%E6%88%90%E5%99%A8%E9%A2%84%E5%8F%91)
    - [5.2 使用内置`map`函数处理列表](#52-%E4%BD%BF%E7%94%A8%E5%86%85%E7%BD%AEmap%E5%87%BD%E6%95%B0%E5%A4%84%E7%90%86%E5%88%97%E8%A1%A8)
    - [5.3 获取JSON数据中多层嵌套中的值](#53-%E8%8E%B7%E5%8F%96json%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%A4%9A%E5%B1%82%E5%B5%8C%E5%A5%97%E4%B8%AD%E7%9A%84%E5%80%BC)
    - [5.4 使用`arrow`库正确处理时间](#54-%E4%BD%BF%E7%94%A8arrow%E5%BA%93%E6%AD%A3%E7%A1%AE%E5%A4%84%E7%90%86%E6%97%B6%E9%97%B4)
    - [5.5 向外部发送HTTP请求](#55-%E5%90%91%E5%A4%96%E9%83%A8%E5%8F%91%E9%80%81http%E8%AF%B7%E6%B1%82)
    - [5.6 发送钉钉机器人消息](#56-%E5%8F%91%E9%80%81%E9%92%89%E9%92%89%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%B6%88%E6%81%AF)
    - [5.7 避免SQL注入](#57-%E9%81%BF%E5%85%8Dsql%E6%B3%A8%E5%85%A5)

<!-- /MarkdownTOC -->

## A. 重要提示

*在DataFlux Func 的使用过程中，*

*请勿多人登录同一个账号，也不要多人同时编辑同一份代码。*

*以免造成代码相互覆盖、丢失的问题*



## 1. 开始编写第一个函数

在DataFlux Func 中编写代码，与正常编写Python 代码并无太大区别。
对于需要导出为API的函数，添加内置的`@DFF.API(...)`装饰器即可实现。

函数的返回值即接口的返回值，当返回值为`dict`、`list`时，系统会自动当作JSON 返回。

一个典型的函数如下：

```python
@DFF.API('Hello, world')
def hello_world(message=None):
    ret = {
        'message': message
    }
    return ret
```

此时，为本函数创建一个授权链接，即可实现在公网通过HTTP 的方式调用本函数。

### 1.1 支持文件上传的函数

DataFlux Func 也支持向授权链接接口上传文件。

需要处理上传的文件时，可以为函数添加`files`参数接收上传的文件信息。
文件在上传后，DataFlux Func 会自动将文件存储到一个临时上传目录供脚本进行后续处理。

`files`参数由DataFlux Func 系统自动填入，内容如下：

```json
[
    {
        "filePath"    : "<文件临时存放地址>",
        "originalname": "<文件原始文件名>",
        "encoding"    : "<编码>",
        "mimetype"    : "<MIME类型>",
        "size"        : "<文件大小>"
    },
    ...
]
```

具体Python代码示例如下：

```python
# 接收Excel文件，并将Sheet1内容返回
from openpyxl import load_workbook

@DFF.API('读取Excel')
def read_excel(files=None):
    excel_data = []
    if files:
        workbook = load_workbook(filename=files[0]['filePath'])
        for row in workbook['Sheet1'].iter_rows(min_row=1, values_only=True):
            excel_data.append(row)

    return excel_data
```

> 上传文件的示例代码见「调用授权链接 - `POST`简化传参」



## 2. 调用授权链接

为函数创建授权链接后，支持多种不同的调用方式。
授权链接支持`GET`、`POST`两种方式。两种不同方式的参数传递同时支持「标准」、「简化」形式。

此外，`POST`方式的「简化」形式还支持文件上传，以下是各种调用方式的功能支持列表：

|  调用方式  | 传递`kwargs` |  `kwargs`中参数类型  | 传递`options` | 文件上传 |
|------------|--------------|----------------------|---------------|----------|
| `POST`标准 | 支持         | 支持JSON中的数据类型 | 支持          | 不支持   |
| `POST`简化 | 支持         | 只能传递字符串       | 不支持        | 支持     |
| `GET`标准  | 支持         | 支持JSON中的数据类型 | 支持          | 不支持   |
| `GET`简化  | 支持         | 只能传递字符串       | 不支持        | 不支持   |

> 在授权链接列表，可以点击「API调用示例」来查看具体调用方式

### 2.1 授权链接调用详解

假设存在如下函数：

```python
@DFF.API('我的函数')
def my_func(x, y):
    pass
```

为此函数创建的授权链接ID为`auln-xxxxx`，传递的参数为`x` = `100`（整数）, `y` = `"hello"`（字符串）。

那么，各种不同的调用方式如下：

#### 2.1.1 `POST`标准传参

`POST`标准传参是最常用的调用方式之一。
由于参数以JSON格式通过请求体发送，因此参数的原始类型都会保留。
函数无需再对参数进行类型转换。

如本例中，函数接收到的`x`参数即为整数，无需类型转换。

```
POST /api/v1/al/auln-xxxxx
Content-Type: application/json

{
    "kwargs": {
        "x": 100,
        "y": "hello"
    }
}
```

#### 2.1.2 `POST`简化传参

在某些情况下，如果无法发送请求体为JSON的HTTP请求，
那么也可以类似Form表单的形式传递参数，各字段名即为参数名。

由于Form表单形式传递参数时，无法区分字符串的`"100"`和整数的`100`，
所以函数在被调用时，接收到的参数都是字符串。
函数需要自行对参数进行类型转换。

```
POST /api/v1/al/auln-xxxxx/simplified
Content-Type: x-www-form-urlencoded

x=100&y=hello
```

此外，`POST`简化传参还额外支持文件上传（参数/字段名必须为`files`），
需要使用`form-data/multipart`方式进行处理。

前端`javascript`代码示例如下：

```javascript
var data = new FormData();
data.append('x', '100');
data.append('y', 'hello');
data.append('files', document.querySelector('#file').files[0]);

var xhr = new XMLHttpRequest();
xhr.open('POST', '/api/v1/al/auln-xxxxx/simplified');
xhr.send(data);
```

#### 2.1.3 `GET`标准传参

在某些情况下，如果无法发送POST请求，也可以使用GET方式调用接口。

与`POST`标准传参类似，`GET`标准传参时，将整个`kwargs`进行JSON序列化后，作为URL参数传递即可。
由于参数实际还是以JSON格式发送，因此参数的原始类型都会保留。
函数无需再对参数进行类型转换。

如本例中，函数接收到的`x`参数即为整数，无需类型转换。

```
GET /api/v1/al/auln-xxxxx?kwargs={"x":100,"y":"hello"}
```

*注意：为了便于阅读，示例为URLEncode之前的内容，实际URL参数需要进行URLEncode*

#### 2.1.4 `GET`简化传参

如果函数的参数比较简单，可以使用`GET`简化传参方式传递参数，接口将更加直观。

由于URL参数形式传递参数时，无法区分字符串的`"100"`和整数的`100`，
所以函数在被调用时，接收到的参数都是字符串。
函数需要自行对参数进行类型转换。

```
GET /api/v1/al/auln-xxxxx?x=100&y=hello
```

*注意：为了便于阅读，示例为URLEncode之前的内容，实际URL参数需要进行URLEncode*



## 3. 使用内置功能

为了方便脚本编写，以及在脚本中使用各种DataFlux Func提供的功能。
DataFlux Func在脚本运行上下文注入了一些额外功能。

这些功能都封装在DFF对象中（如上文出现的`@DFF.API(...)`）

### 3.1 输出日志 `print(...)`

由于脚本编辑器是Web应用程序，
不同于一般意义上的IDE，不支持进行单步调试等操作。
因此，调试可以依靠运行时输出日志进行。

为了让日志输出能够被DataFlux Func搜集并显示到脚本编辑器中，
DataFlux Func重新封装了`print(...)`函数，
使其可以将输出内容通过Web页面展现出来。如：

```python
print('Some log message')
```

### 3.2 导出函数 `DFF.API(...)`

一个装饰器，用于将被修饰的函数对外开放，允许使用API方式调用。

详细参数列表如下：

|       参数      |         类型        | 是否必须 |   默认值    |                                 说明                                |
|-----------------|---------------------|----------|-------------|---------------------------------------------------------------------|
| `title`         | str                 | 必须     |             | 函数导出的展示名，主要用于在展示                                    |
| `catetory`      | str                 |          | `general`   | 函数所属类别，主要用于函数列表的分类/筛选                           |
| `tags`          | list                |          | `None`      | 函数标签列表，主要用于函数列表的分类/筛选                           |
| `tags[#]`       | str                 |          |             | 函数标签                                                            |
| `timeout`       | int                 |          | `30`/`3600` | 函数超时时间。<br>单位：秒，取值范围`1 ~ 3600`                      |
| `api_timeout`   | int                 |          | `10`        | 通过API调用函数时，API调用超时时间。<br>单位：秒，取值范围`1 ~ 180` |
| `cache_result`  | int                 |          | `None`      | 缓存结果数据时长。<br>单位：秒，`None`表示不缓存                    |
| `fixed_crontab` | str(Crontab-format) |          | `None`      | 当函数由自动触发执行时，强制固定的Crontab配置。<br>最小支持分钟级   |

#### 3.2.1 参数`title`

函数标题支持中文，方便在DataFlux Func 各种操作界面/文档中展示函数名称。

示例如下：

```python
@DFF.API('我的函数')
def my_func():
    pass
```

#### 3.2.2 参数`category`/`tags`

函数所属分类、标签列表，本身并不参与也不控制函数的运行，主要用于方便分类管理函数。
分别使用或者各自单独使用都可以。

示例如下：

```python
@DFF.API('我的函数', category='demo', tags=['tag1', 'tag2']):
    pass
```

指定后，可通过指定筛选参数来过滤函数列表，如：

```
# 根据category筛选
GET /api/v1/func-list?category=demo

# 根据tags筛选（指定多个tag表示「同时包含」）
GET /api/v1/func-list?tags=tag1,tag2
```

#### 3.2.3 参数`timeout`/`api_timeout`

为了保护系统，所有在DataFlux Func 中运行的函数都有运行时长限制，不允许无限制地运行下去。
其中，`timeout`控制「函数本身的运行时长」，而`api_timeout`控制在「授权链接中，API返回的超时时长」。

以下是两者控制范围：

|     场景     |       `timeout`参数，默认值        |      `api_timeout`参数      |
|--------------|------------------------------------|-----------------------------|
| 授权链接     | 控制函数本身运行时长，默认值`30`   | 控制API返回超时，默认值`10` |
| 自动触发配置 | 控制函数本身运行时长，默认值`30`   | *不起作用*                  |
| 批处理       | 控制函数本身运行时长，默认值`3600` | *不起作用*                  |

示例如下：

```python
@DFF.API('我的函数', timeout=30, api_timeout=15):
    pass
```

*注意：一个HTTP接口响应时间超过3秒即可认为非常缓慢。应当注意不要为函数配置无意义的超长超时时间*

*注意：大量长耗时授权链接请求会导致任务队列堵塞，必要时应使用缓存技术*

#### 3.2.4 参数`cache_result`

DataFlux Func 内置了API层面的缓存处理。
在指定的缓存参数后，当调用完全相同的函数和参数时，系统会直接返回缓存的结果。

示例如下：

```python
@DFF.API('我的函数', cache_result=30):
    pass
```

*注意：命中缓存后，API会直接返回结果，而函数并不会实际执行*

命中缓存后，返回的HTTP 请求头会添加如下标示：

```
X-Dataflux-Func-Cache: Cached
```

#### 3.2.5 参数`fixed_crontab`

对于某些会用于自动触发配置的函数，函数编写者可能会对自动运行的频率有要求。
此时，可以指定本参数，将属于本函数的自动触发配置固定为指定的Crontab 表达式。

示例如下：

```python
@DFF.API('我的函数', fixed_crontab='*/5 * * * *'):
    pass
```

### 3.3 操作数据源 `DFF.SRC(...)`

一个函数，用于返回指定的数据源操作对象。

示例如下：

```python
@DFF.API('InfluxDB操作演示')
def influxdb_demo():
    db = DFF.SRC('demo_influxdb')
    return db.query('SELECT * FROM demo LIMIT 3')
```

如数据源配置了默认数据库，则查询会在默认数据库进行。
如数据源没有配置默认数据库，或在查询时需要查询不同的数据库，可在获取数据源操作对象时，指定数据库database参数，如：
db = DFF.SRC('demo_influxdb', database='my_database')
注意：某些数据库不支持查询时更换数据库。需要操作不同数据库时，可以创建多个数据源来进行操作。

对于DataFlux DataWay，可以获取数据源操作对象时指定DataWay的rp和token参数，如：
dataway = DFF.SRC('df_dataway', token='xxxxx', rp='rp0')

由于数据源具有不同类型，使用`DFF.SRC(...)`时，各个数据源操作对象的可选参数，支持方法并不相同。

其中，公共参数如下：

|       参数       | 类型 | 是否必须 | 默认值 |   说明   |
|------------------|------|----------|--------|----------|
| `data_source_id` | str  | 必须     |        | 数据源ID |

#### 3.3.1 InfluxDB

InfluxDB数据源操作对象为Python第三方包influxdb（版本5.2.3）的封装，主要提供一些用于查询InfluxDB的方法。
本数据源兼容以下数据库：

- 阿里云时序数据库InfluxDB 版

详细参数列表如下：

|    参数    | 类型 | 是否必须 | 默认值 |      说明      |
|------------|------|----------|--------|----------------|
| 公共参数   | -    | -        | -      | -              |
| `database` | str  |          | `None` | 指定默认数据库 |

##### `InfluxDBHelper.query(...)`

`query(...)`方法用于执行InfluxQL语句，参数如下：

|      参数     | 类型 | 是否必须 | 默认值  |                          说明                         |
|---------------|------|----------|---------|-------------------------------------------------------|
| `sql`         | str  | 必须     |         | InfluxQL语句，可包含绑定参数占位符，形式为`$var_name` |
| `bind_params` | dict |          | `None`  | 绑定参数                                              |
| `database`    | str  |          | `None`  | 本次查询指定数据库                                    |
| `dict_output` | dict |          | `False` | 返回数据自动转换为{列名:值}形式                       |

示例如下：

```python
sql = 'SELECT * FROM demo WHERE city = $city LIMIT 5'
bind_params = {'city': 'hangzhou'}
db_res = db.query(sql, bind_params=bind_params, database='demo')
# {'series': [{'columns': ['time', 'city', 'hostname', 'status', 'value'], 'name': 'demo', 'values': [['2018-12-31T16:00:10Z', 'hangzhou', 'webserver', 'UNKNOW', 90], ['2018-12-31T16:00:20Z', 'hangzhou', 'jira', 'running', 40], ['2018-12-31T16:00:50Z', 'hangzhou', 'database', 'running', 50], ['2018-12-31T16:01:00Z', 'hangzhou', 'jira', 'stopped', 40], ['2018-12-31T16:02:00Z', 'hangzhou', 'rancher', 'UNKNOW', 90]]}], 'statement_id': 0}

sql = 'SELECT * FROM demo WHERE city = $city LIMIT 5'
bind_params = {'city': 'hangzhou'}
db_res = db.query(sql, bind_params=bind_params, database='demo', dict_output=True)
# {'series': [[{'city': 'hangzhou', 'hostname': 'webserver', 'status': 'UNKNOW', 'time': '2018-12-31T16:00:10Z', 'value': 90}, {'city': 'hangzhou', 'hostname': 'jira', 'status': 'running', 'time': '2018-12-31T16:00:20Z', 'value': 40}, {'city': 'hangzhou', 'hostname': 'database', 'status': 'running', 'time': '2018-12-31T16:00:50Z', 'value': 50}, {'city': 'hangzhou', 'hostname': 'jira', 'status': 'stopped', 'time': '2018-12-31T16:01:00Z', 'value': 40}, {'city': 'hangzhou', 'hostname': 'rancher', 'status': 'UNKNOW', 'time': '2018-12-31T16:02:00Z', 'value': 90}]], 'statement_id': 0}
```

##### `InfluxDBHelper.query2(...)`

`query2(...)`方法同样用于执行InfluxQL语句，但参数占位符不同，使用问号`?`作为参数占位符。参数如下：

|      参数     | 类型 | 是否必须 | 默认值  |                                           说明                                          |
|---------------|------|----------|---------|-----------------------------------------------------------------------------------------|
| `sql`         | str  | 必须     |         | InfluxQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params`  | list |          | `None`  | InfluxQL参数                                                                            |
| `database`    | str  |          | `None`  | 本次查询指定数据库                                                                      |
| `dict_output` | dict |          | `False` | 返回数据自动转换为`{"列名": "值"}`形式                                                  |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE city = ? LIMIT 5'
sql_params = ['demo', 'hangzhou']
db_res = db.query2(sql, sql_params=sql_params, dict_output=True)
```

#### 3.3.2 MySQL

MySQL数据源操作对象主要提供一些操作MySQL的方法。
本数据源以下数据库：

- MariaDB
- Percona Server for MySQL
- 阿里云PolarDB MySQL
- 阿里云OceanBase
- 阿里云分析型数据库(ADB) MySQL 版

##### MySQLHelper.query(...)

`query(...)`方法用于执行SQL语句，参数如下：

|     参数     | 类型 | 是否必须 | 默认值 |                                        说明                                        |
|--------------|------|----------|--------|------------------------------------------------------------------------------------|
| `sql`        | str  | 必须     |        | SQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params` | list |          | `None` | SQL参数                                                                            |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE seq > ?'
sql_params = ['demo', 1]
db_res = db.query(sql, sql_params=sql_params)
```

#### 3.3.3 Redis

Redis数据源操作对象主要提供Redis的操作方法。

##### `RedisHelper.query(...)`

`query(...)`方法用于执行Redis命令，参数如下：

|   参数  |  类型 | 是否必须 | 默认值 |       说明      |
|---------|-------|----------|--------|-----------------|
| `*args` | [str] | 必须     |        | Redis命令及参数 |

示例如下：

```python
db.query('SET', 'myKey', 'myValue', 'nx')
db_res = db.query('GET', 'myKey')
# b'myValue'
```

*注意：Redis返回的值类型为`bytes`。实际操作时，可以根据需要进行类型转换*

```python
db_res = db.query('GET', 'intValue')
print(int(db_res))

db_res = db.query('GET', 'strValue')
print(str(db_res))

db_res = db.query('GET', 'jsonValue')
print(json.loads(db_res))
```

#### 3.3.4 Memcached

Memcached数据源操作对象主要提供Memcached的操作方法。

##### `MemcachedHelper.query(...)`

`query(...)`方法用于执行Memcached命令，参数如下：

|   参数  |  类型 | 是否必须 | 默认值 |         说明        |
|---------|-------|----------|--------|---------------------|
| `*args` | [str] | 必须     |        | Memcached命令及参数 |

示例如下：

```python
db.query('SET', 'myKey', 'myValue')
db_res = db.query('GET', 'myKey')
# 'myValue'
```

#### 3.3.5 ClickHouse

ClickHouse数据源操作对象主要提供一些数据方法。

##### `ClickHouseHelper.query(...)`

`query(...)`方法用于执行SQL语句，参数如下：

|     参数     | 类型 | 是否必须 | 默认值 |                                        说明                                        |
|--------------|------|----------|--------|------------------------------------------------------------------------------------|
| `sql`        | str  | 必须     |        | SQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params` | list |          | `None` | SQL参数                                                                            |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE age > ?'
sql_params = ['demo_table', 50]
db_res = helper.query(sql, sql_params=sql_params)
```

#### 3.3.6 Oracle Database

Oracle Database数据源操作对象主要提供Oracle Database的操作方法。

##### `OracleDatabaseHelper.query(...)`

`query(...)`方法用于执行SQL语句，参数如下：

|     参数     | 类型 | 是否必须 | 默认值 |                                        说明                                        |
|--------------|------|----------|--------|------------------------------------------------------------------------------------|
| `sql`        | str  | 必须     |        | SQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params` | list |          | `None` | SQL参数                                                                            |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE seq > ?'
sql_params = ['demo', 1]
db_res = db.query(sql, sql_params=sql_params)
```

#### 3.3.7 Microsoft SQL Server

Microsoft SQL Server数据源操作对象主要提供Microsoft SQL Server的操作方法。

##### `SQLServerHelper.query(...)`

`query(...)`方法用于执行SQL语句，参数如下：

|     参数     | 类型 | 是否必须 | 默认值 |                                        说明                                        |
|--------------|------|----------|--------|------------------------------------------------------------------------------------|
| `sql`        | str  | 必须     |        | SQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params` | list |          | `None` | SQL参数                                                                            |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE seq > ?'
sql_params = ['demo', 1]
db_res = db.query(sql, sql_params=sql_params)
```

#### 3.3.8 PostgreSQL

PostgreSQL数据源操作对象主要提供一些操作PostgreSQL的方法。
本数据源以下数据库：

- Greenplum Database
- 阿里云PolarDB MySQL
- 阿里云分析型数据库(ADB) PostgreSQL 版

##### `PostgreSQLHelper.query(...)`

`query(...)`方法用于执行SQL语句，参数如下：

|     参数     | 类型 | 是否必须 | 默认值 |                                        说明                                        |
|--------------|------|----------|--------|------------------------------------------------------------------------------------|
| `sql`        | str  | 必须     |        | SQL语句，可包含参数占位符。<br>`?`表示需要转义的参数；<br>`??`表示不需要转义的参数 |
| `sql_params` | list |          | `None` | SQL参数                                                                            |

示例如下：

```python
sql = 'SELECT * FROM ?? WHERE seq > ?'
sql_params = ['demo', 1]
db_res = db.query(sql, sql_params=sql_params)
```

#### 3.3.9 mongoDB

mongoDB数据源操作对象主要提供一些操作mongoDB的方法。

##### `MongoDBHelper.db(...)`

`db(...)`方法用于获取数据库操作对象，参数如下：

|    参数   | 类型 | 是否必须 | 默认值 |                       说明                       |
|-----------|------|----------|--------|--------------------------------------------------|
| `db_name` | str  |          | `None` | 数据库名。未传递名称时，返回默认数据库操作对象。 |

示例如下：

```python
# 获取默认数据库对象
db = helper.db()
# 获取指定数据库对象
db = helper.db('some_db')
# 获取集合对象
collection = db['some_collection']
# 查询处理
data = collection.find_one()
# 写成一行
data = helper.db('some_db')['some_collection'].find_one()
```

##### `MongoDBHelper.run_method(...)`

run_method()方法用于获取数据库列表或集合列表，参数如下：

|    参数   | 类型 | 是否必须 | 默认值 |                                                说明                                               |
|-----------|------|----------|--------|---------------------------------------------------------------------------------------------------|
| `method`  | str  | 必须     |        | 执行方法，枚举：<br>`list_database_names`：列出数据库<br>`list_collection_names`：列出集合        |
| `db_name` | str  |          | `None` | 执行list_collection_names时可传递，指定数据库；<br>不传递则为默认数据库<br>必须以命名参数方式传递 |

示例如下：

```python
db_list = helper.run_method('list_database_names')
collection_list = helper.run_method('list_collection_names')
collection_list = helper.run_method('list_collection_names', db_name='some_db')
```

具体查询语法、格式等，请参考mongoDB官方文档

#### 3.3.10 elasticsearch

elasticsearch数据源操作对象主要提供一些操作elasticsearch的方法。

##### `ElasticSearchHelper.query(...)`

`query(...)`方法用于向elasticsearch发送HTTP请求，参数如下：

|   参数   | 类型 | 是否必须 | 默认值 |            说明           |
|----------|------|----------|--------|---------------------------|
| `method` | str  | 必须     |        | 请求方法：`GET`，`POST`等 |
| `path`   | str  |          | `None` | 请求路径                  |
| `query`  | dict |          | `None` | 请求URL参数               |
| `body`   | dict |          | `None` | 请求体                    |

示例如下：

```python
db_res = db.query('GET', '/some_index/_search?q=some_field:something')
db_res = db.query('GET', '/some_index/_search', query={...})
db_res = db.query('GET', '/some_index/_search', body={...})
```

具体查询语法、格式等，请参考elasticsearch官方文档

#### 3.3.11 DataFlux DataWay

DataFlux DataWay数据源操作对象主要提供数据写入方法。

##### `DataWay.write_point(...)`/`write_metric(...)`

`write_point(...)`方法用于向DataWay写入数据点，参数如下：

|      参数     |      类型      | 是否必须 |  默认值  |                               说明                              |
|---------------|----------------|----------|----------|-----------------------------------------------------------------|
| `measurement` | str            | 必须     |          | 指标集名称                                                      |
| `tags`        | dict           |          | `None`   | 标签。键名和键值必须都为字符串                                  |
| `fields`      | dict           |          | `None`   | 指标。键名必须为字符串，键值可以为字符串/整数/浮点数/布尔值之一 |
| `timestamp`   | int/long/float |          | 当前时间 | 时间戳，支持秒/毫秒/微秒/纳秒。                                 |

示例如下：

```python
dw.write_point(measurement='主机监控', tags={'host': 'web-01'}, fields={'cpu': 10})
```

##### `DataWay.write_points(...)`/`write_metrics(...)`

`write_point(...)`的批量版本。

示例如下：

```python
points = [
    { 'measurement': '主机监控', 
        'tags': {'host': 'web-01'}, 'fields': {'value': 10} },
    { 'measurement': '主机监控', 
        'tags': {'host': 'web-02'}, 'fields': {'value': 20} },
]
dw.write_points(points)
```

##### `DataWay.get(...)`

`get(...)`方法用于向DataWay发送一个GET请求，参数如下：

|    参数   | 类型 | 是否必须 | 默认值 |      说明      |
|-----------|------|----------|--------|----------------|
| `path`    | str  | 必须     |        | 请求路径       |
| `query`   | dict |          | `None` | 请求URL参数    |
| `headers` | dict |          | `None` | 请求Header参数 |

> 本方法为通用处理方法，具体参数格式、内容等请参考DataWay官方文档

##### `DataWay.post_line_protocol(...)`

`post_line_protocol(...)`方法用于向DataWay以行协议格式发送一个POST请求，参数如下：

|           参数          |      类型      | 是否必须 |   默认值   |                               说明                              |
|-------------------------|----------------|----------|------------|-----------------------------------------------------------------|
| `points`                | list           | 必须     |            | 数据点格式的数据列表                                            |
| `points[#].measurement` | str            | 必须     |            | 指标集名称                                                      |
| `points[#].tags`        | dict           | 必须     |            | 标签。键名和键值必须都为字符串                                  |
| `points[#].fields`      | dict           | 必须     |            | 指标。键名必须为字符串，键值可以为字符串/整数/浮点数/布尔值之一 |
| `points[#].timestamp`   | int/long/float |          | {当前时间} | 时间戳，支持秒/毫秒/微秒/纳秒。                                 |
| `path`                  | str            |          | `None`     | 请求路径                                                        |
| `query`                 | dict           |          | `None`     | 请求URL参数                                                     |
| `headers`               | dict           |          | `None`     | 请求Header参数                                                  |
| `with_rp`               | bool           |          | `False`    | 是否自动将配置的rp信息附在query中作为参数一起发送               |

> 本方法为通用处理方法，具体参数格式、内容等请参考DataWay官方文档

##### `DataWay.post_json(...)`

`post_json(...)`方法用于向DataWay以JSON格式发送一个POST请求，参数如下：

|    参数    |    类型   | 是否必须 | 默认值  |                        说明                       |
|------------|-----------|----------|---------|---------------------------------------------------|
| `json_obj` | dict/list | 必须     |         | 需要发送的JSON对象                                |
| `path`     | str       | 必须     |         | 请求路径                                          |
| `query`    | dict      |          | `None`  | 请求URL参数                                       |
| `headers`  | dict      |          | `None`  | 请求Header参数                                    |
| `with_rp`  | bool      |          | `False` | 是否自动将配置的rp信息附在query中作为参数一起发送 |

> 本方法为通用处理方法，具体参数格式、内容等请参考DataWay官方文档


### 3.4 获取环境变量 `DFF.ENV(...)`

在脚本编辑器左侧边栏配置的所有环境变量，
都可以在脚本中使用配置的ID获取对应的环境变量值。

示例代码如下：

```python
company_name = DFF.ENV('companyName')
# '上海驻云信息科技有限公司'

company_name = DFF.ENV('不存在的环境变量')
# None
```

如环境变量在配置时指定了类型，
取出时会自动转换为特定类型，不必额外进行类型转换。

但由于类型转换可能会因为配置错误而转换失败，
因此考虑到程序健壮性，应当加入默认值处理，如：

```python
page_size = 10
try:
    page_size = DFF.ENV('pageSize') or page_size
except Exception as e:
    pass
```

### 3.5 接口响应控制

函数的返回值，除了以往直接返回字符串、JSON外，
还可以使用`DFF.RESP(...)`/`DFF.RESP_FILE(...)`用于控制接口返回内容。

#### 3.5.1 返回数据 `DFF.RESP(...)`

当返回的内容为字符串、JSON等「数据」时，可使用`DFF.RESP(...)`进行细节控制。

|      参数      |      类型     | 是否必须 | 默认值  |                                        说明                                        |
|----------------|---------------|----------|---------|------------------------------------------------------------------------------------|
| `data`         | str/dict/list | 必须     |         | 指定返回的数据                                                                     |
| `status_code`  | int           |          | `200`   | 指定响应状态码                                                                     |
| `content_type` | str           |          | `None`  | 指定响应体类型，如`text/html`或只填写`html`                                        |
| `headers`      | dict          |          | `None`  | 指定HTTP响应头（此处不需要重复填写`Content-Type`）                                 |
| `allow_304`    | bool          |          | `False` | 指定为`True`时，允许浏览器304缓存                                                  |
| `download`     | str           |          | `False` | 指定下载文件名，并将数据作为文件下载<br>*指定本参数后，`content_type`参数不再起效* |

*注意：如果开启`allow_304`，允许浏览器304缓存，可以实现接口性能提升。但也可能会因为缓存导致客户端无法及时从接口获取最新内容*

*注意：指定`download`参数后，系统会自动根据文件扩展名填充`Content-Type`，而`content_type`参数会被忽略*

常见用例如下：

```python
@DFF.API('用例1')
def case_1():
    '''
    返回一个由函数内生成的HTML页面
    '''
    data = '''<h1>Hello, World!</h1>'''
    return DFF.RESP(data, content_type='html')

@DFF.API('用例2')
def case_2():
    '''
    返回由函数生成的JSON数据
    与 return {"hello": "world"} 等价
    '''
    data = '''{"hello": "world"}'''
    return DFF.RESP(data, content_type='json')

@DFF.API('用例3')
def case_3():
    '''
    返回由函数生成的JSON数据
    与 return {"hello": "world"} 等价
    '''
    data = '''{"hello": "world"}'''
    return DFF.RESP(data, content_type='json')

@DFF.API('用例4')
def case_4():
    '''
    下载由函数生成的文件，并命名为`文章.txt`
    '''
    data = '''Some text'''
    return DFF.RESP(data, download='文章.txt')

@DFF.API('用例5')
def case_5():
    '''
    指定额外的响应头
    '''
    data = '''<h1>Hello, World!</h1>'''
    headers = {
        'X-Author': 'Tom',
    }
    return DFF.RESP(data, content_type='html', headers=headers)
```

#### 3.5.2 返回文件 `DFF.RESP_FILE(...)`

当返回的内容为「磁盘上的文件」时，可使用`DFF.RESP_FILE(...)`进行细节控制。

|      参数     |   类型   | 是否必须 | 默认值  |                                                               说明                                                              |
|---------------|----------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| `file_path`   | str      | 必须     |         | 指定返回文件的路径（相对于资源文件目录）                                                                                        |
| `status_code` | int      |          | `200`   | *与`DFF.RESP(...)`同名参数相同*                                                                                                 |
| `headers`     | dict     |          | `None`  | *与`DFF.RESP(...)`同名参数相同*                                                                                                 |
| `allow_304`   | bool     |          | `False` | *与`DFF.RESP(...)`同名参数相同*                                                                                                 |
| `auto_delete` | bool     |          | `False` | 指定为`True`时，文件下载后自动从磁盘中删除                                                                                      |
| `download`    | bool/str |          | `True`  | 默认下载文件且保存名与原始文件名相同<br>指定为`False`时，让浏览器尽可能直接打开文件<br>指定为字符串时，按指定的值作为下载文件名 |

*提示：`DFF.RESP_FILE(...)`会自动根据文件扩展名填充HTTP的`Content-Type`头，默认以`file_path`为准，指定`download`字符串时则以`download`值作为文件名下载*

*提示：「资源文件目录」指的是容器内的`/data/resources`文件夹，正常部署后此文件夹会挂载到宿主机磁盘实现持久化存储*

```python
@DFF.API('用例1')
def case_1():
    '''
    下载资源文件目录下user-guide.pdf文件
    '''
    return DFF.RESP_FILE('user-guide.pdf')

@DFF.API('用例2')
def case_2():
    '''
    让浏览器在线打开资源目录下的`user-guide.pdf`文件
    '''
    return DFF.RESP_FILE('user-guide.pdf', download=False)

@DFF.API('用例3')
def case_3():
    '''
    浏览器打开资源目录下index.html页面
    '''
    return DFF.RESP_FILE('index.html', download=False)

@DFF.API('用例4')
def case_4():
    '''
    下载资源文件目录下的servey.xlsx文件，并保存为「调查表.xlsx」
    '''
    return DFF.RESP_FILE('servey.xlsx', download='调查表.xlsx')

@DFF.API('用例5')
def case_5():
    '''
    指定额外的响应头
    '''
    headers = {
        'X-Author': 'Tom',
    }
    return DFF.RESP_FILE('user-guide.pdf', headers=headers)
```



## 4. 脚本集、脚本规划设计

脚本集、脚本、函数应当按照一定逻辑编排组织，而不是将代码随意堆砌在一起。
合理编排脚本集和脚本有利于代码的维护以及系统运行效率。

### 4.1 按照用途、类型合理划分脚本集和脚本

一般来说，推荐选用以下几种代码组织方式：

- 为业务处理脚本按照行业、项目、组织等方式建立单独的脚本集，如：`eShop`、`IoT`、`monitor`、`sales`、`marketing`等
- 代码量过多时，根据使用频率划分低频使用的脚本和高频使用的脚本，如`prediction`、`advanced_prediction`

### 4.2 调用另一个脚本中的函数

脚本可以根据功能、用途等不同需求划分到不同的脚本或脚本集中，而位于不同脚本的代码可以相互调用。
需要调用另一个脚本中的函数时，只需要`import`对应脚本即可。

导入另一个脚本时，必须按照固定写法：

```python
# import <脚本集ID>__<脚本ID>
import demo__script

# 或使用别名缩短长度
# import <脚本集ID>__<脚本ID> as 别名
import demo__script as script
```

> 可以在脚本编辑器中，可以将鼠标指向左侧栏中的问号图表，直接复制相关语句

*注意：如果需要导出脚本集，那么，这个脚本集中依赖的其他脚本也需要一起导出。
否则导出的脚本集会因为缺少函数而实际无法运行！*

*注意：脚本或脚本集并不是Python模块，原本不能import导入。
但DataFlux Func内部实现了动态加载机制，并允许使用import语句加载动态代码。
因此，以下写法都是错误的。*

```python
# 错误写法1：将脚本集当作模块导入
import demo

# 错误写法2：将脚本当作模块导入
import demo.script
from demo import script

# 错误写法3：只导入某个函数
from demo__script import some_func
```

此外，在导入脚本时，应当注意不要产生循环引用，如：

```python
# 脚本集 demo 下的脚本 script2
import demo__script2

# 脚本集 demo 下的脚本 script3
import demo__script3

# 脚本集 demo 下的脚本 script1
import demo__script1
```

*注意，在同时编辑多个脚本时，如果当前导入了另一个脚本，
那么被引用的脚本实际会以已发布的版本执行，
系统在任何时候都不会导入草稿版本！*

### 4.3 单个脚本的代码量及依赖链

由于DataFlux Func运行脚本时，采用动态加载需要的脚本执行。
如果其中一个脚本导入了另一个脚本，被导入的脚本也会被动态加载。

因此，如果某个脚本中的某些函数会被特别频繁地调用，可以考虑将其单独提取为独立的脚本，减少加载消耗。
单个脚本大小建议控制在1000行以内。

此外，也要尽量避免过长的依赖链，导致无意义的性能损耗。如：

- 脚本1依赖脚本2
- 脚本2依赖脚本3
- 脚本3依赖脚本4
- 脚本4依赖脚本5
- ...

Python内置模块和第三方模块不受此限制影响

### 4.4 不划分脚本的情况

上文虽然提到了脚本的合理规划以及脚本之间调用的方法，
但在某些特定情况下（如实际使用到的公共函数很少也很简单时），
可以考虑不划分脚本，将所有代码都放在同一个脚本中。

这种方式，虽然代码产生了一点冗余，但也额外带来了一些好处：

- 单脚本即可运行，减少了加载消耗
- 不会因为公共函数的改变而受到影响
- 不用考虑脚本导出时的依赖关系

请根据实际情况选择最合理的方式规划脚本

## 5. 常见代码处理方式

Python是相当便捷的语言，特定的问题都有比较套路化的处理方式。
以下是一些常见问题的处理方式：

### 5.1 使用列表生成器预发

Python的列表生成器语法可以快速生成列表，在逻辑相对简单时，非常适合。
但要注意的是，过分复杂的处理逻辑会使代码难以阅读。
因此复杂逻辑建议直接使用`for`循环处理。

示例如下：

```python
# 按时间生成dps数据
import time
dps = [ [(int(time.time()) + i) * 1000, i ** 2] for i in range(5) ]
dps = list(dps)
print(dps)
# [[1583172382000, 0], [1583172383000, 1], [1583172384000, 4], [1583172385000, 9], [1583172386000, 16]]

# 将输入的dps乘方
dps = [
    [1583172563000, 0],
    [1583172564000, 1],
    [1583172565000, 2],
    [1583172566000, 3],
    [1583172567000, 4]
]
dps = [ [d[0], d[1] ** 2] for d in dps ]
dps = list(dps)
print(dps)
# [[1583172563000, 0], [1583172564000, 1], [1583172565000, 4], [1583172566000, 9], [1583172567000, 16]]
```


### 5.2 使用内置`map`函数处理列表

Python内置的`map`函数是另一个方便处理列表的函数。
逻辑简单时，可以使用lambda表达式；
逻辑复杂时，可以先定义函数后作为参数传入。

示例如下：

```python
# 使用lambda表达式将输入的dps乘方
dps = [
    [1583172563000, 0],
    [1583172564000, 1],
    [1583172565000, 2],
    [1583172566000, 3],
    [1583172567000, 4]
]
dps = map(lambda x: [x[0], x[1] ** 2], dps)
dps = list(dps)
print(dps)
# [[1583172563000, 0], [1583172564000, 1], [1583172565000, 4], [1583172566000, 9], [1583172567000, 16]]

# 使用传入函数将输入的dps乘方
dps = [
    [1583172563000, 0],
    [1583172564000, 1],
    [1583172565000, 2],
    [1583172566000, 3],
    [1583172567000, 4]
]
def get_pow(x):
    timestamp = x[0]
    value     = x[1] ** 2
    return [timestamp, value]

dps = map(get_pow, dps)
dps = list(dps)
print(dps)
# [[1583172563000, 0], [1583172564000, 1], [1583172565000, 4], [1583172566000, 9], [1583172567000, 16]]
```

### 5.3 获取JSON数据中多层嵌套中的值

有时函数会获取到一个嵌套层数较多的JSON，同时需要获取某个层级下的值。
可以使用`try`语法快速获取。

示例如下：

```python
# 获取level3的值
input_data = {
    'level1': {
        'level2': {
            'level3': 'value'
        }
    }
}
value = None
try:
    value = input_data['level1']['level2']['level3']
except Exception as e:
    pass

print(value)
# value
```

*注意：使用此方法时，`try`代码块中不要添加其他任何无关代码，否则可能导致应当抛出的异常被跳过*

### 5.4 使用`arrow`库正确处理时间

Python内置的日期处理模块在使用上有一定复杂度，并且对时区的支持并不好。
在处理时间时，建议使用第三方`arrow`模块。

> `arrow`模块已经内置，可直接`import`后使用

示例如下：

```python
import arrow

# 获取当前Unix时间戳
print(arrow.utcnow().timestamp)
# 1583174345

# 获取当前北京时间字符串
print(arrow.now('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
# 2020-03-03 02:39:05

# 获取当前北京时间的ISO8601格式字符串
print(arrow.now('Asia/Shanghai').isoformat())
# 2020-03-03T02:39:05.013290+08:00
# 
# 从Unix时间戳解析，并输出北京时间字符串
print(arrow.get(1577808000).to('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
# 2020-01-01 00:00:00

# 从ISO8601时间字符串解析，并输出北京时间字符串
print(arrow.get('2019-12-31T16:00:00Z').to('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
# 2020-01-01 00:00:00

# 从非标准时间字符串解析，并作为北京时间字符串
print(arrow.get('2020-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').replace(tzinfo='Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
# 2020-01-01 00:00:00

# 时间运算：获取前一天，并输出北京时间字符串
print(arrow.get('2019-12-31T16:00:00Z').shift(days=-1).to('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
# 2019-12-31 00:00:00
```

更详细内容，请参考`arrow`官方文档：
[https://arrow.readthedocs.io/](https://arrow.readthedocs.io/)

### 5.5 向外部发送HTTP请求

Python内置的`http`处理模块在使用上有一定复杂度。
在发送http请求时，建议使用第三方`requests`模块。

示例如下：

```python
import requests

# 发送GET请求
r = requests.get('https://api.github.com/')
print(r.status_code)
print(r.json())

# form方式发送POST请求
r = requests.post('https://httpbin.org/post', data={'key':'value'})
print(r.status_code)
print(r.json())

# json方式发送POST请求
r = requests.post('https://httpbin.org/post', json={'key':'value'})
print(r.status_code)
print(r.json())
```

更详细内容，请参考`requests`官方文档：
[https://requests.readthedocs.io/](https://requests.readthedocs.io/)

### 5.6 发送钉钉机器人消息

钉钉自定义机器人可以简单的通过POST请求将消息推送到群中，是作为消息提示的不二选择。
由于只需要发送HTTP请求即可，因此可以直接使用`requests`模块。

示例如下：

```python
import requests

url = 'https://oapi.dingtalk.com/robot/send?access_token=xxxxx'
body = {
    'msgtype': 'text',
    'text': {
        'content': '钉钉机器人提示信息 @180xxxx0000'
    },
    'at': {
        'atMobiles': [
            '180xxxx0000'
        ]
    }
}
requests.post(url, json=body)
```

*注意：新版的钉钉群机器人添加了相关安全验证处理，具体请参考官方文档*

更详细内容，请参考钉钉机器人官方文档：
[https://developers.dingtalk.com/document/app/custom-robot-access](https://developers.dingtalk.com/document/app/custom-robot-access)

### 5.7 避免SQL注入

当需要将函数的传入参数作为SQL语句的参数时，需要注意避免SQL注入问题。
应当始终使用内置的数据源操作对象提供的`sql_params`参数，而不要直接拼接SQL语句字符串。

以下为正确示例：

```python
helper.query('SELECT * FROM table WHERE id = ?', sql_params=[target_id])
```

以下错误示范：

```python
helper.query("SELECT * FROM table WHERE id = '{}'".format(target_id))
helper.query("SELECT * FROM table WHERE id = '%s'" % target_id)
```

实际各类型的数据源操作对象使用方法略有不同，请参考「操作数据源 `DFF.SRC(...)`」章节

百度百科「SQL注入」词条：
[https://baike.baidu.com/item/sql%E6%B3%A8%E5%85%A5](https://baike.baidu.com/item/sql%E6%B3%A8%E5%85%A5)

W3Cschool「MySQL 及 SQL 注入」章节：
[https://www.w3cschool.cn/mysql/mysql-sql-injection.html](https://www.w3cschool.cn/mysql/mysql-sql-injection.html)

