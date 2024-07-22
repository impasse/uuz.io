---
title: 挖了个新坑 path_helper
slug: path_helper
authors: 
  - yooyi
tags: 
  - MacOS
---

一直以来都比较头痛 Linux/MacOS 下的 PATH 环境变量的设置，因为太过于自由了，不像 windows 里有一个固定的位置去修改，最多分出了一个用户环境变量和系统环境变量的区别。

而在 MacOS, PATH 环境变量到处都是，像这些：

- `~/.bashrc`
- `~/.zshrc`
- `~/.zshrc`
- `~/.zprofile`
- `~/.zshenv` 
- `/etc/profile`
- `/etc/paths`

从每个用户的 shell 配置，到系统的全局配置，每一个文件里写一句 `export PATH = xxxx:$PATH` 都能改一改 PATH。

在这么自由的情况下，人人都有自己独特的修改环境变量的操作，有些人的脚本喜欢把自己的 PATH 加在前面，有的喜欢加在后面，MacOS 自带了 ruby，如果自己在 homebrew 里又装个更新版本的 ruby，很容易因为环境变量的顺序问题而无法直接使用 ruby。

有些手动添加的环境变量还带有版本号，如果有一天升级了软件，还会出现环境变量无效的问题。

另外环境变量里其实是可以写相对路径的，例如 `~/.yarn/bin`，假如此时还有一个 `/Users/xxxx/.yarn/bin`，它们看上去不一样，实际上还是指向的同一个路径，重复无用的查找也会降低命令执行的速度。

**简直不要太烦**。

<!--truncate-->

后来研究了一下 MacOS 的环境变量，发现苹果其实是有一个简单的方案解决这个问题。

那就是 `/usr/libexec/path_helper`，这是一个 C 写的程序，大概的功能就是读取 `/etc/paths`, `/etc/paths.d` 中的文件里每一行写的 PATH，然后与当前环境变量里的 $PATH 做 merge，最后生成一段设置环境变量的 shell 脚本。这个东西在 `/etc/profile` 和 `/etc/zprofile` 里用 shell 脚本执行，然后 eval。

想法挺简单的，但是也是过于简单了。

用起来就有几个问题：

- 无序：`/etc/paths` 的内容永远是在最前面，但 `/etc/paths.d` 里的文件顺序依赖文件系统的读取，这样就导致 `/etc/paths.d/ruby` 永远无法覆盖系统自带的 ruby
- 不确定存在：环境变量指向的地址可能是个无效路径，还是会被添加在 $PATH 上
- 不支持变量替换: `~` 不会被替换为 `/Users/username`, 也不支持像 windows 下的 `%JAVA_HOME%` 这样的环境变量替换功能。

所以就写了这个工具: (https://github.com/impasse/path_helper)[https://github.com/impasse/path_helper]

用 rust 写的，速度应该不会比系统自带的 C 实现慢太多。

`/etc/paths.d/` 下 0 开头的脚本会优先于 `/etc/paths`，而其他开头的会晚于 `/etc/paths.d`。
同时也支持了变量替换，去重以及检查目录是否存在的功能。

把所有的环境变量都通过它管理后，$PATH 整洁多了~