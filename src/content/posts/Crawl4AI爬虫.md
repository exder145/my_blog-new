---
title: 爬虫环境配置总结
published: 2024-12-24
description: "Crawl4AI爬虫工具的配置和问题解决"
tags: [Python, 爬虫, 编程技术]
category: "编程技术"
draft: false
author: EXDER
---

记录一下配置和学习 Crawl4AI 爬虫工具中遇到的问题，以便日后查阅。

<!-- more -->

官网：[Home - Crawl4AI Documentation](https://crawl4ai.com/mkdocs/)

中文教程网站：[和 GPT 一起学习全栈技术。](https://www.studywithgpt.com/zh-cn/user/tutorial/ynms80/s55rfl)

# 初始环境检查

**首先需要检查以下几个基础组件:**

- Chrome 浏览器是否正确安装
- Python 环境是否配置完成
- 相关依赖包的版本是否符合要求

<font color=gray size=3>这些都是后续操作的基础,如果这一步出现问题会影响到整个配置过程</font>

**需要安装以下的包:**

- pip install crawl4ai

其他：

- Playwright: `playwright install chrome`
- 解析器: `lxml`, `html5lib`, `beautifulsoup4`

# 存在问题

在使用官方推荐的测试代码（如下）时，出现 lxml 解析器无法正常使用，chromo 无法使用等问题。

```c++
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    # Create an instance of AsyncWebCrawler
    async with AsyncWebCrawler(verbose=True) as crawler:
        # Run the crawler on a URL
        result = await crawler.arun(url="https://www.nbcnews.com/business")

        # Print the extracted content
        print(result.markdown)

# Run the async main function
asyncio.run(main())
```

## lxml 解析器问题

处理步骤：

首先卸载现有的 lxml：

```c++
pip uninstall lxml
```

然后重新安装所需的所有解析器：

```c++
pip install lxml
pip install html5lib
pip install beautifulsoup4
```

随后测试，显示所有基本依赖都已正确安装。

## Chrome 无法使用（半解决）

根据报错内容，发现错误信息显示：找不到 Chrome 浏览器，更换为本地完整路径也无效

**解决方法：重新安装 Playwright 的 Chrome 浏览器**

注：本地 chrome 浏览器与 Playwright 的 Chrome 浏览器并非同一个！

```python
# 安装 Playwright 的 Chrome
playwright install chrome
```

验证 Playwright 的 Chrome 是否安装成功：

```python
playwright --version
playwright show-browsers
```

**原因：**

1. Playwright 的工作方式

- Playwright 使用自己管理的浏览器版本，而不是系统安装的 Chrome

- 这样做是为了确保跨平台兼容性和版本控制

- 即使已经安装了 Chrome，Playwright 也需要安装自己的版本

2. 为什么要这样做？

- 版本控制：确保代码在所有环境中都能正常运行

- 隔离性：避免与系统浏览器的配置冲突

- 自动化控制：更好地支持自动化测试和爬虫功能

~~但悲伤的是，经测试其他爬虫方法都可以正常使用 Chrome，唯独在使用 Crawl4AI 时 Chrome 死活连 �� 不上。在挣扎了二十分钟后终于屈服了，换为了火狐浏览器完美解决~~

官网给出的测试代码：

（默认为 chrome）

```c++
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    # Create an instance of AsyncWebCrawler
    async with AsyncWebCrawler(verbose=True) as crawler:
        # Run the crawler on a URL
        result = await crawler.arun(url="https://www.nbcnews.com/business")

        # Print the extracted content
        print(result.markdown)

# Run the async main function
asyncio.run(main())
```

运行后报错：

```c++
Traceback (most recent call last):
  File "c:\Users\EXDER\Desktop\test\crawl_test.py", line 14, in <module>
    asyncio.run(main())
  File "E:\python\Lib\asyncio\runners.py", line 194, in run
    return runner.run(main)
           ^^^^^^^^^^^^^^^^
  File "E:\python\Lib\asyncio\runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\python\Lib\asyncio\base_events.py", line 687, in run_until_complete
    return future.result()
           ^^^^^^^^^^^^^^^
  File "c:\Users\EXDER\Desktop\test\crawl_test.py", line 6, in main
    async with AsyncWebCrawler(verbose=True, browser_type='chrome') as crawler:
  File "E:\python\Lib\site-packages\crawl4ai\async_webcrawler.py", line 131, in __aenter__
    await self.crawler_strategy.__aenter__()
  File "E:\python\Lib\site-packages\crawl4ai\async_crawler_strategy.py", line 500, in __aenter__
    await self.start()
  File "E:\python\Lib\site-packages\crawl4ai\async_crawler_strategy.py", line 507, in start
    await self.browser_manager.start()
  File "E:\python\Lib\site-packages\crawl4ai\async_crawler_strategy.py", line 290, in start
    self.browser = await self.playwright.chromium.launch(**browser_args)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\python\Lib\site-packages\playwright\async_api\_generated.py", line 14404, in launch
    await self._impl_obj.launch(
  File "E:\python\Lib\site-packages\playwright\_impl\_browser_type.py", line 95, in launch
    Browser, from_channel(await self._channel.send("launch", params))
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\python\Lib\site-packages\playwright\_impl\_connection.py", line 61, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\python\Lib\site-packages\playwright\_impl\_connection.py", line 528, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.Error: BrowserType.launch: Chromium distribution 'chrome' is not found at C:\Users\EXDER\AppData\Local\Google\Chrome\Application\chrome.exe
Run "playwright install chrome"
Exception ignored in: <function BaseSubprocessTransport.__del__ at 0x00000216290ECE00>
Traceback (most recent call last):
  File "E:\python\Lib\asyncio\base_subprocess.py", line 126, in __del__
  File "E:\python\Lib\asyncio\base_subprocess.py", line 104, in close
  File "E:\python\Lib\asyncio\proactor_events.py", line 109, in close
  File "E:\python\Lib\asyncio\base_events.py", line 795, in call_soon
  File "E:\python\Lib\asyncio\base_events.py", line 541, in _check_closed
RuntimeError: Event loop is closed
```

修改为火狐浏览器：

```c++
async with AsyncWebCrawler(verbose=True, browser_type='firefox') as crawler:
```

终于出现了正确的输出：

```c++
[INIT].... → Crawl4AI 0.4.22
[FETCH]... ↓ https://www.example.com/... | Status: True | Time: 0.02s
[SCRAPE].. ◆ Processed https://www.example.com/... | Time: 2ms
[COMPLETE] ● https://www.example.com/... | Status: True | Total: 0.03s
# Example Domain

This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.

[More information...](https://www.iana.org/domains/example)
```

**但最奇怪的是，后续我尝试了 edge，safari 等浏览器，都显示无法正常运行，报错同上。似乎只有火狐可以。到底是什么原理呢。。。**
