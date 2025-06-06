---
title: 实习周报week4（3.24-3.28）
published: 2025-03-28
description: "第四周实习工作总结，包括Ansible功能测试与优化、前后端分离部署等"
tags: [实习, 周报, Ansible, 前后端分离]
category: "学习"
draft: false
author: EXDER
---

# **实习周报 week4（3.24-3.28）**

### 1. Ansible 执行功能测试与优化

- 新增一键测试功能，快速填充测试主机信息和 playbook 内容，进行链接测试
- 优化执行结果展示：
  - 添加颜色标识和分隔符
  - 提升日志可读性
- 改进页面刷新机制，解决会话失效问题
- 完成全面功能测试，验证执行结果正常

### 2. 前后端分离部署测试完成

- 实现前后端分离部署：
  - 后端部署于 CentOS 7 虚拟机
  - 前端在 Windows 环境独立运行
- 期间解决技术问题：
  - 配置 SQLite 数据库权限
  - 实现跨域请求支持
  - 优化前端 API 请求配置等

### 3. 项目文档与代码优化

- 编写`setting.md`配置文档，完善部署指南
- 集成内联链接功能，使用内网访问支持。
  - 监控平台
  - 导航链接
  - 服务配置
- 代码仓库优化：
  - 补充`.gitignore`配置
  - 创建清理分支，移除冗余文件。验证无误后完成分支合并。
