---
title: MYSQL基本语法
published: 2024-07-10
description: "MySQL数据库的基本语法和操作指南"
tags: [MYSQL, 数据库, 编程技术]
category: "编程技术"
draft: false
author: EXDER
---

_关于 MYSQL 基本语法总结_

<!-- more -->

# MySQL 基本语法

## 概述

在数据库管理中，SQL 语句可以分为几个不同的类别，主要包括 DDL (数据定义语言) 和 DML (数据操纵语言)，还有 DCL (数据控制语言) 和 TCL (事务控制语言)。每个类别都有其特定的用途和对应的命令集。

### DDL (数据定义语言)

DDL，即数据定义语言，主要用于定义和修改数据库结构。这些命令对数据库的结构进行操作，如创建表、修改表结构、删除表等。

**常见的 DDL 命令包括：**

- `CREATE`：用于创建新的数据库或数据库表
- `ALTER`：用于修改现有数据库对象的结构，如添加、删除或修改表中的列
- `DROP`：用于删除整个数据库或表
- `TRUNCATE`：用于删除表中的所有行，但不删除表本身

### DQL(数据查询语言)

数据库[查询语言](https://baike.baidu.com/item/%E6%9F%A5%E8%AF%A2%E8%AF%AD%E8%A8%80/2661811?fromModule=lemma_inlink)。关键字：SELECT … FROM … WHERE。

### DML (数据操纵语言)

DML，即数据操纵语言，主要用于添加、删除、更新和查询数据库记录。

**常见的 DML 命令包括：**

- `INSERT`：向表中插入新的数据行
- `UPDATE`：更新表中的现有数据
- `DELETE`：从表中删除数据

### DCL (数据控制语言)

DCL，即数据控制语言，用于定义数据库的安全策略和权限控制。

**常见的 DCL 命令包括：**

- `GRANT`：授权用户访问和操作数据库的权限
- `REVOKE`：撤销已经授予的权限

### TCL (事务控制语言)

TCL，即事务控制语言，用于管理事务，确保数据的完整性。

**常见的 TCL 命令包括：**

- `COMMIT`：提交当前事务，使自上一个 `COMMIT` 或 `ROLLBACK` 以来进行的所有修改成为永久性的
- `ROLLBACK`：回滚当前事务，撤销自上一个 `COMMIT` 或 `ROLLBACK` 以来进行的所有修改
- `SAVEPOINT`：在事务中设置一个保存点，可以回滚到该点而不是完全回滚事务

这些命令集使数据库管理员和开发者能够有效地管理和操作数据库系统。使用时需要根据实际需要选择合适的命令类型。

## DDL 语句-创建表

```jsx
CREATE TABLE example_table (
    id INT AUTO_INCREMENT,    name VARCHAR(100) NOT NULL,    age INT DEFAULT 0,    PRIMARY KEY (id)
);
```

### 添加列

```jsx
ALTER TABLE example_table
ADD email VARCHAR(255);
```

### 删除列

```jsx
ALTER TABLE example_table
DROP COLUMN email;
```

### 修改列类型

```jsx
ALTER TABLE example_table
MODIFY COLUMN name VARCHAR(200);
```

## DQL/DML 语句

### 查询操作

### 查询所有管理员信息

```jsx
-- 查询所有管理员的详细信息
SELECT * FROM admins;
```

### 查询特定管理员

```jsx
-- 根据用户名查询管理员信息
SELECT * FROM admins WHERE username = 'liulei07';
```

### 查询特定列

```python
-- 查找数据库某几列
SELECT usersname,age FROM members;# 使用逗号链接多个列，from后跟列表名
```

![](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20241230203004452.png)

**多个查询条件使用 and 链接**

![image-20241230203012098](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20241230203012098.png)

### 插入操作

### 添加新管理员

```sql
-- 插入一个新的管理员记录INSERT INTO admins (username, password, name, avatar, phone, email)
VALUES ('zhangsan', 'Zhang123', '张三', 'avatar_zhang.jpg', '13812345678', 'zhangsan@example.com');
```

### 删除操作

### 删除指定管理员

```sql
-- 删除用户名为 'zhangsan' 的管理员DELETE FROM admins WHERE username = 'zhangsan';
#注意条件：单独修改某一条数据
```

**注意：开自动递增，id 删除后新建数据，id 不会继续递增而是跳过删除的数据**

**想要 id 重新开始排序：截断表（清空排序）**

![image-20241230203016586](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20241230203016586.png)

### 修改操作

### 更新管理员信息

```sql
-- 更新管理员 'liulei07' 的电子邮箱和电话号码UPDATE admins
SET email = 'newemail@example.com', phone = '13987654321'# 修改某一列的操作，用逗号连接多个列
WHERE username = 'liulei07';
#条件：单独修改某一条数据
```

### 分组与聚合统计

### 统计各个用户名下的记录数

```sql
-- 统计每个用户名下的记录数量SELECT username, COUNT(*) AS user_count
FROM admins
GROUP BY username;
```

在 SQL 中，分组操作通常与
`GROUP BY` 子句结合使用，这允许你按照一个或多个列对结果集进行分组。这通常用于与聚合函数（如 `COUNT`, `SUM`, `AVG`, `MAX`, `MIN` 等）结合，以对各个分组进行统计计算。

### 获取最大、最小管理员 ID

```sql
-- 获取当前管理员中的最大和最小 IDSELECT MAX(admin_id) AS max_id, MIN(admin_id) AS min_id
FROM admins;
```

### 关联查询

### 创建收货地址表

创建一个新的表 `shipping_addresses`，该表包含管理员的收货地址详情：

```sql
CREATE TABLE shipping_addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    address VARCHAR(255) NOT NULL COMMENT '收货地址详细信息',
    city VARCHAR(100) NOT NULL COMMENT '城市',
    state VARCHAR(100) NOT NULL COMMENT '州/省',
    postal_code VARCHAR(20) NOT NULL COMMENT '邮政编码',
    country VARCHAR(100) NOT NULL COMMENT '国家',
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员的收货地址';
```

### 插入关联数据

```sql
-- 插入管理员 liulei07 的收货地址INSERT INTO shipping_addresses (admin_id, address, city, state, postal_code, country)
VALUES (1, '1234 Elm St', 'Beijing', 'Beijing', '100000', 'China'),
       (1, '5678 Oak St', 'Shanghai', 'Shanghai', '200000', 'China');
-- 插入管理员 chenmei12 的收货地址INSERT INTO shipping_addresses (admin_id, address, city, state, postal_code, country)
VALUES (2, '4321 Pine St', 'Chengdu', 'Sichuan', '610000', 'China');
```

### 进行关联查询操作

```sql
-- 查询每个管理员及其所有收货地址SELECT a.username, a.name, sa.address, sa.city, sa.state, sa.postal_code, sa.country
FROM admins a
JOIN shipping_addresses sa ON a.admin_id = sa.admin_id;
```

这个查询将返回管理员的用户名和姓名以及他们的每个收货地址的详细信息。

### 查询特定管理员的所有收货地址

如果您想要查询特定管理员的所有收货地址，可以修改查询条件，例如查询管理员 `liulei07`：

```sql
-- 查询管理员 liulei07 的所有收货地址SELECT a.username, a.name, sa.address, sa.city, sa.state, sa.postal_code, sa.country
FROM admins a
JOIN shipping_addresses sa ON a.admin_id = sa.admin_id
WHERE a.username = 'liulei07';
```

### JOIN

在 SQL 中，连接（JOIN）是用来合并两个或多个表的行的方法，根据表之间的共同字段来合并。连接类型决定了查询如何选择行进行合并。以下是常见的连接类型及其用途：

### 1. INNER JOIN（内连接）

**用途**：返回两个表中匹配条件的行。如果一行在一个表中匹配但在另一个表中不匹配，则不会显示这行。

**示例**：

```sql
SELECT *FROM table1
INNER JOIN table2
ON table1.common_field = table2.common_field;
```

### 2. LEFT JOIN（左连接)

**用途**：返回左表（`table1`）的所有行和右表（`table2`）中匹配的行。如果右表没有匹配的行，则结果中这部分将为 NULL。

**示例**：

```sql
SELECT *FROM table1
LEFT JOIN table2
ON table1.common_field = table2.common_field;
```

### 3. RIGHT JOIN（右连接）

**用途**：返回右表（`table2`）的所有行和左表（`table1`）中匹配的行。如果左表没有匹配的行，则结果中这部分将为 NULL。

**示例**：

```sql
SELECT *FROM table1
RIGHT JOIN table2
ON table1.common_field = table2.common_field;
```

### 4. FULL OUTER JOIN（全外连接）

**用途**：返回两个表中的所有行。当某行在一个表中有匹配而在另一个表中无匹配时，对应的无匹配表的部分将为 NULL。注意，MySQL 不直接支持 FULL OUTER JOIN，但可以通过 UNION 实现。

**示例**（模拟全外连接）：

```sql
SELECT *FROM table1
LEFT JOIN table2
ON table1.common_field = table2.common_field
UNIONSELECT *FROM table1
RIGHT JOIN table2
ON table1.common_field = table2.common_field;
```

### 5. CROSS JOIN（交叉连接）

**用途**：返回第一个表的每一行与第二个表的每一行的笛卡尔积。如果两个表分别有 5 行和 4 行，那么结果将有 20 行。

**示例**：

```sql
SELECT *FROM table1
CROSS JOIN table2;
```

### 6. SELF JOIN（自连接）

**用途**：是一种特殊情况的内连接，表通过自身与自身连接，常用于组织结构、层级数据等场景。

**示例**：

```sql
SELECT a.name AS EmployeeName, b.name AS ManagerName
FROM employees a
JOIN employees b
ON a.manager_id = b.employee_id;
```

在 SQL 中进行 JOIN 操作时，
`ON` 关键字是用来指定 JOIN 的条件的，它定义了两个表如何关联在一起。通过 `ON` 条件，SQL 引擎能够决定如何精确地匹配来自两个表的行。这个条件通常涉及到两个表中共有的一个或多个字段。
