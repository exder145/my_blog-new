---
title: sql server无法连接的问题
published: 2024-12-25
description: "SQL Server数据库连接问题的解决方案"
tags: [数据库, SQL Server, 编程技术]
category: "编程技术"
draft: false
author: EXDER
---

_记录一下 sql server 连接不上的问题_

<!-- more -->

# SQL Server 数据库连接问题

## 连接测试用代码:

```c++
import pymssql

# 数据库连接信息 (修改为自己的)
username = 'sa'
password = 'hp6252'
database = 'news'
server = 'localhost'
port = '1433'

try:
    # 尝试连接数据库
    connect = pymssql.connect(server=server, port=port, user=username, password=password, database=database)
    cursor = connect.cursor()
    print("连接成功！")

    # 执行简单查询
    cursor.execute("SELECT 1")
    result = cursor.fetchone()
    print("查询结果:", result)

    # 关闭游标和连接
    cursor.close()
    connect.close()
except pymssql.Error as e:
    print("连接失败:", e)
```

## 能解决大部分问题的方案

解决方案: **重启数据库服务**

[![945ca000cde36425d1c59f638df692a.png](https://i.postimg.cc/s2nvxkgS/945ca000cde36425d1c59f638df692a.png)](https://postimg.cc/Jyk1ddJ4)

直接在任务管理器图示位置进行服务重启,或:

进入 CMD，输入 **services.msc** ，进入到服务页面,找到 SQL Server(SQLEXPRESS)右键重启。

![image-20241225234307779.png](https://s2.loli.net/2024/12/26/AB9JvIzanxDYj1p.png)

可以顺手把启动方式该成自动。

后重新启动 ssms。进行验证

## 如果还是不能解决的方案

若仍然无效，可通过以下步骤进行排查：

### 1. 确认 SQL Server 服务是否运行

- 打开“服务”管理工具
- 找到 SQL Server 服务（通常是以 `SQL Server (MSSQLSERVER)` 命名）
- 确认其状态为“正在运行”。

#### 代码示例

在命令提示符中可以使用以下命令来查看服务状态：

```bash
sc query "MSSQLSERVER"
1.
```

### 2. 检查网络连接

如果 SQL Server 服务正常运行，下一步需要检查网络连接是否正常。可以通过 `ping` 命令测试连接：

```bash
ping <数据库服务器IP>
1.
```

#### 代码示例

假设数据库服务器的 IP 地址为 `192.168.1.100`，可以使用以下命令：

```bash
ping 192.168.1.100
1.
```

如果无法 ping 通，需检查网络设置或是否有防火墙阻止连接。

### 3. 验证 SQL Server 实例名和端口

在连接数据库时，确保使用了正确的实例名和端口。如果使用的是默认实例，通常可以直接使用服务器的 IP 地址或主机名。如果使用的是命名实例，则需要在连接字符串中指定实例名。

#### 例子

默认实例连接字符串:

```sql
Server=192.168.1.100;Database=SampleDB;User Id=myUsername;Password=myPassword;
1.
```

命名实例连接字符串:

```sql
Server=192.168.1.100\SQLExpress;Database=SampleDB;User Id=myUsername;Password=myPassword;
1.
```

### 4. 检查 SQL Server [配置管理器](https://edu.51cto.com/lesson/1035954.html?utm_platform=pc&utm_medium=51cto&utm_source=shequ&utm_content=bk_article_keyword#配置管理器)

确保 SQL Server 正在接受远程连接。可以通过以下步骤在 SQL Server 配置管理器中进行检查：

1. 打开 SQL Server 配置管理器
2. 点击 “SQL Server 网络配置”，然后选择 “协议”。
3. 确保 “TCP/IP” 协议已启用。

### 5. 防火墙设置

如果服务和网络连接正常，我们还需要检查防火墙设置。确保 SQL Server 所使用的端口（默认是 1433 对于 TCP/IP）已被允许通过防火墙。

#### 代码示例（Windows 防火墙配置）

在命令提示符中使用以下命令允许 1433 端口：

```bash
netsh advfirewall firewall add rule name="SQL Server Port 1433" dir=in action=allow protocol=TCP localport=1433
1.
```

### 6. 使用 SQLCMD 测试连接

可以使用 SQL Server 提供的 SQLCMD 工具来测试连接，以确保连接字符串的正确性。

#### 代码示例

```bash
sqlcmd -S 192.168.1.100 -U myUsername -P myPassword
1.
```

如果连接成功，则会提示 入 SQL 命令。

### 7. 错误日志

如果以上步骤仍未解决问题，可以查阅 SQL Server 错误日志。错误日志通常可以在 SQL Server Management Studio 的“管理”部分找到。

#### 代码示例

查看错误日志的 SQL 语句：

登录后复制

```sql
EXEC xp_readerrorlog;
```
