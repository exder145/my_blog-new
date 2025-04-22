---
title: 实习周报week3（3.17-3.23）
published: 2025-03-23
description: "第三周实习工作总结，包括费用概览界面完善、资产管理与Ansible功能实现"
tags: [实习, 周报, CMDB, Ansible]
category: "学习"
draft: false
author: EXDER
---

# **实习周报 week3（3.17-3.23）**

（1）**费用概览界面完善**

- 费用分布饼状图，可展示月度年度费用（样式确定，具体内容待完善 数据待补充）

- **Top 5 高费用资源**

  对最近一年的高额费用进行排序展示

界面如图：

![image-20250324152049422](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152049422.png)

（2）资产管理界面

- json 文件内数据已通过自动脚本上传数据库
- 数据按时间展示（本月 上月 全部数据 自定义）
- 导出功能已实现，导出为 csv 表格
- 环比变化的计算已实现

界面展示：

![image-20250324152058440](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152058440.png)

（3）Ansible 执行

- 使用表单添加目标主机

（直接添加 批量添加 从 CSV 导入）

![image-20250324152110909](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152110909.png)

- 具体功能的后端实现（后端功能待验证）

界面如图：

![image-20250324152119281](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152119281.png)

![image-20250324152132670](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152132670.png)

（4）新增开发日志

![image-20250324152600210](https://exder-1333988393.cos.ap-beijing.myqcloud.com/image-20250324152600210.png)
