# mac 环境从0开始打造
* brew
* git，需要安装xcode先
* 编码工具：vscode, sublime 两个备用，一个比较轻量级，一个比较占内存。
* hosts切换工具
* iterm2
* zsh
* vim 配色：[让Vim在Mac下语法高亮](https://taojintianxia.github.io/2018/05/25/%E8%AE%A9Vim%E5%9C%A8mac%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE/)
* 配置全局的`.gitconfig`文件，常用的命令缩写。
```js
[alias]
  co = checkout
  ci = commit
  st = status
  br = branch
  mg = merge
  hist = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
```