# DataFlux Func 维护手册

本文档主要面向运维，提供有关DataFlux Func 安装部署、日常维护、故障排除等相关介绍

## 目录

<!-- MarkdownTOC autolink="false" levels="1,2,3,4" -->

- 1. 系统及环境要求
    - 1.1 系统要求
    - 1.2 软件准备
- 2. 快速部署
    - 2.1. 使用「携带版」离线部署【推荐】
        - 2.1.1 一键命令下载「携带版」
        - 2.1.2 手工下载「携带版」
        - 2.1.3 使用自动部署脚本执行部署
    - 2.2. 验证安装
    - 2.3. 使用一键安装命令在线安装
    - 2.4. 安装选项
        - 2.4.1 「携带版」指定安装选项
        - 2.4.2 在线安装版指定安装选项
        - 2.4.3 可用安装选项
- 3. 日常维护
    - 4.1 更新部署
    - 4.2 重启系统
    - 4.3 查看Docker Stack 配置
    - 4.4 查看DataFlux Func 配置
    - 4.5 查看资源文件目录
    - 4.6 查看日志
    - 4.7 数据库自动备份
    - 4.8 完全卸载
    - 4.9 参数调整
    - 4.10 迁移数据库
    - 4.11 高可用部署
- 5. 故障排查
    - 5.1 安装部署时脚本中断
    - 5.2 安装部署完成后无法启动
    - 5.3 安装部署完成后启动成功但无法访问
    - 5.4 函数执行返回超时
        - 5.4.1 函数执行耗时过长导致工作进程被Kill
        - 5.4.2 函数执行耗时过长导致API接口提前返回
    - 5.5 函数执行无响应
        - 5.5.1 测试函数有响应
        - 5.5.2 测试函数无响应

<!-- /MarkdownTOC -->

## 1. 系统及环境要求

安装部署DataFlux 之前，请务必确认环境已经满足以下条件

### 1.1 系统要求

运行DataFlux Func 的主机需要满足以下条件：

- CPU 核心数 >= 2
- 内存容量 >= 4GB
- 磁盘空间 >= 20GB
- 操作系统为 Ubuntu 16.04 LTS/CentOS 7.6 以上
- 纯净系统（安装完操作系统后，除了配置网络外没有进行过其他操作）

### 1.2 软件准备

本系统基于Docker Stack部署，因此：

对于在线安装版，要求操作系统已经可以正常使用Docker 和Docker Stack。

对于携带版，安装脚本本身已经自带了Docker 的安装包并会在部署时自动安装。
用户也可以自行安装Docker 并初始化Docker Swarm，然后运行部署脚本，
部署脚本在发现Docker 已经安装后会自动跳过这部分处理。

- Docker Swarm 初始化命令为：`docker swarm init`

如果本机存在多个网卡，需要在上述初始化命令中指定网卡

- 存在多网卡的建议用户自行安装Docker 并初始化Docker Swarm
- Docker Swarm 指定网卡的初始化命令为：`docker swarm init --advertise-addr={网卡名}`
- 本机网卡列表可以通过`ifconfig`或者`ip addr`查询

## 2. 快速部署

### 2.1. 使用「携带版」离线部署【推荐】

*本方式为推荐部署方式*

DataFlux Func 支持将所需资源下载后，通过U盘等移动设备带入无公网环境安装的「携带版」。

下载的「携带版」本身附带了自动安装脚本，执行即可进行安装部署（详情见下文）

#### 2.1.1 一键命令下载「携带版」

对于Linux、macOS 等系统，推荐使用官方提供的shell 命令下载「携带版」。

运行以下命令，即可自动下载DataFlux Func携带版的所需文件：

```shell
/bin/bash -c "$(curl -fsSL https://t.dataflux.cn/func-portable-download)"
```

命令执行完成后，所有所需文件都保存在当前目录下新创建的`dataflux-func-portable`目录下。
直接将整个目录通过U盘等移动存储设备复制到目标机器中。

#### 2.1.2 手工下载「携带版」

对于不便使用shell 命令的系统，可手工下载所需资源文件。

如需要手工下载，以下是所有的文件列表：

1. [Docker 二进制程序： docker-18.06.3-ce.tgz](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/docker-18.06.3-ce.tgz)
2. [Docker 服务配置文件： docker.service](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/docker.service)
3. [MySQL 镜像： mysql.tar.gz](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/mysql.tar.gz)
4. [Redis 镜像： redis.tar.gz](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/redis.tar.gz)
5. [Mosquitto 镜像： eclipse-mosquitto.tar.gz](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/eclipse-mosquitto.tar.gz)
6. [DataFluxFunc 镜像： dataflux-func.tar.gz](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/dataflux-func.tar.gz)
7. [Docker Stack 配置文件：docker-stack.example.yaml](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/docker-stack.example.yaml)
8. [DataFluxFunc 部署脚本：run-portable.sh](https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/portable/run-portable.sh)

手工下载所有文件后，放入新建的`dataflux-func-portable`目录下即可。

*注意：如有更新，【重新下载所有文件】。请勿自行猜测哪些文件有变动，哪些没有变动*

*注意：手工下载时，如使用浏览器等下载时，请注意不要下载到缓存的旧内容！！*

#### 2.1.3 使用自动部署脚本执行部署

在已经下载的`dataflux-func-portable`目录下，
运行以下命令，即可自动配置并最终启动整个DataFlux Func：

```shell
/bin/bash run-portable.sh
```

使用自动部署脚本可以实现几分钟内快速部署运行，自动配置的内容如下：

- 运行MySQL、Redis、DataFlux Func（包含Server，Worker，Beat）
- 自动创建并将所有数据保存于`/usr/local/dataflux-func/`目录下（包括MySQL数据、Redis数据、DataFlux Func 配置、日志等文件）
- 随机生成MySQL `root`用户密码、系统Secret，并保存于DataFlux Func 配置文件中
- Redis不设密码
- MySQL、Redis 不提供外部访问

执行完成后，可以使用浏览器访问`http://{服务器IP地址/域名}:8088`进行初始化操作界面。

*注意：如果运行环境性能较差，应当使用`docker ps`命令确认所有组件成功启动后，方可访问（见以下列表）*

1. `dataflux-func_mysql`
2. `dataflux-func_redis`
3. `dataflux-func_server`
4. `dataflux-func_worker-0`
5. `dataflux-func_worker-1-6`
6. `dataflux-func_worker-7`
7. `dataflux-func_worker-8-9`
8. `dataflux-func_beat`

### 2.2. 验证安装

DataFlux Func 默认安装完成后，就已经附带了一些示例脚本。

依次执行以下操作，即可验证安装：

1. 点击顶部导航条的「脚本编辑器」
2. 在左侧栏选择「脚本库」-「示例」-「基础演示」
3. 在右侧脚本编辑器顶部，点击「编辑」进入编辑模式，选择「hello_world」函数并点击「执行」按钮执行函数
4. 此时，如果在底部「脚本输出」中，能够正常看到函数的返回值

至此，验证安装完毕 

### 2.3. 使用一键安装命令在线安装

*由于涉及私有镜像库等事宜，本方式不做为首推方案*

DataFlux Func 提供了一键安装脚本，可以在数分钟内完成部署运行。

*注意：需要事先登录驻云官方镜像库*

运行以下命令，即可自动下载配置脚本并最终启动整个DataFlux Func：

```shell
/bin/bash -c "$(curl -fsSL https://t.dataflux.cn/func-docker-stack-run)"
```

使用自动部署脚本可以实现几分钟内快速部署运行，自动配置的内容如下：

- 运行MySQL、Redis、DataFlux Func（包含Server，Worker，Beat）
- 自动创建并将所有数据保存于`/usr/local/dataflux-func/`目录下（包括MySQL数据、Redis数据、DataFlux Func 配置、日志等文件）
- 随机生成MySQL `root`用户密码、系统Secret，并保存于DataFlux Func 配置文件中
- Redis不设密码
- MySQL、Redis 不提供外部访问

执行完成后，可以使用浏览器访问`http://localhost:8088`进行初始化操作界面。

*注意：如果运行环境性能较差，应当使用`docker ps`命令确认所有组件成功启动后，方可访问（见以下列表）*

1. `dataflux-func_mysql`
2. `dataflux-func_redis`
3. `dataflux-func_server`
4. `dataflux-func_worker-0`
5. `dataflux-func_worker-1-6`
6. `dataflux-func_worker-7`
7. `dataflux-func_worker-8-9`
8. `dataflux-func_beat`



### 2.4. 安装选项

自动安装脚本支持一些安装选项，用于适应不同的安装需求

#### 2.4.1 「携带版」指定安装选项

安装「携带版」时，只需要在自动部署命令后添加`--{参数}[ 参数配置（如有）]`，即可指定安装选项

```shell
# 示例：指定安装目录，同时开启MQTT组件（mosquitto）
/bin/bash run-portable.sh --install-dir /home/dev/datafluxfunc --mqtt
```

#### 2.4.2 在线安装版指定安装选项

使用一键安装命令在线安装时，只需要在自动部署命令后添加`-- --{参数}[ 参数配置（如有）]`，即可指定安装选项

```shell
# 示例：指定安装目录，同时开启MQTT组件（mosquitto）
/bin/bash -c "$(curl -fsSL https://t.dataflux.cn/func-docker-stack-run)" -- --install-dir /home/dev/datafluxfunc --mqtt
```

*注意：参数前确实有`--`，表示参数传递给需要执行的脚本，此处不是笔误*

#### 2.4.3 可用安装选项

具体参数详情见下文

##### `--mini`：安装迷你版

针对低配置环境下，需要节约资源时的安装模式。

开启后：

- 仅启动单个Worker 监听所有队列
- 遇到重负载任务更容易导致队列阻塞和卡顿
- 系统任务和函数任务共享处理队列，相互会受到影响
- 系统要求降低为：
    - CPU 核心数 >= 1
    - 内存容量 >= 2GB
- 如不使用内置的MySQL、Redis，系统要求可以进一步降低

##### `--install-dir {安装目录}`：指定安装目录

需要安装到与默认路径`/usr/local/dataflux-func`不同的路径下时，可指定此参数

##### `--no-mysql`：禁用内置MySQL

需要使用已有的MySQL数据库时，可指定此参数，禁止在本机启动MySQL。

*注意：启用此选项后，需要在安装完成后的配置页面指定正确的MySQL连接信息*

##### `--no-redis`：禁用内置Redis

需要使用已有的Redis数据库时，可指定此参数，禁止在本机启动Redis。

*注意：启用此选项后，需要在安装完成后的配置页面指定正确的Redis连接信息*

##### `--mqtt`：启用内置MQTT Broker

需要安装后，同时在本机启动MQTT Broker时，可指定此选项。

*注意：内置的MQTT Broker 为`eclipse-mosquitto`，并会自动生成对应的数据源*


## 3. 日常维护

默认情况下，安装目录为`/usr/local/dataflux-func`

### 4.1 更新部署

*注意：如果最初安装时指定了不同安装目录，更新时也需要指定完全相同的目录才行*

需要更新部署时，请按照以下步骤进行：

1. 使用`docker stack rm dataflux-func`命令，移除正在运行的服务（此步骤可能需要一定时间）
2. 使用`docker ps`确认所有容器都已经退出
3. 重新部署即可（脚本不会删除原先的数据）

### 4.2 重启系统

需要重新启动时，请按照以下步骤进行：

1. 使用`docker stack rm dataflux-func`命令，移除正在运行的服务（此步骤可能需要一定时间）
2. 使用`docker ps`确认所有容器都已经退出
3. 使用`docker stack deploy dataflux-func -c {安装目录}/docker-stack.yaml`重启所有服务

### 4.3 查看Docker Stack 配置

默认情况下，Docker Stack 配置文件保存位置如下：

|   环境   |            文件位置            |
|----------|--------------------------------|
| 宿主机内 | `{安装目录}/docker-stack.yaml` |

### 4.4 查看DataFlux Func 配置

默认情况下，配置文件保存位置如下：

|   环境   |              文件位置              |
|----------|------------------------------------|
| 容器内   | `/data/user-config.yaml`           |
| 宿主机内 | `{安装目录}/data/user-config.yaml` |

### 4.5 查看资源文件目录

默认情况下，资源文件目录保存位置如下：

|   环境   |           目录位置           |
|----------|------------------------------|
| 容器内   | `/data/resources/`           |
| 宿主机内 | `{安装目录}/data/resources/` |

资源文件目录可能包含以下内容：

|                  宿主机目录位置                   |                       说明                       |
|---------------------------------------------------|--------------------------------------------------|
| `{安装目录}/data/resources/extra-python-packages` | 通过UI界面「PIP工具」安装的额外Python 包存放位置 |
| `{安装目录}/data/resources/uploads`               | 通过接口上传文件的临时存放目录（会自动回卷清理） |

开发者/用户也可以自行将所需的其他资源文件存放在`{安装目录}/data/resources`下，
以便在脚本中读取使用。

*以上目录程序会自动创建*

### 4.6 查看日志

默认情况下，日志文件保存位置如下：

|   环境   |                 文件位置                 |
|----------|------------------------------------------|
| 容器内   | `/data/logs/dataflux-func.log`           |
| 宿主机内 | `{安装目录}/data/logs/dataflux-func.log` |

默认情况下，日志文件会根据logrotate配置自动回卷并压缩保存
（logrotate配置文件位置为`/etc/logrotate.d/dataflux-func`）

### 4.7 数据库自动备份

DataFlux Func 会定期自动备份完整的数据库为sql文件

默认情况下，数据库备份文件保存位置如下：

|   环境   |                               文件位置                              |
|----------|---------------------------------------------------------------------|
| 容器内   | `/data/sqldump/dataflux-func-sqldump-YYYYMMDD-hhmmss.sql`           |
| 宿主机内 | `{安装目录}/data/sqldump/dataflux-func-sqldump-YYYYMMDD-hhmmss.sql` |

*提示：旧版本的备份文件命名可能为`dataflux-sqldump-YYYYMMDD-hhmmss.sql`*

默认情况下，数据库备份文件每小时整点备份一次，最多保留7天（共168份）

### 4.8 完全卸载

某些情况无法直接升级的时候，可以先完全卸载后重新部署

需要完全卸载时，请按照以下步骤进行：

1. 视情况需要，使用脚本集导出功能导出脚本数据
2. 使用`docker stack rm dataflux-func`命令，移除正在运行的旧版本（此步骤可能需要一定时间）
3. 使用`rm -rf {安装目录}`命令，移除所有相关数据

### 4.9 参数调整

默认的参数主要应对最常见的情况，一些比较特殊的场景可以调整部分参数来优化系统：

|              参数             |  默认值   |                                                   说明                                                  |
|-------------------------------|-----------|---------------------------------------------------------------------------------------------------------|
| `LOG_LEVEL`                   | `WARNING` | 日志等级。<br>可以改为`ERROR`减少日志输出量。<br>或直接改为`NONE`禁用日志                               |
| `_WORKER_CONCURRENCY`         | `5`       | 工作单元进程数量。<br>如存在大量慢IO任务（耗时大于1秒），可改为`20`提高并发量，但不要过大，防止内存耗尽 |
| `_WORKER_PREFETCH_MULTIPLIER` | `10`      | 工作单元任务预获取数量。<br>如存在大量慢速任务（耗时大于1秒），建议改为`1`                              |

### 4.10 迁移数据库

如系统部署后通过了最初的单机验证阶段，
需要将数据库切换至外部数据库（如：阿里云RDS、Redis），
可根据以下步骤进行操作：

*注意：当使用外部数据库时，应确保MySQL版本为5.7，Redis版本为4.0以上*

*注意：DataFlux Func 不支持集群部署的Redis*

1. 在外部数据库实例中创建数据库，且确保如下两项配置：
    - `character-set-server=utf8mb4`
    - `collation-server=utf8mb4_unicode_ci`
2. 根据上文「数据库自动备份」找到最近的MySQL数据库备份文件，将其导入外部数据库
3. 根据上文「查看DataFlux Func 配置」找到配置文件，并根据实际情况修改以下字段内容：
    - `MYSQL_HOST`
    - `MYSQL_PORT`
    - `MYSQL_USER`
    - `MYSQL_PASSWORD`
    - `MYSQL_DATABASE`
    - `REDIS_HOST`
    - `REDIS_PORT`
    - `REDIS_DATABASE`
    - `REDIS_PASSWORD`
4. 根据上文「查看Docker Stack 配置」找到Docker Stack 文件，删除其中的MySQL 和Redis 相关部分（注释掉即可）
5. 根据上文「重启系统」重启即可

### 4.11 高可用部署

DataFlux Func 支持多份部署以满足高可用要求。

以阿里云为例，可使用「SLB + ECS x 2 + RDS + Redis」方式进行部署。

如果开发涉及到服务器端文件处理（如上传文件等）、额外安装Python包，
则需要额外配置NFS/NAS 作为文件共享存储。
并将共享挂载到ECS 的`{安装目录}/data/resources`目录。

```
                        +-------------+
                        |             |
                        |     SLB     |
                        |             |
                        +-------------+
                               |
                               |
                   +-----------+----------+
                   |                      |
                   v                      v
            +-------------+        +-------------+
            |             |        |             |
            |    ECS-1    |        |    ECS-2    |
            |             |        |             |
            +-------------+        +-------------+
                   |                      |
                   |                      |
       +-----------+----------+-----------+----------+
       |                      |                      |
       v                      v                      v
+-------------+        +-------------+        +-------------+
|             |        |             |        |             |
|     RDS     |        |    Redis    |        |   NFS/NAS   |
|             |        |             |        |  (optional) |
+-------------+        +-------------+        +-------------+
```

部署步骤：

1. 在ECS-1 全自动部署DataFlux Func，并配置连接外部RDS 和Redis
2. 在ECS-2 正常部署DataFlux Func，复制ECS-1的配置文件并覆盖ECS-2的配置文件，重启ECS-2的服务

*注意：如之前已经使用单机方式部署过DataFlux Func，在切换为高可用部署时，请参考上文「5.8 迁移数据库」进行迁移*

*注意：本方案为最简单的多份部署方案，由于ECS-1 与ECS-2 之间并不通讯，因此涉及到安装额外Python包、上传文件等处理时，需要使用共享文件存储*

## 5. 故障排查

由于系统本身具有一定复杂性，当遇到问题时，可以根据下文进行初步判断大概可能存在的问题点。

*注意：DataFlux Func 不支持集群部署的Redis，如集群部署的Redis 可能发生各种奇怪的问题*

### 5.1 安装部署时脚本中断

安装部署时，很多情况都有可能导致脚本中断，但一般都是由于不满足系统要求导致。

可能原因及解决方案：

|                      原因                     |                       解决方案                      |
|-----------------------------------------------|-----------------------------------------------------|
| 所用操作系统不支持Docker 及相关组件的安装运行 | 更换操作系统                                        |
| 主机具有多个网卡                              | 参考上文「软件准备」中有关Docker Swarm 初始化的描述 |

在排除问题后，重新运行脚本即可

### 5.2 安装部署完成后无法启动

此问题一般是由于配置、防火墙、各种白名单配置不正确引起。

具体表现为：

1. 使用浏览器无法打开页面
2. 使用`docker ps -a`命令查看容器列表时，发现重启在不断重启
3. 在部署服务器本机使用`curl http://localhost:8088`返回`curl: (7) Failed to connect to localhost port 8088: Connection refused`错误
3. 日志文件中不断输出错误堆栈信息

可能原因及解决方案：

|                   原因                   |                           解决方案                           |
|------------------------------------------|--------------------------------------------------------------|
| 当前版本的系统确实存在BUG                | 更换其他版本，并联系驻云官方                                 |
| 手工修改过配置但配置存在错误             | 检查修改过的配置文件，检查如YAML语法、数据库链接信息是否正确 |
| 修改配置指定了外部服务器，但实际网络不通 | 检查防火墙、阿里云安全组配置、数据库链接白名单等配置         |

### 5.3 安装部署完成后启动成功但无法访问

此问题一般是由于网络问题引起。

具体表现为：

1. 在部署服务器本机使用`curl http://localhost:8088`正常返回`Found. Redirecting to /client-app`跳转信息
2. 在其他设备上使用`curl http://{服务器地址}:8088`无响应，或直接返回拒绝连接

可能原因及解决方案：

|                    原因                   |                 解决方案                 |
|-------------------------------------------|------------------------------------------|
| IP/域名解析等不正确                       | 检查并通过正确的地址访问                 |
| 服务器的防火墙、阿里云安全组配置不正确    | 修改配置，允许外部访问服务器的`8088`端口 |
| 额外增加了如Nginx做反向代理，但配置不正确 | 检查反向代理服务器的配置                 |

### 5.4 函数执行返回超时

函数执行超时可能有多种可能，需要根据不同情况进行辨别

#### 5.4.1 函数执行耗时过长导致工作进程被Kill

为了保护系统，DataFlux Func 对函数执行的最长时间有限制，不允许无限制运行下去。
在超过一定时间后，会直接Kill掉执行进程。

具体表现为：

1. 浏览器访问`/api/v1/al/auln-xxxxx`接口时，长时间卡在加载中状态
2. curl方式调用`GET|POST /api/v1/al/auln-xxxxx`接口返回状态码`599`，返回数据类似如下：

```json
{
    "detail": {
        "einfoTEXT": "raise SoftTimeLimitExceeded()\nbilliard.exceptions.SoftTimeLimitExceeded: SoftTimeLimitExceeded()",
        "id": "task-xxxxx"
    },
    "error": 599.31,
    "message": "Calling Function timeout.",
    "ok": false,
    "reason": "EFuncTimeout",
    "reqCost": 5020,
    "reqDump": {
        "method": "GET",
        "url": "/api/v1/al/auln-xxxxx"
    },
    "traceId": "TRACE-xxxxx"
}
```

其中，`reqCost`字段为此函数从开始执行到被Kill经过的时间（毫秒）

可能原因及解决方案：

|                               原因                              |                                         解决方案                                         |
|-----------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 所执行的函数指定了`timeout`超时参数（秒），且函数运行超时       | 联系函数开发者排查错误，包括且不限于：<br>超时参数设置过短<br>函数内调用外部系统响应过慢 |
| 所执行的函数未指定`timeout`超时参数，但函数运行超过默认超时限制 | 同上                                                                                     |
| 使用浏览器访问时，耗时过长，浏览器主动断开连接                  | 联系函数开发者排查错误，无法提高响应时考虑其他异步方案                                   |

> 函数超时默认为`30秒`，最大设置为`3600秒`

#### 5.4.2 函数执行耗时过长导致API接口提前返回

为了保护系统，DataFlux Func 对使用HTTP 接口【同步】调用函数的最长响应时间有限制，不允许服务器无限制保持HTTP连接。
在超过一定时间后，API层面会放弃等待函数返回，直接响应HTTP 请求。

具体表现为：

1. 调用`GET|POST /api/v1/al/auln-xxxxx`接口返回状态码`599`，返回数据类似如下：

```json
{
    "detail": {
        "id": "task-xxxxx"
    },
    "error": 599.1,
    "message": "Waiting function result timeout, but task is still running. Use task ID to fetch result later.",
    "ok": false,
    "reason": "EAPITimeout",
    "reqCost": 3011,
    "reqDump": {
        "method": "GET",
        "url": "/api/v1/al/auln-xxxxx"
    },
    "traceId": "TRACE-xxxxx"
}
```

*注意：API接口超时仅表示HTTP 响应时间超时，此时函数可能依然在后台运行，并遵循函数超时处理逻辑*

可能原因及解决方案：

|                                  原因                                  |                                           解决方案                                          |
|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 所执行的函数指定了`api_timeout`API超时参数（秒），且函数运行超时       | 联系函数开发者排查错误，包括且不限于：<br>API超时参数设置过短<br>函数内调用外部系统响应过慢 |
| 所执行的函数未指定`api_timeout`API超时参数，但函数运行超过默认超时限制 | 同上                                                                                        |

> API超时默认为`10秒`，最大设置为`180秒`。同时，API超时不会长于函数超时

### 5.5 函数执行无响应

函数执行无响应可能有多种可能，需要根据不同情况进行辨别

具体表现为：

1. 浏览器访问接口时，长时间处于加载中状态
2. curl方式调用接口时，长时间没有任何响应

此时，需要在DataFlux Func 中写一个测试函数，并将其配置为「授权链接」，来帮助判断原因。

测试函数如下：

```python
@DFF.API('Test Func')
def test_func():
    return 'ok'
```

#### 5.5.1 测试函数有响应

可能原因及解决方案：

|              原因              |        解决方案        |
|--------------------------------|------------------------|
| 所调用函数确实需要运行很长时间 | 联系函数开发者排查问题 |

#### 5.5.2 测试函数无响应

可能原因及解决方案：

|        原因       |                  解决方案                  |
|-------------------|--------------------------------------------|
| 存在队列阻塞      | 前往「关于 - 获取系统报告 - 清空工作队列」 |
| Redis连接存在问题 | 重启系统，排查Redis连接配置是否正确        |
